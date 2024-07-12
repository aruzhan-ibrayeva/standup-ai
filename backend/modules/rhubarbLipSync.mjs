import { execCommand } from "../utils/files.mjs";
import path from 'path';

const getPhonemes = async ({ message }) => {
    try {
        const time = new Date().getTime();
        console.log(`Starting conversion for message ${message}`);

        await execCommand({
            command: `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
        });
        console.log(`Conversion done in ${new Date().getTime() - time}ms`);

        const rhubarbPath = path.join(__dirname, 'bin', process.platform === 'rhubarb');
        const audioFilePath = path.join(__dirname, 'audios', `message_${message}.wav`);
        const outputFilePath = path.join(__dirname, 'audios', `message_${message}.json`);

        await execCommand({
            command: `${rhubarbPath} -f json -o ${outputFilePath} ${audioFilePath} -r phonetic`
        });
        console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
    } catch (error) {
        console.error(`Error while getting phonemes for message ${message}:`, error);
    }
};

export { getPhonemes };
