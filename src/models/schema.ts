import { z } from "zod";

export const registerSchema = z.intersection(
  z.object({
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().int().positive(),
    experiment: z.string().optional(),
    profession: z.string().optional(),
    isUniversity: z.boolean(),
  }),
  z.discriminatedUnion("isUniversity", [
    z.object({
      isUniversity: z.literal(true),
      major: z.string().min(1),
      faculty: z.string().min(1),
    }),
    z.object({
      isUniversity: z.literal(false),
    }),
  ])
);

export type RegisterSchema = z.infer<typeof registerSchema>;

export const defaultValues: RegisterSchema = {
  isUniversity: false,
  name: "",
  email: "",
  age: 0,
  profession: "",
  experiment: "",
};
