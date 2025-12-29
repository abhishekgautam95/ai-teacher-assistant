import { Router } from 'express';
import {
  createPerformance,
  getPerformanceRecords,
  getStudentAnalytics,
  exportPerformanceReport
} from '../controllers/performanceController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/performance
 * @desc    Create student performance record
 * @access  Private (Teacher, Admin)
 */
router.post(
  '/',
  authenticate,
  authorize('teacher', 'admin'),
  createPerformance
);

/**
 * @route   GET /api/performance
 * @desc    Get all performance records
 * @access  Private
 */
router.get('/', authenticate, getPerformanceRecords);

/**
 * @route   GET /api/performance/student/:student_id
 * @desc    Get analytics for a specific student
 * @access  Private
 */
router.get('/student/:student_id', authenticate, getStudentAnalytics);

/**
 * @route   GET /api/performance/:id/export
 * @desc    Export performance report as PDF
 * @access  Private
 */
router.get('/:id/export', authenticate, exportPerformanceReport);

export default router;
