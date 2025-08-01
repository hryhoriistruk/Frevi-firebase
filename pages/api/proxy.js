// pages/api/proxy.js
export default async function handler(req, res) {
    const { path } = req.query;
    const apiUrl = `${process.env.BACKEND_URL}/${path.join('/')}`;

    const options = {
        headers: {
            'Authorization': req.headers.authorization || '',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(apiUrl, {
            ...options,
            method: req.method,
            body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}