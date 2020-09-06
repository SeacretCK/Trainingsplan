const mongoose = require("mongoose");
const Update = require("./Update");

const ExerciseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  adjustments: {
    type: String
  },
  progress: [Update.schema]
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
