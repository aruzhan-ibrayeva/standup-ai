import ElevenLabs from "elevenlabs-node";
import dotenv from "dotenv";
dotenv.config();

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const modelID = process.env.ELEVEN_LABS_MODEL_ID;

const voiceIds = {
    Saburov: process.env.SABUROV_VOICE_ID,
    Kharlamov: process.env.KHARLAMOV_VOICE_ID,
    DaveChapelle: process.env.DAVE_CHAPELLE_VOICE_ID,
};

const voice = new ElevenLabs({
    apiKey: elevenLabsApiKey,
});

async function convertTextToSpeech({ text, fileName, comedian }) {
    const voiceID = voiceIds[comedian];
    console.log(`Converting text to speech for ${comedian} with voice ID: ${voiceID}`);
    if (!voiceID) {
        console.error(`Voice ID for ${comedian} not found!`);
        throw new Error(`Voice ID for ${comedian} not found!`);
    }
    await voice.textToSpeech({
        fileName: fileName,
        textInput: text,
        voiceId: voiceID,
        stability: 0.4,
        similarityBoost: 0.75,
        modelId: modelID,
        style: 0.1,
        speakerBoost: true,
    });
}

export { convertTextToSpeech, voice };
