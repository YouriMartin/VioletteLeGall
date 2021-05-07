<template>
  <div id="blog">
    <h2>Blog</h2>
    <div id="card-container">
      <div
        class="card-article"
        v-for="article in ArticlesLimit"
        v-bind:key="article.id"
        @click="GoToThisArticle(article.id)"
      >
        <img :src="article.img.src" :alt="article.img.alt" />
        <div id="titre-date">
          <h4>{{ article.titre }}</h4>
          <p class="article-date">{{ article.date }}</p>
        </div>
        <p id="description">{{ article.description }}</p>
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
        {
          id: 3,
          titre: "titre 3",
          img: {
            src: require("@/assets/imgTest/insta4.png"),
            alt: "image article 3",
          },
          date: "21/06/20",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    };
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

<style scoped>
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
.card-article {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  margin: 5vh 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
img {
  height: 20%;
  width: 100%;
  object-fit: cover;
}
h2 {
  margin: 5vh auto;
}
#description {
  font-size: 2vh;
  margin: 0 8%;
  padding-bottom: 10%;
  line-height: 3vh;
  letter-spacing: 0.15vh;
}

#titre-date {
  margin: 5% 0;
  display: flex;
  width: 100%;
  align-items: center;
}
h4 {
  font-size: 3vh;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
#titre-date p {
  font-size: 2vh;
  position: relative;
  left: 80%;
  transform: translateX(-100%);
}
</style>