import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { openAIChain, parser } from "./modules/openAI.mjs";
import { lipSync } from "./modules/lip-sync.mjs";
import { sendDefaultMessages, defaultResponse } from "./modules/defaultMessages.mjs";
import { convertAudioToText } from "./modules/whisper.mjs";
import { convertTextToSpeech } from "./modules/elevenLabs.mjs";
import { getPhonemes } from "./modules/rhubarbLipSync.mjs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get("/voices", async (req, res) => {
    res.send(await voice.getVoices(elevenLabsApiKey));
});

app.post("/tts", async (req, res) => {
    const { message, comedian } = req.body;
    console.log("Received TTS request with comedian:", comedian);
    const defaultMessages = await sendDefaultMessages({ userMessage: message });
    if (defaultMessages) {
        res.send({ messages: defaultMessages });
        return;
    }
    let openAImessages;
    try {
        openAImessages = await openAIChain(comedian).invoke({
            question: message,
            format_instructions: parser.getFormatInstructions(),
        });
    } catch (error) {
        openAImessages = defaultResponse;
    }
    console.log("openAImessages:", openAImessages); 

    openAImessages = await lipSync({ messages: openAImessages.messages, comedian });

    res.send({ messages: openAImessages });
});

app.post("/sts", async (req, res) => {
    const { audio, comedian } = req.body;
    console.log("Received STS request with comedian:", comedian); 
    const audioData = Buffer.from(audio, "base64");
    const userMessage = await convertAudioToText({ audioData });
    let openAImessages;
    try {
        openAImessages = await openAIChain(comedian).invoke({
            question: userMessage,
            format_instructions: parser.getFormatInstructions(),
        });
    } catch (error) {
        openAImessages = defaultResponse;
    }
    console.log("openAImessages:", openAImessages); 

    openAImessages = await lipSync({ messages: openAImessages.messages, comedian });

    res.send({ messages: openAImessages });
});

app.listen(port, () => {
    console.log(`Server is listening to you on port ${port}`);
});
