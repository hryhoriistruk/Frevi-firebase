import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Skip during SSR
        if (typeof window === 'undefined') {
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        if (token) {
            // Simulate fetching user data
            setTimeout(() => {
                setUser({ id: 'user-123', name: 'John Doe', email: 'john@example.com' });
                setLoading(false);
            }, 500);
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        // Simulate login
        localStorage.setItem('token', 'dummy-token-123');
        setUser({ id: 'user-123', name: 'John Doe', email });
        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};