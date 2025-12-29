import api from './api';

export interface QuestionPaperData {
  board: string;
  class: number;
  subject: string;
  chapter: string;
  difficulty?: string;
  language?: string;
}

export interface NotesData {
  board: string;
  class: number;
  subject: string;
  chapter: string;
  language?: string;
}

export const questionService = {
  generateQuestionPaper: async (data: QuestionPaperData) => {
    const response = await api.post('/api/questions', data);
    return response.data;
  },

  getQuestionPapers: async (page = 1, limit = 10) => {
    const response = await api.get(`/api/questions?page=${page}&limit=${limit}`);
    return response.data;
  },

  getQuestionPaperById: async (id: string) => {
    const response = await api.get(`/api/questions/${id}`);
    return response.data;
  },

  exportQuestionPaperPDF: async (id: string) => {
    const response = await api.get(`/api/questions/${id}/export`, {
      responseType: 'blob'
    });
    return response.data;
  },

  deleteQuestionPaper: async (id: string) => {
    const response = await api.delete(`/api/questions/${id}`);
    return response.data;
  }
};

export const notesService = {
  generateNotes: async (data: NotesData) => {
    const response = await api.post('/api/notes', data);
    return response.data;
  },

  getNotes: async (page = 1, limit = 10) => {
    const response = await api.get(`/api/notes?page=${page}&limit=${limit}`);
    return response.data;
  },

  getNotesById: async (id: string) => {
    const response = await api.get(`/api/notes/${id}`);
    return response.data;
  },

  exportNotesPPT: async (id: string) => {
    const response = await api.get(`/api/notes/${id}/export`, {
      responseType: 'blob'
    });
    return response.data;
  },

  deleteNotes: async (id: string) => {
    const response = await api.delete(`/api/notes/${id}`);
    return response.data;
  }
};

export const answerService = {
  uploadAnswerSheet: async (formData: FormData) => {
    const response = await api.post('/api/answers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getAnswerSheets: async (page = 1, limit = 10, status?: string) => {
    const url = status 
      ? `/api/answers?page=${page}&limit=${limit}&status=${status}`
      : `/api/answers?page=${page}&limit=${limit}`;
    const response = await api.get(url);
    return response.data;
  },

  getAnswerSheetById: async (id: string) => {
    const response = await api.get(`/api/answers/${id}`);
    return response.data;
  },

  updateEvaluation: async (id: string, data: any) => {
    const response = await api.put(`/api/answers/${id}`, data);
    return response.data;
  }
};

export const performanceService = {
  createPerformance: async (data: any) => {
    const response = await api.post('/api/performance', data);
    return response.data;
  },

  getPerformanceRecords: async (studentId?: string, subject?: string) => {
    let url = '/api/performance?';
    if (studentId) url += `student_id=${studentId}&`;
    if (subject) url += `subject=${subject}&`;
    const response = await api.get(url);
    return response.data;
  },

  getStudentAnalytics: async (studentId: string) => {
    const response = await api.get(`/api/performance/student/${studentId}`);
    return response.data;
  },

  exportPerformanceReport: async (id: string) => {
    const response = await api.get(`/api/performance/${id}/export`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
