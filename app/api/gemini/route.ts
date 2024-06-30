import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai"
import prompts from "@/prompts/data.json"


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
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const POST = async (req: Request) => {
    const body = await req.json()
    try {
        const parts = [
            ...prompts,
            { text: `input: ${body.prompt}` },
            { text: "output: " },
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
        console.log(e)
        return Response.json({
            error: "An error occurred"
        }, {
            status: 500
        })
    }
}