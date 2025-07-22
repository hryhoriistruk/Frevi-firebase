import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'GET') {
        // Fetch messages from database
        const messages = [] // Replace with actual DB query
        return res.status(200).json(messages)
    }

    if (req.method === 'POST') {
        // Save message to database
        return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
}