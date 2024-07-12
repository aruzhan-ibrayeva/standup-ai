import { audioFileToBase64, readJsonTranscript } from "../utils/files.mjs";
import dotenv from "dotenv";
dotenv.config();

const openAIApiKey = process.env.OPENAI_API_KEY;
const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;

async function sendDefaultMessages({ userMessage }) {
    let messages;
    if (!elevenLabsApiKey || !openAIApiKey) {
        messages = [
            {
                text: "Bro check your API keys",
                audio: await audioFileToBase64({ fileName: "audios/api_0.wav" }),
                lipsync: await readJsonTranscript({ fileName: "audios/api_0.json" }),
                facialExpression: "smile",
                animation: "TalkingTwo",
            },
            {
                text: "Bruh just so you know, Dave Chapelle's performance isn't free, you don't want to ruin this performance because of going out of bill right?",
                audio: await audioFileToBase64({ fileName: "audios/api_1.wav" }),
                lipsync: await readJsonTranscript({ fileName: "audios/api_1.json" }),
                facialExpression: "smile",
                animation: "Angry",
            },
        ];
        return messages;
    }
}

const defaultResponse = [
    {
        text: "Sometimes my brain stops working, cause I am not real Dave Chapelle, can you repeat that?",
        facialExpression: "sad",
        animation: "Idle",
    },
];

export { sendDefaultMessages, defaultResponse };
