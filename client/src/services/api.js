// API client service for Dulingo
const API_BASE = '/api';

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('dulingo_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'API request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const authService = {
  register: (userData) =>
    apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getMe: () => apiClient('/auth/me'),

  updateMe: (updates) =>
    apiClient('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  logout: () =>
    apiClient('/auth/logout', {
      method: 'POST',
    }),

  verifyTeacherRole: () => apiClient('/auth/verify-role/teacher'),
  verifyLearnerRole: () => apiClient('/auth/verify-role/learner'),

  getHealth: () => apiClient('/health'),

  // Categories & Lessons (Part 2 & Part 3)
  getCategories: () => apiClient('/categories'),
  getCategory: (slug) => apiClient(`/categories/${slug}`),

  getLessons: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.set('category', params.category);
    if (params.language) searchParams.set('language', params.language);
    if (params.search) searchParams.set('search', params.search);
    if (params.difficulty) searchParams.set('difficulty', params.difficulty);
    const queryString = searchParams.toString();
    return apiClient(`/lessons${queryString ? `?${queryString}` : ''}`);
  },

  getLesson: (id) => apiClient(`/lessons/${id}`),

  // Progress tracking
  completeLesson: (id) =>
    apiClient(`/progress/lessons/${id}/complete`, {
      method: 'POST',
    }),

  getMyProgress: () => apiClient('/progress/me'),

  // Teacher Studio operations
  getTeacherLessons: () => apiClient('/teacher/lessons'),
  createTeacherLesson: (lessonData) =>
    apiClient('/teacher/lessons', {
      method: 'POST',
      body: JSON.stringify(lessonData),
    }),
  updateTeacherLesson: (id, updates) =>
    apiClient(`/teacher/lessons/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
  togglePublishLesson: (id) =>
    apiClient(`/teacher/lessons/${id}/publish`, {
      method: 'POST',
    }),
  deleteTeacherLesson: (id) =>
    apiClient(`/teacher/lessons/${id}`, {
      method: 'DELETE',
    }),
};
