import express from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { StaffController } from '../controllers/StaffController.js';

export const staffRouter = express.Router();
const staffController = new StaffController();

// Get all staff members
staffRouter.get('/', staffController.getAllStaff);

// Get staff member by ID
staffRouter.get('/:id',
  param('id').isUUID(),
  validate,
  staffController.getStaffById
);

// Create new staff member
staffRouter.post('/',
  [
    body('name').trim().notEmpty(),
    body('role').isIn(['waiter-100', 'waiter-80', 'bartender', 'trainee']),
    body('startTime').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('endTime').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('breakDuration').isInt({ min: 0 }),
    body('expenses').isFloat({ min: 0 }),
    validate
  ],
  staffController.createStaff
);

// Update staff member
staffRouter.put('/:id',
  [
    param('id').isUUID(),
    body('name').optional().trim().notEmpty(),
    body('role').optional().isIn(['waiter-100', 'waiter-80', 'bartender', 'trainee']),
    body('startTime').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('endTime').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('breakDuration').optional().isInt({ min: 0 }),
    body('expenses').optional().isFloat({ min: 0 }),
    validate
  ],
  staffController.updateStaff
);

// Delete staff member
staffRouter.delete('/:id',
  param('id').isUUID(),
  validate,
  staffController.deleteStaff
);