import { Router } from 'express';
import {
  getAllUsers,
  deleteUserById
} from '../controllers/user-controller';

const router = Router();

// GET /api/v1/users - Get all users
router.get('/', getAllUsers);

// DELETE /api/v1/users/:id - Delete user by ID
router.delete('/:id', deleteUserById);

export default router;