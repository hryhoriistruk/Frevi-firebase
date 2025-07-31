export const generateAIResponse = async (prompt) => {
    const cacheKey = `ai-${prompt}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const response = await fetch('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] })
    });

    const result = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify(result));
    return result;
};
