import { Router } from 'express';
import { getHotPosts } from '../controllers/reddit.controller.js';

export const redditRouter = Router();

redditRouter.get('/hot', getHotPosts);
