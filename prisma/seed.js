import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.reservation.deleteMany();
  await prisma.parkingSession.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  const adminRole = await prisma.role.create({
    data: { role_name: 'Admin', description: 'Administrator with full access' },
  });

  const userRole = await prisma.role.create({
    data: { role_name: 'User', description: 'Regular parking user' },
  });

  console.log('Created Roles');

  const passwordHash = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@spotsense.com',
      password_encrypt: passwordHash,
      first_name: 'Super',
      last_name: 'Admin',
      roles: {
        create: { role_id: adminRole.role_id }
      }
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'student@uncc.edu',
      password_encrypt: passwordHash,
      first_name: 'Norm',
      last_name: 'Al',
      roles: {
        create: { role_id: userRole.role_id }
      }
    },
  });

  console.log('Created Users: Admin and Regular');

  await prisma.vehicle.create({
    data: {
      user_id: regularUser.user_id,
      license_plate: 'ABC-1234',
      make: 'Toyota',
      model: 'Camry'
    }
  });
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });