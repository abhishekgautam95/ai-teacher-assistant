import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import StudentPerformance from '../models/StudentPerformance';
import { generatePerformanceReportPDF } from '../services/pdfService';
import path from 'path';
import fs from 'fs';

/**
 * Create student performance record
 */
export const createPerformance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { student_id, subject, test_name, marks_obtained, total_marks, topic_wise_performance, feedback } = req.body;

    const performance = new StudentPerformance({
      student_id,
      subject,
      test_name,
      marks_obtained,
      total_marks,
      topic_wise_performance: topic_wise_performance || [],
      feedback: feedback || '',
      checked_by: userId
    });

    await performance.save();

    res.status(201).json({
      message: 'Performance record created successfully',
      performance
    });
  } catch (error) {
    console.error('Create performance error:', error);
    res.status(500).json({ error: 'Failed to create performance record' });
  }
};

/**
 * Get all performance records for students
 */
export const getPerformanceRecords = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { student_id, subject, page = 1, limit = 10 } = req.query;

    const query: any = {};
    if (student_id) query.student_id = student_id;
    if (subject) query.subject = subject;

    const performances = await StudentPerformance.find(query)
      .populate('student_id', 'name email')
      .populate('checked_by', 'name')
      .sort({ created_at: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await StudentPerformance.countDocuments(query);

    res.json({
      performances,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get performance records error:', error);
    res.status(500).json({ error: 'Failed to get performance records' });
  }
};

/**
 * Get performance analytics for a student
 */
export const getStudentAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { student_id } = req.params;

    const performances = await StudentPerformance.find({ student_id })
      .sort({ created_at: -1 });

    if (performances.length === 0) {
      res.json({
        student_id,
        total_tests: 0,
        average_percentage: 0,
        strong_topics: [],
        weak_topics: [],
        progress: []
      });
      return;
    }

    // Calculate analytics
    const totalTests = performances.length;
    const averagePercentage = performances.reduce((sum, p) => 
      sum + (p.marks_obtained / p.total_marks * 100), 0) / totalTests;

    // Topic analysis
    const topicMap = new Map<string, { marks: number; total: number; count: number }>();
    
    performances.forEach(p => {
      p.topic_wise_performance.forEach(topic => {
        const existing = topicMap.get(topic.topic) || { marks: 0, total: 0, count: 0 };
        topicMap.set(topic.topic, {
          marks: existing.marks + topic.marks,
          total: existing.total + topic.total,
          count: existing.count + 1
        });
      });
    });

    const topicPerformances = Array.from(topicMap.entries()).map(([topic, data]) => ({
      topic,
      percentage: (data.marks / data.total) * 100
    }));

    topicPerformances.sort((a, b) => b.percentage - a.percentage);

    const strongTopics = topicPerformances.slice(0, 3);
    const weakTopics = topicPerformances.slice(-3).reverse();

    // Progress over time
    const progress = performances.slice(0, 10).reverse().map(p => ({
      date: p.created_at,
      test_name: p.test_name,
      percentage: (p.marks_obtained / p.total_marks) * 100
    }));

    res.json({
      student_id,
      total_tests: totalTests,
      average_percentage: averagePercentage.toFixed(2),
      strong_topics: strongTopics,
      weak_topics: weakTopics,
      progress
    });
  } catch (error) {
    console.error('Get student analytics error:', error);
    res.status(500).json({ error: 'Failed to get student analytics' });
  }
};

/**
 * Export performance report as PDF
 */
export const exportPerformanceReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const performance = await StudentPerformance.findById(id)
      .populate('student_id', 'name');

    if (!performance) {
      res.status(404).json({ error: 'Performance record not found' });
      return;
    }

    // Generate PDF
    const fileName = `performance-report-${id}-${Date.now()}.pdf`;
    const outputPath = path.join(process.cwd(), 'uploads', fileName);
    
    await generatePerformanceReportPDF(performance, outputPath);

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
    console.error('Export report error:', error);
    res.status(500).json({ error: 'Failed to export report' });
  }
};
