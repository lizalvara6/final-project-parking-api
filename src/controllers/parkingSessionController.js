import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createParkingSession = async (req, res) => {
    try {
        const { space_id, vehicle_id } = req.body;
        const user_id = req.user.user_id;

        const vehicle = await prisma.vehicle.findFirst({
            where: {
                vehicle_id: parseInt(vehicle_id),
                user_id: user_id,
            },
        });

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found or does not belong to you' });
        }

        const space = await prisma.parkingSpace.findUnique({
            where: { space_id: parseInt(space_id) },
            include: { lot: true },
        });

        if (!space) {
            return res.status(404).json({ message: 'Parking space not found' });
        }

        if (space.is_occupied) {
            return res.status(400).json({ message: 'Parking space is already occupied' });
        }

        const session = await prisma.parkingSession.create({
            data: {
                user_id: user_id,
                space_id: parseInt(space_id),
                vehicle_id: parseInt(vehicle_id),
                status: 'active',
            },
            include: {
                vehicle: true,
                space: {
                    include: { lot: true },
                },
            },
        });

        await prisma.parkingSpace.update({
            where: { space_id: parseInt(space_id) },
            data: { is_occupied: true },
        });

        res.status(201).json({ message: 'Parking session created successfully', session });
    } catch (error) {
        console.error('Error creating parking session:', error);
        res.status(500).json({ error: `Failed to create parking session: ${error.message}` });
    }
};

export const getAllParkingSessions = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const sessions = await prisma.parkingSession.findMany({
            where: { user_id: user_id },
            include: {
                vehicle: true,
                space: {
                    include: { lot: true },
                },
            },
            orderBy: { entry_time: 'desc' },
        });

        res.status(200).json({ sessions });
    } catch (error) {
        console.error('Error fetching parking sessions:', error);
        res.status(500).json({ error: `Failed to fetch parking sessions: ${error.message}` });
    }
};

export const getParkingSessionById = async (req, res) => {
    try {
        const { session_id } = req.params;
        const user_id = req.user.user_id;

        const session = await prisma.parkingSession.findFirst({
            where: {
                session_id: parseInt(session_id),
                user_id: user_id,
            },
            include: {
                vehicle: true,
                space: {
                    include: { lot: true },
                },
            },
        });

        if (!session) {
            return res.status(404).json({ message: 'Parking session not found' });
        }

        res.status(200).json({ session });
    } catch (error) {
        console.error('Error fetching parking session:', error);
        res.status(500).json({ error: `Failed to fetch parking session: ${error.message}` });
    }
};

export const getActiveParkingSessions = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const sessions = await prisma.parkingSession.findMany({
            where: {
                user_id: user_id,
                status: 'active',
            },
            include: {
                vehicle: true,
                space: {
                    include: { lot: true },
                },
            },
            orderBy: { entry_time: 'desc' },
        });

        res.status(200).json({ sessions });
    } catch (error) {
        console.error('Error fetching active sessions:', error);
        res.status(500).json({ error: `Failed to fetch active sessions: ${error.message}` });
    }
};

export const endParkingSession = async (req, res) => {
    try {
        const { session_id } = req.params;
        const user_id = req.user.user_id;

        const session = await prisma.parkingSession.findFirst({
            where: {
                session_id: parseInt(session_id),
                user_id: user_id,
            },
            include: {
                space: {
                    include: { lot: true },
                },
            },
        });

        if (!session) {
            return res.status(404).json({ message: 'Parking session not found' });
        }

        if (session.status === 'completed') {
            return res.status(400).json({ message: 'Parking session is already completed' });
        }

        const exitTime = new Date();
        const entryTime = new Date(session.entry_time);
        const durationInHours = (exitTime - entryTime) / (1000 * 60 * 60);
        const hourlyRate = parseFloat(session.space.lot.hourly_rate);
        const totalCost = (Math.ceil(durationInHours) * hourlyRate).toFixed(2);

        const updatedSession = await prisma.parkingSession.update({
            where: { session_id: parseInt(session_id) },
            data: {
                exit_time: exitTime,
                total_cost: totalCost,
                status: 'completed',
            },
            include: {
                vehicle: true,
                space: {
                    include: { lot: true },
                },
            },
        });

        await prisma.parkingSpace.update({
            where: { space_id: session.space_id },
            data: { is_occupied: false },
        });

        res.status(200).json({ 
            message: 'Parking session ended successfully', 
            session: updatedSession 
        });
    } catch (error) {
        console.error('Error ending parking session:', error);
        res.status(500).json({ error: `Failed to end parking session: ${error.message}` });
    }
};

export const deleteParkingSession = async (req, res) => {
    try {
        const { session_id } = req.params;
        const user_id = req.user.user_id;

        const session = await prisma.parkingSession.findFirst({
            where: {
                session_id: parseInt(session_id),
                user_id: user_id,
            },
        });

        if (!session) {
            return res.status(404).json({ message: 'Parking session not found' });
        }

        if (session.status === 'active') {
            await prisma.parkingSpace.update({
                where: { space_id: session.space_id },
                data: { is_occupied: false },
            });
        }

        await prisma.parkingSession.delete({
            where: { session_id: parseInt(session_id) },
        });

        res.status(200).json({ message: 'Parking session deleted successfully' });
    } catch (error) {
        console.error('Error deleting parking session:', error);
        res.status(500).json({ error: `Failed to delete parking session: ${error.message}` });
    }
};
