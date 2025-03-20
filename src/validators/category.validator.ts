import { z } from 'zod';

export const GetListSchema = z.object({
  skip: z.number().int().min(0).optional().default(0),
  take: z.number().int().min(1).max(100).optional().default(10),
  name: z.string().optional(),
});

export const GetByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const FindByNameSchema = z.object({
  name: z.string().min(1),
});

export const CreateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
  }),
});

export const UpdateCateSchema = z.object({
  newName: z.string().min(1, 'Name is required'),
  params: z.object({
    id: z.string().min(1),
  }),
});
