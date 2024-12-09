import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ShiftService } from '../services/shift.service';
import { EVENTS } from '../constants';
import { Server } from 'socket.io';

export class ShiftController {
  private shiftService: ShiftService;

  constructor(prisma: any) {
    this.shiftService = new ShiftService(prisma);
  }

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shifts = await this.shiftService.findAll();
      res.json(shifts);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shift = await this.shiftService.findById(req.params.id);
      if (!shift) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Shift not found'
        });
      }
      res.json(shift);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shift = await this.shiftService.create(req.body);
      const io: Server = req.app.get('io');
      io.emit(EVENTS.SHIFT_CREATED, shift);
      res.status(StatusCodes.CREATED).json(shift);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shift = await this.shiftService.update(req.params.id, req.body);
      const io: Server = req.app.get('io');
      io.emit(EVENTS.SHIFT_UPDATED, shift);
      res.json(shift);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.shiftService.delete(req.params.id);
      const io: Server = req.app.get('io');
      io.emit(EVENTS.SHIFT_DELETED, req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}