<template>
  <div id="page-not-found">
    <section>
      <i class="fas fa-question"></i>
      <h3>Désolé la page est indisponible.</h3>
      <p @click="GoAcceuil()">aller sur la page d'acceuil.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  methods: {
    GoAcceuil() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  text-align: center;
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
}
i {
  font-size: 100px;
}
</style>