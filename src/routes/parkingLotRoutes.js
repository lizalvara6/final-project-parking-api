import express from 'express';
import { 
  getParkingLots,
  createParkingLot,
  getParkingLotById
} from '../controllers/parkingLotController.js';

const router = express.Router();

router.get('/', getParkingLots);
router.post('/', createParkingLot);
router.get('/:id', getParkingLotById);

export default router;

