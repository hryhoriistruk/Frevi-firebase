import { useState, useEffect, useRef } from 'react';
import { FiSend, FiPaperclip, FiSmile, FiMoreVertical, FiSearch } from 'react-icons/fi';

export default function MessengerPage() {
    // Состояния для управления чатами и сообщениями
    const [messages, setMessages] = useState({
        john: [
            { id: 1, text: "Привіт! Як справи?", sender: "john", time: "10:30", status: "read" },
        ],
        jane: [
            { id: 1, text: "Доброго дня!", sender: "jane", time: "09:15", status: "read" },
        ],
        team: [
            { id: 1, text: "Meeting at 3pm tomorrow", sender: "alex", time: "14:45", status: "read" },
        ]
    });

    const [newMessage, setNewMessage] = useState("");
    const [activeChat, setActiveChat] = useState("john");
    const [currentUser, setCurrentUser] = useState("user"); // Текущий пользователь
    const messagesEndRef = useRef(null);

    // Список чатов
    const chats = [
        { id: "john", name: "John Doe", avatar: "JD", lastMessage: "Привіт! Як справи?", unread: 0, online: true },
        { id: "jane", name: "Jane Smith", avatar: "JS", lastMessage: "Доброго дня!", unread: 2, online: false },
        { id: "team", name: "Work Group", avatar: "WG", lastMessage: "Meeting at 3pm", unread: 5, online: true }
    ];

    // Прокрутка к последнему сообщению
    useEffect(() => {
        scrollToBottom();
    }, [messages, activeChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Отправка сообщения
    const handleSend = () => {
        if (!newMessage.trim()) return;

        const newMsg = {
            id: Date.now(),
            text: newMessage,
            sender: currentUser,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent"
        };

        // Обновляем сообщения в активном чате
        setMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), newMsg]
        }));

        setNewMessage("");

        // В реальном приложении здесь бы отправлялось сообщение на сервер
        // и получался бы ответ через WebSocket или аналогичную технологию
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Переключение между чатами
    const handleChatChange = (chatId) => {
        setActiveChat(chatId);
        // Помечаем сообщения как прочитанные
        setMessages(prev => {
            const updatedMessages = {...prev};
            if (updatedMessages[chatId]) {
                updatedMessages[chatId] = updatedMessages[chatId].map(msg => ({
                    ...msg,
                    status: "read"
                }));
            }
            return updatedMessages;
        });
    };

    // Переключение пользователя (для демонстрации)
    const switchUser = () => {
        setCurrentUser(prev => prev === "user" ? "user2" : "user");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Боковая панель с чатами */}
            <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Messages</h2>
                    <button
                        onClick={switchUser}
                        className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded"
                    >
                        Switch User
                    </button>
                </div>

                {/* Поиск */}
                <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages"
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Список чатов */}
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeChat === chat.id ? 'bg-blue-50' : ''}`}
                            onClick={() => handleChatChange(chat.id)}
                        >
                            <div className={`relative mr-3 ${chat.online ? 'online' : ''}`}>
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                    {chat.avatar}
                                </div>
                                {chat.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-medium truncate">{chat.name}</h3>
                                    <span className="text-xs text-gray-500">
                                        {messages[chat.id]?.[messages[chat.id]?.length - 1]?.time}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500 truncate">
                                        {messages[chat.id]?.[messages[chat.id]?.length - 1]?.text}
                                    </p>
                                    {chat.unread > 0 && (
                                        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Область чата */}
            <div className="flex-1 flex flex-col">
                {/* Заголовок чата */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center">
                        <div className="relative mr-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                {chats.find(c => c.id === activeChat)?.avatar}
                            </div>
                            {chats.find(c => c.id === activeChat)?.online && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-medium">{chats.find(c => c.id === activeChat)?.name}</h3>
                            <p className="text-xs text-gray-500">
                                {chats.find(c => c.id === activeChat)?.online ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        <FiMoreVertical />
                    </button>
                </div>

                {/* Сообщения */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                    <div className="space-y-3">
                        {messages[activeChat]?.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === currentUser ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                >
                                    <p>{msg.text}</p>
                                    <div className={`flex items-center justify-end mt-1 text-xs ${msg.sender === currentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                                        <span>{msg.time}</span>
                                        {msg.sender === currentUser && (
                                            <span className="ml-1">
                                                {msg.status === 'read' ? '✓✓' : '✓'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Поле ввода сообщения */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center">
                        <button className="p-2 text-gray-500 hover:text-gray-700 mr-2">
                            <FiPaperclip />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 mr-2">
                            <FiSmile />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                            className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            <FiSend />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .online::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 10px;
                    height: 10px;
                    background-color: #10B981;
                    border-radius: 50%;
                    border: 2px solid white;
                }
            `}</style>
        </div>
    );
}