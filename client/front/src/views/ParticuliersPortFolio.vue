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
      sousCategories: null,
    };
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
        console.log(resp.data);
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
          console.log(resp.data);
          this.photos = resp.data;
        });
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
#seconde-section {
  min-height: 100vh;
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