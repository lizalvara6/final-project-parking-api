import * as vehicleService from '../services/vehicleService.js';

export const createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.addVehicle(req.body, req.user.userId);
    res.status(201).json(vehicle);
  } catch (err) {
    const status = err.message.includes('already exists') ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const isAdmin = req.user.roles.includes('Admin');
    const vehicles = await vehicleService.getVehicles(req.user.userId, isAdmin);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const isAdmin = req.user.roles.includes('Admin');
    const vehicle = await vehicleService.getVehicleById(req.params.id, req.user.userId, isAdmin);
    res.json(vehicle);
  } catch (err) {
    const status = err.message === 'Access denied' ? 403 : err.message === 'Vehicle not found' ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    console.log('Update request - ID:', req.params.id);
    console.log('Update request - Body:', req.body);
    const isAdmin = req.user.roles.includes('Admin');
    const updated = await vehicleService.editVehicle(req.params.id, req.body, req.user.userId, isAdmin);
    console.log('Updated vehicle:', updated);
    res.json(updated);
  } catch (err) {
    let status = 500;
    if (err.message === 'Access denied') status = 403;
    else if (err.message === 'Vehicle not found') status = 404;
    else if (err.message.includes('already exists')) status = 400;
    res.status(status).json({ error: err.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const isAdmin = req.user.roles.includes('Admin');
    await vehicleService.removeVehicle(req.params.id, req.user.userId, isAdmin);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    const status = err.message === 'Access denied' ? 403 : 404;
    res.status(status).json({ error: err.message });
  }
};