import { PrismaClient } from '@prisma/client';

import { PostResponseDTO, PostCreateDTO } from '../models';

const prisma = new PrismaClient();

interface GetListPostArgs {
  skip?: number;
  take?: number;
  style?: string | undefined;
}

export const getById = async (id: number): Promise<PostResponseDTO | null> => {
  try {
    const post = await prisma.post.findFirstOrThrow({
      where: { id },
      include: { category: true },
    });

    const response: PostResponseDTO = {
      ...post,
      categoryName: post.category?.name || '',
    };

    return response;
  } catch (error) {
    console.error('Error get post by id:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const find = async (url: string, style: string): Promise<PostResponseDTO | null> => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        url: url,
        style: style,
      },
      include: { category: true },
    });

    if (!post) {
      return null;
    }

    const response: PostResponseDTO = {
      ...post,
      categoryName: post.category?.name || '',
    };

    return response;
  } catch (error) {
    console.error('Error find post:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

// Hàm lấy danh sách bài Post, co phân trang và tìm theo style
export const getList = async ({ skip = 0, take = 10, style }: GetListPostArgs): Promise<PostResponseDTO[] | null> => {
  try {
    const paginatedPosts = await prisma.post.findMany({
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
      include: { category: true },
    });
    const response: PostResponseDTO[] = paginatedPosts.map((post) => ({
      ...post,
      categoryName: post.category?.name || '',
    }));

    return response;
  } catch (error) {
    console.error('Error getting paginated posts:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const create = async (createDTO: PostCreateDTO): Promise<PostResponseDTO> => {
  try {
    const { title, content, style, url, categoryName } = createDTO;
    let categoryId: number | null = null;
    const existingCategory = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await prisma.category.create({
        data: { name: categoryName },
      });
      categoryId = newCategory.id;
    }

    const post = await prisma.post.create({
      data: { title, content, style, url, categoryId },
    });
    const response: PostResponseDTO = {
      ...post,
      categoryName,
    };

    return response;
  } catch (error) {
    console.error('Error getting paginated posts:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
