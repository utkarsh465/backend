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
        content: "hello everyone",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
    },
    {
        id: uuidv4(),
        username: "raj",
        content: "Coding is fun!",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
    },
    {
        id: uuidv4(),
        username: "harsh",
        content: "Look at this view!",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
    },
    {
        id: uuidv4(),
        username: "shilpee",
        content: "Enjoying the nature.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
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
    let { courseCode,
    courseName,
    semester,
    instructor,
    classRoom,
    dayOfWeek,
    startTime,
    endTime,
    credits,
    capacity,
    academicYear } = req.body;
    // console.log(username,content);
    let id = uuidv4();
    posts.push({ id, courseCode, courseName, semester, instructor, classRoom, dayOfWeek, startTime, endTime, credits, capacity, academicYear });
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



// delete route

app.delete("/posts/:id",(req,res) =>{
    let { id } = req.params;

    posts = posts.filter((p) => String(p.id) !== id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("server is listening port 8080");
});