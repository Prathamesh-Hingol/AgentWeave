import { inngest } from "./client";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import {generateText} from "ai"

export const helloWorld= inngest.createFunction(
    {id:"execute-ai"},
    {event:"execute/ai"},
    async ({event,step})=>{
        const {steps}= await step.ai.wrap("gemini=generate-text",generateText,{
            model:google("gemini-3.5-flash"),
            system:"you are a helpfull asssistance",
            prompt:"what is 2+2?"
        })
        return steps;
    }
)