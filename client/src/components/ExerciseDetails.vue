<template>
  <div class="modal__wrapper container">
    <div class="modal__wrapper-inner">
      <h5>{{ exercise.name }}</h5>
      <div class="table">
        <div class="row">
          <div class="col custom-colwidth">Datum</div>
          <div class="col custom-colwidth">Wdh1</div>
          <div class="col custom-colwidth">Gew1</div>
          <div class="col custom-colwidth">Wdh2</div>
          <div class="col custom-colwidth">Gew2</div>
          <div class="col custom-colwidth">Wdh3</div>
          <div class="col custom-colwidth">Gew3</div>
        </div>
        <div
          class="row"
          v-for="progress in sortedProgress"
          :key="progress.date"
        >
          <div class="col custom-colwidth">
            {{ progress.date | formatDate }}
          </div>
          <div class="col custom-colwidth">{{ progress.repetitions_1 }}</div>
          <div class="col custom-colwidth">{{ progress.weight_1 }}</div>
          <div class="col custom-colwidth">{{ progress.repetitions_2 }}</div>
          <div class="col custom-colwidth">{{ progress.weight_2 }}</div>
          <div class="col custom-colwidth">{{ progress.repetitions_3 }}</div>
          <div class="col custom-colwidth">{{ progress.weight_3 }}</div>
        </div>
      </div>
      <div class="fixed-action-btn fab-left">
        <a
          @click="$emit('close')"
          class="btn-floating btn-large waves-effect waves-light red darken-4"
          ><i class="fas fa-arrow-left"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ExerciseDetails",
  props: ["exercise"],
  data() {
    return {
      sortedProgress: []
    };
  },
  created() {
    const sortedProgress = this.exercise.progress.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    this.sortedProgress = sortedProgress;
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      return moment(val).format("DD.MM.YY");
    }
  }
};
</script>

<style scoped>
div.modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  padding: 20px;
}

div.modal__wrapper-inner {
  height: 100vh;
  width: 100%;
  overflow: auto;
}

div.table {
  margin-top: 10px;
}

div.custom-colwidth {
  width: 14%;
}

div.fab-left {
  right: auto;
  margin-left: 3px;
}

@media (max-width: 400px) {
  div.table {
    width: 480px;
    font-size: 80%;
  }
}
</style>
