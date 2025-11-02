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
