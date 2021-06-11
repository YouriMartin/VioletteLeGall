<template>
  <div id="professionnelsPortFolio" v-if="blocs != null">
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
      :elementChange="elementChange"
    />
    <div id="first-section">
      <h2 @click="updateTitle">{{ title }}</h2>
      <Caroussel
        v-if="$store.state.mobile"
        :size="'25vh'"
        :idPage="pageId"
        :idBloc="blocs[0]._id"
        :contents="blocs[0].imgCaroussel"
      />
      <Caroussel
        v-if="!$store.state.mobile"
        :size="'65vh'"
        :large="'100%'"
        :idPage="pageId"
        :idBloc="blocs[0]._id"
        :contents="blocs[0].imgCaroussel"
      />
      <div
        class="texte"
        @click="updateTexte(blocs[0]._id, blocs[0].paragraphes)"
        v-html="blocs[0].paragraphes"
      ></div>
      <Boutton
        :texte="'Accéder aux tarifs'"
        :css="'primary-big'"
        :route="'/professionnels/tarifs'"
        :type="'router'"
      />
    </div>
    <section id="seconde-section">
      <h3 @click="updateSubTitle(blocs[1]._id, blocs[1].subtitle)">
        {{ blocs[1].subtitle }}
      </h3>
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
        <div class="photo" v-for="photo in photos" :key="photo.id">
          <img
            class="img"
            :src="'http://localhost:9000/static/Professionnels/' + photo.src"
            :alt="photo.alt"
            @click="bigPicture(photo.src, photo.alt)"
          />
        </div>
      </div>
    </section>
    <section>
      <h3 @click="updateSubTitle(blocs[2]._id, blocs[2].subtitle)">
        {{ blocs[2].subtitle }}
      </h3>
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
        :css="'primary-big'"
        :route="'https://www.youtube.com/channel/UC2pZC0DhtKP-zjXmVC5AxaA'"
        :type="'a'"
      />
    </section>
  </div>
</template>

<script>
import Caroussel from "@/components/Caroussel.vue";
import Boutton from "@/components/Boutton.vue";
import ModalBigPhoto from "@/components/ModalBigPhoto.vue";
import FormTextePage from "@/components/FormTextePage.vue";

export default {
  name: "ProfessionnelsPortFolio",
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
      categorie: "Professionnels",
      blocs: null,
      pageId: null,
      title: null,
      elementChange: null,
    };
  },
  created() {
    this.$store.commit("loading");
    this.http
      .get("http://localhost:9000/pages/getPage/60bcb89ee862fb3e20cee699")
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
      .get("http://localhost:9000/photos/getSousCategories/Professionnels")
      .then((resp) => {
        // console.log(resp.data);
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
          // console.log(resp.data);
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
        this.elementChange = "texte";
      }
      this.showModalTexte = !this.showModalTexte;
    },
    updateSubTitle(idBloc, subtitle) {
      if (idBloc && subtitle) {
        this.idBloc = idBloc;
        this.texte = subtitle;
        this.elementChange = "subtitle";
      }
      this.showModalTexte = !this.showModalTexte;
    },
    updateTitle() {
      this.texte = this.title;
      this.elementChange = "title";
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
  background-color: var(--primary-color);
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
    flex-wrap: wrap;
    .photo {
      height: 30vh;
      margin: 5px;
      img {
        max-width: 40vw;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
}
button {
  transition: all 0.5s ease;
  text-decoration: none;
  border: 5px solid var(--primary-color);
  // height: 5vh;
  padding: 2% 5%;
  color: var(--thirdly-color);
  font-size: 3vh;
  margin: 10px 5px;
  cursor: pointer;
}

.video-bloc {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

@media screen and (min-width: 768px) {
  #first-section {
    padding-bottom: 2%;
    justify-content: space-between;
    h2 {
      position: absolute;
      z-index: 2;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-shadow: rgba(149, 157, 165, 0.2) 0px 8px 20px;
    }
    .texte {
      width: 50%;
      align-self: center;
      font-size: 2.5vh;
    }
  }
  #seconde-section {
    .inline-flex {
      width: 70%;
      button {
        font-size: 2.5vh;
        padding: 1% 0%;
        width: 20%;
        &:hover {
          border: 5px solid var(--fourthly-color);
          color: var(--fourthly-color);
          background-color: var(--primary-color);
        }
      }
    }
    #photo-container {
      width: 100%;
      .photo {
        height: auto;
        overflow: hidden;
        img {
          width: 30vw;
          max-height: none;
          transition: 0.3s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>