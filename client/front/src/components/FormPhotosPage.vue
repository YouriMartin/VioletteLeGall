<template>
  <div id="form-photos-page" v-if="$store.state.admin">
    <div class="overlay" @click="toggleModal"></div>
    <div class="modal">
      <h3>Modification Photo</h3>
      <div class="select-group">
        <i class="fas fa-filter"></i>
        <select v-model="categorie">
          <option value="Particuliers">Particuliers</option>
          <option value="Professionnels">Professionnels</option>
          <option value="Autres">Autres</option>
        </select>
      </div>
      <div class="select-group">
        <i
          v-if="categorie != null && categorie != 'Autres'"
          class="fas fa-filter"
        ></i>
        <select v-if="categorie === 'Professionnels'" v-model="sousCategorie">
          <option
            v-for="sousCateg in professionelsSousCategorie"
            :key="sousCateg"
          >
            {{ sousCateg }}
          </option>
        </select>
        <select v-if="categorie === 'Particuliers'" v-model="sousCategorie">
          <option
            v-for="sousCateg in particuliersSousCategorie"
            :key="sousCateg"
          >
            {{ sousCateg }}
          </option>
        </select>
      </div>
      <div id="photo-container">
        <img
          v-for="photo in photosFiltered"
          :key="photo._id"
          :src="
            'http://localhost:9000/static/' + photo.categorie + '/' + photo.src
          "
          :alt="photo.alt"
          @click="updatePhoto(photo)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormPhotosPage",
  props: ["toggleModal", "idPage", "idBloc"],
  data() {
    return {
      categorie: null,
      photos: null,
      photosFiltered: null,
      professionelsSousCategorie: null,
      particuliersSousCategorie: null,
      sousCategorie: null,
    };
  },
  methods: {
    updatePhoto(photo) {
      this.$store.commit("loading");
      let infos = {
        idPage: this.idPage,
        newPhoto: photo,
        idBloc: this.idBloc,
      };
      console.log("infos", infos);
      this.http
        .post("http://localhost:9000/pages/updatePhoto", infos, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        })
        .then((resp) => {
          console.log(resp);
          this.$store.commit("loading");
          document.location.reload();
        });
    },
  },
  mounted() {
    this.http
      .get("http://localhost:9000/photos/getSousCategories/Particuliers")
      .then((resp) => {
        //console.log(resp.data);
        this.particuliersSousCategorie = resp.data;
      });
    this.http
      .get("http://localhost:9000/photos/getSousCategories/Professionnels")
      .then((resp) => {
        // console.log(resp.data);
        this.professionelsSousCategorie = resp.data;
      });
  },
  watch: {
    sousCategorie: function (value) {
      this.photosFiltered = this.photos.filter((photo) =>
        value.includes(photo.sous_categorie)
      );
    },
    categorie: function (value) {
      this.http
        .get("http://localhost:9000/photos/getPhotos/" + value + "/all")
        .then((resp) => {
          // console.log(resp.data);

          this.photos = resp.data;
          this.photosFiltered = resp.data;
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
  min-height: 50%;
  height: auto;
  width: 80%;
  background: #f1f1f1;
  color: var(--thirdly-color);
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
  text-align: center;

  #photo-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }
  img {
    height: 100%;
    width: 20%;
    object-fit: cover;
  }
}
</style>