import { z } from "zod";

export const registerSchema = z.intersection(
  z.object({
    forName: z.string().min(1),
    surName: z.string().min(1),
    email: z.string().email(),
    age: z.number().int().positive().min(1),
    experiment: z.string().min(1),
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
  forName: "",
  surName: "",
  email: "",
  age: 0,
  profession: "",
  experiment: "",
};
