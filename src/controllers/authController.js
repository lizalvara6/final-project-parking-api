import * as authService from '../services/authService.js';

export const signup = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body.email, req.body.password);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
