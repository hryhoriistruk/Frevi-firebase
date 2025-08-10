import { getFunctions, httpsCallable } from "firebase/functions";

const generatePost = async (prompt) => {
    const functions = getFunctions();
    const generatePostCallable = httpsCallable(functions, "generatePost");

    try {
        const result = await generatePostCallable({ prompt });
        console.log("Generated Post:", result.data.text);
        return result.data.text;
    } catch (error) {
        console.error("AutoGPT Error:", error);
        return null;
    }
};

// Example usage:
generatePost("Write a professional LinkedIn post about AI trends.");