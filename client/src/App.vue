<template>
  <div id="app">
    <Schedule />
  </div>
</template>

<script>
import Schedule from "./components/Schedule.vue";

export default {
  name: "App",
  components: {
    Schedule
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html {
  font-family: "Roboto Condensed", sans-serif;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 300;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
}
</style>
