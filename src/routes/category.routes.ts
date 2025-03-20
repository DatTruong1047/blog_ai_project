import { Router } from 'express';

import { validate } from '@app/middlewares/validate.middleware';
import { GetListSchema, GetByIdSchema, CreateSchema, UpdateCateSchema } from '@app/validators/category.validator';

import { getCateById, getCate, createCate, updateCate } from '../controllers/category.controller';

const cateRoutes: Router = Router();

cateRoutes.get('/', validate(GetListSchema), getCate);
cateRoutes.get('/:id', validate(GetByIdSchema), getCateById);
cateRoutes.post('/', validate(CreateSchema), createCate);
cateRoutes.put('/:id', validate(UpdateCateSchema), updateCate);

export default cateRoutes;
