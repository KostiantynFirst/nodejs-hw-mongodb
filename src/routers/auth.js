import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { userSighnUpSchema, userSighnInSchema } from '../validation/users.js';

import * as authControllers from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSighnUpSchema),
  ctrlWrapper(authControllers.signupController),
);

authRouter.post(
  '/login',
  validateBody(userSighnInSchema),
  ctrlWrapper(authControllers.signinController),
);

export default authRouter;
