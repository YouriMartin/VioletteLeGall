<template>
  <div id="blog">
    <h2>Blog</h2>
    <div id="card-container">
      <div
        class="card-article"
        v-for="article in ArticlesLimit"
        v-bind:key="article._id"
      >
        <img
          :src="'http://localhost:9000/static/Articles/' + article.img.src"
          :alt="article.img.alt"
        />
        <div id="titre-date">
          <h4>{{ article.titre }}</h4>
          <p>{{ article.date.substr(0, 10) }}</p>
        </div>
        <p class="description">{{ article.texte }}</p>
      </div>
      <h5 v-if="articles.length > 5" @click="MoreArticles()">Afficher plus</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog",
  data() {
    return {
      nbArticles: 6,
      articles: "",
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
  font-size: 2vh;
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