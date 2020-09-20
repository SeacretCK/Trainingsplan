const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Exercise = require("../../models/Exercise");
const Update = require("../../models/Update");

// Get schedule
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.send(exercises);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

// Add exercise
router.post("/", async (req, res) => {
  console.log("add exercise req.body: ", req.body);
  const exercise = new Exercise({
    name: req.body.name,
    adjustments: req.body.adjustments,
    comment: req.body.comment
  });

  try {
    const savedExercise = await exercise.save();
    res.send(savedExercise);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

// Get specific exercise
router.get("/:exerciseId", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.exerciseId);
    res.send(exercise);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

// Delete exercise
router.delete("/:exerciseId", async (req, res) => {
  try {
    const removedExercise = await Exercise.deleteOne({
      _id: req.params.exerciseId
    });
    res.send(removedExercise);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

// Update progress
router.post("/:exerciseId", async (req, res) => {
  const update = new Update({
    repetitions_1: req.body.repetitions_1,
    weight_1: req.body.weight_1,
    repetitions_2: req.body.repetitions_2,
    weight_2: req.body.weight_2,
    repetitions_3: req.body.repetitions_3,
    weight_3: req.body.weight_3,
    comment: req.body.comment,
    date: req.body.date
  });

  // the cast error when sending letters to the type: number fields repetitions and weight did not show
  // the respective field was just skipped and not saved
  // this is the only way I found to get the cast error
  // validationSync() executes registered validation rules (skipping asynchronous validators) for this document
  // returns ValidationError if there are errors during validation, or undefined if there is no error
  const err = update.validateSync();
  //console.log("validation errors: ", err.message);
  if (err) {
    err.customMessage = "Bitte nur Zahlen eingeben";
    return res.status(400).send(err);
  }

  console.log("const update: ", update);
  const name = req.body.name;
  const adjustments = req.body.adjustments;

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.exerciseId,
      {
        $push: { progress: update },
        $set: { name: name, adjustments: adjustments }
      },
      { runValidators: true } // on update validation is off by default!
    );
    res.send(updatedExercise);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

module.exports = router;
