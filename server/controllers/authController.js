const createHttpError = require('http-errors');
const { hashSync, compare } = require('bcrypt');
const { User, RefreshToken } = require('../models');
const AuthService = require('../services/authService');
const { SALT_ROUNDS } = require('../constants');
const { createRestoreToken } = require('../services/authService');
const CONSTANTS = require('../constants');

exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const userInstance = await User.findOne({
      where: { email },
    });

    if (userInstance && (await userInstance.comparePassword(password))) {
      const data = await AuthService.createSession(userInstance);
      res.status(201).send({
        data,
      });
      return;
    }
    next(createHttpError(403, 'Incorrect password or email'));
  } catch (err) {
    next(err);
  }
};

exports.restorePasswordRequest = async (req, res, next) => {
  try {
    const { email, newPass } = req.body;

    const user = await User.findOne(
      { where: { email }, attributes: ['email', 'id'] },
    );
    const newPassHash = hashSync(newPass, SALT_ROUNDS);
    const restoreToken = await createRestoreToken(user, newPassHash);
    const link = `${CONSTANTS.BASE_URL}/restoreRequest?token=${restoreToken}`;

    req.body.userId = user.get('id');
    req.body.emailMessage = {
      subject: 'SQUADHELP RESTORE PASSWORD',
      html: `<p>To refresh your password open the link below.<br/><a href="${link}">CLICK HERE</a></p> `,
    };
    req.body.status = 204;

    next();
  } catch (error) {
    next(createHttpError(403, 'This email doesn\'t  exists'));
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userInstance = await User.create(body);
    if (userInstance) {
      const data = await AuthService.createSession(userInstance);
      res.status(201).send({
        data,
      });
      return;
    }
    next(createHttpError(401));
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (refreshTokenInstance && refreshTokenInstance.isUnexpired()) {
      const data = await AuthService.refreshSession(refreshTokenInstance);
      res.send({
        data,
      });
      return;
    }
    next(createHttpError(401));
  } catch (err) {
    next(err);
  }
};
