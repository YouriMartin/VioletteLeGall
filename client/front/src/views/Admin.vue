<template>
  <div id="admin">
    <FormConnectAdmin v-if="!this.$store.state.admin" />
    <FormArticles v-if="this.$store.state.admin" />
    <FormPhotos v-if="this.$store.state.admin" />
    <FormPassword v-if="this.$store.state.admin" />
  </div>
</template>

<script>
import FormArticles from "@/components/FormArticles.vue";
import FormConnectAdmin from "@/components/FormConnectAdmin.vue";
import FormPhotos from "@/components/FormPhotos.vue";
import FormPassword from "@/components/FormPassword.vue";

export default {
  name: "Admin",
  components: {
    FormArticles,
    FormConnectAdmin,
    FormPhotos,
    FormPassword,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
section:nth-child(odd) {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
}
section:nth-child(even) {
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
}
button {
  padding: 2%;
  border: none;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>