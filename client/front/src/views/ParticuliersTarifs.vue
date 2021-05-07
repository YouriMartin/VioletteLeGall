<template>
  <div id="particulier-tarifs">
    <section>
      <div id="title-img-container">
        <h2>Particuliers Tarifs</h2>
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
          :css="'thirdly-big'"
          :route="'/contact'"
          :type="'router'"
        />
      </div>
    </section>
    <section v-for="bloc in blocs.slice(1)" :key="bloc.id">
      <img :src="bloc.img.src" :alt="bloc.img.alt" />
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
          v-on:click.native="setMessage(bloc.id)"
          v-if="bloc.id % 2 === 0"
          :texte="'Me Contacter'"
          :css="'thirdly-invert-borderless-big'"
          :route="'/contact'"
          :type="'router'"
        />
        <Boutton
          v-on:click.native="setMessage(bloc.id)"
          v-if="bloc.id % 2 != 0"
          :texte="'Me Contacter'"
          :css="'thirdly-big'"
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
            src: require("@/assets/imgTest/prestation.jpg"),
            alt: "prestation",
          },
          subtitle: "COMMENT RESERVER UNE SEANCE AVEC MOI ?",
          paragraphes: [
            "Commencez par prendre contact avec moi par message pour déterminer ensemble la formule qui vous conviendrait. Si cela est possible, j'aime bien rencontrer le client ou la cliente en amont, pour pouvoir discuter des envies de la personne.",
            "En général, le rpix que vous voyez sur les formules correspond à une séance d'un heure, mais je peux m'adapter selon la demande. Je n'ai pas de maximum de photos : je suis consciente que les photos qui plaisent le plsu au photographe ne sont pas toujours cells qui plaisent le plus au client ou à la cliente, donc je préfère ne pas me limiter (cela tourne souvent autour de 20photos).",
          ],
        },
        {
          id: 2,
          img: {
            src: require("@/assets/imgTest/portraitsFolio.jpg"),
            alt: "tarif portrait",
          },
          title: "Portraits",
          subtitle: "A partir de 80€",
          paragraphes: ["Une séance photo en extérieur, où vous le souhaitez"],
          message: "Je vous contacte pour réserver une séance de portraits",
        },
        {
          id: 3,
          img: {
            src: require("@/assets/imgTest/ParticulierFolio7.jpg"),
            alt: "tarif naissance",
          },
          title: "Naissance",
          subtitle: "A partir de 90€",
          paragraphes: [
            "Je vous propose une séance photo en extérieur ou à domicile pour des photos plus en intimité",
          ],
          message: "Je vous contacte pour réserver une séance de naissance",
        },
        {
          id: 4,
          img: {
            src: require("@/assets/imgTest/famille.jpg"),
            alt: "tarif Famille",
          },
          title: "En famille",
          subtitle: "A partir de 100€",
          paragraphes: [
            "Je vous propose une séance photo en extérieur ou à domicile, en famille.",
          ],
          message: "Je vous contacte pour réserver une séance de famille",
        },
        {
          id: 5,
          img: {
            src: require("@/assets/imgTest/proFolio.jpg"),
            alt: "tarif pro",
          },
          title: "Photo Pro",
          subtitle: "A partir de 40€",
          paragraphes: [
            "Vous avez besoin d'une photo pour votre CV ou votre profil Linkedin?",
            "Je vous propose une mini séance en studio où j'adapte mes photos à la personnalité et au type d'emploi recherché !",
          ],
          message:
            "Je vous contacte pour réserver une séance de photo professionnels",
        },
        {
          id: 6,
          img: {
            src: require("@/assets/imgTest/coupleFolio.jpg"),
            alt: "tarif couples",
          },
          title: "Couples",
          subtitle: "A partir de 100€",
          paragraphes: [
            "Une séance avec votre amoureux ou votre amoureuse, au lever du soleil à la mer ou en ville la nuit, c'est vous qui choississez !",
          ],
          message: "Je vous contacte pour réserver une séance de couple",
        },
        {
          id: 7,
          img: {
            src: require("@/assets/imgTest/mariage.jpg"),
            alt: "tarif mariage",
          },
          title: "Mariage",
          subtitle: "Tarif sur Devis",
          paragraphes: [
            "A cause de la crise actuelle, les mariages qui étaient prévus cet été ont été déczlés à l'anné prochaine. Je n'ai donc pas pu faire de mariages depuis la création de mon entreprise. Je rêve de pouvoir couvrir le mariage de quelqu'un. C'est un style que j'affectionne tout particulièrement.",
            "Si mon style vous plaît, contactez moi et vous bénéficierez d'un tarif spécial !",
          ],
          message: "Je vous contacte pour réserver une séance pour un mariage",
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
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
}
section {
  justify-content: flex-start;
}
img {
  height: 40%;
  width: 100%;
  object-fit: cover;
  justify-self: start;
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