import { Request, Response, NextFunction } from "express";
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function checkAllergies(req: Request, res: Response, next: NextFunction) {
    const body = req.body
    let allergies = body.allergies
    if(allergies == null){
        res.status(400).send({
            message: "expected allergies in body"
        });
        return;
    }
    console.log(allergies)
    if(allergies.includes("nothing")){
        next();
        return;
    }
    const openai = new OpenAIApi(configuration);
    setTimeout(async () => {
        const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are a helpful assistant. You will obey my commands precisely."},
            {role: "user", content: `Answer me with only a single "yes" or "no"(no double quotes). Is this message talk only about allergies: "${allergies}"`}
        ],
        temperature: 0,
        });
        console.log(response.data.choices)
        const lowerCaseStr = response.data.choices[0].message?.content.toLowerCase();
        if(lowerCaseStr?.includes("no")){
            res.status(401).send("expected message about allergies")
            return;
        }
        next();
    }, 5000);
}