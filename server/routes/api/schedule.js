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
    res.send({ message: err });
  }
});

// Add exercise
router.post("/", async (req, res) => {
  console.log(req.body);
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
    res.send({ message: err });
  }
});

// Get specific exercise
router.get("/:exerciseId", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.exerciseId);
    res.send(exercise);
  } catch (err) {
    console.error(err);
    res.send({ message: err });
  }
});

// Delete exercise
router.delete("/:exerciseId", async (req, res) => {
  try {
    const removedExercise = await Exercise.remove({
      _id: req.params.exerciseId
    });
    res.send(removedExercise);
  } catch (err) {
    console.error(err);
    res.send({ message: err });
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
  const name = req.body.name;
  const adjustments = req.body.adjustments;

  try {
    const updatedExercise = await Exercise.updateOne(
      { _id: req.params.exerciseId },
      {
        $push: { progress: update },
        $set: { name: name, adjustments: adjustments }
      }
    );
    res.send(updatedExercise);
  } catch (err) {
    console.error(err);
    res.send({ message: err });
  }
});

module.exports = router;
