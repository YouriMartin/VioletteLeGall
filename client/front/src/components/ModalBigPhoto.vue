<template>
  <div id="modal-big-photo">
    <div class="overlay" @click="toggleModal"></div>
    <div class="modal">
      <i class="fas fa-times" @click="toggleModal"></i>
      <img
        :src="`http://localhost:9000/static/${categorie}/${src}`"
        :alt="alt"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["toggleModal", "src", "alt", "categorie"],
};
</script>

<style lang="scss" scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  img {
    max-height: 60vh;
    max-width: 80vw;
  }
  i {
    position: absolute;
    right: -5%;
    top: -7%;
    font-size: 4vh;
    color: var(--fourthly-color);
  }
}
</style>