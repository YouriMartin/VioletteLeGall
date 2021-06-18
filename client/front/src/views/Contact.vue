<template>
  <div id="contact" v-if="blocs != null">
    <FormTextePage
      v-if="showModalTexte"
      :toggleModal="updateTexte"
      :idPage="pageId"
      :idBloc="idBloc"
      :texte="texte"
      :elementChange="elementChange"
    />
    <FormPhotosPage
      v-if="showModalPhotos"
      :toggleModal="updatePhoto"
      :idPage="pageId"
      :idBloc="idBloc"
    />
    <section id="first-bloc">
      <h2 @click="updateTitle">{{ title }}</h2>
      <img
        :src="`http://localhost:9000/static/${blocs[0].img.categorie}/${blocs[0].img.src}`"
        :alt="blocs[0].img.alt"
        @click="updatePhoto(blocs[0]._id)"
      />
      <div
        class="paragraphe-container"
        @click="updateTexte(blocs[0]._id, blocs[0].paragraphes)"
        v-html="blocs[0].paragraphes"
      ></div>
      <FormulaireContact />
    </section>
    <section id="second-bloc">
      <h3 @click="updateSubTitle(blocs[1]._id, blocs[1].subtitle)">
        {{ blocs[1].subtitle }}
      </h3>
      <div id="img-texte">
        <img
          :src="`http://localhost:9000/static/${blocs[1].img.categorie}/${blocs[1].img.src}`"
          :alt="blocs[1].img.alt"
          @click="updatePhoto(blocs[1]._id)"
        />
        <div
          @click="updateTexte(blocs[1]._id, blocs[1].paragraphes)"
          v-html="blocs[1].paragraphes"
        ></div>
      </div>
    </section>
    <div id="third-bloc">
      <Caroussel
        v-if="$store.state.mobile"
        :size="'30vh'"
        :large="'100%'"
        :idPage="pageId"
        :idBloc="blocs[2]._id"
        :contents="blocs[2].imgCaroussel"
      />
      <Caroussel
        v-if="!$store.state.mobile"
        :size="'100vh'"
        :large="'100%'"
        :idPage="pageId"
        :idBloc="blocs[2]._id"
        :contents="blocs[2].imgCaroussel"
      />
      <div id="voyage">
        <h3 @click="updateSubTitle(blocs[2]._id, blocs[2].subtitle)">
          {{ blocs[2].subtitle }}
        </h3>
        <div
          @click="updateTexte(blocs[2]._id, blocs[2].paragraphes)"
          v-html="blocs[2].paragraphes"
        ></div>
        <Boutton
          :texte="'Lien Blog'"
          :type="'router'"
          :route="'/blog'"
          :css="'thirdly-big'"
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
      elementChange: null,
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
        this.elementChange = "texte";
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
    updateSubTitle(idBloc, subtitle) {
      if (idBloc && subtitle) {
        this.idBloc = idBloc;
        this.texte = subtitle;
        this.elementChange = "subtitle";
      }
      this.showModalTexte = !this.showModalTexte;
    },
    updateTitle() {
      this.texte = this.title;
      this.elementChange = "title";
      this.showModalTexte = !this.showModalTexte;
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
  background-color: var(--thirdly-color);
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
  padding: 0% 5%;
}
#second-bloc {
  padding: 10% 0%;
  #img-texte {
    img {
      height: 40%;
      width: 100%;
      object-fit: cover;
    }
    div {
      padding: 0% 5%;
    }
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
@media screen and (min-width: 768px) {
  #first-bloc {
    .paragraphe-container {
      width: 40%;
      margin: 2% 0%;
    }
  }
  #second-bloc {
    padding: 5% 0%;
    #img-texte {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60%;
      height: 80%;
      img {
        height: 80%;
        width: 50%;
        border-radius: 5px;
      }
      div {
        margin-left: 5%;
        line-height: 4vh;
        font-size: 2vh;
      }
    }
  }
  #voyage {
    background: var(--thirdly-color-5);
    margin: 7% 15%;
    color: var(--fourthly-color);
    position: absolute;
    z-index: 5;
    border-radius: 5px;
  }
}
</style>