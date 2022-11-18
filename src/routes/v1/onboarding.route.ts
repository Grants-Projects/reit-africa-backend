import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { UserController } from '../../controller/user.controller';
import authMiddleware from '../../middleware/auth.middleware';


const userController: any = container.resolve(UserController);
router.post('/register', userController.registerUser);

export default router;
