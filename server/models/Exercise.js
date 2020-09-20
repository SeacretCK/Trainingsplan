const mongoose = require("mongoose");
const Update = require("./Update");

const ExerciseSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true, // unique is not a validation parameter, it always returns error code 11000, which must be handled individually
    required: [true, "Bitte geb einen Namen ein"]
  },
  adjustments: {
    type: String
  },
  progress: [Update.schema]
});

// ExerciseSchema.pre("findOneAndUpdate", async function () {
//   const docToUpdate = await this.model.findOne(this.getQuery());
//   console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify
//   console.log("Hello from pre update Exercise");
// });

module.exports = mongoose.model("Exercise", ExerciseSchema);
