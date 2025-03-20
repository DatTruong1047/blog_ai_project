import { Router } from 'express';

import { getPostById, getPosts } from '../controllers/post.controller';

const postRoutes: Router = Router();

postRoutes.get('/', getPosts);
postRoutes.get('/:id', getPostById);

export default postRoutes;
