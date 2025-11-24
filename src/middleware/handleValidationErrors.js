import { validationResult } from 'express-validator';

export const checkValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => `${err.path}: ${err.msg}`);
        return res.status(400).json({ 
            error: 'Validation failed', 
            details: errorMessages 
        });
    }
    next();
};