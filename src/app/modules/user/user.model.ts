import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { TAddress, TName, TOrder, TUser, UserModel } from './user.interface';
import config from '../../config';

const nameSchema = new Schema<TName>(
  {
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
  },
  {
    _id: false,
  },
);

const addressSchema = new Schema<TAddress>(
  {
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
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<TOrder>(
  {
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
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<TUser, UserModel>(
  {
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
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  },
);

// Pre middlewares
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Static Method
userSchema.statics.userExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
