import { v4 as uuidv4 } from 'uuid';
import { validateTimeRange, calculateDuration } from '../utils/time.js';
import { validateStaffRole } from '../utils/validation.js';

export class StaffService {
  constructor() {
    this.staff = new Map();
  }

  validateStaffMember(data) {
    const errors = [];

    if (!data.name?.trim()) {
      errors.push('Name is required');
    }

    if (!validateStaffRole(data.role)) {
      errors.push('Invalid role');
    }

    if (!validateTimeRange(data.startTime, data.endTime)) {
      errors.push('Invalid time range');
    }

    if (data.breakDuration < 0) {
      errors.push('Break duration cannot be negative');
    }

    if (data.expenses < 0) {
      errors.push('Expenses cannot be negative');
    }

    return errors;
  }

  calculateEffectiveHours(staffMember) {
    const totalHours = calculateDuration(staffMember.startTime, staffMember.endTime);
    const breakHours = staffMember.breakDuration / 60;
    return Math.max(0, totalHours - breakHours);
  }

  getAll() {
    return Array.from(this.staff.values());
  }

  getById(id) {
    return this.staff.get(id);
  }

  create(data) {
    const id = uuidv4();
    const staffMember = {
      id,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    this.staff.set(id, staffMember);
    return staffMember;
  }

  update(id, data) {
    const staffMember = this.staff.get(id);
    if (!staffMember) return null;

    const updatedStaffMember = {
      ...staffMember,
      ...data,
      updatedAt: new Date().toISOString()
    };

    this.staff.set(id, updatedStaffMember);
    return updatedStaffMember;
  }

  delete(id) {
    return this.staff.delete(id);
  }
}