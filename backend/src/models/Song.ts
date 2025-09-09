import mongoose, { Schema, Document } from 'mongoose';

export interface ISong extends Document {
  userId: mongoose.Types.ObjectId;
  receiverName: string;
  age: string;
  gender: 'Male' | 'Female';
  mood: string;
  genre: string;
  voice: string;
  lyrics: string;
  audioUrl?: string;
  createdAt: Date;
  audioGeneratedAt?: Date;
}

const SongSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  receiverName: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  mood: { type: String, required: true },
  genre: { type: String, required: true },
  voice: { type: String, required: true },
  lyrics: { type: String, required: true },
  audioUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  audioGeneratedAt: { type: Date }
});

export default mongoose.model<ISong>('Song', SongSchema);
