import { Router } from 'express';
import { StaffController } from '../controllers/staff.controller';
import { validate } from '../middleware/validate';
import { staffSchema, updateStaffSchema } from '../schemas/staff';
import { prisma } from '../index';

const router = Router();
const staffController = new StaffController(prisma);

router.get('/shift/:shiftId', staffController.findByShiftId);
router.post('/shift/:shiftId', validate(staffSchema), staffController.create);
router.put('/:id', validate(updateStaffSchema), staffController.update);
router.delete('/:id', staffController.delete);

export const staffRouter = router;