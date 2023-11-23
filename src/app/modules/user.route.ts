import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.post('/', UserControllers.createUser);

export default router;
