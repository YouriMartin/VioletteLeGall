<template>
  <div id="form-update-article" v-if="$store.state.admin">
    <div class="overlay" @click="toggleModal"></div>
    <div class="modal">
      <h3>Modification</h3>
      <label for="titre">Titre :</label>
      <input type="text" name="titre" v-model="titre" placeholder="titre" />
      <TipTap v-if="texte" :texte="texte" @newTexte="changeTexte($event)" />
      <p>{{ message }}</p>
      <button @click="updateArticle">Modifier</button>
    </div>
  </div>
</template>

<script>
import TipTap from "@/components/TipTap.vue";
export default {
  name: "FormUpdateArticle",
  props: ["toggleModal", "id"],
  components: {
    TipTap,
  },
  data() {
    return {
      titre: null,
      texte: null,
      message: null,
      newTexte: null,
    };
  },
  mounted() {
    this.http
      .get("http://localhost:9000/articles/getOne/" + this.id)
      .then((resp) => {
        this.titre = resp.data.titre;
        this.texte = resp.data.texte;
      });
  },

  methods: {
    changeTexte(event) {
      console.log(event);
      this.newTexte = event;
    },
    updateArticle() {
      console.log(this.id);
      let infos = {
        id: this.id,
        titre: this.titre,
        texte: this.newTexte,
      };
      console.log(infos);
      this.http
        .post("http://localhost:9000/articles/update", infos, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        })
        .then((resp) => {
          console.log(resp.data);
          this.message = resp.data;
          document.location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.message = err;
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
  z-index: 3;
  border-radius: 10px;
  height: 60%;
  width: 80%;
  background: #f1f1f1;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: fixed;
  padding: 5%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;

  button {
    border: 2px solid var(--thirdly-color);
    color: var(--thirdly-color);
    font-weight: bold;
    align-self: center;
    font-size: 3vh;
    padding: 2% 10%;
  }
}
h3 {
  font-size: 7vh;
}
@media screen and (min-width: 768px) {
  textarea {
    height: 60%;
    width: 60%;
  }
  .modal {
    padding: 2% 5%;
    #TipTap {
      margin-top: 2%;
      height: 100%;
    }
    button {
      cursor: pointer;
      padding: 1% 5%;
      margin-top: 0%;
      font-size: 2vh;
    }
  }
}
</style>