<template>
  <div id="contact">
    <section>
      <h2>Contact</h2>
      <img id="image-acceuil" :src="blocs[0].img.src" :alt="blocs[0].img.alt" />
      <div class="paragraphe-container">
        <p v-for="paragraphe in blocs[0].paragraphes" :key="paragraphe.id">
          {{ paragraphe }}
        </p>
      </div>
      <FormulaireContact />
    </section>
    <section>
      <h3>Qui suis-je ?</h3>
      <img src="" alt="">
    </section>
  </div>
</template>

<script>
import FormulaireContact from "../components/FormulaireContact.vue";
export default {
  name: "Contact",
  components: {
    FormulaireContact,
  },
  data() {
    return {
      blocs: [
        {
          id: 1,
          img: {
            src: require("@/assets/imgTest/violette2.jpg"),
            alt: "image de violette",
          },
          paragraphes: [
            "Vous souhaitez me commander une prestation, ou simplement plus d'informations ?",
            "Une séance couple, un mariage, une vidéo corporate : parlez-moi de votre projet.",
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
section:nth-child(odd) {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
}
section:nth-child(even) {
  background-color: var(--primary-color);
  color: var(--fourthly-color);
}
#image-acceuil {
  height: 20vh;
  clip-path: circle(50%);
}
section {
  justify-content: space-between;
}
h2 {
  margin-top: 10%;
}
.paragraphe-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15vh;
  width: 85%;
  line-height: 2.5vh;
}
</style>