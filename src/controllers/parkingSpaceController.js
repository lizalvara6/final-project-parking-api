import * as spaceService from '../services/parkingSpaceService.js';

export const createParkingSpace = async (req, res) => {
  try {
    const space = await spaceService.addSpace(req.body);
    res.status(201).json(space);
  } catch (error) {
    const status = error.message === 'Parking lot not found' ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

export const getSpacesByLot = async (req, res) => {
  try {
    const spaces = await spaceService.getSpacesForLot(req.params.lot_id);
    res.json(spaces);
  } catch (error) {
    const status = error.message === 'Parking lot not found' ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

export const updateSpaceStatus = async (req, res) => {
  try {
    const spaceId = req.params.space_id || req.params.id;
    const lotId = req.params.lot_id;
    
    const updated = await spaceService.modifySpaceStatus(spaceId, req.body.is_occupied, lotId);
    res.json(updated);
  } catch (error) {
    const status = error.message === 'Parking space not found' || error.message === 'Parking lot not found' || error.message === 'Space does not belong to this lot' ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};