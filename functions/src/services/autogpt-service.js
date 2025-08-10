const { AutoGPT } = require("../autogpt/autogpt");
const admin = require("firebase-admin");
const config = require("../autogpt/config");

admin.initializeApp();
const db = admin.firestore();

class AutoGPTService {
    static async generatePost(prompt) {
        const autogpt = new AutoGPT({
            apiKey: config.OPENAI_API_KEY,
            memoryBackend: config.MEMORY_BACKEND,
            firestore: db,
        });

        const response = await autogpt.run([
            { role: "user", content: prompt }
        ]);

        return response;
    }
}

module.exports = AutoGPTService;