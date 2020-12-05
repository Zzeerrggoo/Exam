const nodemailer = require('nodemailer');
const { User } = require('../models/index');

const user = process.env.NODEMAILER_USER;
const pass = process.env.NODEMAILER_PASSWORD;
const service = process.env.NODEMAILER_SERVICE;

const transporter = nodemailer.createTransport({
  service,
  auth: {
    user, pass,
  },
});

module.exports.sendEmail = async (req, res, next) => {
  try {
    const { emailMessage: { text, subject } } = req;
    const { userId } = req.body;

    const { email: userEmail } = await User.findOne(
      { where: { id: userId }, attributes: ['email'], raw: true },
    );

    // N!B! I'M USING MY OWN EMAIL FOR TESTING
    // CHANGE 'to' OPTION ON 'userEmail' instead of 'user'
    await transporter.sendMail({
      from: `Squadhelp <${user}>`,
      to: user,
      subject,
      text,
    });

    res.status(200).send({ data: req.data });
  } catch (error) {
    next(error);
  }
};
