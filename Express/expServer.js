
const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send("Hello Sir, Welcome to the Hotal... How i can help you?");
});

app.get('/chicken',function(req,res){
    res.send("Sure Sir,I would love to serve chicken");
});

app.get('/idli',function(req,res){
    res.send("Welcoome to south india and would love to serve idli");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});

