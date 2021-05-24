<template>
  <div id="admin">
    <FormConnectAdmin v-if="!this.$store.state.admin" />
    <div v-if="this.$store.state.admin">
      <FormArticles />
      <FormPhotos />
      <FormPassword />
      <section>
        <Boutton
          :texte="'Aller à la collection de photos'"
          :css="'thirdly-invert-borderless-big'"
          :route="'/collectionPhotos'"
          :type="'router'"
        />
        <button @click="deconnexion()">Déconnexion Admin</button>
      </section>
    </div>
  </div>
</template>

<script>
import FormArticles from "@/components/FormArticles.vue";
import FormConnectAdmin from "@/components/FormConnectAdmin.vue";
import FormPhotos from "@/components/FormPhotos.vue";
import FormPassword from "@/components/FormPassword.vue";
import Boutton from "../components/Boutton.vue";

export default {
  name: "Admin",
  components: {
    FormArticles,
    FormConnectAdmin,
    FormPhotos,
    FormPassword,
    Boutton,
  },
  data() {
    return {};
  },
  methods: {
    deconnexion() {
      localStorage.removeItem("jwt");
      document.location.reload();
    },
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
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  font-size: 3vh;
}
</style>