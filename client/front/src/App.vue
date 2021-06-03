<template>
  <div id="app">
    <Loading />
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/Loading.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Loading,
  },
  mounted() {
    this.$store.dispatch("getScreenWidth", screen.width);
    //
    this.http
      .get("http://localhost:9000/admin/isConnected", {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((resp) => {
        if (resp.data === true) {
          this.$store.commit("isConnected");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style>
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "Signatura Monoline Script";
  src: url("assets/fonts/Signatura Monoline.otf") format("embedded-opentype"),
    url("assets/fonts/Signatura Monoline.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Lulo Clean One";
  src: url("assets/fonts/Lulo Clean One.otf") format("embedded-opentype");
  font-weight: normal;
  font-style: normal;
}

:root {
  --primary-color: #eab996;
  --secondary-color: #a93d49;
  --thirdly-color: #cb7666;
  --fourthly-color: #f1ece4;
}

h1 {
  font-family: "Signatura Monoline Script";
  color: var(--fourthly-color);
  text-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  font-size: 12vw;
}
h2 {
  font-size: 8vw;
}
h3 {
  font-size: 7vw;
}
h4 {
  font-size: 5vw;
}
body {
  font-family: "Lulo Clean One", sans-serif;
}
li {
  list-style: none;
}
section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.inline-flex {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
 .grecaptcha-badge {
  visibility: hidden;
} 
</style>
