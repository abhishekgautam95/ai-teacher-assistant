import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { questionService } from '../services/questionService';
import toast, { Toaster } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const QuestionGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    board: 'CBSE',
    class: 10,
    subject: 'Mathematics',
    chapter: '',
    difficulty: 'medium',
    language: 'en'
  });

  const boards = ['CBSE', 'UP Board', 'Maharashtra State Board', 'Bihar Board'];
  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Computer Science'];
  const difficulties = ['easy', 'medium', 'hard'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await questionService.generateQuestionPaper(formData);
      setQuestions(response.questionPaper);
      toast.success(t('question_paper_generated'));
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!questions) return;
    
    try {
      const blob = await questionService.exportQuestionPaperPDF(questions._id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `question-paper-${questions._id}.pdf`;
      a.click();
      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{t('question_generator')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">{t('generate')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('board')}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.board}
                    onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                  >
                    {boards.map((board) => (
                      <option key={board} value={board}>{board}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('class')}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: parseInt(e.target.value) })}
                  >
                    {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
                      <option key={cls} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('subject')}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('chapter')}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.chapter}
                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                    placeholder="Enter chapter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('difficulty')}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  >
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>{t(diff)}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {loading ? t('loading') : t('generate')}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Generated Questions</h2>
                {questions && (
                  <button
                    onClick={handleExport}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    {t('export_pdf')}
                  </button>
                )}
              </div>

              {loading ? (
                <LoadingSpinner text="Generating questions..." />
              ) : questions ? (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p><strong>{t('board')}:</strong> {questions.board}</p>
                    <p><strong>{t('class')}:</strong> {questions.class}</p>
                    <p><strong>{t('subject')}:</strong> {questions.subject}</p>
                    <p><strong>{t('chapter')}:</strong> {questions.chapter}</p>
                    <p><strong>{t('total_marks')}:</strong> {questions.total_marks}</p>
                  </div>

                  {questions.questions.map((q: any, index: number) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <p className="font-medium mb-2">
                        Q{index + 1}. {q.question} <span className="text-sm text-gray-500">[{q.marks} marks]</span>
                      </p>
                      {q.type === 'mcq' && q.options && (
                        <div className="ml-4 space-y-1">
                          {q.options.map((option: string, i: number) => (
                            <p key={i} className="text-sm">
                              {String.fromCharCode(97 + i)}) {option}
                            </p>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Answer:</strong> {q.answer}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-12">
                  {t('no_data')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionGenerator;
