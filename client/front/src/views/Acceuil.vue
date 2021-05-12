<template>
  <div id="acceuil">
    <div>
      <h1>Violette le Gall</h1>
      <Caroussel :size="'100vh'" />
    </div>
    <section id="first-section">
      <h3>Hello !</h3>
      <div id="float-container">
        <img :src="imageHello.img" :alt="imageHello.alt" />
        <p>{{ texte.hello }}</p>
      </div>
      <Boutton
        :texte="'Me Contacter'"
        :css="'primary-big'"
        :route="'/contact'"
        :type="'router'"
      />
    </section>
    <section id="second-section">
      <h3>Portfolio</h3>
      <div class="inline-flex">
        <div class="img-button">
          <img :src="imageCateg[0].img" :alt="imageCateg[0].alt" />
          <Boutton
            :texte="'Particuliers'"
            :css="'primary-invert-borderless-small'"
            :route="'/particuliers/portfolio'"
            :type="'router'"
          />
        </div>
        <div class="img-button">
          <img :src="imageCateg[1].img" :alt="imageCateg[1].alt" />
          <Boutton
            :texte="'Professionnels'"
            :css="'primary-invert-borderless-small'"
            :route="'/professionnels/portfolio'"
            :type="'router'"
          />
        </div>
        <div class="img-button">
          <img :src="imageCateg[2].img" :alt="imageCateg[2].alt" />
          <Boutton
            :texte="'Blog'"
            :css="'primary-invert-borderless-small'"
            :route="'/blog'"
            :type="'router'"
          />
        </div>
      </div>
      <h3>Ma dernière vidéo :</h3>
      <iframe
        width="80%"
        height="20%"
        :src="'https://www.youtube.com/embed/' + lienYoutube"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <Boutton
        :texte="'Ma Chaine Youtube'"
        :css="'primary-invert-borderless-big'"
        :route="'https://www.youtube.com/channel/UC2pZC0DhtKP-zjXmVC5AxaA'"
        :type="'a'"
      />
    </section>
    <section id="third-section">
      <h3>Qui suis je ?</h3>
      <img :src="imageQuiSuisJe.img" :alt="imageQuiSuisJe.alt" />
      <p v-for="paragraphe in texte.QuiSuisJe" v-bind:key="paragraphe">
        {{ paragraphe }}
      </p>
      <Boutton
        :texte="'Me contacter'"
        :css="'primary-big'"
        :route="'/contact'"
        :type="'router'"
      />
    </section>
    <section id="fourth-section">
      <h3>Mon instagram</h3>
    </section>
    <section id="fifth-section">
      <h3>Mes derniers artciles</h3>
      <div
        class="card-article"
        v-for="article in articles"
        v-bind:key="article.id"
        @click="GoToThisArticle(article.id)"
      >
        <img :src="article.img.src" :alt="article.img.alt" />
        <div id="titre-date">
          <h4>{{ article.titre }}</h4>
          <p class="article-date">{{ article.date }}</p>
        </div>
        <p>{{ article.description.substring(0, 140) + "..." }}</p>
      </div>
    </section>
  </div>
</template>

<script >
import Caroussel from "../components/Caroussel.vue";
import Boutton from "../components/Boutton.vue";
export default {
  name: "Acceuil",
  components: {
    Caroussel,
    Boutton,
  },
  data() {
    return {
      imageHello: {
        img: require("@/assets/imgTest/violette2.jpg"),
        alt: "image de violette",
      },
      texte: {
        hello:
          " Vous chercher une photographe professionnelle pour vos photos de mariage ou pour une séance photo avec votre bébé ?  Vous avez besoin d'une photo professionnelle pour votre CV ou votre page LinkedIn ? Vous êtes un ou une professionnelle et vous cherchez à mettre en valeur votre entreprise avec une vidéo corporate à publier sur les réseaux ? ",
        QuiSuisJe: [
          `Je m'appelle Violette, je suis bretonne et passionnée de photo depuis mon adolescence.`,
          `Dans mon traveil, j'apprécie particulièrement le fait de sublimer le moment : mettre vos créations ou évènement particulier en valeur à travers le naturel et la spontanéité. Que ce soit pour des photos de mariqge, des photos d'entreprise ou des séances photo couple, je privilégie le naturel et la sincérité, d'où le terme "lifestyle".`,
          `Vous avez un projet ? je serai très heureuse d'en discuter avec vous. Je vis actuellement à Rennes mais je peux me déplacer n'importe où, c'est toujours un plaisir pour moi de voyager.`,
          `Vous cherchez une photographe pour immortaliser un moment ? contactez moi !`,
        ],
      },
      imageCateg: [
        {
          img: require("@/assets/imgTest/ParticulierFolio5.jpg"),
          alt: "particuliers portfolio",
        },
        {
          img: require("@/assets/imgTest/promotionFolio.jpg"),
          alt: "professionnels portfolio",
        },
        {
          img: require("@/assets/imgTest/portraitsFolio.jpg"),
          alt: "Blog",
        },
      ],
      articles: [
        {
          id: 1,
          titre: "titre 1",
          img: {
            src: require("@/assets/imgTest/ParticulierFolio5.jpg"),
            alt: "image article 1",
          },
          date: "20/02/92",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 2,
          titre: "titre 2",
          img: {
            src: require("@/assets/imgTest/portraitsFolio.jpg"),
            alt: "image article 2",
          },
          date: "21/05/20",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      imageQuiSuisJe: {
        img: require("@/assets/imgTest/photoViolette.jpg"),
        alt: "photo de violette",
      },
      lienYoutube: "M7r3nKqaoxw",
    };
  },
  mounted() {
    this.http.get("http://localhost:9000/youtube/getLastvideo").then((resp) => {
      this.lienYoutube = resp.data;
    });
  },
  methods: {
    GoToThisArticle(id) {
      this.$router.push("/blog/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
#acceuil {
  overflow: scroll;
  scroll-snap-type: y mandatory;
}
Caroussel {
  position: absolute;
}
h1 {
  position: absolute;
  z-index: 2;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#first-section,
#third-section,
#fifth-section {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  scroll-snap-align: start;
}
#second-section,
#fourth-section {
  background-color: var(--primary-color);
  color: var(--fourthly-color);
  scroll-snap-align: start;
}
#first-section {
  #float-container {
    padding: 10%;
  }
  img {
    float: left;
    margin-right: 2vw;
    clip-path: circle(50%);
    height: 42vw;
    shape-outside: circle();
  }
  p {
    margin-top: 2vh;
    font-size: 2.5vh;
    letter-spacing: 0.2vw;
    line-height: 3.5vh;
  }
}

#second-section {
  img {
    height: 15vh;
    width: 40vw;
    object-fit: cover;
  }
  .img-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2vh;
  }
}

#third-section {
  img {
    height: 30%;
    object-fit: cover;
  }
  p {
    font-size: 2vh;
    padding: 0% 5%;
  }
}

.card-article {
  height: 40%;
  width: 80%;
  background-color: var(--primary-color);
  color: var(--fourthly-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  img {
    height: 50%;
    object-fit: cover;
    width: 100%;
  }
  #titre-date {
    display: flex;
    width: 90%;
    align-items: center;
    p {
      font-size: 2vh;
      position: relative;
      left: 85%;
      transform: translateX(-100%);
    }
    h4 {
      font-size: 3vh;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  p {
    padding: 5%;
    font-size: 2.2vh;
  }
}
</style>

