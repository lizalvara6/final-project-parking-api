import express from 'express';
import { getParkingLots, createParkingLot, getParkingLotById, updateLot, deleteLot } from '../controllers/parkingLotController.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';
import { 
  validateLotCreate, 
  validateLotUpdate, 
  validateLotId 
} from '../middleware/validationMiddleware.js';

const router = express.Router();
router.use(authenticateToken);

router.get('/', getParkingLots);
router.get('/:id', validateLotId, getParkingLotById);
router.post('/', authorizeAdmin, validateLotCreate, createParkingLot);
router.put('/:id', authorizeAdmin, validateLotId, validateLotUpdate, updateLot);
router.delete('/:id', authorizeAdmin, validateLotId, deleteLot);
export default router;