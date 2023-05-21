import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { OnboardingController } from '../../controller/onboarding.controler';
import authMiddleware from '../../middleware/auth.middleware';


const onboardingController: any = container.resolve(OnboardingController)

router.post('/', onboardingController.onboardUser);

export default router;
