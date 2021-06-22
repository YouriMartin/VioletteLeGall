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
  transition: all 0.5s ease;
  border: 5px solid var(--fourthly-color);
  padding: 2.5vh 4vw;
  font-size: 2vh;
  font-weight: 600;
  background-color: var(--primary-color);
  color: var(--fourthly-color);
}
.primary-big-borderless {
  transition: all 0.5s ease;
  padding: 15px;
  font-size: 3vh;
  background-color: var(--primary-color);
  color: var(--fourthly-color);
}
.primary-invert-small {
  transition: all 0.5s ease;
  border: 5px solid var(--primary-color);
  padding: 2.5vh 4vw;
  font-size: 2vh;
  background-color: var(--fourthly-color);
  color: var(--primary-color);
}
.primary-invert-big {
  transition: all 0.5s ease;
  border: 5px solid var(--primary-color);
  padding: 15px;
  font-size: 3vh;
  background-color: var(--fourthly-color);
  color: var(--primary-color);
}
.primary-invert-borderless-big {
  border: 5px solid var(--primary-color);
  transition: all 0.5s ease;
  padding: 1.5vh;
  font-size: 3vh;
  background-color: var(--fourthly-color);
  color: var(--primary-color);
}
.primary-invert-borderless-small {
  transition: all 0.5s ease;
  padding: 1vh 2.5vh;
  font-size: 2vh;
  background-color: var(--fourthly-color);
  color: var(--primary-color);
}
.thirdly-big {
  border-radius: 5px;
  transition: all 0.5s ease;
  border: 5px solid var(--fourthly-color);
  padding: 15px;
  font-size: 3vh;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
}
.thirdly-big-borderless {
  border-radius: 5px;
  transition: all 0.5s ease;
  padding: 15px;
  font-size: 3vh;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
}
.thirdly-invert-borderless-big {
  border: 5px solid var(--thirdly-color);
  transition: all 0.5s ease;
  padding: 15px;
  font-size: 20px;
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
}

@media screen and (min-width: 768px) {
  .primary-big:hover {
    background-color: var(--fourthly-color);
    color: var(--primary-color);
    border: 5px solid var(--primary-color);
  }
  .primary-big-borderless:hover {
    background-color: var(--fourthly-color);
    color: var(--primary-color);
  }
  .primary-invert-big:hover {
    background-color: var(--primary-color);
    color: var(--fourthly-color);
    border: 5px solid var(--fourthly-color);
  }
  .primary-invert-small:hover {
    border: 5px solid var(--fourthly-color);

    background-color: var(--primary-color);
    color: var(--fourthly-color);
  }
  .primary-invert-borderless-small:hover {
    background-color: var(--primary-color);
    color: var(--fourthly-color);
  }
  .thirdly-big:hover {
    background-color: var(--fourthly-color);
    color: var(--thirdly-color);
    border: 5px solid var(--thirdly-color);
  }
  .thirdly-big-borderless:hover {
    background-color: var(--fourthly-color);
    color: var(--thirdly-color);
  }
  .thirdly-invert-borderless-big:hover {
    background-color: var(--thirdly-color);
    color: var(--fourthly-color);
    border: 5px solid var(--fourthly-color);
  }
}
</style>
