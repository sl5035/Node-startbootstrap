const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");

const validateMiddleWare = require("./middleware/validationMiddleWare");
const authMiddleWare = require("./middleware/authMiddleWare");
const redirectIfAuthenticatedMiddleWare = require("./middleware/redirectIfAuthenticatedMiddleWare");

mongoose.connect(
  "mongodb+srv://Admin:SECRET_API.mongodb.net/test",
  { useNewUrlParser: true }
);

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
    resave: true,
    saveUninitialized: true,
  })
);

global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;

  next();
});

app.use(flash());

let port = process.env.PORT;

if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
  console.log("App listening...");
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

app.get("/posts/new", authMiddleWare, newPostController);

app.post("/posts/store", authMiddleWare, storePostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleWare, newUserController);

app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleWare,
  storeUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleWare, loginController);

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleWare,
  loginUserController
);

app.get("/auth/logout", logoutController);

app.use((req, res) => {
  res.render("notfound");
});
