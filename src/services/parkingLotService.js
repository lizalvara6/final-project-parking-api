import * as lotRepo from '../repositories/parkingLotRepository.js';

export const createNewLot = async (data) => await lotRepo.createLot(data);
export const getLots = async () => await lotRepo.findAllLots();

export const getLotById = async (id) => {
  const lot = await lotRepo.findLotById(id);
  if (!lot) throw new Error('Parking lot not found');
  return lot;
};

export const editLot = async (id, data) => {
  const lot = await lotRepo.findLotById(id);
  if (!lot) throw new Error('Parking lot not found');
  return await lotRepo.updateLot(id, data);
};

export const removeLot = async (id) => {
  const lot = await lotRepo.findLotById(id);
  if (!lot) throw new Error('Parking lot not found');
  return await lotRepo.deleteLot(id);
};