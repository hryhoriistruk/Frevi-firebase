const functions = require("firebase-functions");
const AutoGPTService = require("./services/autogpt-service");

exports.generatePost = functions.https.onCall(async (data, _context) => {
    const { prompt } = data;
    if (!prompt) throw new Error("Prompt is required!");

    const generatedText = await AutoGPTService.generatePost(prompt);
    return { text: generatedText };
});