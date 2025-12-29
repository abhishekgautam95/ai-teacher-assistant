import mongoose, { Document, Schema } from 'mongoose';

interface IQuestion {
  type: 'mcq' | 'short' | 'long';
  question: string;
  options?: string[];
  answer: string;
  marks: number;
  bloom_level: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
}

export interface IQuestionPaper extends Document {
  teacher_id: mongoose.Types.ObjectId;
  board: string;
  class: number;
  subject: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: IQuestion[];
  total_marks: number;
  duration: number;
  created_at: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  type: {
    type: String,
    enum: ['mcq', 'short', 'long'],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }],
  answer: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 1
  },
  bloom_level: {
    type: String,
    enum: ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'],
    default: 'understand'
  }
});

const QuestionPaperSchema = new Schema<IQuestionPaper>({
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
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  questions: [QuestionSchema],
  total_marks: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 180 // 3 hours in minutes
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IQuestionPaper>('QuestionPaper', QuestionPaperSchema);
