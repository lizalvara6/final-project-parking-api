import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up database...');
  
  await prisma.reservation.deleteMany();
  await prisma.parkingSession.deleteMany();
  
  await prisma.vehicle.deleteMany();
  
  await prisma.userRole.deleteMany();

  await prisma.parkingSpace.deleteMany();

  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.parkingLot.deleteMany();

  console.log('Database cleaned.');

  // 2. Create Roles
  const adminRole = await prisma.role.create({
    data: { role_name: 'Admin', description: 'Administrator with full access' },
  });

  const userRole = await prisma.role.create({
    data: { role_name: 'User', description: 'Regular parking user' },
  });

  console.log('Created Roles');

  // 3. Hash Passwords (THIS WAS THE ISSUE BEFORE)
  // We define one variable 'passwordHash' and use it for both users
  const passwordHash = await bcrypt.hash('password123', 10);

  // 4. Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@spotsense.com',
      password_encrypt: passwordHash, // Using the variable we just defined
      first_name: 'Super',
      last_name: 'Admin',
      roles: {
        create: { role_id: adminRole.role_id }
      }
    },
  });

  // 5. Create Regular User
  const regularUser = await prisma.user.create({
    data: {
      email: 'student@uncc.edu',
      password_encrypt: passwordHash, // Using the same variable
      first_name: 'Norm',
      last_name: 'Al',
      roles: {
        create: { role_id: userRole.role_id }
      }
    },
  });

  console.log('Created Users: Admin and Regular');

  // 6. Create a Vehicle for the Regular User
  await prisma.vehicle.create({
    data: {
      user_id: regularUser.user_id,
      license_plate: 'ABC-1234',
      make: 'Toyota',
      model: 'Camry'
    }
  });

  // 7. Create a Sample Parking Lot
  const lot = await prisma.parkingLot.create({
    data: {
      name: 'Main Campus Deck',
      address: '9201 University City Blvd',
      city: 'Charlotte',
      hourly_rate: 5.00,
      total_capacity: 100
    }
  });

  // 8. Add a space to that lot
  await prisma.parkingSpace.create({
    data: {
      lot_id: lot.lot_id,
      space_type: 'Standard',
      is_occupied: false
    }
  });
  
  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
