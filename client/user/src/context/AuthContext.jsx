import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('hospital_admin');
        const token = localStorage.getItem('hospital_token');
        if (savedUser && token) {
            try {
                setUser(JSON.parse(savedUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (err) {
                console.error("Auth initialization error:", err);
                localStorage.removeItem('hospital_admin');
                localStorage.removeItem('hospital_token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post('/api/auth/login', { username, password });
            if (res.data.success) {
                const userData = res.data.user;
                const token = res.data.token;
                
                setUser(userData);
                localStorage.setItem('hospital_admin', JSON.stringify(userData));
                localStorage.setItem('hospital_token', token);
                
                // Set default header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return { success: true };
            }
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed. Please check your credentials.' 
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hospital_admin');
        localStorage.removeItem('hospital_token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
