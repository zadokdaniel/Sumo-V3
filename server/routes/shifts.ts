import { Router } from 'express';
import { ShiftController } from '../controllers/shift.controller';
import { validate } from '../middleware/validate';
import { shiftSchema, updateShiftSchema } from '../schemas/shift';
import { prisma } from '../index';

const router = Router();
const shiftController = new ShiftController(prisma);

router.get('/', shiftController.findAll);
router.get('/:id', shiftController.findById);
router.post('/', validate(shiftSchema), shiftController.create);
router.put('/:id', validate(updateShiftSchema), shiftController.update);
router.delete('/:id', shiftController.delete);

export const shiftsRouter = router;