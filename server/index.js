const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "server/config/config.env" });

// Connect to DB
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(cors());

// Body parser
// we need this to get access to req.body (the data that's send with a request)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const schedule = require("./routes/api/schedule");
app.use("/api/schedule", schedule);

// Handle production
if (process.env.NODE_ENV === "production") {
  // set the static folder to server/public
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  // normally the browser would look for a file with the name of the route, so we redirect every route to index.html
  // the actual routes have to be set above this!
  app.get(/.*/, (req, (res) => res.sendFile(__dirname + "/public/index.html")));
}

// Setup server
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
