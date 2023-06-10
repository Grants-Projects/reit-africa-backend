import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { AuthController } from '../../controller/auth.controller';


const authController: AuthController = container.resolve(AuthController);
router.post('/login', authController.loginUser)
.get('/verify-user-exists', authController.verifyUser);

export default router;
