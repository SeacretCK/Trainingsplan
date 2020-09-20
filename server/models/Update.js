const mongoose = require("mongoose");

const UpdateSchema = mongoose.Schema({
  repetitions_1: {
    type: Number
  },
  weight_1: {
    type: Number
  },
  repetitions_2: {
    type: Number
  },
  weight_2: {
    type: Number
  },
  repetitions_3: {
    type: Number
  },
  weight_3: {
    type: Number
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
