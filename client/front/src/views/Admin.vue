<template>
  <div id="admin">
    <FormArticles />
  </div>
</template>

<script>
import FormArticles from "@/components/FormArticles.vue";
export default {
  name: "Admin",
  components: {
    FormArticles,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
section:nth-child(odd) {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
}
section:nth-child(even) {
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
}
</style>