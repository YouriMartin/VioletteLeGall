<template>
  <div id="formulaire-contact">
    <h4>Me contacter</h4>
    <div id="form">
      <div class="form-element">
        <input
          type="text"
          name="name"
          id="name"
          v-model="nom"
          placeholder="Nom"
        />
      </div>
      <div class="form-element">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          v-model="email.value"
        />
      </div>

      <div class="inline-flex">
        <div class="inline-flex">
          <input
            type="radio"
            name="professionel"
            id="professionnel"
            value="professionnel"
            v-model="selection"
          />
          <label for="professionnel">Professionnel</label>
        </div>
        <div class="inline-flex">
          <input
            type="radio"
            name="particulier"
            id="particulier"
            value="particulier"
            v-model="selection"
          />
          <label for="particulier">Particulier</label>
        </div>
      </div>
      <div class="form-element">
        <textarea
          class="message"
          name="textarea"
          id="textarea"
          required=""
          v-model="message.text"
          :maxlength="message.maxlength"
        ></textarea>
      </div>

      <div class="error-message">
        <p v-show="!email.valid">Votre adresse email est invalide</p>
        <p>{{ erreurMessage }}</p>
      </div>
      <div>
        <button id="envoyer" @click="submit">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormulaireContact",
  data() {
    return {
      emailRegExp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      email: {
        value: "",
        valid: true,
      },
      selection: "professionnel",
      message: {
        text: "",
        maxlength: 255,
      },
      nom: "",
      erreurMessage: "",
    };
  },
  methods: {
    submit() {
      let self = this;
      if (this.email.valid) {
        if (self.email.value != "" && self.nom != "") {
          window.grecaptcha.ready(function () {
            window.grecaptcha
              .execute("6Le2ZtoaAAAAAJYwB1PID_FGRSk0BevX_cXcm_08", {
                action: "submit",
              })
              .then(function (token) {
                console.log(token);
                let mail = {
                  email: self.email.value,
                  nom: self.nom,
                  type: self.selection,
                  message: self.message.text,
                  token: token,
                };
                console.log(mail);
                self.http
                  .post("http://localhost:9000/contact/sendMail", mail)
                  .then((resp) => {
                    self.erreurMessage = resp.data;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          });
        } else {
          self.erreurMessage = "il manque un element";
        }
      }
    },
    validate(type, value) {
      if (type === "email") {
        this.email.valid = this.isEmail(value) ? true : false;
      }
    },
    isEmail(value) {
      return this.emailRegExp.test(value);
    },
  },
  mounted() {
    this.message.text = this.$store.state.message;
  },
  watch: {
    "email.value": function (value) {
      this.validate("email", value);
    },
  },
};
</script>

<style scoped>
#formulaire-contact {
  padding: 0 5% 5% 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
}
h4 {
  margin-bottom: 5%;
}
#form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
.form-element {
  display: flex;
  flex-direction: column;
}
label {
  font-size: 2vh;
}
textarea {
  height: 10vh;
  border: 2px solid var(--primary-color);
  padding: 1%;
  resize: none;
}
input {
  border: 2px solid var(--primary-color);
  padding-left: 2%;
}
#envoyer {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 1vh 3vh;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  border: none;
}
</style>