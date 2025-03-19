import { Post } from '@prisma/client';

import { prisma } from '../app';

interface GetListPostArgs {
  skip?: number;
  take?: number;
  style?: string | undefined;
}

const getPostById = async (id: number): Promise<Post | null> => {
  try {
    const post = await prisma.post.findFirstOrThrow({
      where: { id },
    });
    return post;
  } catch (error) {
    console.error('Error get post by id:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

const findPostInDB = async (url: string, style: string): Promise<Post | null> => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        url: url,
        style: style,
      },
    });
    return post;
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
// Hàm lấy danh sách bài Post, co phân trang và tìm theo style
const getListPost = async (argv: GetListPostArgs): Promise<Post[] | null> => {
  try {
    const skip = argv.skip || 0;
    const take = argv.take || 5;
    const style = argv.style;

    const whereClause = style
      ? {
          style: {
            contains: style,
            mode: 'insensitive',
          },
        }
      : {};

    const paginatedPosts = await prisma.post.findMany({
      skip,
      take,
      // where: whereClause,
    });
    return paginatedPosts;
  } catch (error) {
    console.error('Error getting paginated posts:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
