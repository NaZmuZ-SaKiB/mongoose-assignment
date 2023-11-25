import { z } from 'zod';

export const nameValidationSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First Name must be a string.',
      required_error: 'First Name is required.',
    })
    .min(1)
    .trim(),
  lastName: z
    .string({
      invalid_type_error: 'Last Name must be a string.',
      required_error: 'Last Name is required.',
    })
    .min(1)
    .trim(),
});

export const addressValidationSchema = z.object({
  city: z
    .string({
      invalid_type_error: 'City must be a string.',
      required_error: 'City is required.',
    })
    .min(1)
    .trim(),
  country: z
    .string({
      invalid_type_error: 'Country must be a string.',
      required_error: 'Country is required.',
    })
    .min(1)
    .trim(),
  street: z
    .string({
      invalid_type_error: 'Street must be a string.',
      required_error: 'Street is required.',
    })
    .min(1)
    .trim(),
});

export const orderValidationSchema = z.object({
  productName: z
    .string({
      invalid_type_error: 'Product name must be a string.',
      required_error: 'Product name is required.',
    })
    .min(1)
    .trim(),
  price: z.number({
    invalid_type_error: 'Price must be a number',
    required_error: 'Price is required.',
  }),
  quantity: z.number({
    invalid_type_error: 'Quantity must be a number.',
    required_error: 'Quantity is required.',
  }),
});

export const userValidationSchema = z.object({
  userId: z.number({
    invalid_type_error: 'userId must be a number.',
    required_error: 'userId is required.',
  }),
  username: z
    .string({
      invalid_type_error: 'Usrname must be a string.',
      required_error: 'Usrname is required.',
    })
    .min(1)
    .trim(),
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required.',
    })
    .email({ message: 'Insert a valid Email address.' })
    .trim(),
  fullName: nameValidationSchema,
  age: z
    .number({
      invalid_type_error: 'Age must be a number.',
      required_error: 'Age is required.',
    })
    .min(1),
  hobbies: z.array(
    z
      .string({
        invalid_type_error: 'Hobby must be a string.',
      })
      .min(1)
      .trim(),
  ),
  address: addressValidationSchema,
  password: z
    .string({
      invalid_type_error: 'Password must be a string.',
      required_error: 'Password is required.',
    })
    .min(6, 'Password must contain atleast 6 characters.'),
  isActive: z.boolean({
    invalid_type_error: 'isActive must be a boolean type.',
    required_error: 'isActive is required.',
  }),
  orders: z.array(orderValidationSchema).optional(),
});

// Update User validation Schema (makes all the field optional)
export const userUpdateValidationSchema = userValidationSchema.partial();
