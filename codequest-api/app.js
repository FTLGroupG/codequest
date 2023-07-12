/** Express app for CodeQuest */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./utils/errors");
const config = require("./config");
const app = express();

// middleware security
const security = require("./middleware/security");
app.use(security.extractUserFromJwt);

// importing routes
const authRoutes = require("./routes/auth");

// Enable CORS middleware to handle cros-sorigin requests
app.use(cors());

// use Morgan middleware for request logging
app.use(morgan("tiny"));

// Parse incoming requests with JSON payloads
app.use(express.json());

// set up routes for user authentication
app.use("/auth", authRoutes);

//test GET request
app.get("/", (req, res, next) => {
  res.status(200).json({ ping: "pong" });
});

app.use(function (err, req, res, next) {
  if (!config.IS_TESTING) console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
