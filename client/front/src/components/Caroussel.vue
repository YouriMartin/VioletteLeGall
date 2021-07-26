<template>
  <div id="caroussel">
    <div v-if="showModal && $store.state.admin">
      <div class="overlay" @click="toggleModal"></div>
      <div id="modal">
        <h4>Caroussel</h4>
        <div class="photo-container" v-if="!showAddPhoto">
          <draggable
            v-model="contentsForUpdate"
            ghost-class="ghost"
            @end="onEnd"
          >
            <transition-group type="transition" name="flip-list">
              <div
                class="imgDrag"
                v-for="content in contentsForUpdate"
                :key="content.order"
              >
                <img
                  :src="`http://localhost:9000/static/${content.categorie}/${content.src}`"
                  :alt="content.alt"
                />
                <i class="fas fa-times" @click="supprimer(content.order)"></i>
              </div>
            </transition-group>
          </draggable>
          <i
            v-if="!showAddPhoto"
            class="far fa-plus-square"
            @click="showAddPhoto = true"
          ></i>
        </div>
        <button v-if="!showAddPhoto" @click="update">
          Enregistrer les modifications
        </button>
        <div v-if="showAddPhoto">
          <div class="select-group">
            <i class="fas fa-filter"></i>
            <select v-model="categorie">
              <option value="Particuliers">Particuliers</option>
              <option value="Professionnels">Professionnels</option>
              <option value="Autres">Autres</option>
            </select>
          </div>
          <div class="select-group">
            <i
              v-if="categorie != null && categorie != 'Autres'"
              class="fas fa-filter"
            ></i>
            &nbsp;
            <select
              v-if="categorie === 'Professionnels'"
              v-model="sousCategorie"
            >
              <option
                v-for="sousCateg in professionelsSousCategorie"
                :key="sousCateg"
              >
                {{ sousCateg }}
              </option>
            </select>
            <select v-if="categorie === 'Particuliers'" v-model="sousCategorie">
              <option
                v-for="sousCateg in particuliersSousCategorie"
                :key="sousCateg"
              >
                {{ sousCateg }}
              </option>
            </select>
          </div>
          <div id="photo-scroll">
            <img
              class="photo-add"
              v-for="photo in photosFiltered"
              :key="photo._id"
              :src="
                'http://localhost:9000/static/' +
                photo.categorie +
                '/' +
                photo.src
              "
              :alt="photo.alt"
              @click="addPhoto(photo)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="caroussel-container" @click="toggleModal">
      <vueper-slides
        v-if="$store.state.mobile"
        ref="myVueperSlides"
        autoplay
        :fixedHeight="size"
        :arrows="false"
      >
        <vueper-slide
          v-for="content in contents"
          :key="content.order"
          :image="`http://localhost:9000/static/${content.categorie}/${content.src}`"
        />
      </vueper-slides>
      <vueper-slides
        v-if="!$store.state.mobile"
        autoplay
        ref="myVueperSlides"
        fade
        :touchable="false"
        :fixedHeight="size"
        :arrows="true"
      >
        <vueper-slide
          v-for="content in contents"
          :key="content.order"
          :image="`http://localhost:9000/static/${content.categorie}/${content.src}`"
        />
      </vueper-slides>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "Caroussel",
  props: ["size", "large", "contents", "idPage", "idBloc"],
  components: {
    VueperSlides,
    VueperSlide,
    draggable,
  },
  data() {
    return {
      showModal: false,
      oldIndex: "",
      newIndex: "",
      contentsForUpdate: "",
      showAddPhoto: false,
      particuliersSousCategorie: null,
      professionelsSousCategorie: null,
      photosFiltered: null,
      photos: null,
      categorie: null,
      sousCategorie: null,
    };
  },
  mounted() {
    this.contentsForUpdate = this.contents;
    //style
    let truc = document.getElementsByClassName("vueperslides");
    //console.log("truc", truc);
    truc[0].style.width = this.large;
    //add photo
    this.http
      .get("http://localhost:9000/photos/getSousCategories/Particuliers")
      .then((resp) => {
        //console.log(resp.data);
        this.particuliersSousCategorie = resp.data;
      });
    this.http
      .get("http://localhost:9000/photos/getSousCategories/Professionnels")
      .then((resp) => {
        // console.log(resp.data);
        this.professionelsSousCategorie = resp.data;
      });
  },
  watch: {
    sousCategorie: function (value) {
      this.photosFiltered = this.photos.filter((photo) =>
        value.includes(photo.sous_categorie)
      );
    },
    categorie: function (value) {
      this.http
        .get("http://localhost:9000/photos/getPhotos/" + value + "/all")
        .then((resp) => {
          // console.log(resp.data);
          this.photos = resp.data;
          this.photosFiltered = resp.data;
        });
    },
  },
  methods: {
    toggleModal() {
      if (this.$store.state.admin) {
        this.$store.commit("carousselModale");
        this.showModal = !this.showModal;
      }
    },
    onEnd(evt) {
      console.log(this.contentsForUpdate);
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;
    },
    supprimer(order) {
      const index = this.contentsForUpdate.findIndex(
        (content) => content.order === order
      );
      this.contentsForUpdate.splice(index, 1);
    },
    update() {
      // reset order
      let order = 1;
      this.contentsForUpdate.forEach((content) => {
        (content.order = order), order++;
      });
      let infos = {
        idPage: this.idPage,
        idBloc: this.idBloc,
        caroussel: this.contentsForUpdate,
      };
      console.log(infos);
      this.http
        .post("http://localhost:9000/pages/updateCaroussel", infos, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        })
        .then((resp) => {
          console.log(resp);
          // this.$store.commit("loading");
          document.location.reload();
        });
    },
    addPhoto(photo) {
      const order = this.contentsForUpdate.length + 1;
      photo.order = order;
      this.contentsForUpdate.push(photo);
      this.showAddPhoto = false;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
}
#caroussel {
  z-index: 1;
}
.caroussel-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.photo-add {
  height: 10vh;
  object-fit: cover;
  margin: 5%;
}
#photo-scroll {
  margin-top: 5%;
  overflow: scroll;
  height: 35vh;
  border: 1px solid var(--primary-color);
}
.select-group {
  margin: 5%;
}
#modal {
  border-radius: 5px;
  // z-index: 5;
  min-height: 60vh;
  width: 80vw;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  color: var(--thirdly-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  .photo-container {
    height: 50%;
    text-align: center;
    span {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
    }
    .imgDrag {
      height: 8vh;
      margin: 5%;
      img {
        height: 100%;
        &:hover {
          transform: rotate(0.06turn);
          cursor: grab;
        }
      }
      i {
        font-size: 2.5vh;
        color: black;
        position: absolute;
      }
    }
    i {
      font-size: 6vh;
      color: lightblue;
      &:hover {
        transform: rotate(0.06turn);
        cursor: pointer;
      }
    }
  }
  button {
    border: none;
    padding: 5% 10%;
    background-color: var(--thirdly-color);
    color: var(--fourthly-color);
    cursor: pointer;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
}
@media screen and (min-width: 768px) {
  #modal {
    padding: 1%;
    width: 50%;
    .photo-container {
      .imgDrag {
        height: 10vh;
      }
    }
    button {
      font-size: 2.5vh;
      padding: 1% 5%;
    }
  }
}
</style>