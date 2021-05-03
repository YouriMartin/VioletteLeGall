<template>
  <nav>
    <i
      v-if="$store.state.mobile && !navBarShow"
      @click="ToggleNavBar()"
      class="fas fa-bars"
    ></i>
    <i
      v-if="navBarShow && $store.state.mobile"
      @click="ToggleNavBar()"
      class="fas fa-times"
    ></i>
    <ul v-if="navBarShow || !$store.state.mobile" id="navbar">
      <li>
        <router-link v-on:click.native="ToggleNavBar()" to="/"
          >LOGO</router-link
        >
      </li>
      <li class="deroulant">
        <div @click="ToggleNavLink('particulier')" class="nav-link">
          <p>Particuliers</p>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div v-if="particulierOptionShow" class="sous">
          <router-link
            v-on:click.native="ToggleNavBar()"
            class="sous-link"
            to="/particuliers/portfolio"
            >PortFolio</router-link
          >
          <router-link
            v-on:click.native="ToggleNavBar()"
            class="sous-link"
            to="/particuliers/tarifs"
            >Tarifs</router-link
          >
        </div>
      </li>
      <li class="deroulant">
        <div @click="ToggleNavLink('professionnel')" class="nav-link">
          <p>Professionnels</p>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div v-if="professionnelOptionShow" class="sous">
          <router-link
            v-on:click.native="ToggleNavBar()"
            class="sous-link"
            to="/professionnels/portfolio"
            >PortFolio</router-link
          >
          <router-link
            v-on:click.native="ToggleNavBar()"
            class="sous-link"
            to="/professionnels/tarifs"
            >Tarifs</router-link
          >
        </div>
      </li>
      <li>
        <router-link
          v-on:click.native="ToggleNavBar()"
          class="nav-link"
          to="/contact"
          >Contact</router-link
        >
      </li>
      <li>
        <router-link
          v-on:click.native="ToggleNavBar()"
          class="nav-link"
          to="/blog"
          >Blog</router-link
        >
      </li>
      <li v-on:click="ToggleNavBar()">
        <a class="nav-link" href="#">Galerie Client </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Navbar",
  data() {
    return {
      navBarShow: false,
      particulierOptionShow: false,
      professionnelOptionShow: false,
    };
  },
  methods: {
    ToggleNavBar() {
      this.navBarShow = !this.navBarShow;
      this.particulierOptionShow = false;
      this.professionnelOptionShow = false;
    },
    ToggleNavLink(link) {
      if (link === "particulier") {
        this.particulierOptionShow = !this.particulierOptionShow;
        if (this.professionnelOptionShow === true) {
          this.professionnelOptionShow = !this.professionnelOptionShow;
        }
      } else if (link === "professionnel") {
        this.professionnelOptionShow = !this.professionnelOptionShow;
        if (this.particulierOptionShow === true) {
          this.particulierOptionShow = !this.particulierOptionShow;
        }
      }
    },
  },
});
</script>

<style scoped>
li {
  width: 50%;
}
a {
  color: var(--fourthly-color);
  text-decoration: none;
}
.fa-times,
.fa-bars {
  top: 2%;
  right: 6%;
  font-size: 8vw;
}
.fa-times {
  position: absolute;
  color: var(--fourthly-color);
  z-index: 4;
}
.fa-bars {
  position: fixed;
  color: black;
  z-index: 4;
}
#navbar {
  position: absolute;
  z-index: 3;
  height: 100vh;
  width: 100%;
  color: var(--fourthly-color);
  background: var(--thirdly-color);
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.nav-link {
  font-size: 5vw;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
}
.deroulant {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sous {
  display: flex;
  flex-direction: column;
  height: 13vh;
  justify-content: space-around;
  margin-left: 30%;
  font-size: 3vw;
}
.sous-link::after {
  content: "";
  display: block;
  margin-top: 2px;
  width: 99%;
  height: 1px;
  transform: scale(1);
  transition: transform 0.2s ease-out;
  background: white;
}
.sous-link:active::after {
  transform: scale(0);
}
</style>
