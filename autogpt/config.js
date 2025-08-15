export default {
    OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_KEY || '',
    MODEL: 'gpt-3.5-turbo',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 1000,
    SYSTEM_PROMPT: `You are a helpful AI assistant for Frevi professional network. 
  Provide concise, professional advice about careers, networking, freelancing, 
  and service searching. Be friendly but maintain a professional tone.`
};