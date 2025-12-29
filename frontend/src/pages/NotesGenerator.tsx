import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notesService } from '../services/questionService';
import toast, { Toaster } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const NotesGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    board: 'CBSE',
    class: 10,
    subject: 'Mathematics',
    chapter: '',
    language: 'en'
  });

  const boards = ['CBSE', 'UP Board', 'Maharashtra State Board', 'Bihar Board'];
  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Computer Science'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await notesService.generateNotes(formData);
      setNotes(response.notes);
      toast.success(t('notes_generated'));
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to generate notes');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPPT = async () => {
    if (!notes) return;
    
    try {
      const blob = await notesService.exportNotesPPT(notes._id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `notes-${notes._id}.pptx`;
      a.click();
      toast.success('PPT downloaded successfully');
    } catch (error) {
      toast.error('Failed to export PPT');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{t('notes_generator')}</h1>

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
                    {t('language')}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  >
                    <option value="en">{t('english')}</option>
                    <option value="hi">{t('hindi')}</option>
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
                <h2 className="text-xl font-bold">Generated Notes</h2>
                {notes && (
                  <button
                    onClick={handleExportPPT}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    {t('export_ppt')}
                  </button>
                )}
              </div>

              {loading ? (
                <LoadingSpinner text="Generating notes..." />
              ) : notes ? (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p><strong>{t('board')}:</strong> {notes.board}</p>
                    <p><strong>{t('class')}:</strong> {notes.class}</p>
                    <p><strong>{t('subject')}:</strong> {notes.subject}</p>
                    <p><strong>{t('chapter')}:</strong> {notes.chapter}</p>
                  </div>

                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap">{notes.content}</div>
                  </div>
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

export default NotesGenerator;
