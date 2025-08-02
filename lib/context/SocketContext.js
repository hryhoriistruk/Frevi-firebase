import { createContext, useState, useEffect, useContext } from 'react';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && !socket) {
                const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`);

                newSocket.onopen = () => console.log('WebSocket connected');
                newSocket.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        setMessages(prev => [...prev, message]);
                    } catch (error) {
                        console.error('Failed to parse WebSocket message', error);
                    }
                };

                newSocket.onclose = () => {
                    console.log('WebSocket disconnected');
                    setTimeout(() => setSocket(null), 5000);
                };

                setSocket(newSocket);
                return () => newSocket.close();
            }
        }
    }, []);

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    };

    return (
        <SocketContext.Provider value={{ socket, messages, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};