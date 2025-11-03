
import express from 'express';
import { authRoutes } from './auth.routes';
import { routNotFound, errorHandler } from '../handlers/exception.handler';
import { expRoutes } from './exp.routes';
import { categoryRoutes } from './category.routes';


const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/exp', expRoutes);  
router.use('/api/cat', categoryRoutes);


router.use(routNotFound);
router.use(errorHandler);


export default router;