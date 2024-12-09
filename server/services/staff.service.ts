import { PrismaClient, Staff } from '@prisma/client';
import { CreateStaffInput, UpdateStaffInput } from '../schemas/staff';
import { ERROR_MESSAGES } from '../constants';

export class StaffService {
  constructor(private prisma: PrismaClient) {}

  async create(shiftId: string, data: CreateStaffInput): Promise<Staff> {
    const shift = await this.prisma.shift.findUnique({ where: { id: shiftId } });
    if (!shift) throw new Error(ERROR_MESSAGES.NOT_FOUND);

    return this.prisma.staff.create({
      data: {
        ...data,
        shiftId,
        startTime: data.startTime ? new Date(data.startTime) : null,
        endTime: data.endTime ? new Date(data.endTime) : null,
      },
    });
  }

  async update(id: string, data: UpdateStaffInput): Promise<Staff> {
    const staff = await this.prisma.staff.findUnique({ where: { id } });
    if (!staff) throw new Error(ERROR_MESSAGES.NOT_FOUND);

    return this.prisma.staff.update({
      where: { id },
      data: {
        ...data,
        ...(data.startTime && { startTime: new Date(data.startTime) }),
        ...(data.endTime && { endTime: new Date(data.endTime) }),
      },
    });
  }

  async delete(id: string): Promise<void> {
    const staff = await this.prisma.staff.findUnique({ where: { id } });
    if (!staff) throw new Error(ERROR_MESSAGES.NOT_FOUND);

    await this.prisma.staff.delete({ where: { id } });
  }

  async findByShiftId(shiftId: string): Promise<Staff[]> {
    return this.prisma.staff.findMany({
      where: { shiftId },
      orderBy: { createdAt: 'asc' },
    });
  }
}