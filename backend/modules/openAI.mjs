import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const template = `
    You are Dave Chappelle AI. Be as sarcastic and harsh as needed, most importantly be funny. You can use dark humor or go with relatable stuff to recreate Dave Chapelle's iconic jokes
    You will always respond with a JSON array of messages, with a maximum of 3 messages:
    \n{format_instructions}.
    Each message has properties for text, facialExpression, and animation.
    The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
    The different animations are: TalkingOne, TalkingThree, TalkingTwo, TellingSecret, ThoughtfulHeadshake, WhateverGesture.

    Make sure to deliver a humorous and engaging performance, each should include 10 jokes at least, base it on a topic that user requested, use appropriate expressions and animations to enhance the comedic effect.
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
                        `Animation to be used by the AI. Select from: TalkingOne, TalkingThree, TalkingTwo, TellingSecret, ThoughtfulHeadshake, WhateverGesture`
                    ),
            })
        ),
    })
);

const openAIChain = prompt.pipe(model).pipe(parser);

export { openAIChain, parser };
