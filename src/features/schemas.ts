import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Must be at most 30 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(30, "Password should be at most 30 characters"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(30, "Password should be at most 30 characters"),
});

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
