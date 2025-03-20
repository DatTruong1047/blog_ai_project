import z from 'zod';

export const PostCreateSchema = z.object({
  title: z.string().min(1, { message: 'Title must be at least 1 character. ' }),
  content: z.string().min(1, { message: 'Content must be at least 1 character.' }),
  style: z.string().min(1, { message: 'Style must be at least 1 character.' }),
  url: z.string().url().optional(),
  categoryName: z.string().min(1, { message: 'Category name must be at least 1 character.' }),
});
export type PostCreateDTO = z.infer<typeof PostCreateSchema>;

export const PostResponseSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: 'Title must be at least 1 character. ' }),
  content: z.string().min(1, { message: 'Content must be at least 1 character.' }),
  style: z.string().min(1, { message: 'Style must be at least 1 character.' }),
  url: z.string().url().optional(),
  categoryName: z.string().min(1, { message: 'Category name must be at least 1 character.' }),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type PostResponseDTO = z.infer<typeof PostResponseSchema>;

export const validationCreateInput = (input: PostCreateDTO) => {
  const result = PostCreateSchema.safeParse(input);

  if (result.success) {
    return result.data;
  } else {
    console.log('Validation error', result.error);
    return null;
  }
};
