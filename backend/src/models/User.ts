import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: 'teacher' | 'admin' | 'student';
  school_id?: mongoose.Types.ObjectId;
  subjects?: string[];
  classes?: number[];
  language_preference: 'en' | 'hi';
  subscription_tier: 'free' | 'premium' | 'school';
  trial_ends_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['teacher', 'admin', 'student'],
    default: 'teacher'
  },
  school_id: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  },
  subjects: [{
    type: String
  }],
  classes: [{
    type: Number,
    min: 6,
    max: 12
  }],
  language_preference: {
    type: String,
    enum: ['en', 'hi'],
    default: 'en'
  },
  subscription_tier: {
    type: String,
    enum: ['free', 'premium', 'school'],
    default: 'free'
  },
  trial_ends_at: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
UserSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model<IUser>('User', UserSchema);
