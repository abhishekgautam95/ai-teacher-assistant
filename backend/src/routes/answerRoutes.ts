import { Router } from 'express';
import {
  uploadAnswerSheet,
  getAnswerSheets,
  getAnswerSheetById,
  updateAnswerSheetEvaluation
} from '../controllers/answerController';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

/**
 * @route   POST /api/answers
 * @desc    Upload and check answer sheet
 * @access  Private (Teacher)
 */
router.post(
  '/',
  authenticate,
  authorize('teacher', 'admin'),
  upload.single('answer_sheet'),
  uploadAnswerSheet
);

/**
 * @route   GET /api/answers
 * @desc    Get all answer sheets
 * @access  Private (Teacher, Admin)
 */
router.get(
  '/',
  authenticate,
  authorize('teacher', 'admin'),
  getAnswerSheets
);

/**
 * @route   GET /api/answers/:id
 * @desc    Get a single answer sheet by ID
 * @access  Private
 */
router.get('/:id', authenticate, getAnswerSheetById);

/**
 * @route   PUT /api/answers/:id
 * @desc    Update answer sheet evaluation
 * @access  Private (Teacher, Admin)
 */
router.put(
  '/:id',
  authenticate,
  authorize('teacher', 'admin'),
  updateAnswerSheetEvaluation
);

export default router;
