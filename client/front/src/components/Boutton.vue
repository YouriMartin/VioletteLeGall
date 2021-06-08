<template>
  <div id="boutton">
    <router-link v-if="type === 'router'" :class="css" :to="route">{{
      texte
    }}</router-link>
    <a v-if="type === 'a'" :href="route" :class="css" target="_blank">{{
      texte
    }}</a>
  </div>
</template>

<script>
export default {
  name: "Boutton",
  props: ["texte", "type", "route", "css"],
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.primary-big {
  padding: 15px;
  font-size: 3vh;
  background-color: var(--primary-color);
  color: var(--fourthly-color);
}
.primary-invert-big {
  padding: 15px;
  font-size: 3vh;
  background-color: var(--fourthly-color);
  color: var(--primary-color);
  border: 3px solid var(--primary-color);
}
.primary-invert-borderless-big {
  padding: 15px;
  font-size: 3vh;
  background-color: var(--fourthly-color);
  color: var(--primary-color);
}
.primary-invert-borderless-small {
  padding: 1vh 2.5vh;
  font-size: 2vh;
  background-color: var(--fourthly-color);
  color: var(--primary-color);
}
.thirdly-big {
  padding: 15px;
  font-size: 3vh;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
}
.thirdly-invert-borderless-big {
  padding: 15px;
  font-size: 20px;
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
}
</style>
