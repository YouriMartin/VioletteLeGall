<template>
  <section id="form-article">
    <h3>formulaire Articles</h3>
    <div class="form">
      <label for="titre">Titre :</label>
      <input type="text" name="titre" v-model="titre" placeholder="titre" />
      <label for="texte">Article : </label>
      <TipTap :texte="texte" @newTexte="changeTexte($event)" />
      <input type="date" name="date" v-model="date" />
      <input type="text" name="alt" v-model="alt" placeholder="alt" />
      <input
        type="file"
        id="photoArticle"
        name="photoArticle"
        placeholder="ajouté photo ici"
      />
    </div>
    <button @click="envoyerArticle()">Ajouter article</button>
  </section>
</template>

<script>
import TipTap from "@/components/TipTap.vue";
export default {
  components: {
    TipTap,
  },
  data() {
    return {
      titre: "",
      texte: "<p> Lorem Ipsum ...</p> <h5>eerkfjblihb</h5> <p>ezarazeraze</p>",
      alt: "",
      date: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    changeTexte(event) {
      this.texte = event;
    },
    envoyerArticle() {
      let img = document.getElementById("photoArticle").files[0];

      let article = new FormData();
      article.append("titre", this.titre);
      article.append("texte", this.texte);
      article.append("date", this.date);
      article.append("src", img);
      article.append("alt", this.alt);

      console.log("article", this.texte);
       this.$store.commit("loading");
      this.http
        .post("http://localhost:9000/articles/addArticle/Articles", article, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        })
        .then((resp) => {
          console.log("reponse", resp);
          this.$store.commit("loading");
          window.alert(resp.data);
          this.titre = "";
          this.texte = "";
          this.alt = "";
          document.getElementById("photo").value = "";
        })
        .catch((err) => {
          console.log("erreur", err.response);
          this.$store.commit("loading");
          window.alert(err.response.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 90%;
  justify-content: space-evenly;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  padding: 5%;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
input {
  font-size: 2.5vh;
  border-radius: 5px;
  padding: 2%;
  border: 2px var(--thirdly-color) solid;
}
label {
  font-size: 2.2vh;
}

button {
  font-size: 3vh;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  border: none;
  padding: 2% 5%;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .form {
    width: 60%;
    padding: 2%;
  }
  input {
    padding: 0%;
    font-size: 2vh;
  }
  button {
    font-size: 2.5vh;
    padding: 1% 4%;
  }
}
</style>