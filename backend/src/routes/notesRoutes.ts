import { Router } from 'express';
import {
  createNotes,
  getNotes,
  getNotesById,
  exportNotesPPT,
  deleteNotes
} from '../controllers/notesController';
import { authenticate, authorize } from '../middleware/auth';
import { notesValidation, validate } from '../middleware/validator';

const router = Router();

/**
 * @route   POST /api/notes
 * @desc    Generate new notes
 * @access  Private (Teacher, Admin)
 */
router.post(
  '/',
  authenticate,
  authorize('teacher', 'admin'),
  notesValidation,
  validate,
  createNotes
);

/**
 * @route   GET /api/notes
 * @desc    Get all notes for the authenticated teacher
 * @access  Private (Teacher, Admin)
 */
router.get(
  '/',
  authenticate,
  authorize('teacher', 'admin'),
  getNotes
);

/**
 * @route   GET /api/notes/:id
 * @desc    Get a single note by ID
 * @access  Private
 */
router.get('/:id', authenticate, getNotesById);

/**
 * @route   GET /api/notes/:id/export
 * @desc    Export notes as PPT
 * @access  Private
 */
router.get('/:id/export', authenticate, exportNotesPPT);

/**
 * @route   DELETE /api/notes/:id
 * @desc    Delete notes
 * @access  Private (Teacher, Admin)
 */
router.delete(
  '/:id',
  authenticate,
  authorize('teacher', 'admin'),
  deleteNotes
);

export default router;
