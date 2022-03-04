let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let session = require("express-session");
let passport = require("passport");
let localSrategy = require("passport-local");
let bodyParser = require("body-parser");
let cors = require("cors");
let indexRouter = require("../routes/index.server.routes");
let courseRouter = require("../routes/course.server.routes");
let studentRouter = require("../routes/student.server.routes");
let app = express();
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(compress());
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(cookieParser("SomeSecret"));
app.use(passport.initialize());
app.use(passport.session());
require("./passport")(passport);
app.use("/", indexRouter);
app.use("/course", courseRouter);
app.use("/student", studentRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
