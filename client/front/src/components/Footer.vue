<template>
  <div id="footer">
    <div id="logos">
      <a
        href="https://www.facebook.com/violettelgphotographies/?ref=bookmarks"
        target="_blank"
      >
        <i class="fab fa-facebook-square"></i>
      </a>
      <a href="https://www.instagram.com/violettelgpro/" target="_blank">
        <i class="fab fa-instagram"></i>
      </a>
      <a
        href="https://www.youtube.com/channel/UC2pZC0DhtKP-zjXmVC5AxaA"
        target="_blank"
      >
        <i class="fab fa-youtube"></i>
      </a>
    </div>
    <p id="legal" @click="goRgpd()">Mentions Légales</p>
    <p>&copy; {{ getYear }} Copyright: www.violettelegall.com</p>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    getYear() {
      let date = new Date();
      let annee = date.getFullYear();
      return annee;
    },
  },
  methods: {
    goRgpd() {
      this.$router.push("/rgpd");
    },
  },
};
</script>

<style lang="scss" scoped>
#footer {
  background-color: var(--fourthly-color);
  border-top: 3px solid var(--primary-color);
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: var(--thirdly-color);
}
p {
  font-size: 10px;
}

#logos {
  font-size: 5vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
a {
  text-decoration: none;
  color: var(--thirdly-color);
  cursor: pointer;
}
#legal {
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
}
</style>