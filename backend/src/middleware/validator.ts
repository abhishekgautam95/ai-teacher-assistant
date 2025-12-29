import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check validation results
 */
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

/**
 * Validation rules for user registration
 */
export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['teacher', 'admin', 'student']).withMessage('Invalid role')
];

/**
 * Validation rules for user login
 */
export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

/**
 * Validation rules for question paper generation
 */
export const questionPaperValidation = [
  body('board').notEmpty().withMessage('Board is required'),
  body('class').isInt({ min: 6, max: 12 }).withMessage('Class must be between 6 and 12'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('chapter').notEmpty().withMessage('Chapter is required'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level')
];

/**
 * Validation rules for notes generation
 */
export const notesValidation = [
  body('board').notEmpty().withMessage('Board is required'),
  body('class').isInt({ min: 6, max: 12 }).withMessage('Class must be between 6 and 12'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('chapter').notEmpty().withMessage('Chapter is required'),
  body('language').optional().isIn(['en', 'hi']).withMessage('Invalid language')
];
