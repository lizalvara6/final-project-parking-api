import express from 'express';
import {
    createParkingSession,
    getAllParkingSessions,
    getParkingSessionById,
    getActiveParkingSessions,
    endParkingSession,
    deleteParkingSession
} from '../controllers/parkingSessionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(authenticateToken);
router.post('/', createParkingSession);
router.get('/', getAllParkingSessions);
router.get('/active', getActiveParkingSessions);
router.get('/:session_id', getParkingSessionById);
router.patch('/:session_id/end', endParkingSession);
router.delete('/:session_id', deleteParkingSession);

export default router;
