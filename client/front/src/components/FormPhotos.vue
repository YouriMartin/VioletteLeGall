<template>
  <section id="form-photos">
    <h3>formulaire Photos</h3>
    <div class="form">
      <div>
        <label for="alt">Alt : </label>
        <input type="text" name="alt" v-model="alt" placeholder="alt" />
      </div>
      <div class="inline-flex">
        <input
          id="particulier"
          type="radio"
          value="Particuliers"
          v-model="categ"
        />
        <label for="particulier">Particuliers</label>
        <input
          id="professionnel"
          type="radio"
          value="Professionnels"
          v-model="categ"
        />
        <label for="professionnel">Professionnels</label>
        <input id="autre" type="radio" value="Autres" v-model="categ" />
        <label for="autre">Autres</label>
      </div>
      <div id="select-group">
        <label v-if="categ != 'Autres'"> Catégories</label>
        <select v-if="categ === 'Particuliers'" v-model="sousCateg">
          <option
            v-for="sousCateg in particuliersSousCategorie"
            :value="sousCateg"
            :key="sousCateg"
          >
            {{ sousCateg }}
          </option>
          <option value="newOptions">Ajouter categorie</option>
        </select>
        <select v-if="categ === 'Professionnels'" v-model="sousCateg">
          <option
            v-for="sousCateg in professionelsSousCategorie"
            :value="sousCateg"
            :key="sousCateg"
          >
            {{ sousCateg }}
          </option>
          <option value="newOptions">Ajouter categorie</option>
        </select>
        <label v-if="sousCateg === 'newOptions'" for="customSousCateg">
          Nouvelle catégorie
        </label>
        <input
          v-if="sousCateg === 'newOptions'"
          name="customSousCateg"
          type="text"
          placeholder="Nouvelle catégorie"
          v-model="customSousCateg"
        />
      </div>
      <input
        type="file"
        id="photo"
        name="photo"
        placeholder="ajouté photo ici"
      />
    </div>
    <button @click="envoyerPhoto()">Ajouter photo</button>
  </section>
</template>

<script>
export default {
  name: "FormPhotos",
  data() {
    return {
      alt: "",
      categ: "Particuliers",
      sousCateg: null,
      customSousCateg: null,
      particuliersSousCategorie: null,
      professionelsSousCategorie: null,
    };
  },
  mounted() {
    this.http
      .get("http://localhost:9000/photos/getSousCategories/Particuliers")
      .then((resp) => {
        console.log(resp.data);
        this.particuliersSousCategorie = resp.data;
      });
    this.http
      .get("http://localhost:9000/photos/getSousCategories/Professionnels")
      .then((resp) => {
        console.log(resp.data);
        this.professionelsSousCategorie = resp.data;
      });
  },

  methods: {
    envoyerPhoto() {
      let img = document.getElementById("photo").files[0];
      if (this.categ != "" && img != "undefined" && this.alt != "") {
        this.$store.commit("loading");
        let categ = this.categ;
        let photo = new FormData();
        photo.append("src", img);
        photo.append("alt", this.alt);
        photo.append("categorie", categ);
        photo.append("sous_categorie", this.sousCateg);

        console.log("photos", photo);
        this.http
          .post(`http://localhost:9000/photos/addPhotos/${categ}`, photo)
          .then((resp) => {
            console.log("reponse", resp);
            window.alert(resp.data);
            this.alt = "";
            document.getElementById("photo").value = "";
            this.$store.commit("loading");
          })
          .catch((err) => {
            console.log("erreur", err.response);
            window.alert(err.response.data);
          });
      } else {
        window.alert("il manque un element");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 60%;
  background-color: var(--fourthly-color);
  padding: 5%;
  border-radius: 5px;
  color: var(--thirdly-color);
}
label {
  font-size: 2.5vh;
}
input {
  font-size: 2vh;
  border-radius: 5px;
  padding: 2%;
  border: 2px var(--thirdly-color) solid;
}
button {
  font-size: 3vh;
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  border: none;
  padding: 2% 5%;
  cursor: pointer;
}
#select-group {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 40%;
}

@media screen and (min-width: 768px) {
  button {
    font-size: 2.5vh;
    padding: 1% 4%;
  }
}
</style>