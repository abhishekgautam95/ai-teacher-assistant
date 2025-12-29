import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

/**
 * Generate PDF for question paper
 */
export const generateQuestionPaperPDF = async (
  questionPaper: any,
  outputPath: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(outputPath);

      doc.pipe(writeStream);

      // Header
      doc.fontSize(20).text('Question Paper', { align: 'center' });
      doc.moveDown();
      
      // Details
      doc.fontSize(12);
      doc.text(`Board: ${questionPaper.board}`);
      doc.text(`Class: ${questionPaper.class}`);
      doc.text(`Subject: ${questionPaper.subject}`);
      doc.text(`Chapter: ${questionPaper.chapter}`);
      doc.text(`Total Marks: ${questionPaper.total_marks}`);
      doc.text(`Duration: ${questionPaper.duration} minutes`);
      doc.moveDown(2);

      // Questions
      questionPaper.questions.forEach((q: any, index: number) => {
        doc.fontSize(11);
        doc.text(`Q${index + 1}. ${q.question} [${q.marks} marks]`, {
          continued: false
        });
        
        if (q.type === 'mcq' && q.options) {
          q.options.forEach((option: string, optIndex: number) => {
            doc.text(`   ${String.fromCharCode(97 + optIndex)}) ${option}`);
          });
        }
        
        doc.moveDown();
      });

      doc.end();

      writeStream.on('finish', () => {
        resolve(outputPath);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generate PDF for performance report
 */
export const generatePerformanceReportPDF = async (
  performance: any,
  outputPath: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(outputPath);

      doc.pipe(writeStream);

      // Header
      doc.fontSize(20).text('Student Performance Report', { align: 'center' });
      doc.moveDown(2);
      
      // Details
      doc.fontSize(12);
      doc.text(`Subject: ${performance.subject}`);
      doc.text(`Test: ${performance.test_name}`);
      doc.text(`Marks: ${performance.marks_obtained}/${performance.total_marks}`);
      doc.text(`Percentage: ${((performance.marks_obtained / performance.total_marks) * 100).toFixed(2)}%`);
      doc.moveDown(2);

      // Topic-wise performance
      if (performance.topic_wise_performance && performance.topic_wise_performance.length > 0) {
        doc.fontSize(14).text('Topic-wise Performance:', { underline: true });
        doc.moveDown();
        
        performance.topic_wise_performance.forEach((topic: any) => {
          const percentage = ((topic.marks / topic.total) * 100).toFixed(2);
          doc.fontSize(11).text(`${topic.topic}: ${topic.marks}/${topic.total} (${percentage}%)`);
        });
        doc.moveDown(2);
      }

      // Feedback
      if (performance.feedback) {
        doc.fontSize(14).text('Feedback:', { underline: true });
        doc.moveDown();
        doc.fontSize(11).text(performance.feedback);
      }

      doc.end();

      writeStream.on('finish', () => {
        resolve(outputPath);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};
