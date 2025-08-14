// components/services/MessageList.js
import { motion } from 'framer-motion';

export default function MessageList({ messages, currentUserId, variants }) {
    return (
        <div className="space-y-3">
            {messages.map((message, index) => (
                <motion.div
                    key={message.id || index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                            message.senderId === currentUserId
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-white text-gray-800 rounded-bl-none shadow'
                        }`}
                    >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                            message.senderId === currentUserId ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                            {new Date(message.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}