const express = require('express');
const app = express();
const port = 8080;

const { v4: uuidv4 } = require('uuid');                                             //to give unique id to each post

const path = require('path');

// use for edit or update route

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


app.use(express.urlencoded({ extended: true }));                                   // url encoded data ko parse karne ke liye

app.set("view engine", "ejs");                                                   // ejs ko set kiya
app.set("views", path.join(__dirname, "views"));                                // views ko set kiya

app.use(express.static(path.join(__dirname, "public")));                        // css file ko serve karne ke liye

let posts = [
    {
        id: uuidv4(),
        username: "utkarsh",
        content: "hello everyone"
    },
    {
        id: uuidv4(),
        username: "raj",
        content: "hello everyone"
    },
    {
        id: uuidv4(),
        username: "harsh",
        content: "hello everyone"
    },
    {
        id: uuidv4(),
        username: "shilpee",
        content: "hello everyone"
    }
]


//index route         using index.ejs


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

//new route  using new.ejs
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    // console.log(username,content);
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
})



//show route using show.ejs

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.send("Post not found"); // ✅ stops EJS crash
    }

    res.render("show.ejs", { post });
})


// update route   using edit.ejs


// 1) npm install method-override 
// 2)const methodOverride = require("method-override");
// 3)app.use(methodOverride("_method"));

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((p) => String(p.id) === id);

    if (!post) {
        return res.send("Post not found");
    }

    post.content = newContent;

    console.log(post);

    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => String(p.id) === id);

    if (!post) {
        return res.send("Post not found");
    }

    res.render("edit.ejs", { post });
});

app.listen(port, () => {
    console.log("server is listening port 8080");
});