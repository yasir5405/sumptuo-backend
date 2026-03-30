import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({ error: "Please provide a name" })
    .min(2, { error: "Name must be at least 2 characters long" })
    .max(100, { error: "Name must be less than 100 characters" }),
  email: z.email({ error: "Please provide a valid email" }),
  password: z
    .string({ error: "Please provide a password" })
    .min(8, { error: "Password should be at least 8 characters long" })
    .max(100, { error: "Password should be less than 100 characters long" }),
});
