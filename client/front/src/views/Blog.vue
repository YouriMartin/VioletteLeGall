<template>
  <div id="blog">
    <h2>Blog</h2>
    <FormDeleteArticle
      v-if="showModalDelete"
      :toggleModal="deleteArticle"
      :id="articleId"
      :showModal="showModalDelete"
    />
    <FormUpdateArticle
      v-if="showModalUpdate"
      :toggleModal="updateArticle"
      :id="articleId"
      :showModal="showModalUpdate"
    />
    <div id="card-container">
      <div
        class="card-article"
        v-for="article in ArticlesLimit"
        v-bind:key="article._id"
      >
        <i
          v-if="$store.state.admin"
          class="fas fa-times"
          @click="deleteArticle(article._id)"
        ></i>
        <img
          :src="'http://localhost:9000/static/Articles/' + article.img.src"
          :alt="article.img.alt"
          @click="updateArticle(article._id)"
        />
        <div class="texte-container">
          <div id="titre-date" @click="updateArticle(article._id)">
            <h4>{{ article.titre }}</h4>
            <p>{{ article.date.substr(0, 10) }}</p>
          </div>
          <div
            v-html="article.texte"
            class="description"
            @click="updateArticle(article._id)"
          ></div>
        </div>
      </div>
      <p
        class="afficher"
        v-if="articles.length > 5 && nbArticles <= articles.length"
        @click="MoreArticles()"
      >
        <span style="--i: 1">A</span>
        <span style="--i: 2">f</span>
        <span style="--i: 3">f</span>
        <span style="--i: 4">i</span>
        <span style="--i: 5">c</span>
        <span style="--i: 6">h</span>
        <span style="--i: 7">e</span>
        <span style="--i: 8">r</span>
        <span style="--i: 9"> </span>
        <span style="--i: 10">p</span>
        <span style="--i: 11">l</span>
        <span style="--i: 12">u</span>
        <span style="--i: 13">s</span>
        <span style="--i: 14">
          <i class="fas fa-chevron-down"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import FormDeleteArticle from "@/components/FormDeleteArticle.vue";
import FormUpdateArticle from "@/components/FormUpdateArticle.vue";
export default {
  name: "Blog",
  components: {
    FormDeleteArticle,
    FormUpdateArticle,
  },
  data() {
    return {
      nbArticles: 6,
      articles: "",
      articleId: null,
      showModalDelete: false,
      showModalUpdate: false,
    };
  },
  mounted() {
    this.http
      .get("http://localhost:9000/articles/getAll")
      .then((resp) => {
        console.log(resp);
        this.articles = resp.data.reverse();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ArticlesLimit() {
      return this.articles.slice(0, this.nbArticles);
    },
  },
  methods: {
    MoreArticles() {
      this.nbArticles = this.nbArticles + 6;
    },
    deleteArticle(id) {
      if (id) {
        this.articleId = id;
      }
      this.showModalDelete = !this.showModalDelete;
    },
    updateArticle(id) {
      console.log(id);
      if (this.$store.state.admin) {
        if (id) {
          this.articleId = id;
        }
        this.showModalUpdate = !this.showModalUpdate;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#blog {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}
#card-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: auto;
}
h2 {
  margin: 5vh auto;
}
.card-article {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  margin: 5vh 0;
  i {
    position: absolute;
    right: 5%;
    margin-top: 5%;
    color: var(--thirdly-color);
    font-size: 5vh;
    text-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  img {
    height: 50%;
    width: 100%;
    object-fit: cover;
  }
  .texte-container {
    margin: 5% 0%;
    height: 50%;
    .description {
      font-size: 2.5vh;
      margin: 0 8%;
      padding-bottom: 10%;
      line-height: 3vh;
      letter-spacing: 0.15vh;
    }
    #titre-date {
      margin: 10% 0;
      display: flex;
      width: 100%;
      align-items: center;
      p {
        position: absolute;
        right: 5%;
        font-size: 1.5vh;
      }
      h4 {
        position: absolute;
        font-size: 4vh;

        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
.afficher {
  margin: 5%;
  font-weight: bold;
  font-size: 3vh;
  position: relative;
  cursor: pointer;
  span {
    //position: relative;
    animation: letter-move 1s ease-in-out infinite;
    animation-delay: calc(0.1s * var(--i));
  }
}
@keyframes letter-move {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-20px);
  }
  40%,
  100% {
    transform: translateY(0px);
  }
}
@media screen and (min-width: 768px) {
  #blog {
    padding-top: 14vh;
  }
  .card-article {
    border-radius: 5px;
    &:nth-child(odd) {
      flex-direction: row;
      img {
        border-radius: 4px 0px 0px 4px;
      }
      #titre-date {
        p {
          right: 8%;
        }
      }
    }
    &:nth-child(even) {
      flex-direction: row-reverse;
      img {
        border-radius: 0px 4px 4px 0px;
      }
      #titre-date {
        p {
          left: 42%;
        }
      }
    }
    width: 90%;
    height: 70vh;
    // flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    img {
      height: 100%;
      width: 50%;
    }
    .texte-container {
      margin: 0%;
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;

      .description {
        width: 90%;
        height: 70%;
        font-size: 1.8vh;
      }
      #titre-date {
        margin: 0%;
        justify-content: center;
        h4 {
          position: relative;
          left: inherit;
          transform: none;
        }
      }
    }
  }
}
</style>