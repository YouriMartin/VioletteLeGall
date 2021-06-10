<template>
  <div id="professionnels-tarifs" v-if="blocs != null">
    <FormPhotosPage
      v-if="showModalPhotos"
      :toggleModal="updatePhoto"
      :idPage="pageId"
      :idBloc="idBloc"
      :idOldPhoto="idOldPhoto"
      :categ="categ"
    />
    <FormTextePage
      v-if="showModalTexte"
      :toggleModal="updateTexte"
      :idPage="pageId"
      :idBloc="idBloc"
      :texte="texte"
      :elementChange="elementChange"
    />
    <section>
      <div id="title-img-container">
        <h2 @click="updateTitle">{{ title }}</h2>
        <img
          :src="`http://localhost:9000/static/${blocs[0].img.categorie}/${blocs[0].img.src}`"
          :alt="blocs[0].img.alt"
          @click="updatePhoto(blocs[0]._id)"
        />
      </div>
      <h3>Mes Prestations</h3>
      <div class="bloc-text">
        <h5 @click="updateSubTitle(blocs[0]._id, blocs[0].subtitle)">
          {{ blocs[0].subtitle }}
        </h5>
        <div
          class="paragraphe"
          v-html="blocs[0].paragraphes"
          @click="updateTexte(blocs[0]._id, blocs[0].paragraphes)"
        ></div>
        <h5>Vous ne trouvez pas la formule qu'il vous faut ci-dessous ?</h5>
        <p>Contactez-moi directement et parlons en ensembre !</p>
        <Boutton
          :texte="'Me Contacter'"
          :css="'primary-big'"
          :route="'/contact'"
          :type="'router'"
        />
      </div>
    </section>
    <section v-for="bloc in blocs.slice(1)" :key="bloc._id">
      <img
        v-if="bloc.img"
        :src="`http://localhost:9000/static/${bloc.img.categorie}/${bloc.img.src}`"
        :alt="bloc.img.alt"
        @click="updatePhoto(bloc._id)"
      />
      <iframe
        v-if="bloc.video"
        width="100%"
        height="40%"
        :src="'https://www.youtube.com/embed/' + bloc.video"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="bloc-text">
        <h4 @click="updateSubTitle(bloc._id, bloc.subtitle)">
          {{ bloc.subtitle }}
        </h4>
        <div
          class="paragraphe-tarif"
          v-html="bloc.paragraphes"
          @click="updateTexte(bloc._id, bloc.paragraphes)"
        ></div>
        <div class="inline-flex">
          <button v-on:click="setMessage(bloc.message)">Me Contacter</button>
          <i
            v-if="$store.state.admin"
            class="fas fa-envelope"
            @click="updateMessage(bloc._id, bloc.message)"
          ></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Boutton from "../components/Boutton.vue";
import FormPhotosPage from "@/components/FormPhotosPage.vue";
import FormTextePage from "@/components/FormTextePage.vue";
export default {
  name: "ParticuliersTarifs",
  components: {
    Boutton,
    FormPhotosPage,
    FormTextePage,
  },
  data() {
    return {
      pageId: null,
      blocs: null,
      showModalPhotos: false,
      showModalTexte: false,
      categ: false,
      idOldPhoto: null,
      elementChange: null,
      title: null,
    };
  },
  created() {
    this.$store.commit("loading");
    this.http
      .get("http://localhost:9000/pages/getPage/60be0df8aa58d11ea0769ccd")
      .then((resp) => {
        //console.log(resp.data);
        this.pageId = resp.data._id;
        this.blocs = resp.data.blocs;
        this.title = resp.data.name;
        // console.log(this.blocs);
        this.$store.commit("loading");
      });
  },
  methods: {
    setMessage(message) {
      console.log(message);
      this.$store.dispatch("getMessage", message);
      this.$router.push("/contact");
    },
    updatePhoto(idBloc) {
      console.log(idBloc);
      if (idBloc) {
        this.idBloc = idBloc;
      }
      this.showModalPhotos = !this.showModalPhotos;
    },
    updateTexte(idBloc, texte) {
      if (idBloc && texte) {
        this.idBloc = idBloc;
        this.texte = texte;
        this.elementChange = "texte";
      }
      this.showModalTexte = !this.showModalTexte;
    },
    updateMessage(idBloc, message) {
      if (idBloc && message) {
        this.idBloc = idBloc;
        this.texte = message;
        this.elementChange = "message";
      }
      this.showModalTexte = !this.showModalTexte;
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

<style lang="scss" scoped>
section:nth-child(odd) {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  button {
    padding: 5%;
    font-size: 2.5vh;
    background-color: var(--thirdly-color);
    color: var(--fourthly-color);
    border: none;
  }
}
section:nth-child(even) {
  background-color: var(--primary-color);
  color: var(--fourthly-color);
  button {
    padding: 5%;
    font-size: 2.5vh;
    background-color: var(--fourthly-color);
    color: var(--primary-color);
    border: none;
  }
}
p {
  font-size: 1.5vh;
  padding-bottom: 5%;
}
.inline-flex {
  width: 100%;
}
section {
  justify-content: flex-start;
  padding-bottom: 5%;
  h3 {
    font-size: 3.5vh;
  }
  h4 {
    font-size: 4vh;
  }
  h5 {
    padding: 0% 10%;
  }
  i {
    position: absolute;
    right: 10%;
    font-size: 8vh;
  }
  .bloc-text {
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    padding: 0% 1%;
    .paragraphe {
      text-align: start;
      font-size: 1.8vh;
      margin: 0% 10%;
      line-height: 2.5vh;
    }
    .paragraphe-tarif {
      font-size: 2vh;
      line-height: 3vh;
      padding: 0% 5%;
      ::v-deep p {
        margin: 5% 0%;
      }
      ::v-deep :first-child {
        font-size: 3vh;
      }
    }
  }
}
img {
  height: 40%;
  width: 100%;
  object-fit: cover;
  justify-self: start;
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
</style>