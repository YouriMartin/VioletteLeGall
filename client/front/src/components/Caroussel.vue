<template>
  <div id="caroussel">
    <div v-if="showModal && $store.state.admin">
      <div class="overlay" @click="toggleModal"></div>
      <div id="modal">
        <h4>Caroussel</h4>
        <i class="fas fa-trash-alt" v-if="showTrash"></i>
        <div class="photo-container">
          <img
            class="imgDrag"
            v-for="content in contents"
            :key="content.order"
            :src="`http://localhost:9000/static/${content.categorie}/${content.src}`"
            :alt="content.alt"
          />
          <i class="far fa-plus-square"></i>
        </div>
      </div>
    </div>
    <div @click="toggleModal">
      <vueper-slides
        ref="myVueperSlides"
        autoplay
        :fixedHeight="size"
        :arrows="false"
        @click="toggleModal"
      >
        <vueper-slide
          v-for="content in contents"
          :key="content.order"
          :image="`http://localhost:9000/static/${content.categorie}/${content.src}`"
        />
      </vueper-slides>
    </div>
  </div>
</template>

<script>
//import TweenMax from "gsap";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

gsap.registerPlugin(Draggable);
export default {
  name: "Caroussel",
  props: ["size", "contents"],
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      showModal: false,
      showTrash: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
  mounted() {
    const self = this;
    Draggable.create(".imgDrag", {
      type: "x,y",
      bounds: document.getElementById("modal"),
      onDragStart: function () {
        self.showTrash = true;
      },
      onDragEnd: function () {
        self.showTrash = false;
      },
      onRelease: function () {
        if (this.hitTest(".fa-trash-alt")) {
          console.log("toto");
        } else {
          //TweenMax.to(this.target, 0.5, { x: 0, y: 0 });
          console.log("tatat");
        }
      },
    });
  },
};
</script>

<style lang="scss" scoped>
#caroussel {
  z-index: 1;
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
#modal {
  border-radius: 5px;
  z-index: 3;
  height: 60vh;
  width: 80vw;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  color: var(--thirdly-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  .photo-container {
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    img {
      height: 25%;
      margin: 5%;
    }
    i {
      font-size: 6vh;
      color: lightblue;
    }
    // i:hover,
    // img:hover {
    //   transform: rotate(0.06turn);
    // }
  }
}
</style>