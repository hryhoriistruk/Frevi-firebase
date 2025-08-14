import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';

const MessengerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MessagesList = styled.div`
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 10px;
    background-color: white;
    border-radius: 8px;
`;

const Message = styled.div`
    padding: 8px 12px;
    margin-bottom: 8px;
    background-color: #e3f2fd;
    border-radius: 4px;
`;

const MessageInput = styled.div`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #005bb5;
    }
`;

export default function Messenger() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        const res = await fetch('/api/messages');
        const data = await res.json();
        setMessages(data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const sendMessage = async () => {
        if (!newMessage.trim()) return; // Не відправляти порожні повідомлення
        await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: newMessage,
                userId: session.user.id,
            }),
        });
        setNewMessage('');
        fetchMessages();
    };

    return (
        <MessengerContainer>
            <MessagesList>
                {messages.map(msg => (
                    <Message key={msg.id}>
                        <strong>{msg.user.name}:</strong> {msg.text}
                    </Message>
                ))}
            </MessagesList>
            <MessageInput>
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <Button onClick={sendMessage}>Send</Button>
            </MessageInput>
        </MessengerContainer>
    );
}
