import prisma from '../config/prismaClient.js';

export const createVehicle = async (data) => {
  return await prisma.vehicle.create({ data });
};

export const findVehicleById = async (id) => {
  return await prisma.vehicle.findUnique({ where: { vehicle_id: parseInt(id) } });
};

export const findVehiclesByUserId = async (userId) => {
  return await prisma.vehicle.findMany({ where: { user_id: userId } });
};

export const findAllVehicles = async () => {
  return await prisma.vehicle.findMany();
};

export const updateVehicle = async (id, data) => {
  return await prisma.vehicle.update({ where: { vehicle_id: parseInt(id) }, data });
};

export const deleteVehicle = async (id) => {
  return await prisma.vehicle.delete({ where: { vehicle_id: parseInt(id) } });
};