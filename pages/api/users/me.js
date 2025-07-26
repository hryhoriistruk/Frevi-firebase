import { getSession } from 'next-auth/react';
import pool from '@/lib/db';

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { rows } = await pool.query(
            'SELECT id, email, role, profile_data FROM users WHERE email = $1',
            [session.user.email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}