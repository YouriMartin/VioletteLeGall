<template>
  <div id="particuliersPortFolio" v-if="blocs != null">
    <ModalBigPhoto
      v-if="showModalPhotos"
      :toggleModal="bigPicture"
      :src="src"
      :alt="alt"
      :categorie="categorie"
    />
    <FormTextePage
      v-if="showModalTexte"
      :toggleModal="updateTexte"
      :idPage="pageId"
      :idBloc="idBloc"
      :texte="texte"
    />
    <div id="first-section">
      <h2>{{ title }}</h2>
      <Caroussel
        :size="'30vh'"
        :idPage="pageId"
        :idBloc="blocs[0]._id"
        :contents="blocs[0].imgCaroussel"
      />
      <div
        @click="updateTexte(blocs[0]._id, blocs[0].paragraphes)"
        v-html="blocs[0].paragraphes"
      ></div>
      <Boutton
        :texte="'Accéder aux tarifs'"
        :css="'thirdly-big'"
        :route="'/particuliers/tarifs'"
        :type="'router'"
      />
    </div>
    <section id="seconde-section">
      <h3>{{ blocs[1].subtitle }}</h3>
      <div class="inline-flex">
        <button
          v-for="sousCategorie in sousCategories"
          :key="sousCategorie"
          @click="getPhotos(sousCategorie)"
        >
          {{ sousCategorie }}
        </button>
      </div>
      <div id="photo-container">
        <img
          v-for="photo in photos"
          :key="photo.id"
          :src="'http://localhost:9000/static/Particuliers/' + photo.src"
          :alt="photo.alt"
          @click="bigPicture(photo.src, photo.alt)"
        />
      </div>
    </section>
    <section>
      <h3>{{ blocs[2].subtitle }}</h3>
      <div v-for="video in videos" :key="video.titre" class="video-bloc">
        <h4>{{ video.titre }}</h4>
        <iframe
          width="100%"
          height="80%"
          :src="'https://www.youtube.com/embed/' + video.lien"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <Boutton
        :texte="'Ma Chaine Youtube'"
        :css="'thirdly-big'"
        :route="'https://www.youtube.com/channel/UC2pZC0DhtKP-zjXmVC5AxaA'"
        :type="'a'"
      />
    </section>
  </div>
</template>

<script>
import Caroussel from "../components/Caroussel.vue";
import Boutton from "../components/Boutton.vue";
import ModalBigPhoto from "@/components/ModalBigPhoto.vue";
import FormTextePage from "@/components/FormTextePage.vue";
export default {
  name: "ParticuliersPortFolio",
  components: {
    Caroussel,
    Boutton,
    ModalBigPhoto,
    FormTextePage,
  },
  data() {
    return {
      photos: null,
      videos: "",
      sousCategories: null,
      showModalPhotos: false,
      showModalTexte: false,
      src: null,
      alt: null,
      categorie: "Particuliers",
      blocs: null,
      pageId: null,
      title: null,
    };
  },
  created() {
    this.$store.commit("loading");
    this.http
      .get("http://localhost:9000/pages/getPage/60b79e602d56ae3b30b358cf")
      .then((resp) => {
        console.log(resp.data);
        this.pageId = resp.data._id;
        this.blocs = resp.data.blocs;
        this.title = resp.data.name;
        console.log(this.blocs);
        this.$store.commit("loading");
      });
  },
  mounted() {
    this.http
      .get("http://localhost:9000/youtube/getLast2videos")
      .then((resp) => {
        this.videos = resp.data;
      });

    this.http
      .get("http://localhost:9000/photos/getSousCategories/Particuliers")
      .then((resp) => {
        //console.log(resp.data);
        this.sousCategories = resp.data;
      });
  },
  methods: {
    getPhotos(souscategorie) {
      this.http
        .get(
          "http://localhost:9000/photos/getPhotos/Particuliers/" + souscategorie
        )
        .then((resp) => {
          //console.log(resp.data);
          this.photos = resp.data;
        });
    },
    bigPicture(src, alt) {
      this.src = src;
      this.alt = alt;
      this.showModalPhotos = !this.showModalPhotos;
    },
    updateTexte(idBloc, texte) {
      if (idBloc && texte) {
        this.idBloc = idBloc;
        this.texte = texte;
      }
      this.showModalTexte = !this.showModalTexte;
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

#first-section {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
}
#seconde-section {
  padding-top: 5%;
  min-height: 100vh;
  height: auto;
  #photo-container {
    display: flex;
    justify-content: center;
    align-items: space-evenly;
    flex-wrap: wrap;
    img {
      max-width: 40vw;
      margin: 5px;
      object-fit: cover;
    }
  }
}

button {
  text-decoration: none;
  border: none;
  height: 40px;
  width: 150px;
  color: var(--thirdly-color);
  font-size: 15px;
  margin: 10px 5px;
}
.video-bloc {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>