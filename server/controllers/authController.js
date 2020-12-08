const createHttpError = require('http-errors');
const { hashSync } = require('bcrypt');
const { sequelize, User, RefreshToken } = require('../models');
const AuthService = require('../services/authService');
const { SALT_ROUNDS } = require('../constants');
const { createRestoreToken } = require('../services/authService');
const CONSTANTS = require('../constants');
const JwtService = require('../services/jwtService');
const config = require('../configs/config');

const {
  jwt: { tokenSecret },
} = config;

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
    const link = `${CONSTANTS.FRONT_URL}/restoreVerification?token=${restoreToken}`;

    req.body.userId = user.get('id');
    req.body.emailMessage = {
      subject: 'SQUADHELP RESTORE PASSWORD',
      html: `<p>To refresh your password open the link below.<br/><a href="${link}">CLICK HERE</a></p> `,
    };
    req.body.status = 204;

    next();
  } catch (error) {
    next(error);
  }
};

exports.passwordVerification = async (req, res, next) => {
  try {
    const { token } = req.body;
    const { userId, passwordHash } = await JwtService.verify(token, tokenSecret);
    // Use raw query because of User setter, which tries to hash your already hashed password
    await sequelize.query(
      `UPDATE "Users" SET "passwordHash"='${passwordHash}' WHERE id=${userId}`,
    );

    res.status(200).send();
  } catch (error) {
    next(error);
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
