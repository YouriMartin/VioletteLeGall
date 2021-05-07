<template>
  <div id="professionnels-tarifs">
    <section>
      <div id="title-img-container">
        <h2>Professionnels Tarifs</h2>
        <img id="img-acceuil" :src="blocs[0].img.src" :alt="blocs[0].img.alt" />
      </div>
      <h3>Mes Prestations</h3>
      <div class="bloc-text">
        <h4>{{ blocs[0].subtitle }}</h4>
        <p
          class="paragraphe"
          v-for="paragraphe in blocs[0].paragraphes"
          :key="paragraphe"
        >
          {{ paragraphe }}
        </p>

        <h4>Vous ne trouvez pas la formule qu'il vous faut ci-dessous ?</h4>
        <p>Contactez-moi directement et parlons en ensembre !</p>
        <Boutton
          :texte="'Me Contacter'"
          :css="'primary-big'"
          :route="'/contact'"
          :type="'router'"
        />
      </div>
    </section>
    <section v-for="bloc in blocs.slice(1)" :key="bloc.id">
      <img v-if="bloc.img" :src="bloc.img.src" :alt="bloc.img.alt" />
      <iframe
        v-if="bloc.video"
        width="100%"
        height="40%"
        :src="'https://www.youtube.com/embed/' + bloc.video.src"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="bloc-text">
        <h3>{{ bloc.title }}</h3>
        <h4>{{ bloc.subtitle }}</h4>
        <p
          class="paragraphe"
          v-for="paragraphe in bloc.paragraphes"
          :key="paragraphe"
        >
          {{ paragraphe }}
        </p>
        <Boutton
          v-if="bloc.id % 2 === 0"
          v-on:click.native="setMessage(bloc.id)"
          :texte="'Me Contacter'"
          :css="'primary-invert-borderless-big'"
          :route="'/contact'"
          :type="'router'"
        />
        <Boutton
          v-if="bloc.id % 2 != 0"
          v-on:click.native="setMessage(bloc.id)"
          :texte="'Me Contacter'"
          :css="'primary-big'"
          :route="'/contact'"
          :type="'router'"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Boutton from "../components/Boutton.vue";
export default {
  name: "ParticuliersTarifs",
  components: {
    Boutton,
  },
  data() {
    return {
      blocs: [
        {
          id: 1,
          img: {
            src: require("@/assets/imgTest/PrestaPro.jpg"),
            alt: "prestation",
          },
          subtitle: "COMMENT RESERVER UNE SEANCE AVEC MOI ?",
          paragraphes: [
            "D'une entreprise à l'autre, chaque demande peut-être différente, je vous laisse donc m'envoyer un message en me parlant de votre idée pour que nous puissions établir un projet ensemble.",
            "Je propose de venir vous photographier sur votre lieu de travail, ou de mettre en valeurs vos créations ou les produits que vous vendez avec des packshots. ",
          ],
        },
        {
          id: 2,
          img: {
            src: require("@/assets/imgTest/promotionFolio.jpg"),
            alt: "tarif portrait pro",
          },
          title: "Portraits et Photo sur le lieu de Travail",
          subtitle: "A partir de 100€",
          paragraphes: [
            "Vous venez de monter votre entreprise et vous avez besoin de photos de vous pour illustrer une plaquette ou votre site web ?",
            "Le prix correspond à une séance d'une heure, mais cela peut être moins ou plus, je m'adapte selon la demande.",
          ],
          message:
            "Je vous contacte pour réserver une séance photo sur le lieu de mon travail",
        },
        {
          id: 3,
          img: {
            src: require("@/assets/imgTest/packshotFolio.jpg"),
            alt: "tarif packshot",
          },
          title: "Photo de produits",
          subtitle: "A partir de 90€",
          paragraphes: [
            "Je vous propose une séance photo en extérieur ou à domicile pour des photos plus en intimité",
          ],
          message:
            "Bonjour, je suis un professionnel et je vous contacte pour reserver une séance de photo de produit",
        },
        {
          id: 4,
          video: {
            src: "QRZXn9Hq0pU",
          },
          title: "Formule Vidéo",
          subtitle: "prix à définir",
          paragraphes: [
            "Vous êtes un bar et vous voulez une vidéo de l'évènement que vous organisez ?",
            "Vous êtes une entreprise et vous souhaitez une vidéo qui mettrait en avant vos compétences sur les réseaux sociaux ?",
            "Contactez moi et nous pourrons imagniner ce projet ensemble.",
          ],
          message:
            "Bonjour, je suis un professionnel et je vous contacte pour réserver une séance vidéo dans mon entreprise",
        },
      ],
    };
  },
  methods: {
    setMessage(id) {
      const index = this.blocs.findIndex((bloc) => bloc.id === id);
      const message = this.blocs[index].message;
      console.log(message);
      this.$store.dispatch("getMessage", message);
    },
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
section {
  justify-content: flex-start;
}
img {
  height: 40%;
  width: 100%;
  object-fit: cover;
}
p {
  font-size: 1.5vh;
  margin: 0% 10%;
}
#title-img-container {
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
}
#img-acceuil {
  height: 50%;
  width: 100%;
  object-fit: cover;
}
.bloc-text {
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 0% 1%;
}
.paragraphe {
  text-align: start;
}
</style>