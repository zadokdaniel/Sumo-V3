import { PrismaClient, Shift } from '@prisma/client';
import { CreateShiftInput, UpdateShiftInput } from '../schemas/shift';
import { ERROR_MESSAGES } from '../constants';

export class ShiftService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateShiftInput): Promise<Shift> {
    return this.prisma.shift.create({
      data: {
        date: new Date(data.date),
        timePeriod: data.timePeriod,
        netTips: data.netTips,
        rules: {
          create: {
            intervals: data.rules.intervals,
            multiplierValue: data.rules.multiplierValue,
            multiplierEnabled: data.rules.multiplierEnabled,
            provisionValue: data.rules.provisionValue,
            provisionThreshold: data.rules.provisionThreshold,
            provisionEnabled: data.rules.provisionEnabled,
          },
        },
      },
      include: {
        rules: true,
        staff: true,
      },
    });
  }

  async update(id: string, data: UpdateShiftInput): Promise<Shift> {
    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new Error(ERROR_MESSAGES.NOT_FOUND);

    return this.prisma.shift.update({
      where: { id },
      data: {
        ...(data.date && { date: new Date(data.date) }),
        ...(data.timePeriod && { timePeriod: data.timePeriod }),
        ...(data.netTips !== undefined && { netTips: data.netTips }),
        ...(data.rules && {
          rules: {
            update: {
              ...data.rules,
            },
          },
        }),
      },
      include: {
        rules: true,
        staff: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new Error(ERROR_MESSAGES.NOT_FOUND);

    await this.prisma.shift.delete({ where: { id } });
  }

  async findById(id: string): Promise<Shift | null> {
    return this.prisma.shift.findUnique({
      where: { id },
      include: {
        rules: true,
        staff: true,
      },
    });
  }

  async findAll(): Promise<Shift[]> {
    return this.prisma.shift.findMany({
      include: {
        rules: true,
        staff: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}