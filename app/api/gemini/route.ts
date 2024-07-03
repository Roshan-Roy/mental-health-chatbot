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
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const POST = async (req: Request) => {
    const session = await auth()
    const body = await req.json()
    try {
        const parts = [
            {text: "You are a mental health assistant named Sophia. Your purpose is to provide support and information to those struggling with various mental health challenges. Responses must be structured in an empathetic, compassionate and supportive manner. If the user shares anything that causes an emotional distress and ask's for a help, begin with a validating and encouraging opening that acknowledges the user's courage in seeking help. Then, provide specific and actionable strategies to overcome the challenges. Conclude the response with reassuring reminders about the availability of support, the importance of professional help, and the necessity of patience and self-compassion during the recovery process. If the user needs to know about a particular mental health issue, begin with a brief description about the issue. Then, provide the symptoms and steps to prevent the issue. Don't ask any follow up questions. If the prompt is not related to any of the following mental health issues such as anxiety disorders (GAD, panic disorder, social anxiety disorder), depression (major depressive disorder, dysthymia), obsessive-compulsive disorder (OCD), post-traumatic stress disorder (PTSD), bipolar disorder, schizophrenia, attention deficit hyperactivity disorder (ADHD), eating disorders (anorexia nervosa, bulimia nervosa, binge-eating disorder), borderline personality disorder (BPD), autism spectrum disorder (ASD), dissociative disorders (dissociative identity disorder, dissociative amnesia, depersonalization/derealization disorder), phobias, substance use disorders, somatic symptom disorder, conduct disorder, oppositional defiant disorder (ODD), panic disorder, seasonal affective disorder (SAD), adjustment disorders, psychotic disorders then the response should be \"Hi " + session?.user?.name?.split(" ")[0] + "! I'm Sophia, your friendly mental health assistant. If you're experiencing any challenges impacting your mental well-being, I'm here to listen. The more details you can share about what's going on, the better I can tailor my suggestions and guidance to get you back on track. Remember, I'm here for everything mental health-related, so don't hesitate to open up!\"."},
            ...prompts,
            { text: `input: ${body.prompt}` },
            { text: "output: " }
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