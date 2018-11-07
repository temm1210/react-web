import axios from 'axios';

// question request
export const getQuestionList = () => axios.get('/question');
export const getQuestion     = (id) => axios.get(`/question/${id}`);
export const writeQuestion   = ( question ) => axios.post('/question',question);
export const deleteQuestion  = (id) => axios.delete(`/question/${id}`);
export const modifyQuestion  = (id,question) => axios.put(`/question/${id}`, question);

// auth request
export const join =  (user) => axios.post('/auth/join',user);
export const login = (user) => axios.post('/auth/login', user);
