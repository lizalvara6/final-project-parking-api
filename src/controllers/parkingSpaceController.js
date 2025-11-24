import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createParkingSpace = async (req, res) => {
  try {
    const { lot_id, space_type } = req.body;

    const space = await prisma.parkingSpace.create({
      data: {
        lot_id,
        space_type,
        is_occupied: false
      }
    });

    res.status(201).json(space);
  } catch (error) {
    res.status(500).json({ error: "Failed to create parking space" });
  }
};


export const getSpacesByLot = async (req, res) => {
  try {
    const lot_id = parseInt(req.params.lot_id);

    const spaces = await prisma.parkingSpace.findMany({
      where: { lot_id }
    });

    res.json(spaces);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spaces" });
  }
};

export const updateSpaceStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { is_occupied } = req.body;

    const updated = await prisma.parkingSpace.update({
      where: { space_id: id },
      data: { is_occupied }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update space" });
  }
};
