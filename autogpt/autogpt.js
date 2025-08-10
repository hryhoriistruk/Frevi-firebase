import OpenAI from 'openai';
import config from './config.js';

export class AutoGPT {
    constructor(options = {}) {
        this.config = {
            ...config,
            ...options
        };

        this.openai = new OpenAI({
            apiKey: this.config.OPENAI_API_KEY,
        });
    }

    async run(messages) {
        try {
            const response = await this.openai.chat.completions.create({
                model: this.config.MODEL,
                messages,
                temperature: this.config.TEMPERATURE,
                max_tokens: this.config.MAX_TOKENS
            });

            return response.choices[0]?.message?.content;
        } catch (error) {
            console.error('AutoGPT Error:', error);
            return "I encountered an error processing your request.";
        }
    }
}

export default AutoGPT;