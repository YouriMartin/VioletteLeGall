<template>
  <div id="formUpdatePhoto">
    <div class="overlay" @click="toggleModal"></div>
    <div class="modal" v-if="photo">
      <h3>{{ photo.alt }}</h3>
      <img
        :src="
          'http://localhost:9000/static/' + photo.categorie + '/' + photo.src
        "
        :alt="photo.alt"
      />
      <label for="alt">Changer Alt</label>
      <input type="text" name="alt" v-model="alt" />
      <p v-if="message">{{ message }}</p>
      <button @click="updatePhoto(photo._id)">Modifier</button>
      <button @click="deletePhoto(photo._id)">Suppimer Photo</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormUpdatePhoto",
  props: ["toggleModal", "id"],
  data() {
    return {
      photo: null,
      alt: null,
      message: null,
    };
  },
  mounted() {
    console.log(this.id);
    console.log("toto");
    this.http
      .get("http://localhost:9000/photos/getOne/" + this.id)
      .then((resp) => {
        console.log(resp.data);
        this.photo = resp.data;
        this.alt = resp.data.alt;
      });
  },
  methods: {
    updatePhoto(id) {
      console.log(id);
      let infos = {
        id: id,
        alt: this.alt,
      };
      this.http
        .post("http://localhost:9000/photos/update", infos)
        .then((resp) => {
          console.log(resp.data);
          this.message = resp.data;
          document.location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.message = err;
        });
    },
    deletePhoto(id) {
      console.log(id);
      this.http
        .post("http://localhost:9000/photos/delete", { id: id })
        .then((resp) => {
          console.log(resp.data);
          this.message = resp.data;
          document.location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.message = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modal {
  border-radius: 10px;
  height: auto;
  width: 80%;
  background: #f1f1f1;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: fixed;
  padding: 5%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  img {
    margin: 10% 0%;
  }
  input {
    margin: 5% 0%;
    padding: 3%;
    border: 2px solid var(--primary-color);
    color: var(--thirdly-color);
    font-size: 3vh;
  }
  h3 {
    text-align: center;
  }
  button {
    margin: 5%;
    padding: 3%;
    font-size: 2.5vh;
    background-color: var(--thirdly-color);
    color: var(--fourthly-color);
    border: none;
    letter-spacing: 0.2vh;
    width: 80%;
    align-self: center;
  }
}
</style>