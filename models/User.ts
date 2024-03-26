import { Schema, model, Document, Model, models } from 'mongoose';
import { EOnboardingStep } from '@/types/onboarding-step';

export interface ILearningGoals extends Document {
  isChecked: boolean;
  goal: string;
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatarImg?: string;
  portfolioUrl: string;
  learningGoals?: ILearningGoals[];
  knowledgeLevel?: string[];
  techStack: string;
  projectAvailability: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onboardingStep: EOnboardingStep;
}

const LearningGoalsSchema = new Schema<ILearningGoals>({
  isChecked: { type: Boolean, required: true },
  goal: { type: String, required: true },
});

// objectId ----> wrapper oko ID da moze da se radi reference

const UserSchema: Schema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'Please enter a full name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address!'],
    unique: true,
  },
  password: String,
  avatarImg: String,
  portfolioUrl: String,
  learningGoals: [LearningGoalsSchema],
  knowledgeLevel: [String],
  techStack: String,
  projectAvailability: Boolean,
  startDate: Date,
  endDate: Date,
  onboardingStep: Number,
});

const User: Model<IUser> = models?.User || model<IUser>('User', UserSchema);

export default User;
