import mongoose, { Document, Schema } from 'mongoose';

interface IEvaluation {
  marks: number;
  feedback: string;
  topic_mistakes: string[];
}

export interface IAnswerSheet extends Document {
  student_id: mongoose.Types.ObjectId;
  teacher_id: mongoose.Types.ObjectId;
  subject: string;
  image_url: string;
  extracted_text: string;
  evaluation: IEvaluation;
  status: 'pending' | 'checked';
  created_at: Date;
  updated_at: Date;
}

const EvaluationSchema = new Schema<IEvaluation>({
  marks: {
    type: Number,
    default: 0
  },
  feedback: {
    type: String,
    default: ''
  },
  topic_mistakes: [{
    type: String
  }]
});

const AnswerSheetSchema = new Schema<IAnswerSheet>({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  extracted_text: {
    type: String,
    default: ''
  },
  evaluation: {
    type: EvaluationSchema,
    default: () => ({})
  },
  status: {
    type: String,
    enum: ['pending', 'checked'],
    default: 'pending'
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
AnswerSheetSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model<IAnswerSheet>('AnswerSheet', AnswerSheetSchema);
