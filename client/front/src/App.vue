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
  data() {
    return {
      screenWidth: null,
    };
  },
  mounted() {
    this.$store.dispatch("getScreenWidth", window.innerWidth);
    window.addEventListener("resize", () => {
      this.screenWidth = window.innerWidth;
    });

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
  watch: {
    screenWidth: function (value) {
      console.log(value);
      this.$store.dispatch("getScreenWidth", value);
    },
  },
};
</script>
<style lang="scss">
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

//scrollbar
::-webkit-scrollbar {
  width: 10px;
  height: 5px;
  cursor: pointer;
}
::-webkit-scrollbar-track-piece {
  background: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.9);
}

//font
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
  //--primary-color: #eab996;
  --primary-color: rgb(234, 185, 150);
  --primary-color-2: rgba(234, 185, 150, 0.2);
  --primary-color-5: rgba(234, 185, 150, 0.5);
  --secondary-color: #a93d49;
  --thirdly-color: rgb(203, 118, 102);
  --thirdly-color-2: rgba(203, 118, 102, 0.2);
  --thirdly-color-5: rgba(203, 118, 102, 0.5);
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
  font-size: 6vh;
}
h3 {
  font-size: 5vh;
}
h4 {
  font-size: 5vh;
}
body {
  font-family: "Lulo Clean One", sans-serif;
}
li {
  list-style: none;
}
section {
  height: 101vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  // border: 2px solid red;
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
