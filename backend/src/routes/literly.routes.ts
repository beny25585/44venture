import { Router } from 'express';
import {
  proxyGenerateTrendContent,
  proxySearch,
  getTodayContent,
} from '../controllers/literly.controller.js';

export const literlyRouter = Router();

literlyRouter.get('/generate-trend-content', proxyGenerateTrendContent);
literlyRouter.get('/search', proxySearch);
literlyRouter.get('/today-content', getTodayContent);
