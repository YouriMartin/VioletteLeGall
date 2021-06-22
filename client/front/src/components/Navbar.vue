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
      v-if="!$store.state.mobile || ($store.state.mobile && !navBarShow)"
      @click="ScrollTop()"
      class="fas fa-chevron-up"
    ></i>
    <transition name="toggle">
      <div v-if="navBarShow || !$store.state.mobile" id="navbar">
        <div id="logo" v-if="$store.state.mobile">
          <router-link v-on:click.native="ToggleNavBar()" to="/"
            ><img src="@/assets/logoblanc-transparent.png" alt="logo"
          /></router-link>
        </div>
        <ul id="first-ul">
          <li class="deroulant">
            <div
              v-if="$store.state.mobile || !particulierOptionShow"
              @click="ToggleNavLink('particulier')"
              class="nav-link"
            >
              <p>PARTICULIERS</p>
              <i class="fas fa-chevron-down"></i>
            </div>
            <transition name="deroule">
              <div v-if="particulierOptionShow" class="sous">
                <router-link
                  v-on:click.native="ToggleNavBar()"
                  class="sous-link"
                  to="/particuliers/portfolio"
                  >PORTFOLIO</router-link
                >
                <router-link
                  v-on:click.native="ToggleNavBar()"
                  class="sous-link"
                  to="/particuliers/tarifs"
                  >TARIFS</router-link
                >
              </div>
            </transition>
          </li>
          <li class="deroulant">
            <div
              v-if="$store.state.mobile || !professionnelOptionShow"
              @click="ToggleNavLink('professionnel')"
              class="nav-link"
            >
              <p>PROFESSIONNELS</p>
              <i class="fas fa-chevron-down"></i>
            </div>
            <transition name="deroule">
              <div v-if="professionnelOptionShow" class="sous">
                <router-link
                  v-on:click.native="ToggleNavBar()"
                  class="sous-link"
                  to="/professionnels/portfolio"
                  >PORTFOLIO</router-link
                >
                <router-link
                  v-on:click.native="ToggleNavBar()"
                  class="sous-link"
                  to="/professionnels/tarifs"
                  >TARIFS</router-link
                >
              </div>
            </transition>
          </li>
        </ul>
        <li id="logo" v-if="!$store.state.mobile">
          <router-link v-on:click.native="ToggleNavBar()" to="/"
            ><img src="@/assets/logoblanc-transparent.png" alt="logo"
          /></router-link>
        </li>
        <ul id="second-ul">
          <li>
            <router-link
              v-on:click.native="ToggleNavBar()"
              class="nav-link"
              to="/contact"
              >CONTACT</router-link
            >
          </li>
          <li>
            <router-link
              v-on:click.native="ToggleNavBar()"
              class="nav-link"
              to="/blog"
              >JOURNAL</router-link
            >
          </li>
          <li>
            <router-link
              class="nav-link"
              to="/gallerie"
              v-on:click="ToggleNavBar()"
            >
              GALERIES CLIENTS
            </router-link>
          </li>
        </ul>
      </div>
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
.fa-times,
.fa-bars {
  top: 2%;
  right: 6%;
  font-size: 6vh;
  cursor: pointer;
}
.fa-times {
  position: absolute;
  color: var(--fourthly-color);
  z-index: 4;
  cursor: pointer;
}
.fa-bars {
  position: fixed;
  color: black;
  z-index: 4;
  cursor: pointer;
}
.fa-chevron-up {
  position: fixed;
  color: black;
  font-size: 6vh;
  bottom: 10%;
  right: 10%;
  z-index: 4;
  cursor: pointer;
}
#logo {
  height: 20%;
  img {
    height: 100%;
  }
}
li {
  width: 50%;
}
a {
  color: var(--fourthly-color);
  text-decoration: none;
}
#navbar {
  position: absolute;
  z-index: 3;
  height: 100vh;
  width: 100%;
  color: var(--fourthly-color);
  background-color: var(--thirdly-color);
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  #first-ul {
    height: 32%;
  }
  #second-ul {
    height: 48%;
  }
}
.nav-link {
  font-size: 3vh;
  font-weight: 600;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
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

@media screen and (min-width: 768px) {
  #navbar {
    flex-direction: row;
    height: 15vh;
    text-align: center;
    background: var(--thirdly-color-2);
    color: white;
    z-index: 10;

    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100%;
      padding: 0% 5%;
    }
    #second-ul {
      li {
        &:hover::after {
          content: "";
          margin: auto;
          display: block;
          margin-top: 2px;
          width: 70%;
          height: 1px;
          transform: scale(1);
          background: white;
        }
      }
    }
  }
  .fa-chevron-up:hover {
    transform: scale(1.1);
  }
  .nav-link {
    font-size: 2vh;
    align-items: center;
    justify-content: center;
    color: white;
    i {
      margin-left: 1vw;
    }
  }
  #logo {
    height: 100%;
    img {
      height: 100%;
      transform: translateX(0%);
    }
  }
  .deroulant {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .nav-link:active {
      opacity: 0;
    }
    .sous {
      //  position: absolute;
      flex-direction: column;
      width: 80%;
      height: 13vh;
      //background: var(--thirdly-color-5);
      border-radius: 10px;
      padding: 3% 0%;
      margin: 2% 0%;
      font-size: 1.5vh;
    }
    .sous-link {
      transition: none;
      align-content: center;
      font-weight: 600;
      &::after {
        display: none;
      }
      &:hover::after {
        content: "";
        margin: auto;
        display: block;
        margin-top: 2px;
        width: 50%;
        height: 1px;
        transform: scale(1);
        background: white;
      }
    }
    .deroule-enter-active,
    .deroule-leave-active .deroule-enter,
    .deroule-leave-to {
      transition: none;
    }
  }
}
</style>
