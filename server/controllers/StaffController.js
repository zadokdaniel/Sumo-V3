import { v4 as uuidv4 } from 'uuid';

export class StaffController {
  constructor() {
    // Temporary in-memory storage
    this.staff = new Map();
  }

  getAllStaff = (req, res) => {
    const staff = Array.from(this.staff.values());
    res.json({
      status: 'success',
      data: staff
    });
  };

  getStaffById = (req, res) => {
    const staffMember = this.staff.get(req.params.id);
    if (!staffMember) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found'
      });
    }
    res.json({
      status: 'success',
      data: staffMember
    });
  };

  createStaff = (req, res) => {
    const id = uuidv4();
    const staffMember = {
      id,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    this.staff.set(id, staffMember);
    
    res.status(201).json({
      status: 'success',
      data: staffMember
    });
  };

  updateStaff = (req, res) => {
    const id = req.params.id;
    const staffMember = this.staff.get(id);
    
    if (!staffMember) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found'
      });
    }

    const updatedStaffMember = {
      ...staffMember,
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    this.staff.set(id, updatedStaffMember);

    res.json({
      status: 'success',
      data: updatedStaffMember
    });
  };

  deleteStaff = (req, res) => {
    const id = req.params.id;
    if (!this.staff.has(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found'
      });
    }

    this.staff.delete(id);
    res.status(204).send();
  };
}