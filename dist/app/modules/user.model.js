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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required.'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required.'],
        trim: true,
    },
});
const addressSchema = new mongoose_1.Schema({
    city: {
        type: String,
        required: [true, 'City is required.'],
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Country is required.'],
        trim: true,
    },
    street: {
        type: String,
        required: [true, 'Street Address is required.'],
        trim: true,
    },
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User ID is required.'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
    },
    fullName: {
        type: nameSchema,
        required: [true, 'Full name is required.'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required.'],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required.'],
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    isActive: {
        type: Boolean,
        required: [true, 'Active status is required.'],
    },
    orders: {
        type: [orderSchema],
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        },
    },
});
// Pre middlewares
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// Static Method
userSchema.statics.userExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
