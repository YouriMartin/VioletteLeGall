<template>
  <div id="gallerie">
    <iframe
      frameborder="0"
      id="pictimeIntegration"
      src="https://violettelegall.pic-time.com/client?headless=true"
      style="width: 100%; height: 100%"
    ></iframe>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#gallerie {
  min-height: 100vh;
  width: 100%;
}
@media screen and (min-width: 768px) {
  #gallerie {
    padding-top: 5%;
  }
}
</style>
