express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = require("./app");
const { PORT } = require("./config");
const { BadRequestError, NotFoundError } = require("./utils/errors");

// Enable CORS middleware to handle cross-origin requests
app.use(cors());

// use Morgan middleware for request logging
app.use(morgan("tiny"));

// Parse incoming requests with JSON payloads
app.use(express.json());

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
