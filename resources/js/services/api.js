import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

export const resumeAPI = {
    list: () => api.get('/resumes').then(r => (r.data?.data ?? r.data)),
    get: (id) => api.get(`/resumes/${id}`).then(r => (r.data?.data ?? r.data)),
    create: (data) => api.post('/resumes', data).then(r => (r.data?.data ?? r.data)),
    update: (id, data) => api.put(`/resumes/${id}`, data).then(r => (r.data?.data ?? r.data)),
    delete: (id) => api.delete(`/resumes/${id}`),
};

export const experienceAPI = {
    create: (data) => api.post('/experiences', data).then(r => r.data),
    update: (id, data) => api.put(`/experiences/${id}`, data).then(r => r.data),
    delete: (id) => api.delete(`/experiences/${id}`),
};

export const projectAPI = {
    create: (data) => api.post('/projects', data).then(r => r.data),
    update: (id, data) => api.put(`/projects/${id}`, data).then(r => r.data),
    delete: (id) => api.delete(`/projects/${id}`),
};

export const skillAPI = {
    create: (data) => api.post('/skills', data).then(r => r.data),
    update: (id, data) => api.put(`/skills/${id}`, data).then(r => r.data),
    delete: (id) => api.delete(`/skills/${id}`),
};

export const educationAPI = {
    create: (data) => api.post('/educations', data).then(r => r.data),
    update: (id, data) => api.put(`/educations/${id}`, data).then(r => r.data),
    delete: (id) => api.delete(`/educations/${id}`),
};

export const certificationAPI = {
    create: (data) => api.post('/certifications', data).then(r => r.data),
    update: (id, data) => api.put(`/certifications/${id}`, data).then(r => r.data),
    delete: (id) => api.delete(`/certifications/${id}`),
};

