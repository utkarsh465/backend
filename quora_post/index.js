const express = require('express');
const app = express();
const port = 8080;

const path = require('path');


app.use(express.urlencoded({ extended: true }));             // url encoded data ko parse karne ke liye

app.set("view engine", "ejs");                   // ejs ko set kiya
app.set("views", path.join(__dirname, "views")); // views ko set kiya

app.use(express.static(path.join(__dirname, "public")));          // css file ko serve karne ke liye

let posts = [
    {
        id:"1a",
        username: "utkarsh",
        content: "hello everyone"
    },
    {
        id:"2a",
        username: "raj",
        content: "hello everyone"
    },
    {
        id:"3a",
        username: "harsh",
        content: "hello everyone"
    },
    {
        id:"4a",        
        username: "shilpee",
        content: "hello everyone"
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    // console.log(username,content);
    posts.push({username,content});
    res.redirect("/posts");
})

app.patch("/posts",(req,res)=>{
    let {username,content} = req.body;
    // console.log(username,content);
    posts.push({username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) =>{
    res.render("show.ejs");
})

app.listen(port, () => {
    console.log("server is listening port 8080");
});