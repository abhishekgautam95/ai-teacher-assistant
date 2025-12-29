import mongoose, { Document, Schema } from 'mongoose';

export interface INotes extends Document {
  teacher_id: mongoose.Types.ObjectId;
  board: string;
  class: number;
  subject: string;
  chapter: string;
  content: string;
  language: 'en' | 'hi';
  created_at: Date;
}

const NotesSchema = new Schema<INotes>({
  teacher_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  board: {
    type: String,
    required: true
  },
  class: {
    type: Number,
    required: true,
    min: 6,
    max: 12
  },
  subject: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['en', 'hi'],
    default: 'en'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<INotes>('Notes', NotesSchema);
