import express, { Router } from 'express';
//import UserRouter from './user.route';
import OnboardingRouter from './onboarding.route'
import AuthRouter from './auth.route'
import PropertyRouter from './property.route';

const AppRouter: Router = express.Router();

AppRouter.use("/onboarding", OnboardingRouter)
AppRouter.use('/auth', AuthRouter);
AppRouter.use('/property', PropertyRouter)

export default AppRouter;
