<template>
  <div id="particulier-tarifs" v-if="blocs != null">
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
    <section id="first-section">
      <h2 @click="updateTitle">{{ title }}</h2>
      <div id="texte-img-container">
        <img
          :src="`http://localhost:9000/static/${blocs[0].img.categorie}/${blocs[0].img.src}`"
          :alt="blocs[0].img.alt"
          @click="updatePhoto(blocs[0]._id)"
        />
        <div class="bloc-text">
          <h3>Mes Prestations</h3>
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
            :css="'thirdly-big'"
            :route="'/contact'"
            :type="'router'"
          />
        </div>
      </div>
    </section>
    <section
      v-show="$store.state.mobile"
      v-for="bloc in blocs.slice(1)"
      :key="bloc._id"
    >
      <img
        :src="`http://localhost:9000/static/${bloc.img.categorie}/${bloc.img.src}`"
        :alt="bloc.img.alt"
        @click="updatePhoto(bloc._id)"
      />
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
          <button v-on:click="setMessage(bloc._id)">Me Contacter</button>
          <i
            v-if="$store.state.admin"
            class="fas fa-envelope"
            @click="updateMessage(bloc._id, bloc.message)"
          ></i>
        </div>
      </div>
    </section>
    <section v-show="!$store.state.mobile" id="tarif-section-web">
      <h3>TARIFS</h3>
      <div id="tarif-container">
        <figure
          class="tarif"
          v-for="bloc in blocs.slice(1)"
          :key="bloc._id"
          @mouseover="hover = true"
          @mouseleave="hover = false"
        >
          <img
            :src="`http://localhost:9000/static/${bloc.img.categorie}/${bloc.img.src}`"
            :alt="bloc.img.alt"
            @click="updatePhoto(bloc._id)"
          />
          <figcaption>
            <h4 @click="updateSubTitle(bloc._id, bloc.subtitle)">
              {{ bloc.subtitle }}
            </h4>
            <!-- <h4 @click="updateSubTitle(bloc._id, bloc.subtitle)">
                {{ bloc.subtitle }}
              </h4> -->

            <div class="tarif-description">
              <div
                class="paragraphe-tarif"
                v-html="bloc.paragraphes"
                @click="updateTexte(bloc._id, bloc.paragraphes)"
              ></div>
              <button v-on:click="setMessage(bloc._id)">Me Contacter</button>
            </div>
            <i
              v-if="$store.state.admin"
              class="fas fa-envelope"
              @click="updateMessage(bloc._id, bloc.message)"
            ></i>
          </figcaption>
        </figure>
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
      .get("http://localhost:9000/pages/getPage/60bdde1d1b8c691e101f71a7")
      .then((resp) => {
        //console.log(resp.data);
        this.pageId = resp.data._id;
        this.blocs = resp.data.blocs;
        this.title = resp.data.name;
        console.log(this.blocs);
        this.$store.commit("loading");
      });
  },
  methods: {
    setMessage(id) {
      const index = this.blocs.findIndex((bloc) => bloc._id === id);
      const message = this.blocs[index].message;
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
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  button {
    padding: 5%;
    font-size: 2.5vh;
    background-color: var(--fourthly-color);
    color: var(--thirdly-color);
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
#first-section {
  justify-content: space-evenly;
  padding: 5% 0;
  h2 {
    height: 10%;
  }
  #texte-img-container {
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    img {
      height: 20%;
      width: 100%;
      object-fit: cover;
    }
  }
}
img {
  height: 40%;
  width: 100%;
  object-fit: cover;
  justify-self: start;
}

@media screen and (min-width: 768px) {
  #first-section {
    justify-content: space-evenly;
    align-items: center;
    padding: 10% 0% 0% 0%;
    h2 {
      height: 10%;
    }
    #texte-img-container {
      height: 90%;
      flex-direction: row;
      img {
        height: 90%;
        width: 35%;
        object-fit: cover;
      }
      .bloc-text {
        height: 90%;

        width: 40%;
      }
    }
  }
  #tarif-section-web {
    height: 190vh;
    padding-bottom: 0%;
    justify-content: space-evenly;
    h3 {
      font-size: 5vh;
    }
    i {
      right: -25%;
      font-size: 5vh;
      cursor: pointer;
    }
    #tarif-container {
      height: 80%;
      width: 80%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 50% 50%;
      grid-gap: 5%;
      .tarif {
        height: 80%;
        width: 70%;
        align-self: center;
        justify-self: center;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          cursor: pointer;
          border-radius: 5px;
        }
        h4 {
          font-size: 2.5vh;
        }
      }
    }
  }

  figure {
    position: relative;
    transition: all 0.8s ease-in-out;
    &:hover img {
      filter: grayscale(100%);
    }
    figcaption {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-content: space-evenly;
      padding: 10%;
      height: 90%;
      width: 90%;
      transition: all 0.8s ease-in-out;
      &:hover {
        background-color: var(--thirdly-color-5);
        border-radius: 10px;
      }
      &:hover .tarif-description {
        visibility: visible;
        height: 80%;
      }
      .tarif-description {
        justify-self: flex-end;
        visibility: hidden;
        transition: all 0.5s ease-in-out;
        display: flex;
        font-size: 1.7vh;
        height: 0%;
        text-align: start;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        button {
          cursor: pointer;
          font-size: 2vh;
          background-color: var(--thirdly-color);
          color: var(--fourthly-color);
          transition: all 0.5s ease-in-out;

          &:hover {
            background-color: var(--fourthly-color);
            color: var(--thirdly-color);
          }
        }
      }
    }
  }
}
</style>