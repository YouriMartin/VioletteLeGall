<template>
  <div id="acceuil">
    <h1>Violette le Gall</h1>
    <Caroussel />
  </div>
</template>

<script >
import Caroussel from "../components/Caroussel.vue";

export default {
  name: "Acceuil",
  components: {
    Caroussel,
  },
};
</script>

<style scoped>
Caroussel {
  position: absolute;
}
h1 {
  position: absolute;
  z-index:2;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12vw;
}
</style>>

