import { z } from 'zod';

export const nameValidationSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
});

export const addressValidationSchema = z.object({
  city: z.string().min(1).trim(),
  country: z.string().min(1).trim(),
  street: z.string().min(1).trim(),
});

export const orderValidationSchema = z.object({
  productName: z.string().min(1).trim(),
  price: z.number(),
  quantity: z.number(),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).trim(),
  email: z.string().email().trim(),
  fullName: nameValidationSchema,
  age: z.number().min(1),
  hobbies: z.array(z.string().min(1).trim()),
  address: addressValidationSchema,
  password: z.string().min(6),
  isActive: z.boolean(),
  orders: z.array(orderValidationSchema),
});
