<template>
  <div id="contact">
    <section id="first-bloc">
      <h2>Contact</h2>
      <img :src="blocs[0].img.src" :alt="blocs[0].img.alt" />
      <div class="paragraphe-container">
        <p v-for="paragraphe in blocs[0].paragraphes" :key="paragraphe.id">
          {{ paragraphe }}
        </p>
      </div>
      <FormulaireContact />
    </section>
    <section id="second-bloc">
      <h3>Qui suis-je ?</h3>
      <img :src="blocs[1].img.src" :alt="blocs[1].img.alt" />
      <div class="paragraphe-container">
        <p v-for="paragraphe in blocs[1].paragraphes" :key="paragraphe.id">
          {{ paragraphe }}
        </p>
      </div>
    </section>
    <div id="third-bloc">
      <Caroussel :size="'30vh'" />
      <div id="voyage">
        <h3>J'adore voyager</h3>
        <div class="paragraphe-container">
          <p v-for="paragraphe in blocs[1].paragraphes" :key="paragraphe.id">
            {{ paragraphe }}
          </p>
        </div>
        <Boutton
          :texte="'Lien Blog'"
          :type="'router'"
          :route="'/blog'"
          :css="'primary-big'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Boutton from "@/components/Boutton.vue";
import Caroussel from "../components/Caroussel.vue";
import FormulaireContact from "../components/FormulaireContact.vue";
export default {
  name: "Contact",
  components: {
    FormulaireContact,
    Caroussel,
    Boutton,
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
        {
          id: 2,
          img: {
            src: require("@/assets/imgTest/qui.jpg"),
            alt: "image qui suis je",
          },
          paragraphes: [
            "Je m'appelle Violette j'ai 27 ans je vis à Rennes et je suis photographe indépendants.",
            "Après plus de 10 ans à faire de la photo, j'ai décidé de lancer mon entreprise.",
            "Je me suis longtemps demandé ce qui me plaisait tant dans la photo. J'ai toujours été animé parle fait de créer des souvenirs : mes amis et me famille pourront en témoigner. Il n'y a rien qui me rends plus heureuse que de faire des photos et des vidéos des moments entre nous.",
          ],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss" >
section:nth-child(odd) {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
}
section:nth-child(even) {
  background-color: var(--primary-color);
  color: var(--fourthly-color);
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
  width: 85%;
  line-height: 2.5vh;
}

#first-bloc {
  img {
    height: 20%;
    clip-path: circle(50%);
  }
  .paragraphe-container {
    justify-content: space-between;
    height: 15%;
  }
}
#second-bloc {
  padding: 10% 0%;
  img {
    height: 40%;
    width: 100%;
    object-fit: cover;
  }
  .paragraphe-container {
    height: 50%;
    justify-content: space-evenly;
  }
}

#third-bloc {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  h3 {
    align-self: center;
  }
  #voyage {
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: space-evenly;
    align-items: center;
  }
  .paragraphe-container {
    height: 60%;
    justify-content: space-evenly;
  }
}
</style>