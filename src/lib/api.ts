
 import axios from 'axios';

 const api = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL,
     headers: {
         'Content-Type': 'application/json',
     }
 });
 
 // Intercepteur pour ajouter le token à chaque requête
 api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
         config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
 });

 api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Redirige l'utilisateur vers la page de login en cas d'erreur 401
            window.location.href = '/login';
        }

        // Gestion d'autres types d'erreurs
        return Promise.reject(error);
    }
);
 
 export default api;