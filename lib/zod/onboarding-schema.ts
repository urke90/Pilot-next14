import z from 'zod';
import { EOnboardingStep } from '@/types/onboarding-step';

// ----------------------------------------------------------------

export const learningGoalsSchema = z.object({
  isChecked: z.boolean(),
  goal: z.string().trim().min(1, 'Please enter your goal!'),
});

export const onboardingSchema = z.object({
  fullName: z.string().min(3, 'Please enter your Name!'),
  portfolioUrl: z.union([z.string().url().nullish(), z.literal('')]),
  avatarImg: z.string().trim().optional(),
  learningGoals: z
    .array(learningGoalsSchema)
    .nonempty('Please add at lease one goal!'),
  knowledgeLevel: z
    .array(z.string().min(3, 'Experise must contain at least 3 characters!'))
    .nonempty('Please add your expertise level!'),
  techStack: z.string().trim(),
  startDate: z
    .date({ required_error: 'Plase enter start date!' })
    .min(new Date())
    .optional(),
  endDate: z
    .date({ required_error: 'Please enter end date!' })
    .min(new Date())
    .optional(),
  projectAvailability: z.boolean().optional(),
  onboardingStep: z.number().min(1).max(5),
});

export type IUserOnboarding = z.infer<typeof onboardingSchema>;
