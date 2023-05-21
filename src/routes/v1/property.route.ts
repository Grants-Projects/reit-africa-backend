import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { PropertyController } from '../../controller/property.controller';
import authMiddleware from '../../middleware/auth.middleware';


const propertyController: any = container.resolve(PropertyController)

router.post('/', authMiddleware(), propertyController.addProperty);
router.post('/:propertyId/upload-doc', authMiddleware(), propertyController.uploadDocuments)
router.put('/:propertyId/approve', authMiddleware(), propertyController.approveProperty)
router.post('/:propertyId/upload-to-blockchain', authMiddleware(),  propertyController.publishToBlockchain)

export default router;
