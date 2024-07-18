import { execCommand } from "../utils/files.mjs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPhonemes = async ({ message }) => {
    try {
        const time = new Date().getTime();
        console.log(`Starting conversion for message ${message}`);

        await execCommand({
            command: `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
        });
        console.log(`Conversion done in ${new Date().getTime() - time}ms`);

        const rhubarbPath = 'rhubarb'; // Ensure 'rhubarb' is in your PATH
        const audioFilePath = join(__dirname, '../audios', `message_${message}.wav`);
        const outputFilePath = join(__dirname, '../audios', `message_${message}.json`);

        await execCommand({
            command: `${rhubarbPath} -f json -o ${outputFilePath} ${audioFilePath} -r phonetic`
        });
        console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
    } catch (error) {
        console.error(`Error while getting phonemes for message ${message}:`, error);
    }
};

export { getPhonemes };
