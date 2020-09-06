const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "server/config/config.env" });

// Connect to DB
connectDB();

// Initialize app
const app = express();

// Body parser
// we need this to get access to req.body (the data that's send with a request)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const schedule = require("./routes/api/schedule");
app.use("/api/schedule", schedule);

// Setup server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
