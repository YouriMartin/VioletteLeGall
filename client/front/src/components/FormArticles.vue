<template>
  <section id="form-article">
    <h2>formulaire Articles</h2>
    <div class="form">
      <input type="text" name="titre" v-model="titre" placeholder="titre" />
      <textarea name="texte" v-model="texte" placeholder="texte" />
      <input type="date" name="date" v-model="date" />
      <input type="text" name="alt" v-model="alt" placeholder="alt" />
      <input
        type="file"
        id="photo"
        name="photo"
        placeholder="ajouté photo ici"
      />
    </div>
    <button @click="envoyerArticle()">Ajouter article</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      titre: "",
      texte: "",
      alt: "",
      date: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    envoyerArticle() {
      let img = document.getElementById("photo").files[0];
      /* let article = {
        titre: this.titre,
        texte: this.texte,
        date: this.date,
        src: img,
        alt: this.alt,
      };*/
      let article = new FormData();
      article.append("titre", this.titre);
      article.append("texte", this.texte);
      article.append("date", this.date);
      article.append("src", img);
      article.append("alt", this.alt);

      console.log("article", article);
      this.http
        .post("http://localhost:9000/articles/addArticle", article)
        .then((resp) => {
          console.log("reponse", resp);
        })
        .catch((err) => {
          console.log("erreur", err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: space-evenly;
}
input,
textarea {
  font-size: 2vh;
  border-radius: 5px;
  padding: 2%;
  border: 2px var(--thirdly-color) solid;
}
textarea {
  resize: none;
  height: 50%;
}
</style>