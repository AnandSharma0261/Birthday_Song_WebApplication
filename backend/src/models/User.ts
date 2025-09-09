import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone: string;
  name: string;
  email: string;
  termsAccepted: boolean;
  promoAccepted: boolean;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  termsAccepted: { type: Boolean, required: true },
  promoAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
