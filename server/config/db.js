const mongoose = require("mongoose");

// mongoose.connect returns a promise, so we use async await (or you could use the .then syntax)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    // exit with failure -> (1)
    process.exit(1);
  }
};

module.exports = connectDB;
