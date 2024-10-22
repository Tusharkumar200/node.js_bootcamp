
const  express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json());
require("dotenv").config();


app.get("/",(req,res)=>{
    res.send("Hello Tushar , Gemini is here");
})

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "talk about the future of technology";

const generate =async (prompt)=>{

    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());

        return result.response.text();

    }catch(e){
        console.log(e);
    }
}

// generate();

app.get('/api/content', async(req, res)=>{

    try{

        const data = req.body.question;
        const result = await model.generateContent(data);
        res.send({
            "result": result
        })
        console.log(result.response.text());
    }catch(e){
        console.log(e);
    }
})

// * run it on postman  -->  localhost:3000/api/content
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});