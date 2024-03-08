import { Schema, model, models, Document, Model } from 'mongoose';

interface ILearningGoals extends Document {
  isChecked: boolean;
  goal: string;
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  portfolioUrl: string;
  learningGoals?: ILearningGoals[];
  knowledgeLevel?: string[];
  techStack: string;
  projectAvailability: boolean;
  startDate: Date;
  endDate: Date;
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
  avatarUrl: String,
  portfolioUrl: String,
  learningGoals: [LearningGoalsSchema],
  knowledgeLevel: [String],
  techStack: String,
  projectAvailability: Boolean,
  startDate: Date,
  endDate: Date,
});

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
