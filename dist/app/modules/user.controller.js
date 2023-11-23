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
    try {
        const user = req.body;
        const zodParse = user_validation_1.userValidationSchema.safeParse(user);
        if (!zodParse.success) {
            const err = (0, zod_validation_error_1.fromZodError)(zodParse.error);
            res.status(500).json({
                success: false,
                message: `${err.details[0].path} : ${err.details[0].message}`,
                error: err,
            });
        }
        else {
            const response = yield user_service_1.UserServices.postUserToDB(zodParse.data);
            // const data = {...response}  as Partial<TUser>;
            // delete data.password
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
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Failed to create user!',
            error,
        });
    }
});
exports.UserControllers = {
    createUser,
};
