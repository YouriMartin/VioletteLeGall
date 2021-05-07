<template>
  <div id="formulaire-contact">
    <h4>Me contacter</h4>
    <form @submit.prevent="submit">
      <div class="form-element">
        <input
          type="text"
          name="name"
          id="name"
          required=""
          placeholder="Nom"
        />
      </div>
      <div class="form-element">
        <input
          type="email"
          name="email"
          id="email"
          required=""
          :class="{ email, error: !email.valid }"
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
            v-model="selection.framework"
          />
          <label for="professionnel">Professionnel</label>
        </div>
        <div class="inline-flex">
          <input
            type="radio"
            name="particulier"
            id="particulier"
            value="particulier"
            v-model="selection.framework"
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
      </div>
      <div>
        <input id="envoyer" type="submit" value="Envoyer" />
      </div>
    </form>
  </div>
</template>

<script>
//var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default {
  name: "FormulaireContact",
  data() {
    return {
      emailRegExp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      email: {
        value: "",
        valid: true,
      },
      selection: {
        features: [],
      },
      message: {
        text: "",
        maxlength: 255,
      },
      submitted: false,
    };
  },
  methods: {
    submit: function () {
      this.submitted = true;
    },

    validate: function (type, value) {
      if (type === "email") {
        this.email.valid = this.isEmail(value) ? true : false;
      }
    },

    isEmail: function (value) {
      return this.emailRegExp.test(value);
    },

    checkAll: function (event) {
      this.selection.features = event.target.checked ? this.features : [];
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
form {
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