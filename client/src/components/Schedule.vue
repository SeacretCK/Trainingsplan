<template>
  <div class="modal__wrapper">
    <div class="modal__wrapper-inner">
      <h4 class="heading">Übungen</h4>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="exercises-container">
        <div
          class="exercise-box grey darken-4"
          v-for="exercise in exercises"
          :key="exercise._id"
        >
          <div class="delete-btn waves-light btn-small red darken-4">
            <a @click="showPromtDelete(exercise._id, exercise.name)"
              ><i class="fas fa-trash"></i
            ></a>
          </div>
          <div class="exercise light-green" @click="openExercise(exercise._id)">
            <p class="name">{{ exercise.name }}</p>
          </div>
          <div class="details-btn waves-light btn-small grey darken-2">
            <a @click="openExerciseDetails(exercise._id)"
              ><i class="fas fa-chart-line"></i
            ></a>
          </div>
        </div>
      </div>
      <div
        class="fixed-action-btn fab-right"
        v-if="!openOneExercise && !openCreateExercise && !openDetails"
      >
        <a
          @click="openCreateExercise = true"
          class="btn-floating btn-large waves-effect waves-light orange"
          ><i class="fas fa-plus"></i
        ></a>
      </div>
    </div>
    <Exercise
      v-if="openOneExercise"
      v-on:saved="getExercises"
      v-on:close="closeExercise"
      :exercise="selectedExercise"
    />
    <CreateNewExercise
      v-if="openCreateExercise"
      v-on:saved="getExercises"
      v-on:close="openCreateExercise = false"
    />
    <ExerciseDetails
      v-if="openDetails"
      v-on:close="closeExerciseDetails"
      :exercise="selectedExercise"
    />
  </div>
</template>

<script>
import Service from "../Service";
import Exercise from "./Exercise.vue";
import ExerciseDetails from "./ExerciseDetails";
import CreateNewExercise from "./CreateNewExercise";

export default {
  name: "Schedule",
  components: {
    Exercise,
    CreateNewExercise,
    ExerciseDetails
  },
  data() {
    return {
      exercises: [],
      error: "",
      openOneExercise: false,
      selectedExercise: {},
      openCreateExercise: false,
      openDetails: false
    };
  },
  created() {
    this.getExercises();
  },
  methods: {
    openExercise(id) {
      this.selectedExercise = this.exercises.find((item) => item._id === id);
      this.openOneExercise = true;
    },
    openExerciseDetails(id) {
      this.selectedExercise = this.exercises.find((item) => item._id === id);
      this.openDetails = true;
    },
    async getExercises() {
      console.log("getting exercises");
      try {
        this.exercises = await Service.getExercises();
      } catch (err) {
        this.error = err.message;
      }
    },
    closeExercise() {
      this.openOneExercise = false;
      this.selectedExercise = "";
    },
    closeExerciseDetails() {
      this.openDetails = false;
      this.selectedExercise = "";
    },
    showPromtDelete(id, name) {
      this.$toasted.show(`${name} wirklich löschen?`, {
        action: [
          {
            text: "Ja",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
              this.deleteExercise(id);
            }
          },
          {
            text: "Nein",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        ]
      });
    },
    async deleteExercise(id) {
      try {
        await Service.deleteExercise(id);
        this.getExercises();
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  padding: 20px;
  display: flex;
  justify-content: center;
}

div.modal__wrapper-inner {
  height: 100%;
  width: 100%;
  max-width: 600px;
  overflow: auto;
}

p.error {
  border: 1px solid red;
  background-color: orange;
  padding: 10px;
  margin-bottom: 15px;
}

.heading {
  padding: 20px 0;
}

.exercises-container {
  margin-bottom: 25px;
}

div.exercise-box {
  display: flex;
  padding: 5px 5px 5px 5px;
  margin-bottom: 10px;
  border-radius: 5px;
}

div.exercise {
  width: 100%;
  cursor: pointer;
  margin: 0 5px;
}

p.name {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

div.delete-btn,
div.details-btn,
div.exercise {
  border-radius: 5px;
  overflow: hidden;
}

div.delete-btn,
div.details-btn {
  width: 60px;
  padding: 0 12px;
}

div.delete-btn a,
div.details-btn a {
  color: white;
}

@media (min-width: 800px) {
  div.fab-right {
    margin: 0 10%;
  }
}
</style>
