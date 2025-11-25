import { body, param } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';
import * as vehicleService from '../services/vehicleService.js';
import * as parkingLotService from '../services/parkingLotService.js';
import * as parkingSpaceService from '../services/parkingSpaceService.js';

export const validateSignup = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
  body('first_name').notEmpty().withMessage('First name required'),
  body('last_name').notEmpty().withMessage('Last name required'),
  checkValidationResults,
];

export const validateLogin = [
  body('email').notEmpty().withMessage('Email required'),
  body('password').notEmpty().withMessage('Password required'),
  checkValidationResults,
];

export const validateVehicleId = [
  param('id').isInt({ gt: 0 }).withMessage('ID must be positive int').bail()
    .custom(async (value) => {
      try {
        await vehicleService.editVehicle(value, {}, 0, true); 
      } catch (e) {
        if (e.message === 'Vehicle not found') throw new Error(`Vehicle ${value} not found`);
      }
      return true;
    }),
  checkValidationResults,
];

export const validateVehicleCreate = [
  body('license_plate').notEmpty().trim().toUpperCase(),
  body('make').notEmpty().trim(),
  body('model').notEmpty().trim(),
  checkValidationResults,
];

export const validateVehicleUpdate = [
  body('license_plate').optional().trim().toUpperCase(),
  body('make').optional().trim(),
  body('model').optional().trim(),
  checkValidationResults,
];

export const validateLotId = [
  param('id').isInt({ gt: 0 }).withMessage('ID must be positive int').bail()
    .custom(async (value) => {
      try {
        await parkingLotService.getLotById(value);
      } catch (e) {
        throw new Error(`Lot ${value} not found`);
      }
      return true;
    }),
  checkValidationResults,
];

export const validateLotCreate = [
  body('name').notEmpty().trim(),
  body('address').notEmpty().trim(),
  body('city').notEmpty().trim(),
  body('hourly_rate').isFloat({ gt: 0 }),
  body('total_capacity').isInt({ gt: 0 }),
  checkValidationResults,
];

export const validateLotUpdate = [
  body('name').optional().trim(),
  body('address').optional().trim(),
  body('city').optional().trim(),
  body('hourly_rate').optional().isFloat({ gt: 0 }),
  body('total_capacity').optional().isInt({ gt: 0 }),
  checkValidationResults,
];

export const validateSpaceCreate = [
  body('lot_id').isInt({ gt: 0 }).bail()
    .custom(async (value) => {
      try {
        await parkingLotService.getLotById(value);
      } catch (e) {
        throw new Error(`Lot ${value} does not exist`);
      }
      return true;
    }),
  body('space_type').notEmpty().isIn(['Compact', 'Standard', 'Handicap', 'Motorcycle']),
  checkValidationResults,
];

export const validateSpaceStatus = [
  param('id').optional().isInt({ gt: 0 }),
  param('space_id').optional().isInt({ gt: 0 }),
  param('lot_id').optional().isInt({ gt: 0 }),
  body('is_occupied').isBoolean(),
  checkValidationResults,
];