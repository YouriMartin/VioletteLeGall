<template >
  <nav>
    <transition name="toggle">
      <i
        v-if="$store.state.mobile && !navBarShow"
        @click="ToggleNavBar()"
        class="fas fa-bars"
      ></i>
    </transition>
    <transition name="toggle">
      <i
        v-if="navBarShow && $store.state.mobile"
        @click="ToggleNavBar()"
        class="fas fa-times"
      ></i>
    </transition>
    <i
      v-if="$store.state.mobile && !navBarShow"
      @click="ScrollTop()"
      class="fas fa-chevron-up"
    ></i>
    <transition name="toggle">
      <ul v-if="navBarShow || !$store.state.mobile" id="navbar">
        <li id="logo">
          <router-link v-on:click.native="ToggleNavBar()" to="/"
            ><img src="@/assets/logoblanc-transparent.png" alt="logo"
          /></router-link>
        </li>
        <li class="deroulant">
          <div @click="ToggleNavLink('particulier')" class="nav-link">
            <p>Particuliers</p>
            <i class="fas fa-chevron-down"></i>
          </div>
          <transition name="deroule">
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
          </transition>
        </li>
        <li class="deroulant">
          <div @click="ToggleNavLink('professionnel')" class="nav-link">
            <p>Professionnels</p>
            <i class="fas fa-chevron-down"></i>
          </div>
          <transition name="deroule">
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
          </transition>
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
        <li>
          <router-link
            class="nav-link"
            to="/gallerie"
            v-on:click="ToggleNavBar()"
          >
            Galerie Client
          </router-link>
        </li>
      </ul>
    </transition>
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
  created() {
    window.addEventListener("scroll", this.ToggleNavBarScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.ToggleNavBarScroll);
  },
  methods: {
    ToggleNavBar() {
      this.navBarShow = !this.navBarShow;
      this.particulierOptionShow = false;
      this.professionnelOptionShow = false;
      window.scrollTo(0, 0);
    },
    ToggleNavBarScroll() {
      if (window.pageYOffset) {
        this.navBarShow = false;
      }
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
    ScrollTop() {
      window.scrollTo(0, 0);
    },
  },
});
</script>

<style lang="scss" scoped>
#logo {
  height: 20%;
  img {
    height: 100%;
    transform: translateX(-20%);
  }
}
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
.fa-chevron-up {
  position: fixed;
  color: black;
  font-size: 8vw;
  bottom: 10%;
  right: 10%;
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
.toggle-enter-active {
  transition: opacity 0.7s, transform 0.5s;
}
.toggle-leave-active {
  transition: opacity 0.7s 0.2s, transform 0.5s 0.1s;
}
.toggle-enter,
.toggle-leave-to {
  opacity: 0;
  transform: translateY(-100vh);
}

.deroule-enter-active {
  transition: all 1s cubic-bezier(0.1, 0.2, 0.4, 0.1);
}
.deroule-leave-active {
  transition: all 0.5s cubic-bezier(0.1, 0.2, 0.3, 0.4);
}
.deroule-enter,
.deroule-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.deroule-leave-to {
  height: 0%;
}
</style>
