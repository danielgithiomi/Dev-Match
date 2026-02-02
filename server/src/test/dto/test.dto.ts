import { Prisma } from '@prisma/client';

export type TestDto = Pick<Prisma.TestCreateInput, 'name' | 'description'>;
