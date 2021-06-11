<template>
  <div class="blocks" v-if="this.$store.state.isLoaded">
    <i class="fas fa-spinner fa-pulse"></i>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.blocks {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: center;
  background-color: rgba(159, 141, 137, 0.7);
  z-index: 1000;
}
i {
  font-size: 15vh;
  color: var(--thirdly-color);
}
</style>