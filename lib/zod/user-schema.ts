import z from 'zod';

export const signUpFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Full Name must be at least 3 characters long!' }),
  email: z.string().email('Please enter valdi email address!'),
  password: z.string().min(6, 'Password must be at least 6 characters long!'),
});

export type ISignUpFormData = z.infer<typeof signUpFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email('Please eneter valid email address!'),
  password: z.string().min(6, 'Password must be at least 6 characters long!'),
});
