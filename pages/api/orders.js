import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'POST') {
        // Save order to database
        return res.status(201).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
}