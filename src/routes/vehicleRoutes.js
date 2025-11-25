import express from 'express';
import { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
  validateVehicleCreate, 
  validateVehicleUpdate, 
  validateVehicleId 
} from '../middleware/validationMiddleware.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', validateVehicleCreate, createVehicle);
router.get('/', getVehicles);
router.get('/:id', validateVehicleId, getVehicleById);
router.put('/:id', validateVehicleId, validateVehicleUpdate, updateVehicle);
router.delete('/:id', validateVehicleId, deleteVehicle);
export default router;
