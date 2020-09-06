const mongoose = require("mongoose");

const UpdateSchema = mongoose.Schema({
  repetitions_1: {
    type: Number,
    required: true
  },
  weight_1: {
    type: String,
    required: true
  },
  repetitions_2: {
    type: Number,
    required: true
  },
  weight_2: {
    type: String,
    required: true
  },
  repetitions_3: {
    type: Number,
    required: true
  },
  weight_3: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Update", UpdateSchema);
