<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  mounted() {
    this.$store.dispatch("getScreenWidth", screen.width);
  },
};
</script>
<style>
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f1f1f1;
  height: 100vh;
}
@font-face {
  font-family: "Signatura Monoline Script";
  src: url("assets/fonts/Signatura Monoline.otf") format("embedded-opentype"),
    url("assets/fonts/Signatura Monoline.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  --primary-color: #eab996;
  --secondary-color: #a93d49;
  --thirdly-color: #cb7666;
  --fourthly-color: #f1ece4;
}
h1 {
  font-family: "Signatura Monoline Script";
  color: var(--fourthly-color);
  mix-blend-mode: hard-light;
}
li {
  list-style: none;
}
</style>
