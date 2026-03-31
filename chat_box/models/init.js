const Chat = require('./chat.js');

// database connection

const mongoose = require('mongoose');

main()
    .then(()=>{
        console.log("database connected");
    }).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat_box');
}

const allChats = [
    {
    from:"peter",
    to:"tony",
    msg:"hello sir!!",
    createdAt: new Date(),
    },
    {
    from:"peter",
    to:"tony",
    msg:"how are you",
    createdAt: new Date(),
    },
    {
    from:"peter",
    to:"tony",
    msg:"i am fine",
    createdAt: new Date(),
    },
];

Chat.insertMany(allChats).then(() =>{
    console.log("all chats inserted");
}).catch(err => console.log(err));
