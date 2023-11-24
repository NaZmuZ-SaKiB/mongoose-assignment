"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidationSchema = exports.userValidationSchema = exports.orderValidationSchema = exports.addressValidationSchema = exports.nameValidationSchema = void 0;
const zod_1 = require("zod");
exports.nameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).trim(),
    lastName: zod_1.z.string().min(1).trim(),
});
exports.addressValidationSchema = zod_1.z.object({
    city: zod_1.z.string().min(1).trim(),
    country: zod_1.z.string().min(1).trim(),
    street: zod_1.z.string().min(1).trim(),
});
exports.orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1).trim(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(1).trim(),
    email: zod_1.z.string().email().trim(),
    fullName: exports.nameValidationSchema,
    age: zod_1.z.number().min(1),
    hobbies: zod_1.z.array(zod_1.z.string().min(1).trim()),
    address: exports.addressValidationSchema,
    password: zod_1.z.string().min(6),
    isActive: zod_1.z.boolean(),
    orders: zod_1.z.array(exports.orderValidationSchema).optional(),
});
// Update validation
exports.userUpdateValidationSchema = exports.userValidationSchema.partial();
