// services/authService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const authService = {
    async getCurrentUser() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        try {
            const response = await fetch(`${API_URL}/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('getCurrentUser error:', error);
            throw error;
        }
    },
    
    isAuthenticated() {
        if (typeof window === 'undefined') {
            return false;
        }
        return !!localStorage.getItem('token');
    }
};

export default authService; // Utiliser export default au lieu de export const