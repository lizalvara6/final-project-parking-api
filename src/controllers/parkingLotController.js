import * as lotService from '../services/parkingLotService.js';

export const getParkingLots = async (req, res) => {
  try {
    const lots = await lotService.getLots();
    res.json(lots);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch parking lots" });
  }
};

export const createParkingLot = async (req, res) => {
  try {
    const newLot = await lotService.createNewLot(req.body);
    res.status(201).json(newLot);
  } catch (error) {
    res.status(500).json({ error: "Failed to create parking lot" });
  }
};

export const getParkingLotById = async (req, res) => {
  try {
    const lot = await lotService.getLotById(req.params.id);
    res.json(lot);
  } catch (error) {
    const status = error.message === 'Parking lot not found' ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

export const updateLot = async (req, res) => {
  try {
    const updated = await parkingLotService.editLot(req.params.id, req.body);
    res.json(lot);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteLot = async (req, res) => {
  try {
    await lotService.removeLot(req.params.id);
    res.json({ message: 'Lot deleted' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};