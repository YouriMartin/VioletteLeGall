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
      <h5 v-if="articles.length > 5" @click="MoreArticles()">Afficher plus</h5>
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
        this.articles = resp.data;
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
  flex-direction: column-reverse;
  justify-content: space-evenly;
  align-items: center;
  height: auto;
}
h2 {
  margin: 5vh auto;
}
.description {
  font-size: 2.5vh;
  margin: 0 8%;
  padding-bottom: 10%;
  line-height: 3vh;
  letter-spacing: 0.15vh;
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
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>