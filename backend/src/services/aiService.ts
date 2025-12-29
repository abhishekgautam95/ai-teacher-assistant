import OpenAI from 'openai';
import { config } from '../config/env';

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * Generate questions using OpenAI API
 */
export const generateQuestions = async (params: {
  board: string;
  class: number;
  subject: string;
  chapter: string;
  difficulty: string;
  language: string;
}): Promise<any[]> => {
  const { board, class: classNum, subject, chapter, difficulty, language } = params;

  const prompt = `You are an expert Indian curriculum teacher for ${board} board.
Generate ${difficulty} level questions for Class ${classNum}, ${subject}, Chapter: ${chapter}.

Requirements:
- Generate 5 MCQs (4 options each, 1 mark each)
- Generate 3 short answer questions (2-3 marks each)
- Generate 2 long answer questions (5 marks each)
- Questions should align with Bloom's Taxonomy (Remember, Understand, Apply, Analyze)
- Language: ${language === 'hi' ? 'Hindi' : 'English'}
- Format: JSON array with structure: {type, question, options, answer, marks, bloom_level}

Make questions relevant to Indian students and NCERT/state curriculum.

Return ONLY a valid JSON array, no additional text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert Indian curriculum teacher.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || '[]';
    // Extract JSON from markdown code blocks if present
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;
    
    return JSON.parse(jsonString.trim());
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate questions');
  }
};

/**
 * Generate notes using OpenAI API
 */
export const generateNotes = async (params: {
  board: string;
  class: number;
  subject: string;
  chapter: string;
  language: string;
}): Promise<string> => {
  const { board, class: classNum, subject, chapter, language } = params;

  const prompt = `You are an expert teacher creating study notes for Indian students.
Create comprehensive notes for Class ${classNum}, ${subject}, Chapter: ${chapter}.

Requirements:
- Simple, student-friendly language
- Bullet points for key concepts
- Include 2-3 examples for each concept
- Include important formulas/definitions
- Suggest diagrams or tables where helpful
- Language: ${language === 'hi' ? 'Hindi' : 'English'}
- Keep it concise but complete

Target audience: ${board} board students, ages 11-18.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert teacher creating study notes.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating notes:', error);
    throw new Error('Failed to generate notes');
  }
};

/**
 * Evaluate student answer using OpenAI API
 */
export const evaluateAnswer = async (params: {
  question: string;
  modelAnswer: string;
  studentAnswer: string;
  totalMarks: number;
}): Promise<{
  marks: number;
  feedback: string;
  topic_mistakes: string[];
}> => {
  const { question, modelAnswer, studentAnswer, totalMarks } = params;

  const prompt = `You are an experienced teacher evaluating a student's answer.

Question: ${question}
Model Answer: ${modelAnswer}
Student's Answer: ${studentAnswer}
Total Marks: ${totalMarks}

Please provide a JSON response with:
1. marks (number): Marks awarded (out of ${totalMarks})
2. feedback (string): Constructive feedback (2-3 sentences)
3. topic_mistakes (array of strings): List key topics where student needs improvement

Be encouraging but honest. Use simple language.

Return ONLY a valid JSON object, no additional text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an experienced teacher evaluating student answers.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
    });

    const content = response.choices[0].message.content || '{}';
    // Extract JSON from markdown code blocks if present
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;
    
    return JSON.parse(jsonString.trim());
  } catch (error) {
    console.error('Error evaluating answer:', error);
    throw new Error('Failed to evaluate answer');
  }
};
