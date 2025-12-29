import mongoose, { Document, Schema } from 'mongoose';

interface ITopicPerformance {
  topic: string;
  marks: number;
  total: number;
}

export interface IStudentPerformance extends Document {
  student_id: mongoose.Types.ObjectId;
  class_id?: mongoose.Types.ObjectId;
  subject: string;
  test_name: string;
  marks_obtained: number;
  total_marks: number;
  topic_wise_performance: ITopicPerformance[];
  feedback: string;
  checked_by: mongoose.Types.ObjectId;
  checked_at: Date;
  created_at: Date;
}

const TopicPerformanceSchema = new Schema<ITopicPerformance>({
  topic: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
});

const StudentPerformanceSchema = new Schema<IStudentPerformance>({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class_id: {
    type: Schema.Types.ObjectId,
    ref: 'Class'
  },
  subject: {
    type: String,
    required: true
  },
  test_name: {
    type: String,
    required: true
  },
  marks_obtained: {
    type: Number,
    required: true,
    min: 0
  },
  total_marks: {
    type: Number,
    required: true,
    min: 0
  },
  topic_wise_performance: [TopicPerformanceSchema],
  feedback: {
    type: String,
    default: ''
  },
  checked_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checked_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IStudentPerformance>('StudentPerformance', StudentPerformanceSchema);
