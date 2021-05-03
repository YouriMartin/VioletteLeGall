<template>
  <div id="caroussel">
    <vueper-slides
      ref="myVueperSlides"
      autoplay
      :fixedHeight="size"
      :arrows="false"
    >
      <vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :title="slide.title"
        :image="slide.image"
      />
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "Caroussel",
  props: ["size"],
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      slides: [
        {
          image: require("@/assets/imgTest/slide1.jpg"),
        },
        {
          image: require("@/assets/imgTest/slide2.jpg"),
        },
        {
          image: require("@/assets/imgTest/portraitsFolio.jpg"),
        },
        {
          image: require("@/assets/imgTest/mariage.jpg"),
        },
      ],
    };
  },
};
</script>

<style scoped>
#caroussel {
  z-index: 1;
}
</style>