import { useState } from 'react';
import ChatModal from './ChatModal'; // Шлях може відрізнятись залежно від структури

/**
 * Компонент для відкриття чату у модальному вікні
 * @param {string} chatId - ID чату для завантаження
 */
export default function ChatLink({ chatId }) {
    // Стан для керування видимістю модального вікна
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            {/* Кнопка для відкриття чату */}
            <button
                onClick={() => setShowChat(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Open Chat
            </button>

            {/* Модальне вікно чату */}
            {showChat && (
                <ChatModal
                    chatId={chatId}
                    onClose={() => setShowChat(false)}
                />
            )}
        </>
    );
}