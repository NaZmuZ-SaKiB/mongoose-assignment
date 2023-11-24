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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const zod_validation_error_1 = require("zod-validation-error");
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const zodParse = user_validation_1.userValidationSchema.safeParse(user);
        if (!zodParse.success) {
            const err = (0, zod_validation_error_1.fromZodError)(zodParse.error);
            res.status(500).json({
                success: false,
                message: `${err.details[0].path} : ${err.details[0].message}`,
                error: 'Validation Error!',
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
        res.status(500).json({
            success: false,
            message: 'Failed to create user!',
            error,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const zodParse = user_validation_1.userUpdateValidationSchema.safeParse(userData);
        if (!zodParse.success) {
            const err = (0, zod_validation_error_1.fromZodError)(zodParse.error);
            res.status(500).json({
                success: false,
                message: `${err.details[0].path} : ${err.details[0].message}`,
                error: 'Validation Error!',
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
            message: 'Could not update user!',
            error,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            message: 'Failed to get users!',
            error,
        });
    }
});
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const response = yield user_service_1.UserServices.getUserByIDFromDB(Number(userId));
        if (response) {
            const _a = response === null || response === void 0 ? void 0 : response._doc, { orders, password, _id } = _a, data = __rest(_a, ["orders", "password", "_id"]);
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: data,
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
            message: 'User not found',
            error,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
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
            message: 'Could not delete User',
            error,
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
};
