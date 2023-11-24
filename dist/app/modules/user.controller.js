"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const zod_validation_error_1 = require("zod-validation-error");
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = req.body;
        const zodParse = user_validation_1.userValidationSchema.safeParse(user);
        if (!zodParse.success) {
            const err = (0, zod_validation_error_1.fromZodError)(zodParse.error);
            res.status(403).json({
                success: false,
                message: 'Validation Error!',
                error: {
                    code: 403,
                    description: `${err.details[0].path} : ${err.details[0].message}`,
                },
            });
        }
        else {
            const response = yield user_service_1.UserServices.postUserToDB(zodParse.data);
            res.status(200).json({
                success: true,
                message: 'User created successfully!',
                data: response,
            });
        }
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(500).json({
                success: false,
                message: `${Object.keys(error.keyPattern)[0]} must be unique.`,
                error: {
                    code: 500,
                    description: `${Object.keys(error.keyPattern)[0]} : ${Object.values(error.keyValue)[0]} already exists.`,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error.',
                error: {
                    code: 500,
                    description: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'There was an error creating new user.',
                },
            });
        }
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const response = yield user_service_1.UserServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: response,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            error: {
                code: 500,
                description: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'There was an error fetching users.',
            },
        });
    }
});
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const userId = (_c = req.params) === null || _c === void 0 ? void 0 : _c.userId;
        const response = yield user_service_1.UserServices.getUserByIDFromDB(Number(userId));
        if (response) {
            response === null || response === void 0 ? true : delete response._doc.orders;
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: response,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            error: {
                code: 500,
                description: (_d = error === null || error === void 0 ? void 0 : error.message) !== null && _d !== void 0 ? _d : 'There was an error fetching user.',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const userId = (_e = req.params) === null || _e === void 0 ? void 0 : _e.userId;
        const userData = req.body;
        const zodParse = user_validation_1.userUpdateValidationSchema.safeParse(userData);
        if (!zodParse.success) {
            const err = (0, zod_validation_error_1.fromZodError)(zodParse.error);
            res.status(403).json({
                success: false,
                message: 'Validation Error!',
                error: {
                    code: 403,
                    description: `${err.details[0].path} : ${err.details[0].message}`,
                },
            });
        }
        else {
            const response = yield user_service_1.UserServices.updateUserInDB(Number(userId), zodParse.data);
            if (response) {
                res.status(200).json({
                    success: true,
                    message: 'User updated successfully!',
                    data: response,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                    error: {
                        code: 404,
                        description: 'User not found!',
                    },
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            error: {
                code: 500,
                description: (_f = error === null || error === void 0 ? void 0 : error.message) !== null && _f !== void 0 ? _f : 'There was an error updating user.',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        const userId = (_g = req.params) === null || _g === void 0 ? void 0 : _g.userId;
        const response = yield user_service_1.UserServices.deleteUserFromDB(Number(userId));
        if ((response === null || response === void 0 ? void 0 : response.deletedCount) === 1) {
            res.json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            error: {
                code: 500,
                description: (_h = error === null || error === void 0 ? void 0 : error.message) !== null && _h !== void 0 ? _h : 'There was an error deleting the user.',
            },
        });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        const userId = (_j = req.params) === null || _j === void 0 ? void 0 : _j.userId;
        const orderData = req.body;
        const zodParse = user_validation_1.orderValidationSchema.safeParse(orderData);
        if (!zodParse.success) {
            const err = (0, zod_validation_error_1.fromZodError)(zodParse.error);
            res.status(403).json({
                success: false,
                message: 'Validation Error!',
                error: {
                    code: 403,
                    description: `${err.details[0].path} : ${err.details[0].message}`,
                },
            });
        }
        else {
            const response = yield user_service_1.UserServices.createOrderInDB(Number(userId), zodParse.data);
            if (response) {
                res.status(200).json({
                    success: true,
                    message: 'Order created successfully!',
                    data: null,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                    error: {
                        code: 404,
                        description: 'User not found!',
                    },
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            error: {
                code: 500,
                description: (_k = error === null || error === void 0 ? void 0 : error.message) !== null && _k !== void 0 ? _k : 'There was an error creating order.',
            },
        });
    }
});
const getAllOrdersOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    try {
        const userId = (_l = req.params) === null || _l === void 0 ? void 0 : _l.userId;
        const response = yield user_service_1.UserServices.getAllOrdersOfUserFromDB(Number(userId));
        if (response) {
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: response,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            error: {
                code: 500,
                description: (_m = error === null || error === void 0 ? void 0 : error.message) !== null && _m !== void 0 ? _m : "There was an error fetching user's orders.",
            },
        });
    }
});
const getUsersTotalOrderPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    try {
        const userId = req.params.userId;
        const response = yield user_service_1.UserServices.getAllOrdersOfUserFromDB(Number(userId));
        if (response) {
            const totalPrice = (_o = response === null || response === void 0 ? void 0 : response.orders) === null || _o === void 0 ? void 0 : _o.reduce((prev, next) => prev + next.price * next.quantity, 0);
            res.status(200).json({
                success: true,
                message: 'Total price calculated successfully!',
                data: { totalPrice },
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            error: {
                code: 500,
                description: (_p = error === null || error === void 0 ? void 0 : error.message) !== null && _p !== void 0 ? _p : 'There was an error calculating total price.',
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
    createOrder,
    getAllOrdersOfUser,
    getUsersTotalOrderPrice,
};
