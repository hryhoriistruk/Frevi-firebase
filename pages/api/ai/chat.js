import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { messages } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.7
        });

        res.status(200).json(response.choices[0].message);
    } catch (error) {
        console.error('OpenAI error:', error);
        res.status(500).json({ error: 'AI service failed' });
    }
}