import express from 'express';
import { createParkingSpace, getSpacesByLot, updateSpaceStatus } from '../controllers/parkingSpaceController.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';
import { 
  validateSpaceCreate, 
  validateSpaceStatus 
} from '../middleware/validationMiddleware.js';

const router = express.Router();
router.use(authenticateToken);

router.get('/lot/:lot_id', getSpacesByLot);
router.post('/', authorizeAdmin, validateSpaceCreate, createParkingSpace);
router.patch('/:id', authorizeAdmin, validateSpaceStatus, updateSpaceStatus);
router.patch('/lot/:lot_id/space/:space_id', authorizeAdmin, validateSpaceStatus, updateSpaceStatus);
export default router;