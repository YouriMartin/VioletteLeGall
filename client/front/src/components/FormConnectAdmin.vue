<template>
  <section id="form-connect-admin">
    <h3>Connexion</h3>
    <div class="form">
      <div class="form-element">
        <label for="pseudo">Pseudo :</label>
        <input type="text" name="pseudo" v-model="pseudo" />
        <label for="password">Mot de passe : </label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p v-if="message">{{ message }}</p>
      <p class="erreur" v-if="erreur">{{ erreur }}</p>
      <button @click="connexion()">Se connecter</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "FormConnectAdmin",
  data() {
    return {
      pseudo: "admin",
      password: "",
      message: "",
      erreur: "",
    };
  },
  methods: {
    connexion() {
      let self = this;
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute("6Le2ZtoaAAAAAJYwB1PID_FGRSk0BevX_cXcm_08", {
            action: "submit",
          })
          .then(function (token) {
            let infos = {
              pseudo: self.pseudo,
              password: self.password,
              token: token,
            };
            self.http
              .post("http://localhost:9000/admin/connexion", infos)
              .then((resp) => {
                console.log(resp);
                self.message = resp.data.message;
                localStorage.setItem("jwt", resp.data.token);
                document.location.reload();
              })
              .catch((err) => {
                console.log(err.response);
                self.erreur = err.response.data.message;
              });
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  padding: 5%;
  border-radius: 5px;
}
.form-element {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 60%;
}
input {
  text-align: center;
  color: var(--thirdly-color);
}
button {
  width: 60%;
  color: var(--thirdly-color);
  border: none;
  padding: 5% 10%;
}
.erreur {
  font-weight: bold;
  color: red;
}
@media screen and (min-width: 768px) {
  .form {
    width: 45%;
    height: 40%;
    padding: 3%;
  }
  .form-element {
    width: 60%;
    height: 100%;
  }
  input,
  label {
    font-size: 2.5vh;
  }
  button {
    width: auto;
    font-size: 2.5vh;
    padding: 1% 5%;
  }
}
</style>