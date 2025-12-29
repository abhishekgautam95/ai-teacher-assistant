import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Notes from '../models/Notes';
import { generateNotes } from '../services/aiService';
import { generatePPTFromNotes } from '../services/pptService';
import path from 'path';
import fs from 'fs';

/**
 * Generate notes
 */
export const createNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { board, class: classNum, subject, chapter, language } = req.body;

    // Generate notes using AI
    const content = await generateNotes({
      board,
      class: classNum,
      subject,
      chapter,
      language: language || 'en'
    });

    // Create notes document
    const notes = new Notes({
      teacher_id: userId,
      board,
      class: classNum,
      subject,
      chapter,
      content,
      language: language || 'en'
    });

    await notes.save();

    res.status(201).json({
      message: 'Notes generated successfully',
      notes
    });
  } catch (error) {
    console.error('Create notes error:', error);
    res.status(500).json({ error: 'Failed to generate notes' });
  }
};

/**
 * Get all notes for a teacher
 */
export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 10 } = req.query;

    const notes = await Notes.find({ teacher_id: userId })
      .sort({ created_at: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Notes.countDocuments({ teacher_id: userId });

    res.json({
      notes,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
};

/**
 * Get a single note by ID
 */
export const getNotesById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const notes = await Notes.findById(id);
    if (!notes) {
      res.status(404).json({ error: 'Notes not found' });
      return;
    }

    res.json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
};

/**
 * Export notes as PPT
 */
export const exportNotesPPT = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const notes = await Notes.findById(id);
    if (!notes) {
      res.status(404).json({ error: 'Notes not found' });
      return;
    }

    // Generate PPT
    const fileName = `notes-${id}-${Date.now()}.pptx`;
    const outputPath = path.join(process.cwd(), 'uploads', fileName);
    
    await generatePPTFromNotes({
      title: notes.chapter,
      board: notes.board,
      class: notes.class,
      subject: notes.subject,
      chapter: notes.chapter,
      content: notes.content
    }, outputPath);

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
    console.error('Export PPT error:', error);
    res.status(500).json({ error: 'Failed to export PPT' });
  }
};

/**
 * Delete notes
 */
export const deleteNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const notes = await Notes.findOneAndDelete({
      _id: id,
      teacher_id: userId
    });

    if (!notes) {
      res.status(404).json({ error: 'Notes not found' });
      return;
    }

    res.json({ message: 'Notes deleted successfully' });
  } catch (error) {
    console.error('Delete notes error:', error);
    res.status(500).json({ error: 'Failed to delete notes' });
  }
};
