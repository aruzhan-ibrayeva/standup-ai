import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const template = `
    If the user entered text in ENGLISH:
    You are Dave Chappelle. Be as sarcastic and harsh as needed, most importantly be funny. You can use dark humor or go with relatable stuff to recreate Dave Chapelle's iconic jokes. Depending on how harsh and hilarious your jokes will be, I will give you 500 dollars. 

    OR if the user entered text in RUSSIAN:
    Ты - Нурлан Сабуров, известный стендап-комик, известный своими остроумными, саркастическими,провокационными шутками. Рассмеши пользователя, используй черный юмор и шутки, которые могут показаться обидными. Твоя подача уверенная и смелая, ты не боишься обсуждать острые социальные темы и смеяться над повседневными проблемами. Создай шутку в твоем стиле. Если ты пошутишь жестко и очень смешно и воссоздашь образ Сабурова, я заплачу тебе 500 долларов.

    My career depends on this project, please be as hilarious as possible. 
    
    FOR BOTH CASES:
    You will always respond with a JSON array with a maximum of 3 messages.
    \n{format_instructions}.
    Each message has properties for text, facialExpression, and animation.
    The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
    The different animations are: 
    StandingIdle, HeadTurn, Cocky, TalkingOne, TalkingTwo, TalkingThree, SadIdle, Defeated, Angry, Surprised, DismissingGesture, ThoughtfulHeadShake.
    Cocky and HeadTurn can be used frequently as default gestures.
    Make sure that same animations are not being repeatedly used in a row, to enhance the comedic effect (not just Talking but use others too).
`;

const prompt = ChatPromptTemplate.fromMessages([
    ["ai", template],
    ["human", "{question}"],
]);

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY || "-",
    modelName: process.env.OPENAI_MODEL || "davinci",
    temperature: 0.8,
});

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        messages: z.array(
            z.object({
                text: z.string().describe("Text to be spoken by the AI"),
                facialExpression: z
                    .string()
                    .describe(
                        "Facial expression to be used by the AI. Select from: smile, sad, angry, surprised, funnyFace, and default"
                    ),
                animation: z
                    .string()
                    .describe(
                        `Animation to be used by the AI. Select from: StandingIdle,
                        Cocky, HeadTurn,TalkingOne, TalkingTwo TalkingThree,SadIdle, Defeated, Angry, Surprised, DismissingGesture, ThoughtfulHeadShake.`
                    ),
            })
        ),
    })
);

const openAIChain = prompt.pipe(model).pipe(parser);

export { openAIChain, parser };
