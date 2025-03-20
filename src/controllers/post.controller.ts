import { Response, Request } from 'express';

import { getById, getList } from '@app/services/post.service';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const style = req.query.style as string | undefined;
    const skip = +req.query.page | 0;
    const take = +req.query.pageSize | 5;

    const posts = await getList({ skip, take, style });

    res.status(200).json({
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    if (!id) {
      res.status(400).json({ message: 'ID is required' });
    }

    const post = await getById(id);

    if (!post) {
      res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
