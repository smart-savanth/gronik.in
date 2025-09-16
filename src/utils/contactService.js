import api from './api';    
export const saveContact = (data) => api.post("/contact/saveContact", data);
