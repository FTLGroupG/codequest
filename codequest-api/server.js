express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = require("./app");
const { PORT } = require("./config");

// middleware security
const security = require("./middleware/security");

// importing routes
const authRoutes = require("./routes/auth");

const questionRoutes = require("./routes/questions");

// Enable CORS middleware to handle cross-origin requests
app.use(cors());

// use Morgan middleware for request logging
app.use(morgan("tiny"));

// Parse incoming requests with JSON payloads
app.use(express.json());

//check if a token exists in the auth header, if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt);

// set up routes for user authentication
app.use("/auth", authRoutes);

// set up routes for nutrition section
app.use("/questions", questionRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

// setting up port
app.listen(PORT, () => {
  console.log(`🧨 Server listening on port ${PORT}`);
});
