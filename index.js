const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost.js");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const app = new express();
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", {
    blogposts,
  });
});

app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/about.html'))
  res.render("about");
});

app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/contact.html'))
  res.render("contact");
});

app.get("/posts", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/post.html'))
  res.render("post");
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", async (req, res) => {
  // model creates a new doc with browser data
  await BlogPost.create(req.body);
  res.redirect("/");
});
