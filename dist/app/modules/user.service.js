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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const postUserToDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_model_1.User.create(userData);
    return response;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_model_1.User.find({}).select({
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        _id: 0,
    });
    return response;
});
const getUserByIDFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(userId))
        return null;
    const response = yield user_model_1.User.userExists(userId);
    return response;
});
const updateUserInDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(userId))
        return null;
    const userExists = yield user_model_1.User.userExists(userId);
    if (!userExists)
        return null;
    const response = yield user_model_1.User.findOneAndUpdate({ userId }, { $set: userData }, { new: true, runValidators: true }).select({
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
        _id: 0,
    });
    return response;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(userId))
        return null;
    const user = yield user_model_1.User.userExists(userId);
    if (!user)
        return null;
    const response = yield user_model_1.User.deleteOne({ userId });
    return response;
});
const createOrderInDB = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(userId))
        return null;
    const userExists = yield user_model_1.User.userExists(userId);
    if (!userExists)
        return null;
    const response = yield user_model_1.User.findOneAndUpdate({ userId }, { $push: { orders: orderData } }, { new: true, runValidators: true });
    return response;
});
const getAllOrdersOfUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(userId))
        return null;
    const userExists = yield user_model_1.User.userExists(userId);
    if (!userExists)
        return null;
    const response = yield user_model_1.User.findOne({ userId }).select({
        'orders.productName': 1,
        'orders.price': 1,
        'orders.quantity': 1,
        _id: 0,
    });
    return response;
});
exports.UserServices = {
    postUserToDB,
    getAllUsersFromDB,
    getUserByIDFromDB,
    updateUserInDB,
    deleteUserFromDB,
    createOrderInDB,
    getAllOrdersOfUserFromDB,
};
