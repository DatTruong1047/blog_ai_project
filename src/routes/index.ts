import { Router } from 'express';

import cateRoutes from './category.routes';
import postRoutes from './post.routes';

const rootRouter = Router();

rootRouter.use('/posts', postRoutes);
rootRouter.use('/categories', cateRoutes);

export default rootRouter;
