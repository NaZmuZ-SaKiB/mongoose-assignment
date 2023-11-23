import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getUserByID);
router.post('/', UserControllers.createUser);
router.put('/:userId', UserControllers.updateUser);

export default router;
