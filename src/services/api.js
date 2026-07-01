import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export const getProfile = () => api.get('/profile');
export const getSkills = () => api.get('/skills');
export const getProjects = () => api.get('/projects');
export const getExperience = () => api.get('/experience');
export const sendContact = (data) => api.post('/contact', data);
export const getEducation = () => api.get('/education');