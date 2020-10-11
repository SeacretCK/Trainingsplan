<template>
  <div class="container">
    <transition name="fade">
      <div v-if="saving" class="card light-blue lighten-4">
        <p class="card-content">Wird gespeichert...</p>
      </div>
    </transition>

    <form class="form" @submit.prevent>
      <div class="input-field">
        <label for="name" class="materialize-label active">Name</label>
        <input
          type="text"
          id="name"
          class="materialize-input"
          v-model.trim="newExercise.name"
        />
      </div>
      <div class="input-field">
        <label for="adjustments" class="materialize-label active"
          >Einstellungen</label
        >
        <input
          type="text"
          id="adjustments"
          class="materialize-input"
          v-model.trim="newExercise.adjustments"
        />
      </div>
    </form>
    <div class="fixed-action-btn fab-right">
      <a
        @click="save"
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
  </div>
</template>

<script>
import Service from "../Service";

export default {
  name: "CreateNewExercise",
  data() {
    return {
      newExercise: {
        name: "",
        adjustments: ""
      },
      saving: false
    };
  },
  methods: {
    async save() {
      this.saving = true;
      try {
        const success = await Service.insertExercise(this.newExercise);
        console.log("success", success);
        this.saving = false;
        this.$emit("saved");
        this.$emit("close");
      } catch (err) {
        this.saving = false;
        // Just logging err won't work, as the sent message object resides in err.response.data!
        console.log("error from CreateNEwExercise", err.response.data);
        if (err.response.data.code === 11000) {
          this.$toasted.error("Eine Übung mit diesem Namen existiert bereits", {
            action: {
              text: "OK",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        } else if (err.response.data.errors.name.message) {
          this.$toasted.error(err.response.data.errors.name.message, {
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

form.form {
  width: 100%;
  max-width: 600px;
}

div.input-field {
  margin-top: 50px;
}

div.fab-left {
  right: auto;
  left: 23px;
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

@media (min-width: 800px) {
  div.fab-left,
  div.fab-right {
    margin: 0 10%;
  }
}
</style>
