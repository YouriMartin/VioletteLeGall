<template>
  <div id="particuliersPortFolio">
    <div id="first-section">
      <h2>Particulier folio</h2>
      <Caroussel :size="'30vh'" />
      <Boutton
        :texte="'Accéder aux tarifs'"
        :css="'primary-big'"
        :route="'/contact'"
        :type="'router'"
      />
    </div>
    <section>truc</section>
  </div>
</template>

<script>
import Caroussel from "../components/Caroussel.vue";
import Boutton from "../components/Boutton.vue";
export default {
  name: "ParticuliersPortFolio",
  components: {
    Caroussel,
    Boutton,
  },
};
</script>

<style scoped>
section:nth-child(odd) {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
}
section:nth-child(even) {
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
}

#first-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
}
</style>