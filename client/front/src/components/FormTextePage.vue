<template>
  <div id="form-texte-page" v-if="$store.state.admin">
    <div class="overlay" @click="toggleModal"></div>
    <div class="modal">
      <h3>Modifier Texte</h3>
      <TipTap :texte="texte" @newTexte="changeTexte($event)" />
      <button @click="updateText()">Enregistrer les modifications</button>
    </div>
  </div>
</template>

<script>
import TipTap from "@/components/TipTap.vue";

export default {
  name: "FormTextePage",
  components: {
    TipTap,
  },
  props: ["toggleModal", "idPage", "idBloc", "texte"],
  data() {
    return {
      newTexte: null,
    };
  },
  methods: {
    changeTexte(event) {
      this.newTexte = event;
    },
    updateText() {
      this.$store.commit("loading");

      let infos = {
        idPage: this.idPage,
        idBloc: this.idBloc,
        texte: this.newTexte,
      };
      console.log(infos);

      this.http
        .post("http://localhost:9000/pages/updateTexte", infos, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        })
        .then((resp) => {
          console.log(resp);
          this.$store.commit("loading");
          document.location.reload();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.modal {
  padding: 10% 0%;
  z-index: 3;
  border-radius: 10px;
  height: 60%;
  width: 80%;
  background: #f1f1f1;
  color: var(--thirdly-color);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
button {
  margin-top: 10%;
  border: none;
  padding: 5% 10%;
  color: var(--fourthly-color);
  background-color: var(--thirdly-color);
}
</style>