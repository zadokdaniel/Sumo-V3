import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StaffService } from '../services/staff.service';
import { EVENTS } from '../constants';
import { Server } from 'socket.io';

export class StaffController {
  private staffService: StaffService;

  constructor(prisma: any) {
    this.staffService = new StaffService(prisma);
  }

  findByShiftId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staff = await this.staffService.findByShiftId(req.params.shiftId);
      res.json(staff);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staff = await this.staffService.create(req.params.shiftId, req.body);
      const io: Server = req.app.get('io');
      io.emit(EVENTS.STAFF_ADDED, { shiftId: req.params.shiftId, staff });
      res.status(StatusCodes.CREATED).json(staff);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staff = await this.staffService.update(req.params.id, req.body);
      const io: Server = req.app.get('io');
      io.emit(EVENTS.STAFF_UPDATED, staff);
      res.json(staff);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.staffService.delete(req.params.id);
      const io: Server = req.app.get('io');
      io.emit(EVENTS.STAFF_REMOVED, req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}