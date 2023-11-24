"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// GET
router.get('/', user_controller_1.UserControllers.getAllUsers);
router.get('/:userId/orders/total-price', user_controller_1.UserControllers.getUsersTotalOrderPrice);
router.get('/:userId/orders', user_controller_1.UserControllers.getAllOrdersOfUser);
router.get('/:userId', user_controller_1.UserControllers.getUserByID);
// POST
router.post('/', user_controller_1.UserControllers.createUser);
// PUT
router.put('/:userId/orders', user_controller_1.UserControllers.createOrder);
router.put('/:userId', user_controller_1.UserControllers.updateUser);
// DELETE
router.delete('/:userId', user_controller_1.UserControllers.deleteUser);
exports.default = router;
