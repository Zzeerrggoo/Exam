const authRouter = require('express').Router();
const validateBody = require('../middlewares/validateBody');
const ValidationSchemas = require('../validation/schemas');
const AuthController = require('../controllers/authController');
const UsersController = require('../controllers/userController');
const checkAuthorization = require('../middlewares/checkAuthorization');
const { uploadAvatar } = require('../utils/fileUpload');

authRouter.post(
  '/login',
  validateBody(ValidationSchemas.loginSchema),
  AuthController.login,
);

authRouter.post('/signup', validateBody(ValidationSchemas.signUpSchema),
  AuthController.signUp);

authRouter.post('/refresh', AuthController.refresh);

authRouter.patch(
  '/user/:userId',
  checkAuthorization,
  // validateBody(ValidationSchemas.updateUserSchema),
  uploadAvatar,
  UsersController.updateUser,
);
module.exports = authRouter;
