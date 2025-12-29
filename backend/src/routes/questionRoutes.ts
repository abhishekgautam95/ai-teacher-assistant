import { Router } from 'express';
import {
  createQuestionPaper,
  getQuestionPapers,
  getQuestionPaperById,
  exportQuestionPaperPDF,
  deleteQuestionPaper
} from '../controllers/questionController';
import { authenticate, authorize } from '../middleware/auth';
import { questionPaperValidation, validate } from '../middleware/validator';

const router = Router();

/**
 * @route   POST /api/questions
 * @desc    Generate a new question paper
 * @access  Private (Teacher, Admin)
 */
router.post(
  '/',
  authenticate,
  authorize('teacher', 'admin'),
  questionPaperValidation,
  validate,
  createQuestionPaper
);

/**
 * @route   GET /api/questions
 * @desc    Get all question papers for the authenticated teacher
 * @access  Private (Teacher, Admin)
 */
router.get(
  '/',
  authenticate,
  authorize('teacher', 'admin'),
  getQuestionPapers
);

/**
 * @route   GET /api/questions/:id
 * @desc    Get a single question paper by ID
 * @access  Private
 */
router.get('/:id', authenticate, getQuestionPaperById);

/**
 * @route   GET /api/questions/:id/export
 * @desc    Export question paper as PDF
 * @access  Private
 */
router.get('/:id/export', authenticate, exportQuestionPaperPDF);

/**
 * @route   DELETE /api/questions/:id
 * @desc    Delete a question paper
 * @access  Private (Teacher, Admin)
 */
router.delete(
  '/:id',
  authenticate,
  authorize('teacher', 'admin'),
  deleteQuestionPaper
);

export default router;
