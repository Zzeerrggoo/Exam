const authRouter = require('express').Router();
const validateBody = require('../middlewares/validateBody');
const ValidationSchemas = require('../validation/schemas');
const AuthController = require('../controllers/authController');
const UsersController = require('../controllers/userController');
const checkAuthorization = require('../middlewares/checkAuthorization');
const { uploadAvatar } = require('../utils/fileUpload');
const nodemailer = require('../middlewares/nodemailer');

authRouter.post(
  '/login',
  validateBody(ValidationSchemas.loginSchema),
  AuthController.login,
);

authRouter.post('/signup',
  validateBody(ValidationSchemas.signUpSchema),
  AuthController.signUp);

authRouter.post('/refresh', AuthController.refresh);

authRouter.post('/restore', AuthController.restorePasswordRequest,
  nodemailer.sendEmail);

authRouter.patch('/restoreVerification', AuthController.passwordVerification);

authRouter.patch(
  '/user/:userId',
  // DO NOT MOVE THIS MIDDLEWARE! IT PARSE formData to readable object in req.body !
  uploadAvatar,
  checkAuthorization,
  validateBody(ValidationSchemas.updateUserSchema),
  UsersController.updateUser,
);

module.exports = authRouter;
