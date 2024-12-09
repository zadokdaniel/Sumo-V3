import { v4 as uuidv4 } from 'uuid';
import { validateShift } from '../utils/validation.js';

export class ShiftService {
  constructor() {
    this.shifts = new Map();
  }

  validateShift(data) {
    const errors = [];

    if (!data.date) {
      errors.push('Date is required');
    }

    if (!validateShift(data.shift)) {
      errors.push('Invalid shift type');
    }

    if (data.totalTips < 0) {
      errors.push('Total tips cannot be negative');
    }

    return errors;
  }

  getAll() {
    return Array.from(this.shifts.values());
  }

  getById(id) {
    return this.shifts.get(id);
  }

  create(data) {
    const id = uuidv4();
    const shift = {
      id,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    this.shifts.set(id, shift);
    return shift;
  }

  update(id, data) {
    const shift = this.shifts.get(id);
    if (!shift) return null;

    const updatedShift = {
      ...shift,
      ...data,
      updatedAt: new Date().toISOString()
    };

    this.shifts.set(id, updatedShift);
    return updatedShift;
  }

  delete(id) {
    return this.shifts.delete(id);
  }
}