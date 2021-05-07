<template>
  <div id="professionnelsPortFolio">
    <div id="first-section">
      <h2>Professionnels Portfolio</h2>

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
        :css="'primary-big'"
        :route="'/professionnels/tarifs'"
        :type="'router'"
      />
    </div>
    <section id="seconde-section">
      <h3>Photo</h3>
      <div class="inline-flex">
        <button @click="getPhotos('miseEnValeur')">Mise en valeur</button>
        <button @click="getPhotos('packShot')">
          Photo de produits / Packshot
        </button>
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
      <h3>Vidéo</h3>
      <div class="video-bloc">
        <h4>{{ videoYoutube1.titre }}</h4>
        <iframe
          width="100%"
          height="80%"
          :src="'https://www.youtube.com/embed/' + videoYoutube1.lien"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="video-bloc">
        <h4>{{ videoYoutube2.titre }}</h4>
        <iframe
          width="100%"
          height="80%"
          :src="'https://www.youtube.com/embed/' + videoYoutube2.lien"
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
import Axios from "axios";
import Caroussel from "../components/Caroussel.vue";
import Boutton from "../components/Boutton.vue";
export default {
  name: "ProfessionnelsPortFolio",
  components: {
    Caroussel,
    Boutton,
  },
  data() {
    return {
      photos: null,
      videoYoutube1: {
        titre: "",
        lien: "",
      },
      videoYoutube2: {
        titre: "",
        lien: "",
      },
    };
  },
  mounted() {
    Axios.get(
      "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAa_8XnoOsP9FFRwSjQgsq24b917C8AxLY&channelId=UC2pZC0DhtKP-zjXmVC5AxaA&part=snippet,id&order=date&maxResults=2"
    ).then((resp) => {
      console.log("reponse", resp);
      this.videoYoutube1.lien = resp.data.items[0].id.videoId;
      this.videoYoutube1.titre = resp.data.items[0].snippet.title;
      this.videoYoutube2.lien = resp.data.items[1].id.videoId;
      this.videoYoutube2.titre = resp.data.items[1].snippet.title;
    });
  },
  methods: {
    getPhotos(categ) {
      document.getElementById("seconde-section").style.height = "auto";
      switch (categ) {
        case "miseEnValeur":
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
        case "packShot":
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