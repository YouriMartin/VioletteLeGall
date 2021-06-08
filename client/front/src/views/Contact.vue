<template>
  <div id="contact" v-if="blocs != null">
    <FormTextePage
      v-if="showModalTexte"
      :toggleModal="updateTexte"
      :idPage="pageId"
      :idBloc="idBloc"
      :texte="texte"
    />
    <FormPhotosPage
      v-if="showModalPhotos"
      :toggleModal="updatePhoto"
      :idPage="pageId"
      :idBloc="idBloc"
    />
    <section id="first-bloc">
      <h2>Contact</h2>
      <img
        :src="`http://localhost:9000/static/${blocs[0].img.categorie}/${blocs[0].img.src}`"
        :alt="blocs[0].img.alt"
        @click="updatePhoto(blocs[0]._id)"
      />
      <div
        @click="updateTexte(blocs[0]._id, blocs[0].paragraphes)"
        v-html="blocs[0].paragraphes"
      ></div>
      <FormulaireContact />
    </section>
    <section id="second-bloc">
      <h3>Qui suis-je ?</h3>
      <img
        :src="`http://localhost:9000/static/${blocs[1].img.categorie}/${blocs[1].img.src}`"
        :alt="blocs[1].img.alt"
        @click="updatePhoto(blocs[1]._id)"
      />
      <div
        @click="updateTexte(blocs[1]._id, blocs[1].paragraphes)"
        v-html="blocs[1].paragraphes"
      ></div>
    </section>
    <div id="third-bloc">
      <Caroussel
        :size="'30vh'"
        :idPage="pageId"
        :idBloc="blocs[2]._id"
        :contents="blocs[2].imgCaroussel"
      />
      <div id="voyage">
        <h3>J'adore voyager</h3>
        <div
          @click="updateTexte(blocs[2]._id, blocs[2].paragraphes)"
          v-html="blocs[2].paragraphes"
        ></div>
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
import FormPhotosPage from "@/components/FormPhotosPage.vue";
import FormTextePage from "@/components/FormTextePage.vue";

export default {
  name: "Contact",
  components: {
    FormulaireContact,
    Caroussel,
    Boutton,
    FormTextePage,
    FormPhotosPage,
  },
  data() {
    return {
      showModalTexte: false,
      showModalPhotos: false,
      blocs: null,
      pageId: null,
      title: null,
    };
  },
  created() {
    this.$store.commit("loading");
    this.http
      .get("http://localhost:9000/pages/getPage/60bcbd8166fdbb218856b177")
      .then((resp) => {
        //console.log(resp.data);
        this.pageId = resp.data._id;
        this.blocs = resp.data.blocs;
        this.title = resp.data.name;
        //console.log(this.blocs);
        this.$store.commit("loading");
      });
  },
  methods: {
    updateTexte(idBloc, texte) {
      if (idBloc && texte) {
        this.idBloc = idBloc;
        this.texte = texte;
      }
      this.showModalTexte = !this.showModalTexte;
    },
    updatePhoto(idBloc) {
      console.log(idBloc);
      if (idBloc) {
        this.idBloc = idBloc;
      }
      this.showModalPhotos = !this.showModalPhotos;
    },
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

#first-bloc {
  img {
    height: 20%;
    clip-path: circle(50%);
  }
  .paragraphe-container {
    justify-content: space-between;
    height: 15%;
  }
  padding: 0% 5%;
}
#second-bloc {
  padding: 10% 0%;
  img {
    height: 40%;
    width: 100%;
    object-fit: cover;
  }
  div {
    padding: 0% 5%;
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
    div {
      padding: 0% 5%;
    }
  }
}
</style>