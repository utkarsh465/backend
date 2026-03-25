const express = require('express');
const app = express();
const port = 8080;

const { v4: uuidv4 } = require('uuid');                                             //to give unique id to each post

const path = require('path');


app.use(express.urlencoded({ extended: true }));                                   // url encoded data ko parse karne ke liye

app.set("view engine", "ejs");                                                   // ejs ko set kiya
app.set("views", path.join(__dirname, "views"));                                // views ko set kiya

app.use(express.static(path.join(__dirname, "public")));                        // css file ko serve karne ke liye

let posts = [
    {
        id:uuidv4(),
        username: "utkarsh",
        content: "hello everyone"
    },
    {
        id:uuidv4(),
        username: "raj",
        content: "hello everyone"
    },
    {
        id:uuidv4(),
        username: "harsh",
        content: "hello everyone"
    },
    {
        id:uuidv4(),
        username: "shilpee",
        content: "hello everyone"
    }
]


//index route

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

//new route

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    // console.log(username,content);
    let id = uuidv4();
    posts.push({ id,username, content });
    res.redirect("/posts");
})

//show route

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
   let post = posts.find((p) => id === p.id);

   if (!post) {
        return res.send("Post not found"); // ✅ stops EJS crash
    }
    
    res.render("show.ejs",{post});
})


// update route




app.listen(port, () => {
    console.log("server is listening port 8080");
});