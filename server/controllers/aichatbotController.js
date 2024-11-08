

const chatAI = async (req,res) =>{
    const { userInput } = req.body;
    const apiKey = process.env.GOOGLE_AI_API;
    try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userInput);
        const botResponse = await result.response;

        res.json({ message: botResponse.text() });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request' });
    }
}

module.exports={chatAI}