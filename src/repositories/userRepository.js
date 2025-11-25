import prisma from '../config/prismaClient.js';

export const createUser = async (userData) => {
    return await prisma.user.create({
        data: userData,
    });
}

export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
        include: {
            roles: {include: { role: true }}
        }
    });
}

export const createUserWithRole = async (userData) => {
    let userRole = await prisma.role.findFirst({
        where: { role_name: 'User' }
    });
    
    if (!userRole) {
        userRole = await prisma.role.create({
            data: { role_name: 'User', description: 'Regular user' }
        });
    }

    return await prisma.user.create({
        data: {
            ...userData,
            roles: {
                create: {
                    role_id: userRole.role_id
                }
            }
        },
        include: {
            roles: { include: { role: true } }
        }
    });
}