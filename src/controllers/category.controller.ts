import { Response, Request } from 'express';

import { getById, getList, findByName, create, update, isExist } from '@app/services/category.service';

export const getCate = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedQuery = {
      skip: parseInt(req.query.skip as string) || 0,
      take: parseInt(req.query.take as string) || 10,
      name: req.query.name as string | undefined,
    };
    const cates = await getList(parsedQuery);

    res.status(200).json({
      data: cates,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getCateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    const cate = await getById(id);

    if (!cate) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.status(200).json({
      data: cate,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const createCate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    console.log(req.body);

    const isUsedName = await findByName(name);
    if (isUsedName) {
      res.status(429).json({ message: 'This name has been used' });
      return;
    }

    const newCate = await create(name);

    res.status(201).json({
      data: newCate,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateCate = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    const { newName } = req.body;
    const isExistCate = await isExist(id);

    if (!isExistCate) {
      res.status(404).json({ message: 'Catgory not found' });
      return;
    }

    const isUsedName = await findByName(newName);
    if (isUsedName) {
      res.status(429).json({ message: 'This name has been used' });
      return;
    }

    const updateCate = await update(newName, id);

    res.status(201).json({
      data: updateCate,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
