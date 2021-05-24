<template>
  <section>
    <h3>Modification du mot de passe</h3>
    <div class="form">
      <div class="form-element">
        <label for="newPassword">Nouveau mot de passe :</label>
        <input
          type="password"
          name="newPassword"
          v-model="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="form-element">
        <label for="newPasswordAgain">Répeter le mot de passe : </label>
        <input
          type="password"
          name="newPasswordAgain"
          v-model="passwordVerif"
          placeholder="Mot de passe"
        />
      </div>
      <p>{{ message }}</p>
      <button id="button-form" @click="changerPassword()">Modifier</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "FormPassword",
  data() {
    return {
      password: "",
      passwordVerif: "",
      message: "",
    };
  },
  methods: {
    changerPassword() {
      if (this.password != "") {
        if (this.password === this.passwordVerif) {
          let password = { password: this.password };
          this.http
            .post("http://localhost:9000/admin/updatePassword", password)
            .then((resp) => {
              this.message = resp.data;
              localStorage.removeItem("jwt");
              document.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.message = "ce n'est pas deux fois le même mot de passe";
        }
      } else {
        this.message = "mot de passe vide";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 90%;
  justify-content: space-evenly;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  padding: 5%;
  border-radius: 5px;
}

input {
  font-size: 2vh;
  border-radius: 5px;
  padding: 2%;
  border: 2px var(--thirdly-color) solid;
  width: 100%;
}
button {
  font-size: 3vh;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  border: none;
  padding: 2% 5%;
}
h3 {
  margin: 0% 10%;
  text-align: center;
}
#button-form {
  background-color: var(--fourthly-color);
  color: var(--thirdly-color);
  align-self: center;
}
</style>