import z from 'zod';

export const signUpFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: 'Full Name must be at least 3 characters long!' }),
  email: z.string().trim().email('Please enter valdi email address!'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long!'),
});

export type ISignUpFormData = z.infer<typeof signUpFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().trim().email('Please enter valid email address!'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long!'),
});

export type ILoginFormData = z.infer<typeof loginFormSchema>;
