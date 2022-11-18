import express, { Router } from 'express';
//import UserRouter from './user.route';
import OnboardingRouter from './onboarding.route'
import AuthRouter from './auth.route'

const AppRouter: Router = express.Router();

//AppRouter.use('/user', UserRouter);
AppRouter.use('/onboarding', OnboardingRouter)
AppRouter.use('/auth', AuthRouter)


export default AppRouter;
