import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addVehicle = async (req, res) => {
    try {
        const { license_plate, make, model } = req.body;
        const user_id = req.user.user_id;

        const vehicle = await prisma.vehicle.create({
            data: {
                user_id: user_id,
                license_plate,
                make,
                model
            },
        });
        res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'Vehicle with this license plate already exists' });
        }
        res.status(500).json({ error: `Failed to add vehicle: ${error.message}` });
    }
};

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await prisma.vehicle.findMany();
        res.status(200).json({ vehicles });
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve vehicles: ${error.message}` });
    }
};


export const getUserVehicles = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const vehicles = await prisma.vehicle.findMany({
            where: { user_id: user_id },
        });
        res.status(200).json({ vehicles });
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve vehicles: ${error.message}` });
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const { vehicle_id } = req.params;
        const user_id = req.user.user_id;

        const vehicle = await prisma.vehicle.findFirst({
            where: {
                vehicle_id: parseInt(vehicle_id),
                user_id: user_id,
            },
        });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        if (vehicle.user_id !== user_id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.status(200).json({ vehicle });
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve vehicle: ${error.message}` });
    }
};

export const updateVehicle = async (req, res) => {
    try {
        const { vehicle_id } = req.params;
        const { license_plate, make, model } = req.body;
        const user_id = req.user.user_id;

        const vehicle = await prisma.vehicle.findUnique({
            where: { vehicle_id: parseInt(vehicle_id) },
        });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        if (vehicle.user_id !== user_id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const updateData = {};
        if (license_plate) updateData.license_plate = license_plate;
        if (make) updateData.make = make;
        if (model) updateData.model = model;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const updatedVehicle = await prisma.vehicle.update({
            where: { vehicle_id: parseInt(vehicle_id) },
            data: updateData,
        });
        res.status(200).json({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'Vehicle with this license plate already exists' });
        }
        res.status(500).json({ error: `Failed to update vehicle: ${error.message}` });
    }
};

export const deleteVehicle = async (req, res) => {
    try {
        const { vehicle_id } = req.params;
        const user_id = req.user.user_id;
        const vehicle = await prisma.vehicle.findUnique({
            where: { vehicle_id: parseInt(vehicle_id) },
        });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        if (vehicle.user_id !== user_id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        await prisma.vehicle.delete({
            where: { vehicle_id: parseInt(vehicle_id) },
        });
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete vehicle: ${error.message}` });
    }
};