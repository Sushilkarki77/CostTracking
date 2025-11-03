import { z } from 'zod';


export const registrationSchema = z.object({
  fullname: z.string(),
  email: z.string(),
  password: z.string(),
  isActive: z.boolean().optional(),
});


export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const tokenRefreshSchema = z.object({
  refreshToken: z.string(),
});

export const documentSchema = z.object({
  documentName: z.string(),
});


export const expSchema = z.object({
  name: z.string(),
  paymentMethod: z.string(),
  note: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      category: z.object({
        name: z.string(),
        _id:  z.string()
      }),
      currency: z.string(),
    })
  )
});



export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required")
});
