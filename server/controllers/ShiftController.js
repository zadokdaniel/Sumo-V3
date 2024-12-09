import { v4 as uuidv4 } from 'uuid';

export class ShiftController {
  constructor() {
    // Temporary in-memory storage
    this.shifts = new Map();
  }

  getAllShifts = (req, res) => {
    const shifts = Array.from(this.shifts.values());
    res.json({
      status: 'success',
      data: shifts
    });
  };

  getShiftById = (req, res) => {
    const shift = this.shifts.get(req.params.id);
    if (!shift) {
      return res.status(404).json({
        status: 'error',
        message: 'Shift not found'
      });
    }
    res.json({
      status: 'success',
      data: shift
    });
  };

  createShift = (req, res) => {
    const id = uuidv4();
    const shift = {
      id,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    this.shifts.set(id, shift);
    
    res.status(201).json({
      status: 'success',
      data: shift
    });
  };

  updateShift = (req, res) => {
    const id = req.params.id;
    const shift = this.shifts.get(id);
    
    if (!shift) {
      return res.status(404).json({
        status: 'error',
        message: 'Shift not found'
      });
    }

    const updatedShift = {
      ...shift,
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    this.shifts.set(id, updatedShift);

    res.json({
      status: 'success',
      data: updatedShift
    });
  };

  deleteShift = (req, res) => {
    const id = req.params.id;
    if (!this.shifts.has(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Shift not found'
      });
    }

    this.shifts.delete(id);
    res.status(204).send();
  };
}