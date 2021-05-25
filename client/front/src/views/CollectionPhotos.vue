<template>
  <div id="collectionPhotos">
    <h3>Collection Photos</h3>
    <p @click="goAdmin()" class="link">Retour Page Admin</p>
    <p>
      Pour voir toutes les photos enregistrées, pour modifier le alt d'une photo
      ou la supprimer.
    </p>
    <div class="inline-flex">
      <button @click="GetPhotos('Professionnels')">Professionnels</button>
      <button @click="GetPhotos('Particuliers')">Particuliers</button>
    </div>
    <div class="select-group">
      <i v-if="categorie != null" class="fas fa-filter"></i>
      <select v-if="categorie === 'Professionnels'" v-model="sousCategorie">
        <option
          v-for="sousCateg in professionelsSousCategorie"
          :key="sousCateg"
        >
          {{ sousCateg }}
        </option>
      </select>
      <select v-if="categorie === 'Particuliers'" v-model="sousCategorie">
        <option v-for="sousCateg in particuliersSousCategorie" :key="sousCateg">
          {{ sousCateg }}
        </option>
      </select>
    </div>
    <img
      v-for="photo in photosFiltered"
      :key="photo._id"
      :src="'http://localhost:9000/static/' + photo.categorie + '/' + photo.src"
      :alt="photo.alt"
      @click="toggleModal(photo._id)"
    />
    <FormUpdatePhoto
      v-if="showModal"
      :toggleModal="toggleModal"
      :id="photoId"
      :showModal="showModal"
    />
  </div>
</template>

<script>
import FormUpdatePhoto from "@/components/FormUpdatePhoto.vue";
export default {
  components: {
    FormUpdatePhoto,
  },
  data() {
    return {
      photos: null,
      photosFiltered: null,
      professionelsSousCategorie: null,
      particuliersSousCategorie: null,
      categorie: null,
      sousCategorie: null,
      showModal: false,
      photoId: null,
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
        this.professionnelsSousCategorie = resp.data;
      });
  },
  methods: {
    GetPhotos(categorie) {
      this.http
        .get("http://localhost:9000/photos/getPhotos/" + categorie)
        .then((resp) => {
          // console.log(resp.data);
          this.categorie = categorie;
          this.photos = resp.data;
          this.photosFiltered = resp.data;
        });
    },
    toggleModal(id) {
      if (id) {
        this.photoId = id;
        console.log(id);
      }
      this.showModal = !this.showModal;
    },
    goAdmin() {
      this.$router.push("/admin");
    },
  },
  watch: {
    sousCategorie: function (value) {
      console.log("toto");
      this.photosFiltered = this.photos.filter((photo) =>
        value.includes(photo.sous_categorie)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#collectionPhotos {
  min-height: 100vh;
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  .inline-flex {
    width: 100%;
  }
  h3 {
    margin-top: 10%;
  }
  p {
    text-align: center;
    font-size: 2.5vh;
    margin: 5% 0%;
  }
  .link {
    font-weight: bold;
    font-size: 2.8vh;
    text-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}
button {
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  border: none;
  padding: 5%;
  margin: 5%;
  font-size: 2.5vh;
}
img {
  margin: 5%;
  max-width: 90%;
}
.select-group {
  width: 80%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 3vh;
  i {
    margin-right: 5%;
  }
  select {
    width: 80%;
    border: 1px solid var(--thirdly-color);
    border-radius: 5px;
    color: var(--thirdly-color);
    padding: 2%;
  }
}
</style>