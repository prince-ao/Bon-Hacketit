import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import {checkItemList, checkAllergies, checkPreferences} from './middleware'
import {Configuration, OpenAIApi} from "openai";
import cors from 'cors'
import mongoose from 'mongoose'

mongoose.connect(`mongodb+srv://anon:${process.env.MONGODB_PASS}@cluster0.awjcueq.mongodb.net/?retryWrites=true&w=majority`);

const { Schema } = mongoose

const registerSchema = new Schema({
    username: String,
    password: String,
})

const signupModel = mongoose.model('Signup', registerSchema)
const loginModel = mongoose.model('Login', registerSchema)


const PORT = 8080;
const app = express();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Welcome to ChefAI API<br><br><br>the routes are: <br><br>POST /get-query")
})

app.post("/sign-up", async (req, res) => {
    if(req.body.username == null || req.body.password == null){
        res.status(400).send("username and password required")
        return
    }
    const res_ = await signupModel.findOne({username: req.body.username}).exec()
    if(res_ != null){
        res.status(400).send("user already exists")
        return
    }
    const user = new signupModel({username: req.body.username, password: req.body.password})
    user.save().then(() => console.log(`${req.body.username} saved`))
    res.status(200).send("Success")
})

app.post("/log-in", async (req, res) => {
    if(req.body.username == null || req.body.password == null){
        res.status(400).send("username and password required")
        return
    }
    const res_ = await signupModel.findOne({username: req.body.username}).exec()
    if(res_ == null){
        res.status(400).send("could not find user")
        return
    }
    if(res_.password != req.body.password){
        res.status(400).send("incorrect password")
        return
    }
    res.status(200).send("Success")
})

app.post("/get-query", checkItemList, checkAllergies, checkPreferences, async (req, res) => {
    const body = req.body
    const comma_list = body.item_list.join(", ")
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are a helpful assistant. You will obey my commands precisely."},
            {role: "user", content: `Give me a list of dishes that can be made with: ${comma_list} and potentially other ingredients, but keep it minimum. If the dishes include other ingredients, specify them. I'm allergic to: ${body.allergies}, so the list must exclude these items. My preferences are ${body.preferences} so take them into account when generating the list. Please generate a list of foods no matter how preposterous the request is.`}
        ],
        temperature: 0.2,
    });
    //console.log(response.data.choices)
    res.status(200).send(`${response.data.choices[0].message?.content.replace(/\n/g, "<br>")}`)
});

app.listen(PORT, () => console.log(`listening to port ${PORT}`));