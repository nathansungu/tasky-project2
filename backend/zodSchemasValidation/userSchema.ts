import {  z } from "zod";

const registerSchema = z.object({
  firstName: z.string(),
  secondName: z.string(),
  userName: z.string(),
  email: z.email(),
  password: z.string().min(5),
});

const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  secondName: z.string().optional(),
  userName: z.string().optional(),
  email: z.string().optional(),
});

const changePasssword = z.object({
  currentPassword: z.string().min(5),
  newPassword: z.string().min(5)
});

export { registerSchema, loginSchema, updateProfileSchema, changePasssword };
