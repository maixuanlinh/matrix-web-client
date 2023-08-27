const express = require("express");
const path = require("path");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

const CORS_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://matrix-react-app.azurewebsites.net/"
    : "http://localhost:3000"; // assuming your frontend runs on port 3000 locally

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "../uploads")));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Use dotenv only in non-production environments
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// Import routes
const user = require("./controller/user");


// Use routes BEFORE serving static files for the frontend
app.use("/api/v2/user", user);


// If in production, serve frontend's build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// For error handling
app.use(ErrorHandler);

module.exports = app;
