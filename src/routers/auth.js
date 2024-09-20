import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { userSighnUpSchema } from '../validation/users.js';

import * as authControllers from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSighnUpSchema),
  ctrlWrapper(authControllers.signupController),
);

export default authRouter;
