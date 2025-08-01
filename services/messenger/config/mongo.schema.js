// Визначає схеми MongoDB для зберігання повідомлень і чатів.
// Використовується Mongoose для валідації даних.

const { Schema } = require('mongoose');

const MessageSchema = new Schema({
    messageId: { type: String, default: () => uuidv4() }, // Унікальний ID
    chatId: { type: String, required: true },              // ID чату
    senderId: { type: String, required: true },           // Хто відправив
    receiverIds: { type: [String], required: true },      // Одержувачі
    content: { type: String, required: true },            // Текст повідомлення
    type: {
        type: String,
        enum: ['text', 'image', 'file', 'system'],          // Тип вмісту
        default: 'text'
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],                // Статус доставки
        default: 'sent'
    },
    timestamp: { type: Date, default: Date.now }          // Час створення
});

module.exports = { MessageSchema };