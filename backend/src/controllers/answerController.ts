import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import AnswerSheet from '../models/AnswerSheet';
import { processAnswerSheet } from '../services/ocrService';
import { evaluateAnswer } from '../services/aiService';

/**
 * Upload and check answer sheet
 */
export const uploadAnswerSheet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { student_id, subject, question, model_answer, total_marks } = req.body;

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const imagePath = req.file.path;

    // Process image with OCR
    const { extractedText, confidence } = await processAnswerSheet(imagePath);

    // Evaluate answer using AI
    const evaluation = await evaluateAnswer({
      question,
      modelAnswer: model_answer,
      studentAnswer: extractedText,
      totalMarks: parseInt(total_marks)
    });

    // Create answer sheet record
    const answerSheet = new AnswerSheet({
      student_id,
      teacher_id: userId,
      subject,
      image_url: imagePath,
      extracted_text: extractedText,
      evaluation,
      status: 'checked'
    });

    await answerSheet.save();

    res.status(201).json({
      message: 'Answer sheet processed successfully',
      answerSheet,
      ocr_confidence: confidence
    });
  } catch (error) {
    console.error('Upload answer sheet error:', error);
    res.status(500).json({ error: 'Failed to process answer sheet' });
  }
};

/**
 * Get all answer sheets for a teacher
 */
export const getAnswerSheets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 10, status } = req.query;

    const query: any = { teacher_id: userId };
    if (status) {
      query.status = status;
    }

    const answerSheets = await AnswerSheet.find(query)
      .populate('student_id', 'name email')
      .sort({ created_at: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await AnswerSheet.countDocuments(query);

    res.json({
      answerSheets,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get answer sheets error:', error);
    res.status(500).json({ error: 'Failed to get answer sheets' });
  }
};

/**
 * Get a single answer sheet by ID
 */
export const getAnswerSheetById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const answerSheet = await AnswerSheet.findById(id)
      .populate('student_id', 'name email')
      .populate('teacher_id', 'name');

    if (!answerSheet) {
      res.status(404).json({ error: 'Answer sheet not found' });
      return;
    }

    res.json({ answerSheet });
  } catch (error) {
    console.error('Get answer sheet error:', error);
    res.status(500).json({ error: 'Failed to get answer sheet' });
  }
};

/**
 * Update answer sheet evaluation
 */
export const updateAnswerSheetEvaluation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { marks, feedback, topic_mistakes } = req.body;

    const answerSheet = await AnswerSheet.findByIdAndUpdate(
      id,
      {
        evaluation: { marks, feedback, topic_mistakes },
        status: 'checked'
      },
      { new: true }
    );

    if (!answerSheet) {
      res.status(404).json({ error: 'Answer sheet not found' });
      return;
    }

    res.json({
      message: 'Evaluation updated successfully',
      answerSheet
    });
  } catch (error) {
    console.error('Update evaluation error:', error);
    res.status(500).json({ error: 'Failed to update evaluation' });
  }
};
