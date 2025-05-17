const express = require("express");
const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());

// Import and use router
const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

module.exports = app;
