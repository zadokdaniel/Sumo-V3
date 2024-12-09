import express from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { ShiftController } from '../controllers/ShiftController.js';

export const shiftsRouter = express.Router();
const shiftController = new ShiftController();

// Get all shifts
shiftsRouter.get('/', shiftController.getAllShifts);

// Get shift by ID
shiftsRouter.get('/:id', 
  param('id').isUUID(),
  validate,
  shiftController.getShiftById
);

// Create new shift
shiftsRouter.post('/',
  [
    body('date').isISO8601(),
    body('shift').isIn(['AM', 'PM']),
    body('totalTips').isFloat({ min: 0 }),
    validate
  ],
  shiftController.createShift
);

// Update shift
shiftsRouter.put('/:id',
  [
    param('id').isUUID(),
    body('totalTips').optional().isFloat({ min: 0 }),
    validate
  ],
  shiftController.updateShift
);

// Delete shift
shiftsRouter.delete('/:id',
  param('id').isUUID(),
  validate,
  shiftController.deleteShift
);