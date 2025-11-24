import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getParkingLots = async (req, res) => {
  try {
    const lots = await prisma.parkingLot.findMany({
      include: { spaces: true }
    });
    res.json(lots);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch parking lots" });
  }
};


export const createParkingLot = async (req, res) => {
  try {
    const { name, address, city, hourly_rate, total_capacity } = req.body;

    const newLot = await prisma.parkingLot.create({
      data: {
        name,
        address,
        city,
        hourly_rate,
        total_capacity
      }
    });

    res.status(201).json(newLot);
  } catch (error) {
    res.status(500).json({ error: "Failed to create parking lot" });
  }
};

export const getParkingLotById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const lot = await prisma.parkingLot.findUnique({
      where: { lot_id: id },
      include: { spaces: true }
    });

    if (!lot) return res.status(404).json({ message: "Parking lot not found" });

    res.json(lot);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve parking lot" });
  }
};

