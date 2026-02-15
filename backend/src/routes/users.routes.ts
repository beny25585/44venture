import { Router } from 'express';
import {
  createUser,
  getUserById,
  listUsers,
  updateUserName,
} from '../controllers/users.controller.js';
import {
  validateCreateUser,
  validateUpdateUserName,
  validateUserId,
} from '../validators/users.validator.js';

export const usersRouter = Router();

usersRouter.get('/', listUsers);
usersRouter.get('/:id', validateUserId, getUserById);
usersRouter.post('/', validateCreateUser, createUser);
usersRouter.patch('/:id/name', validateUserId, validateUpdateUserName, updateUserName);
