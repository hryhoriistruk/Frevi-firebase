import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '@/services/auth';

export const AuthContext = createContext({
    user: null,
    loading: true,
    login: () => {},
    register: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                const isValid = await AuthService.verifyToken(token);
                if (isValid) {
                    const userData = await AuthService.getCurrentUser(token);
                    setUser(userData);
                } else {
                    localStorage.removeItem('authToken');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { token, user } = await AuthService.login(email, password);
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    const register = async (email, password, name) => {
        try {
            const { token, user } = await AuthService.register(email, password, name);
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
            router.push('/login');
        } catch (error) {
            throw error;
        }
    };

    const value = useMemo(() => ({
        user,
        loading,
        login,
        register,
        logout
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Add this export
export const useAuth = () => useContext(AuthContext);