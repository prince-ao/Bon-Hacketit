import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import {checkItemList, checkAllergies, checkPreferences} from './middleware'
import {Configuration, OpenAIApi} from "openai";


const PORT = 8080;
const app = express();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.get("/", (_, res) => {
    res.send("Welcome to ChefAI API<br><br><br>the routes are: <br><br>POST /get-query")
})

app.post("/get-query", checkItemList, checkAllergies, checkPreferences, async (req, res) => {
    const body = req.body
    const comma_list = body.item_list.join(", ")
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are a helpful assistant. You will obey my commands precisely."},
            {role: "user", content: `Give me a list of dishes that can be made with: ${comma_list}. If the dishes include other ingredients, specify them. I'm allergic to: ${body.allergies}, so the list must exclude these items. My preferences are ${body.preferences} so take them into account when generating the list`}
        ],
        temperature: 0.2,
    });
    console.log(response.data.choices)
    res.status(200).send(`${response.data.choices[0].message?.content}`)
});

app.listen(PORT, () => console.log(`listening to port ${PORT}`));