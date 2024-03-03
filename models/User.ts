import { Schema, model, models, Document, type Model } from 'mongoose';

// ? Should this be moved to types ? Will move after finishing UserSchema if needed
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  portfolioUrl: string;
  // next ones i am not sure what exactly would the type be since there are checkboxes
  learningGoals?: any[];
  knowledgeLevel?: any[];
  techStack: any[];
  availableTime: Date; // ? probably but not sure...
  availabilityForProject: boolean;
}

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
  // ? what should this be ???
  learningGoals: [],
});

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
