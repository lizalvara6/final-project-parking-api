import express from 'express';
import {
  createParkingSpace,
  getSpacesByLot,
  updateSpaceStatus
} from '../controllers/parkingSpaceController.js';

const router = express.Router();

router.post('/', createParkingSpace);         
router.get('/lot/:lot_id', getSpacesByLot);   
router.patch('/:id', updateSpaceStatus);      

export default router;