import { PrismaClient } from '@prisma/client';

import { PostResponseDTO } from '../models';

const prisma = new PrismaClient();

interface GetListPostArgs {
  skip?: number;
  take?: number;
  style?: string | undefined;
}

export const getById = async (id: number): Promise<PostResponseDTO | null> => {
  try {
    const post = await prisma.posts.findFirst({
      where: { id },
      include: { Categories: true },
    });

    const response: PostResponseDTO = {
      ...post,
      categoryName: post.Categories?.name || '',
    };
    return response;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const getList = async ({ skip = 0, take = 10, style }: GetListPostArgs): Promise<PostResponseDTO[] | null> => {
  try {
    const paginatedPosts = await prisma.posts.findMany({
      skip,
      take,
      where: style
        ? {
            style: {
              contains: style,
              mode: 'insensitive',
            },
          }
        : {},
      include: { Categories: true },
    });

    const response: PostResponseDTO[] = paginatedPosts.map((post) => ({
      ...post,
      categoryName: post.Categories?.name || '',
    }));

    return response;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
