const express = require('express');
const app = express();

const path = require('path');


const Chat = require("./models/chat.js");



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

// database connection

const mongoose = require('mongoose');

main()
    .then(()=>{
        console.log("database connected");
    }).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat_box');
}



app.get("/",(req,res) =>{
    res.send("root is working");
})

app.get("/chats",(req,res) =>{
    res.send("chats");
})

app.listen(8080, ()=>{
    console.log("server is running on port 8080");
})