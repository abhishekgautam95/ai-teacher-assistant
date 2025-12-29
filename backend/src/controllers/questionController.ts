import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import QuestionPaper from '../models/QuestionPaper';
import { generateQuestions } from '../services/aiService';
import { generateQuestionPaperPDF } from '../services/pdfService';
import path from 'path';
import fs from 'fs';

/**
 * Generate question paper
 */
export const createQuestionPaper = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { board, class: classNum, subject, chapter, difficulty, language } = req.body;

    // Generate questions using AI
    const questions = await generateQuestions({
      board,
      class: classNum,
      subject,
      chapter,
      difficulty,
      language: language || 'en'
    });

    // Calculate total marks
    const total_marks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

    // Create question paper document
    const questionPaper = new QuestionPaper({
      teacher_id: userId,
      board,
      class: classNum,
      subject,
      chapter,
      difficulty,
      questions,
      total_marks,
      duration: 180 // default 3 hours
    });

    await questionPaper.save();

    res.status(201).json({
      message: 'Question paper generated successfully',
      questionPaper
    });
  } catch (error) {
    console.error('Create question paper error:', error);
    res.status(500).json({ error: 'Failed to generate question paper' });
  }
};

/**
 * Get all question papers for a teacher
 */
export const getQuestionPapers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 10 } = req.query;

    const questionPapers = await QuestionPaper.find({ teacher_id: userId })
      .sort({ created_at: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await QuestionPaper.countDocuments({ teacher_id: userId });

    res.json({
      questionPapers,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get question papers error:', error);
    res.status(500).json({ error: 'Failed to get question papers' });
  }
};

/**
 * Get a single question paper by ID
 */
export const getQuestionPaperById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const questionPaper = await QuestionPaper.findById(id);
    if (!questionPaper) {
      res.status(404).json({ error: 'Question paper not found' });
      return;
    }

    res.json({ questionPaper });
  } catch (error) {
    console.error('Get question paper error:', error);
    res.status(500).json({ error: 'Failed to get question paper' });
  }
};

/**
 * Export question paper as PDF
 */
export const exportQuestionPaperPDF = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const questionPaper = await QuestionPaper.findById(id);
    if (!questionPaper) {
      res.status(404).json({ error: 'Question paper not found' });
      return;
    }

    // Generate PDF
    const fileName = `question-paper-${id}-${Date.now()}.pdf`;
    const outputPath = path.join(process.cwd(), 'uploads', fileName);
    
    await generateQuestionPaperPDF(questionPaper, outputPath);

    // Send file
    res.download(outputPath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Delete file after download
      fs.unlink(outputPath, (unlinkErr) => {
        if (unlinkErr) console.error('File deletion error:', unlinkErr);
      });
    });
  } catch (error) {
    console.error('Export PDF error:', error);
    res.status(500).json({ error: 'Failed to export PDF' });
  }
};

/**
 * Delete question paper
 */
export const deleteQuestionPaper = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const questionPaper = await QuestionPaper.findOneAndDelete({
      _id: id,
      teacher_id: userId
    });

    if (!questionPaper) {
      res.status(404).json({ error: 'Question paper not found' });
      return;
    }

    res.json({ message: 'Question paper deleted successfully' });
  } catch (error) {
    console.error('Delete question paper error:', error);
    res.status(500).json({ error: 'Failed to delete question paper' });
  }
};
