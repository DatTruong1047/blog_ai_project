import { PrismaClient } from '@prisma/client';

import { CategoryResponseDTO } from '@app/models';

const prisma = new PrismaClient();

interface GetListCateArgs {
  skip?: number;
  take?: number;
  name?: string | undefined;
}

export const getById = async (id: number): Promise<CategoryResponseDTO | null> => {
  try {
    const category = await prisma.categories.findFirst({
      where: { id },
    });

    return category;
  } catch (error) {
    console.error('Get cate by id error:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

// Hàm lấy danh sách bài Post, co phân trang và tìm theo style
export const getList = async ({
  skip = 0,
  take = 10,
  name,
}: GetListCateArgs): Promise<CategoryResponseDTO[] | null> => {
  try {
    const paginatedCates = await prisma.categories.findMany({
      skip,
      take,
      where: name
        ? {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          }
        : {},
    });
    const response: CategoryResponseDTO[] = paginatedCates.map((cate) => ({
      ...cate,
    }));

    return response;
  } catch (error) {
    console.error('Get cate error', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const findByName = async (name: string) => {
  try {
    const cate = await prisma.categories.findUnique({
      where: { name },
    });

    return cate;
  } catch (error) {
    console.error('Find cate error:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const isExist = async (id: number) => {
  try {
    const cate = await prisma.categories.findFirstOrThrow({
      where: { id },
    });

    return cate;
  } catch (error) {
    console.error('Find cate error:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const create = async (name: string): Promise<CategoryResponseDTO> => {
  try {
    const newCategory = await prisma.categories.create({
      data: { name },
    });

    return newCategory;
  } catch (error) {
    console.error('Create cate error:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const update = async (newName: string, id: number) => {
  try {
    const updateCate = await prisma.categories.update({
      where: {
        id,
      },
      data: { name: newName },
    });
    return updateCate;
  } catch (error) {
    console.error('Update cate error:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
