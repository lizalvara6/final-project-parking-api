import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepository.js';

export const registerUser = async (userData) => {
    const existingUser = await userRepo.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await userRepo.createUserWithRole({
        email: userData.email,
        password_encrypt: hashedPassword,
        first_name: userData.first_name,
        last_name: userData.last_name,
    });

    const { password_encrypt, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export const loginUser = async (email, password) => {
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_encrypt);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign(
        { userId: user.user_id, email: user.email, roles: user.roles.map(r => r.role.role_name) },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}
