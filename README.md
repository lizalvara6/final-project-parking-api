

This repository provides the **folder structure** for your team’s final project. All implementation is left to students.

# The SpotSense Parking System API

A complete backend REST API for managing users, vehicles, parking lots, parking spaces, reservations, and parking sessions. Built with Node.js, Express, Prisma (PostgreSQL), and JWT authentication.

## Features

- **User Authentication** - JWT-based signup/login with bcrypt password hashing
- **Vehicle Management** - Register and manage customer vehicles
- **Parking Lot Management** - Browse parking lots and their details
- **Parking Space Management** - Check space availability and assignments
- **Parking Session Tracking** - Create sessions, track entry/exit times, calculate costs
- **Role-Based Authorization** - User and admin roles with different permissions

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **API Documentation:** Swagger UI
- **Validation:** express-validator

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Git
- npm or yarn


## Project Setup

### 1. **Clone the repository**
```bash
git clone https://github.com/lizalvara6 final -project -parking-api.git
cd final-project-parking-api
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/parking_db"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

### 4. **Set up the database**
```bash
npx prisma migrate dev

npx prisma db seed
```

### 5. **Generate Prisma Client**
```bash
npx prisma generate
```


## Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

**View API Documentation:**
Navigate to `http://localhost:3000/api-docs` (when Swagger is configured)

## Project Structure

```
src/
├── controllers/      # Handle HTTP requests/responses
├── services/        # Business logic layer
├── repositories/    # Database operations (Prisma)
├── routes/          # API route definitions
├── middleware/      # Authentication and validation
└── server.js        # Application entry point

prisma/
├── schema.prisma    # Database schema
├── migrations/      # Database migrations
└── seed.js          # Database seeding
```

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Vehicles (Protected)
- `POST /api/vehicles` - Add a new vehicle
- `GET /api/vehicles` - Get user's vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Parking Lots (Public read, Admin write)

- `GET /api/parking-lots`	-Get all parking lots
- `POST /api/parking-lots`	-Create a new parking lot
- `GET /api/parking-lots/:id` -Get parking lot by ID
- `PUT	/api/parking-lots/:id`	-Update parking lot
- `DELETE /api/parking-lots/:id` -Delete a parking lot

### Parking Spaces
- `POST /api/vehicles` - Add a new vehicle
- `GET /api/vehicles` - Get user's vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Parking Sessions (Protected)
- `POST /api/parking-sessions` - Start a parking session
- `GET /api/parking-sessions` - Get user's sessions
- `GET /api/parking-sessions/active` - Get active sessions
- `GET /api/parking-sessions/:id` - Get session by ID
- `PATCH /api/parking-sessions/:id/end` - End session and calculate cost
- `DELETE /api/parking-sessions/:id` - Delete session

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

**Getting a token:**
1. Register or login via `/api/auth/register` or `/api/auth/login`
2. Include the returned token in subsequent requests

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `PORT` | Server port | `3000` |

## Database Schema

The application uses the following main entities:
- **User** - User accounts with authentication
- **Role** - User roles (Admin, User)
- **Vehicle** - Registered vehicles
- **ParkingLot** - Parking facility information
- **ParkingSpace** - Individual parking spaces
- **ParkingSession** - Active/completed parking sessions
- **Reservation** - Future parking reservations

## Development

**View database in Prisma Studio:**
```bash
npx prisma studio
```

**Run migrations:**
```bash
npx prisma migrate dev --name description-of-changes
```

**Reset database:**
```bash
npx prisma migrate reset
```

## Postman Collection
Postman Collection Link: 
Postman Workspace - SpotSense API
https://lizalvara6-1368114.postman.co/workspace/Final-Project---Parking-API~832b9ac5-df00-4e8c-b41e-278059a7d47b/collection/50326688-c93892df-0af7-4bcd-844d-fce6c3c637ea?action=share&creator=50322869


## Swagger API Docs
Deployed Swagger Documentation URL: 
https://final-project-parking-api.onrender.com/api-docs/


### 3. Verify Deployment
Deployed API URL Render:
https://final-project-parking-api.onrender.com/

## Common Development Commands

| Command                           
`npm run dev` 
`npm run seed`             
`npx prisma studio` 
`npx prisma migrate dev` 
`npm start`    
`npx prisma migrate reset`|


## Example Test Users

**Admin User**
- email: admin@spotsense.com  
- password: passwork123 

**Regular User**
- email: student@example.com  
- password: password123

