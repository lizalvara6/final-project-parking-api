import prisma from '../config/prismaClient.js';

export const createSpace = async (data) => {
  return await prisma.parkingSpace.create({ data });
};

export const findSpacesByLotId = async (lotId) => {
  return await prisma.parkingSpace.findMany({ where: { lot_id: parseInt(lotId) } });
};

export const findSpaceById = async (id) => {
  return await prisma.parkingSpace.findUnique({ where: { space_id: parseInt(id) } });
};

export const updateSpace = async (id, data) => {
  return await prisma.parkingSpace.update({ where: { space_id: parseInt(id) }, data });
};