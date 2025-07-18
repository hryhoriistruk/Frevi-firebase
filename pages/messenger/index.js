import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function Messenger() {
    const { data: session } = useSession()
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const fetchMessages = async () => {
        const res = await fetch('/api/messages')
        const data = await res.json()
        setMessages(data)
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    const sendMessage = async () => {
        await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: newMessage,
                userId: session.user.id
            }),
        })
        setNewMessage('')
        fetchMessages()
    }

    return (
        <div className="messenger-container">
            <div className="messages-list">
                {messages.map(msg => (
                    <div key={msg.id} className="message">
                        <strong>{msg.user.name}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}