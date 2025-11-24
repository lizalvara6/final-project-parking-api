import prisma from '../config/prismaClient.js';

export const createLot = async (data) => {
  return await prisma.parkingLot.create({ data });
};

export const findAllLots = async () => {
  return await prisma.parkingLot.findMany();
};

export const findLotById = async (id) => {
  return await prisma.parkingLot.findUnique({ where: { lot_id: parseInt(id) } });
};

export const updateLot = async (id, data) => {
  return await prisma.parkingLot.update({
    where: { lot_id: parseInt(id) },
    data
  });
};

export const deleteLot = async (id) => {
  return await prisma.parkingLot.delete({ where: { lot_id: parseInt(id) } });
};