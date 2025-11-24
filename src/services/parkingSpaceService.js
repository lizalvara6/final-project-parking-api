import * as spaceRepo from '../repositories/parkingSpaceRepository.js';
import * as lotRepo from '../repositories/parkingLotRepository.js';

export const addSpace = async (data) => {
  const lot = await lotRepo.findLotById(data.lot_id);
  if (!lot) throw new Error('Parking lot not found');

  return await spaceRepo.createSpace({
    lot_id: parseInt(data.lot_id),
    space_type: data.space_type,
    is_occupied: false
  });
};

export const getSpacesForLot = async (lotId) => {
  const lot = await lotRepo.findLotById(lotId);
  if (!lot) throw new Error('Parking lot not found');
  return await spaceRepo.findSpacesByLotId(lotId);
};

export const modifySpaceStatus = async (spaceId, isOccupied, lotId = null) => {
  const space = await spaceRepo.findSpaceById(spaceId);
  if (!space) throw new Error('Parking space not found');
  
  if (lotId) {
    const lot = await lotRepo.findLotById(lotId);
    if (!lot) throw new Error('Parking lot not found');
    if (space.lot_id !== parseInt(lotId)) {
      throw new Error('Space does not belong to this lot');
    }
  }
  
  return await spaceRepo.updateSpace(spaceId, { is_occupied: isOccupied });
};
