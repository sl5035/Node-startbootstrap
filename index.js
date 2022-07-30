const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");

const validateMiddleWare = require("./middleware/validationMiddleWare");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const app = new express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use("/posts/store", validateMiddleWare);

app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.get("/", homeController);

app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/about.html'))
  res.render("about");
});

app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/contact.html'))
  res.render("contact");
});

app.get("/post/:id", getPostController);

app.get("/posts/new", newPostController);

app.post("/posts/store", storePostController);

app.get("/auth/register", newUserController);

app.post("/users/register", storeUserController);

app.get("/auth/login", loginController);

app.post("/users/login", loginUserController);
