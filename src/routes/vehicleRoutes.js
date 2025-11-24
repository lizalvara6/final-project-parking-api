import express from 'express';
import { addVehicle, getVehicleById,getAllVehicles,updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.use(authenticateToken);

router.post('/', addVehicle);
router.get('/', getAllVehicles);
router.get('/:vehicle_id', getVehicleById);
router.put('/:vehicle_id', updateVehicle);
router.delete('/:vehicle_id', authenticateToken, deleteVehicle);

export default router;