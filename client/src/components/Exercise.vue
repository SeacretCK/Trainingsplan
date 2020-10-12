<template>
  <div class="container">
    <div class="modal__wrapper-inner">
      <p>Neuen Durchgang speichern</p>
      <input type="text" class="heading" v-model.trim="update.name" />

      <transition name="fade">
        <div v-if="saving" class="card light-blue lighten-4">
          <p class="card-content">Wird gespeichert...</p>
        </div>
      </transition>

      <form class="form" @submit.prevent>
        <div class="input-field">
          <label for="adj" class="active label-adj">Einstellungen</label>
          <input
            type="text"
            id="adj"
            class="materialize-input"
            v-model.trim="update.adjustments"
          />
        </div>

        <div class="set light-blue lighten-4">
          <h6>Set 1</h6>
          <div class="row">
            <label for="Rep1" class="label col s6">Wiederholungen:</label>
            <input
              type="text"
              id="Rep1"
              class="input col s4"
              v-model.trim="update.progress.repetitions_1"
            />
            <p class="unit col s1">x</p>
          </div>
          <div class="row">
            <label for="wgh1" class="label col s6">Gewicht:</label>
            <input
              type="text"
              id="wgh1"
              class="input col s4"
              v-model.trim="update.progress.weight_1"
            />
            <p class="unit col s1">kg</p>
          </div>
        </div>
        <div class="set light-blue lighten-4">
          <h6>Set 2</h6>
          <div class="row">
            <label for="Rep2" class="label col s6">Wiederholungen:</label>
            <input
              type="text"
              id="Rep2"
              class="input col s4"
              v-model.trim="update.progress.repetitions_2"
            />
            <p class="unit col s1">x</p>
          </div>
          <div class="row">
            <label for="wgh2" class="label col s6">Gewicht:</label>
            <input
              type="text"
              id="wgh2"
              class="input col s4"
              v-model.trim="update.progress.weight_2"
            />
            <p class="unit col s1">kg</p>
          </div>
        </div>
        <div class="set light-blue lighten-4">
          <h6>Set 3</h6>
          <div class="row">
            <label for="Rep3" class="label col s6">Wiederholungen:</label>
            <input
              type="text"
              id="Rep3"
              class="input col s4"
              v-model.trim="update.progress.repetitions_3"
            />
            <p class="unit col s1">x</p>
          </div>
          <div class="row">
            <label for="wgh3" class="label col s6">Gewicht:</label>
            <input
              type="text"
              id="wgh3"
              class="input col s4"
              v-model.trim="update.progress.weight_3"
            />
            <p class="unit col s1">kg</p>
          </div>
        </div>

        <div class="input-field input-field-comment">
          <label for="comment" class="active label-comment">Kommentar</label>
          <textarea
            type="text"
            id="comment"
            class="materialize-textarea"
            v-model.trim="update.progress.comment"
          />
        </div>

        <div class="fixed-action-btn fab-right">
          <a
            @click="checkBeforeSave"
            class="btn-floating btn-large waves-effect waves-light green darken-4"
            ><i class="fas fa-check"></i
          ></a>
        </div>
        <div class="fixed-action-btn fab-left">
          <a
            @click="$emit('close')"
            class="btn-floating btn-large waves-effect waves-light red darken-4"
            ><i class="fas fa-arrow-left"></i
          ></a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Service from "../Service";

export default {
  name: "Exercise",
  props: ["exercise"],
  data() {
    return {
      update: {
        name: "",
        adjustments: "",
        progress: {
          // initial values are a copy of latest progress item using destructuring in created hook
          // if there is no progress yet, the initial values are set to empty strings
          repetitions_1: "",
          weight_1: "",
          repetitions_2: "",
          weight_2: "",
          repetitions_3: "",
          weight_3: "",
          comment: ""
        }
      },
      saving: false
    };
  },
  created() {
    const sortedProgress = this.exercise.progress.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    if (sortedProgress.length) {
      this.update.progress = { ...sortedProgress[0] };
    }
    this.update.name = this.exercise.name;
    this.update.adjustments = this.exercise.adjustments;
    console.log("exercise: ", this.exercise);
    console.log("update.progress: ", this.update.progress);
  },
  methods: {
    checkBeforeSave() {
      // check the inputs
      if (!this.update.name) {
        console.log("check name failed");
        return this.$toasted.error("Bitte Namen der Übung eingeben", {
          action: {
            text: "OK",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
      }

      if (
        isNaN(this.update.progress.repetitions_1) ||
        isNaN(this.update.progress.repetitions_2) ||
        isNaN(this.update.progress.repetitions_3)
      ) {
        return this.$toasted.error(
          "Bitte nur ganze Zahlen für die Wiederholungen eingeben",
          {
            action: {
              text: "OK",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          }
        );
      }
      if (
        isNaN(this.update.progress.weight_1) ||
        isNaN(this.update.progress.weight_2) ||
        isNaN(this.update.progress.weight_3)
      ) {
        console.log("check weight failed");
        return this.$toasted.error(
          "Bitte nur Zahlen für das Gewicht eingeben (für Kommazahlen Punkt benutzen)",
          {
            action: {
              text: "OK",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          }
        );
      }
      this.save();
    },
    async save() {
      console.log("update: ", this.update);
      this.saving = true;
      try {
        const update = {
          name: this.update.name,
          adjustments: this.update.adjustments,
          repetitions_1: this.update.progress.repetitions_1,
          weight_1: this.update.progress.weight_1,
          repetitions_2: this.update.progress.repetitions_2,
          weight_2: this.update.progress.weight_2,
          repetitions_3: this.update.progress.repetitions_3,
          weight_3: this.update.progress.weight_3,
          comment: this.update.progress.comment,
          date: new Date()
        };
        const updated = await Service.updateExercise(this.exercise._id, {
          ...update
        });
        console.log("updated: ", updated);
        this.saving = false;
        this.$emit("saved");
        this.$emit("close");
      } catch (err) {
        this.saving = false;
        console.log("error from Exercise", err.response.data);
        if (err.response.data.customMessage) {
          this.$toasted.error(err.response.data.customMessage, {
            action: {
              text: "OK",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        } else {
          this.$toasted.error("Es ist ein Fehler aufgetreten", {
            action: {
              text: "OK",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped>
div.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: unset;
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

input.heading {
  padding: 5px 0;
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
  border: none;
  height: 2rem;
}

form.form {
  display: flex;
  flex-direction: column;
  align-content: center;
}
div.set {
  margin-top: 5px;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 5px 0;
  text-align: left;
}

div.set > h6 {
  font-weight: 700;
  padding-left: 10px;
}

div.row {
  margin: 0;
}

div.input-field {
  margin: 5px 0;
}

div.input-field-comment {
  margin: 2rem 0 4.5rem 0;
}

input.input,
label.label,
p.unit {
  height: 30px;
  font-size: 14px;
  text-align: left;
  justify-self: center;
  color: #333;
}

input.input {
  border: 1px solid #333;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  font-weight: 700;
}

label.label,
p.unit {
  display: flex;
  align-items: center;
}

input.materialize-input {
  height: 2rem;
}

textarea.materialize-textarea {
  padding-top: 1rem;
  min-height: 4rem;
}

div.fab-left {
  right: auto;
  left: 23px;
}

@media (min-width: 650px) {
  div.fab-right {
    right: 50%;
    transform: translateX(300px);
  }
  div.fab-left {
    left: 50%;
    right: unset;
    transform: translateX(-300px);
  }
}

/* TRANSITION */

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
