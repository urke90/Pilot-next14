import { Schema, model, models, Document, type Model } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  portfolioUrl: string;
  learningGoals?: { isChecked: boolean; goal: string };
  knowledgeLevel?: string[];
  techStack: string;
  projectAvailability: boolean;
  startDate: Date;
  endDate: Date;
}

interface ILearningGoals extends Document {
  isChecked: boolean;
  goal: string;
}

const LearningGoalsSchema = new Schema<ILearningGoals>({
  isChecked: { type: Boolean, required: true },
  goal: { type: String, required: true },
});

/**
 * I am not sure about
 * 1. learningGoals ----> not sure since they have checkboxes, should it be object with updated prop?
 * 2. knowledgeLevel ----> not sure since they have checkboxes, should it be object with updated prop? Same as learningGoals
 * 3. techStack  ----> I believe this is just string[] ?
 * 4. availableTime ---> Is this regular Date? What about exact time, should i count on this?
 * 5. availabilityForProject ----> pretty sure this is just a boolean.
 *
 * * I haven't added these to the UserSchema yet since i am not sure and i need these ones so i could finish
 * * Day 5 - Database Architecture & Server Actions
 */

// objectId ----> wrapper oko ID da moze da se radi reference

const UserSchema: Schema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'Please enter a full name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password!'],
  },
  avatarUrl: String,
  portfolioUrl: String,
  learningGoals: [LearningGoalsSchema],
  knowledgeLevel: [String],
  techStack: String,
  projectAvailability: Boolean,
  startDate: Date,
});

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
