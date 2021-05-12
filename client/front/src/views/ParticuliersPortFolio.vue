<template>
  <div id="particuliersPortFolio">
    <div id="first-section">
      <h2>Particulier Portfolio</h2>

      <Caroussel :size="'30vh'" />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est odit enim
        rerum delectus dolor deleniti quasi nobis saepe! Nulla enim veritatis
        blanditiis libero facilis mollitia delectus ab iste omnis atque. Iure
        velit repellat voluptate voluptates cum molestiae quaerat modi rerum? Et
        ipsum alias voluptatibus deleniti autem porro quam tenetur
        necessitatibus, debitis asperiores ea sint vitae omnis quia. Quia,
        aliquam laudantium.
      </p>
      <Boutton
        :texte="'Accéder aux tarifs'"
        :css="'thirdly-big'"
        :route="'/particuliers/tarifs'"
        :type="'router'"
      />
    </div>
    <section id="seconde-section">
      <h3>Photo</h3>
      <div class="inline-flex">
        <button @click="getPhotos('mariage')">Mariage</button>
        <button @click="getPhotos('naissance')">Naissance</button>
        <button @click="getPhotos('portraitExterieur')">
          Portrait Extérieur
        </button>
        <button @click="getPhotos('portraitInterieur')">
          Portrait Intérieur
        </button>
        <button @click="getPhotos('couple')">Couple</button>
        <button @click="getPhotos('famille')">Famille</button>
      </div>
      <div id="photo-container">
        <img
          v-for="photo in photos"
          :key="photo.id"
          :src="photo.src"
          :alt="photo.alt"
        />
      </div>
    </section>
    <section>
      <h3>Vidéos</h3>
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
export default {
  name: "ParticuliersPortFolio",
  components: {
    Caroussel,
    Boutton,
  },
  data() {
    return {
      photos: null,
      videos: "",
    };
  },
  mounted() {
    this.http
      .get("http://localhost:9000/youtube/getLast2videos")
      .then((resp) => {
        this.videos = resp.data;
      });
  },
  methods: {
    getPhotos(categ) {
      document.getElementById("seconde-section").style.height = "auto";
      switch (categ) {
        case "mariage":
          this.photos = [
            {
              id: 1,
              src: require("@/assets/imgTest/mariageFolio.jpg"),
              alt: "truc",
            },
            {
              id: 2,
              src: require("@/assets/imgTest/mariage.jpg"),
              alt: "truc",
            },
          ];
          break;
        case "naissance":
          this.photos = [
            {
              id: 3,
              src: require("@/assets/imgTest/slide1.jpg"),
              alt: "truc",
            },
            {
              id: 4,
              src: require("@/assets/imgTest/ParticulierFolio7.jpg"),
              alt: "truc",
            },
          ];
          break;
        case "portraitExterieur":
          this.photos = [
            {
              id: 5,
              src: require("@/assets/imgTest/portraitsFolio.jpg"),
              alt: "truc",
            },
            {
              id: 6,
              src: require("@/assets/imgTest/ParticulierFolio4.jpg"),
              alt: "truc",
            },
          ];
          break;
        case "portraitInterieur":
          this.photos = [
            {
              id: 7,
              src: require("@/assets/imgTest/ParticulierFolio2.jpg"),
              alt: "truc",
            },
            {
              id: 8,
              src: require("@/assets/imgTest/insta4.png"),
              alt: "truc",
            },
          ];
          break;
        case "couple":
          this.photos = [
            {
              id: 9,
              src: require("@/assets/imgTest/slide2.jpg"),
              alt: "truc",
            },
            {
              id: 10,
              src: require("@/assets/imgTest/coupleFolio.jpg"),
              alt: "truc",
            },
          ];
          break;
        case "famille":
          this.photos = [
            {
              id: 11,
              src: require("@/assets/imgTest/familleFolio.jpg"),
              alt: "truc",
            },
            {
              id: 12,
              src: require("@/assets/imgTest/famille.jpg"),
              alt: "truc",
            },
          ];
          break;
      }
    },
  },
};
</script>

<style scoped>
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
#photos-container {
  display: inline-flex;
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
img {
  height: 15vh;

  margin: 10px;
}
.video-bloc {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>