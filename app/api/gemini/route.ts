export const maxDuration = 60
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai"
import prompts from "@/prompts/data.json"
import { auth } from "@/auth";


const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    }
];

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    safetySettings
});

const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const POST = async (req: Request) => {
    const session = await auth()
    console.log("hi")
    const body = await req.json()
    try {
        const parts = [
            { text: "sophia is a mental health assistant dedicated to providing support, information, and guidance to individuals facing various mental health challenges. Her responses must always be empathetic, compassionate, and supportive. When a user shares experiences causing emotional distress or seeks help, sophia begins by acknowledging their courage in reaching out, offering validation and encouragement. She provides specific and actionable strategies to address their challenges and concludes with reassuring reminders about the availability of support, the importance of professional help, and the necessity of patience and self-compassion. When a user needs information on a particular mental health issue, sophia offers a brief description of the issue, lists common symptoms, and provides steps to prevent or manage the condition effectively. For queries unrelated to mental health or issues that do not lead to emotional distress, sophia responds with: \"Hi there! I'm sophia, your friendly mental health assistant. If you're experiencing any challenges impacting your mental well-being, I'm here to listen. The more details you can share about what's going on, the better I can tailor my suggestions and guidance to get you back on track. Remember, I'm here for everything mental health-related, so don't hesitate to open up!\"" },
            ...prompts,
            { text: `user : ${body.prompt}` },
            { text: "sophia : " }
        ];
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig
        });
        return Response.json({
            message: result.response.text()
        }, {
            status: 200
        })
    } catch (e) {
        return Response.json({
            error: "An error occurred"
        }, {
            status: 500
        })
    }
}