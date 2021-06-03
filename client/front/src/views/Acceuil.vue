<template>
  <div id="acceuil" v-if="blocs != null">
    <FormPhotosPage
      v-if="showModalPhotos"
      :toggleModal="updatePhoto"
      :idPage="pageId"
      :idBloc="idBloc"
      :showModal="showModalPhotos"
    />
    <div>
      <img
        id="logo-acceuil"
        src="@/assets/logoblanc-transparent.png"
        alt="logo"
      />
      <Caroussel :size="'100vh'" :contents="blocs[0].imgCaroussel" />
    </div>
    <section id="first-section">
      <h3>{{ blocs[1].subtitle }}</h3>
      <div id="float-container">
        <img
          :src="`http://localhost:9000/static/${blocs[1].img.categorie}/${blocs[1].img.src}`"
          :alt="blocs[1].img.alt"
          @click="updatePhoto(blocs[1]._id)"
        />
        <div v-html="blocs[1].paragraphes"></div>
      </div>
      <Boutton
        :texte="'Me Contacter'"
        :css="'primary-big'"
        :route="'/contact'"
        :type="'router'"
      />
    </section>
    <section id="second-section">
      <h3>{{ blocs[2].subtitle }}</h3>
      <div class="inline-flex">
        <div class="img-button" v-for="img in blocs[2].imgCateg" :key="img._id">
          <img
            :src="`http://localhost:9000/static/${img.categorie}/${img.src}`"
            :alt="img.alt"
          />
          <Boutton
            :texte="img.name"
            :css="'primary-invert-borderless-small'"
            :route="img.route"
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
      <h3>{{ blocs[3].subtitle }}</h3>
      <img
        :src="`http://localhost:9000/static/${blocs[3].img.categorie}/${blocs[3].img.src}`"
        :alt="blocs[3].img.alt"
        @click="updatePhoto(blocs[3]._id)"
      />
      <div v-html="blocs[3].paragraphes"></div>
      <Boutton
        :texte="'Me contacter'"
        :css="'primary-big'"
        :route="'/contact'"
        :type="'router'"
      />
    </section>
    <section id="fourth-section">
      <h3>Mon instagram</h3>
      <Boutton
        :texte="'Lien vers Instagram'"
        :css="'primary-invert-borderless-big'"
        :route="'https://www.instagram.com/violettelgpro/'"
        :type="'a'"
      />
    </section>
    <section id="fifth-section">
      <h3>Mes derniers artciles</h3>
      <div
        class="card-article"
        v-for="article in articles"
        v-bind:key="article._id"
        @click="GoToThisArticle(article._id)"
      >
        <img
          :src="'http://localhost:9000/static/Articles/' + article.img.src"
          :alt="article.img.alt"
        />
        <div id="titre-date">
          <h4>{{ article.titre }}</h4>
          <p class="article-date">{{ article.date.substr(0, 10) }}</p>
        </div>

        <div v-html="article.texte.substring(0, 100) + '...'"></div>
      </div>
    </section>
  </div>
</template>

<script >
import Caroussel from "../components/Caroussel.vue";
import Boutton from "../components/Boutton.vue";
import FormPhotosPage from "@/components/FormPhotosPage.vue";
export default {
  name: "Acceuil",
  components: {
    Caroussel,
    Boutton,
    FormPhotosPage,
  },
  data() {
    return {
      showModalPhotos: false,
      pageId: null,
      idBloc: null,
      blocs: null,
      lienYoutube: "M7r3nKqaoxw",
      articles: null,
    };
  },
  created() {
    this.$store.commit("loading");
    this.http
      .get("http://localhost:9000/pages/getPage/60b627ba488409500c87ea52")
      .then((resp) => {
        console.log(resp.data);
        this.pageId = resp.data._id;
        this.blocs = resp.data.blocs;
        console.log(this.blocs);
        this.$store.commit("loading");
      });
  },
  mounted() {
    //les vidéos youtube
    /* this.http.get("http://localhost:9000/youtube/getLastvideo").then((resp) => {
      this.lienYoutube = resp.data;
    });*/
    //les articles
    this.http
      .get("http://localhost:9000/articles/getAll")
      .then((resp) => {
        //console.log("resp", resp.data);
        this.articles = resp.data
          .slice(resp.data.length - 2, resp.data.length)
          .reverse();
        // console.log(this.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    GoToThisArticle() {
      this.$router.push("/blog");
    },
    updatePhoto(idBloc) {
      console.log(idBloc);
      if (idBloc) {
        this.idBloc = idBloc;
      }
      this.showModalPhotos = !this.showModalPhotos;
    },
  },
};
</script>

<style lang="scss" scoped>
Caroussel {
  position: absolute;
}
#logo-acceuil {
  height: 25vh;
  position: absolute;
  z-index: 2;
  top: 15%;
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
}
#first-section {
  #float-container {
    padding: 10%;
  }
  img {
    float: left;
    margin-right: 5vw;
    clip-path: circle(50%);
    height: 42vw;
    shape-outside: circle();
  }
  margin-top: 2vh;
  font-size: 2vh;
  letter-spacing: 0.2vw;
  line-height: 3.5vh;
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
    margin-top: 3vh;
  }
}

#third-section {
  img {
    height: 25%;
    object-fit: cover;
  }
  letter-spacing: 0.2vw;
  line-height: 3.5vh;
  font-size: 2vh;
  padding: 0% 5%;
}

.card-article {
  height: 40%;
  width: 80%;
  background-color: var(--primary-color);
  color: var(--fourthly-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 2.5vh;
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
      position: absolute;
      right: 12%;
      font-size: 1.5vh;
    }
    h4 {
      font-size: 3vh;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>

