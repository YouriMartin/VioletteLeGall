<template>
  <div id="form-delete-article" v-if="$store.state.admin">
    <div class="overlay" @click="toggleModal"></div>
    <div class="modal">
      <h3>Attention !</h3>
      <h4>Voulez-vous vraiment supprimer cet article ?</h4>
      <button @click="deleteArticle">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormDeleteArticle",
  props: ["toggleModal", "id"],
  methods: {
    deleteArticle() {
      console.log(this.id);
      this.http
        .post(
          "http://localhost:9000/articles/delete",
          { id: this.id },
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
          }
        )
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
  z-index: 2;
}
.modal {
  z-index: 3;
  border-radius: 10px;
  height: 30%;
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
  justify-content: space-evenly;
  align-content: center;
  text-align: center;
  h3 {
    color: Red;
  }
  button {
    border: 2px solid var(--thirdly-color);
    color: var(--thirdly-color);
    font-weight: bold;
    align-self: center;
    font-size: 3vh;
    padding: 2% 10%;
  }
}
</style>