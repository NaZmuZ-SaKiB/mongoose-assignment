import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

// GET
router.get('/', UserControllers.getAllUsers);
router.get(
  '/:userId/orders/total-price',
  UserControllers.getUsersTotalOrderPrice,
);
router.get('/:userId/orders', UserControllers.getAllOrdersOfUser);
router.get('/:userId', UserControllers.getUserByID);

// POST
router.post('/', UserControllers.createUser);

// PUT
router.put('/:userId/orders', UserControllers.createOrder);
router.put('/:userId', UserControllers.updateUser);

// DELETE
router.delete('/:userId', UserControllers.deleteUser);

export default router;
