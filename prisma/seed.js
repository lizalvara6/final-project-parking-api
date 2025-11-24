import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create roles
  let adminRole = await prisma.role.findFirst({
    where: { role_name: 'Admin' }
  });
  
  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        role_name: 'Admin',
        description: 'Administrator with full access'
      }
    });
  }

  let userRole = await prisma.role.findFirst({
    where: { role_name: 'User' }
  });
  
  if (!userRole) {
    userRole = await prisma.role.create({
      data: {
        role_name: 'User',
        description: 'Regular user'
      }
    });
  }

  console.log('Roles created:', { adminRole, userRole });

  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@parking.com' },
    update: {},
    create: {
      email: 'admin@parking.com',
      password_encrypt: adminPassword,
      first_name: 'Admin',
      last_name: 'User',
      roles: {
        create: {
          role_id: adminRole.role_id
        }
      }
    }
  });

  console.log('Admin user created:', adminUser.email);

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@parking.com' },
    update: {},
    create: {
      email: 'user@parking.com',
      password_encrypt: userPassword,
      first_name: 'Regular',
      last_name: 'User',
      roles: {
        create: {
          role_id: userRole.role_id
        }
      }
    }
  });

  console.log('Regular user created:', regularUser.email);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
