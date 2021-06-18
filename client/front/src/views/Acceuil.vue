<template>
  <div id="acceuil" v-if="blocs != null">
    <FormPhotosPage
      v-if="showModalPhotos"
      :toggleModal="updatePhoto"
      :idPage="pageId"
      :idBloc="idBloc"
      :idOldPhoto="idOldPhoto"
      :categ="categ"
    />
    <FormTextePage
      v-if="showModalTexte"
      :toggleModal="updateTexte"
      :idPage="pageId"
      :idBloc="idBloc"
      :texte="texte"
      :elementChange="elementChange"
    />
    <div>
      <img
        v-if="$store.state.mobile"
        id="logo-acceuil"
        src="@/assets/logoblanc-transparent.png"
        alt="logo"
      />
      <Caroussel
        :size="'100vh'"
        :large="'100%'"
        :idPage="pageId"
        :idBloc="blocs[0]._id"
        :contents="blocs[0].imgCaroussel"
      />
    </div>
    <section id="first-section">
      <h3 @click="updateSubTitle(blocs[1]._id, blocs[1].subtitle)">
        {{ blocs[1].subtitle }}
      </h3>
      <div id="float-container">
        <img
          :src="`http://localhost:9000/static/${blocs[1].img.categorie}/${blocs[1].img.src}`"
          :alt="blocs[1].img.alt"
          @click="updatePhoto(blocs[1]._id)"
        />
        <div
          @click="updateTexte(blocs[1]._id, blocs[1].paragraphes)"
          v-html="blocs[1].paragraphes"
        ></div>
      </div>
      <Boutton
        :texte="'Me Contacter'"
        :css="'primary-big'"
        :route="'/contact'"
        :type="'router'"
      />
    </section>
    <section id="second-section">
      <h3 @click="updateSubTitle(blocs[2]._id, blocs[2].subtitle)">
        {{ blocs[2].subtitle }}
      </h3>
      <div class="inline-flex">
        <div class="img-button" v-for="img in blocs[2].imgCateg" :key="img._id">
          <img
            :src="`http://localhost:9000/static/${img.categorie}/${img.src}`"
            :alt="img.alt"
            @click="updatePhotoCateg(blocs[2]._id, img._id)"
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
        :css="'primary-invert-big'"
        :route="'https://www.youtube.com/channel/UC2pZC0DhtKP-zjXmVC5AxaA'"
        :type="'a'"
      />
    </section>
    <section id="third-section">
      <h3 @click="updateSubTitle(blocs[3]._id, blocs[3].subtitle)">
        {{ blocs[3].subtitle }}
      </h3>
      <img
        :src="`http://localhost:9000/static/${blocs[3].img.categorie}/${blocs[3].img.src}`"
        :alt="blocs[3].img.alt"
        @click="updatePhoto(blocs[3]._id)"
      />
      <div
        class="texte"
        v-html="blocs[3].paragraphes"
        @click="updateTexte(blocs[3]._id, blocs[3].paragraphes)"
      ></div>
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
        :css="'primary-invert-big'"
        :route="'https://www.instagram.com/violettelgpro/'"
        :type="'a'"
      />
    </section>
    <section id="fifth-section">
      <h3>MES DERNIERS ARTICLES</h3>
      <div class="articles-container">
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
            <p class="article-date">{{ article.date.substring(0, 10) }}</p>
          </div>
          <div
            class="texte-article"
            v-html="article.texte.substring(0, 110) + '...'"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script >
import Caroussel from "@/components/Caroussel.vue";
import Boutton from "@/components/Boutton.vue";
import FormPhotosPage from "@/components/FormPhotosPage.vue";
import FormTextePage from "@/components/FormTextePage.vue";
export default {
  name: "Acceuil",
  components: {
    Caroussel,
    Boutton,
    FormPhotosPage,
    FormTextePage,
  },
  data() {
    return {
      showModalPhotos: false,
      showModalTexte: false,
      pageId: null,
      idBloc: null,
      texte: null,
      blocs: null,
      lienYoutube: "M7r3nKqaoxw",
      articles: null,
      categ: false,
      idOldPhoto: null,
      elementChange: null,
    };
  },
  created() {
    this.$store.commit("loading");
    this.http
      .get("http://localhost:9000/pages/getPage/60b627ba488409500c87ea52")
      .then((resp) => {
        //console.log(resp.data);
        this.pageId = resp.data._id;
        this.blocs = resp.data.blocs;
        //console.log(this.blocs);
        this.$store.commit("loading");
      });
  },
  mounted() {
    //les vidéos youtube
    // this.http.get("http://localhost:9000/youtube/getLastvideo").then((resp) => {
    //   this.lienYoutube = resp.data;
    // });
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
    updatePhotoCateg(idBloc, id) {
      console.log(idBloc);
      if (idBloc && id) {
        this.idBloc = idBloc;
        this.idOldPhoto = id;
        this.categ = true;
      }
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
}
#second-section,
#fourth-section {
  background-color: var(--primary-color);
  color: var(--fourthly-color);
}
#first-section {
  padding: 2%;
  #float-container {
    padding: 10%;
  }
  img {
    float: left;
    margin-right: 5vw;
    clip-path: circle(50%);
    height: 20vh;
    shape-outside: circle();
  }
  margin-top: 2vh;
  font-size: 2vh;
  letter-spacing: 0.3vh;
  line-height: 3.5vh;
}

#second-section {
  padding: 2%;
  text-align: center;
  .inline-flex {
    width: 80%;
  }
  img {
    height: 12vh;
    width: 20vh;
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
  padding: 2%;
  img {
    height: 25%;
    object-fit: cover;
  }
  letter-spacing: 0.3vh;
  line-height: 2.5vh;
  font-size: 2vh;
  padding: 0% 5%;
}

#fifth-section {
  text-align: center;
  .articles-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 80%;
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
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
          margin-left: 80%;
          font-size: 1.5vh;
        }
        h4 {
          position: absolute;
          font-size: 3vh;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  #first-section {
    #float-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 50%;
      width: 70%;
      margin: 5%;
      img {
        float: none;
        height: 30vh;
        margin: 5%;
      }
    }
  }
  #second-section {
    img {
      height: 20vh;
      width: 30vh;
    }
    iframe {
      height: 40%;
      width: 45%;
    }
  }
  #third-section {
    line-height: 3.5vh;
    .texte {
      width: 60%;
      transform: translateX(2%);
    }
    img {
      height: 35%;
      object-fit: cover;
    }
  }
  #fifth-section {
    .articles-container {
      flex-direction: row;
      width: 70%;
      .card-article {
        height: 80%;
        width: 40%;
        font-size: 2vh;
        padding-bottom: 5%;
        cursor: pointer;
        transition: transform 0.5s ease-in-out;

        &:hover {
          transform: scale(1.05);
        }
        img {
          height: 60%;
          object-fit: cover;
          width: 100%;
        }
      }
    }
  }
}
</style>

