<template>
  <div id="form-texte-page" v-if="$store.state.admin">
    <div class="overlay" @click="toggleModal"></div>
    <div class="modal">
      <h3 v-if="elementChange === 'texte'">Modifier Texte</h3>
      <h3 v-if="elementChange === 'subtitle'">Modifier le Sous-Titre</h3>
      <h3 v-if="elementChange === 'title'">Modifier le Titre</h3>
      <h3 v-if="elementChange === 'message'">Modifier Message</h3>
      <TipTap
        v-if="elementChange === 'texte'"
        :texte="texte"
        @newTexte="changeTexte($event)"
      />
      <textarea
        v-if="
          elementChange === 'subtitle' ||
          elementChange === 'message' ||
          elementChange === 'title'
        "
        cols="30"
        rows="10"
        v-model="newTexteLessTipTap"
        @newTexte="changeTexte($event)"
      ></textarea>
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
  props: ["toggleModal", "idPage", "idBloc", "texte", "elementChange"],
  data() {
    return {
      newTexte: null,
    };
  },
  computed: {
    newTexteLessTipTap: {
      get() {
        return this.texte;
      },
      set(value) {
        console.log(value);
        this.newTexte = value;
      },
    },
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
      if (this.elementChange === "texte") {
        this.http
          .post("http://localhost:9000/pages/updateTexte", infos, {
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
          })
          .then((resp) => {
            console.log(resp);
            this.$store.commit("loading");
            document.location.reload();
          });
      } else if (this.elementChange === "message") {
        console.log("toto");
        this.http
          .post("http://localhost:9000/pages/updateMessage", infos, {
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
          })
          .then((resp) => {
            console.log(resp);
            this.$store.commit("loading");
            document.location.reload();
          });
      } else if (this.elementChange === "subtitle") {
        this.http
          .post("http://localhost:9000/pages/updateSubtitle", infos, {
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
          })
          .then((resp) => {
            console.log(resp);
            this.$store.commit("loading");
            document.location.reload();
          });
      } else if (this.elementChange === "title") {
        this.http
          .post("http://localhost:9000/pages/updateTitle", infos, {
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
          })
          .then((resp) => {
            console.log(resp);
            this.$store.commit("loading");
            document.location.reload();
          });
      }
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