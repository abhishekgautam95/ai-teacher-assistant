import Tesseract from 'tesseract.js';
import path from 'path';

/**
 * Extract text from image using Tesseract OCR
 */
export const extractTextFromImage = async (imagePath: string): Promise<string> => {
  try {
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'eng+hin', // Support both English and Hindi
      {
        logger: info => console.log(info) // Log progress
      }
    );

    return text.trim();
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
};

/**
 * Process answer sheet image
 */
export const processAnswerSheet = async (imagePath: string): Promise<{
  extractedText: string;
  confidence: number;
}> => {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      'eng+hin',
      {
        logger: info => {
          if (info.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
          }
        }
      }
    );

    return {
      extractedText: result.data.text.trim(),
      confidence: result.data.confidence
    };
  } catch (error) {
    console.error('Answer sheet processing error:', error);
    throw new Error('Failed to process answer sheet');
  }
};
