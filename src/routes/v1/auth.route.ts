import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { AuthController } from '../../controller/auth.controller';


const authController: any = container.resolve(AuthController);
router.post('/login', authController.loginUser);

export default router;
