import * as vehicleRepo from '../repositories/vehicleRepository.js';

export const addVehicle = async (data, userId) => {
  try {
    return await vehicleRepo.createVehicle({ ...data, user_id: userId });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Vehicle with this license plate already exists');
    }
    throw error;
  }
};

export const getVehicles = async (userId, isAdmin) => {
  return isAdmin ? await vehicleRepo.findAllVehicles() : await vehicleRepo.findVehiclesByUserId(userId);
};

export const getVehicleById = async (vehicleId, userId, isAdmin) => {
  const vehicle = await vehicleRepo.findVehicleById(vehicleId);
  if (!vehicle) throw new Error('Vehicle not found');
  if (vehicle.user_id !== userId && !isAdmin) throw new Error('Access denied');
  return vehicle;
};

export const editVehicle = async (vehicleId, data, userId, isAdmin) => {
  console.log('Service editVehicle - vehicleId:', vehicleId);
  console.log('Service editVehicle - data:', data);
  const vehicle = await vehicleRepo.findVehicleById(vehicleId);
  if (!vehicle) throw new Error('Vehicle not found');
  if (vehicle.user_id !== userId && !isAdmin) throw new Error('Access denied');

  const updateData = {};
  if (data.make !== undefined) updateData.make = data.make;
  if (data.model !== undefined) updateData.model = data.model;
  if (data.license_plate !== undefined) updateData.license_plate = data.license_plate;
  
  console.log('Service editVehicle - updateData:', updateData);
  if (Object.keys(updateData).length === 0) return vehicle; 

  try {
    return await vehicleRepo.updateVehicle(vehicleId, updateData);
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Vehicle with this license plate already exists');
    }
    throw error;
  }
};

export const removeVehicle = async (vehicleId, userId, isAdmin) => {
  const vehicle = await vehicleRepo.findVehicleById(vehicleId);
  if (!vehicle) throw new Error('Vehicle not found');
  if (vehicle.user_id !== userId && !isAdmin) throw new Error('Access denied');
  return await vehicleRepo.deleteVehicle(vehicleId);
};