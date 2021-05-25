<template>
  <section id="form-article">
    <h3>formulaire Articles</h3>
    <div class="form">
      <label for="titre">Titre :</label>
      <input type="text" name="titre" v-model="titre" placeholder="titre" />
      <label for="texte">Article : </label>
      <bubble-menu class="bubble-menu" :editor="editor" v-if="editor">
        <i
          class="fas fa-bold"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        ></i>
        <i
          class="fas fa-italic"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        ></i>
      </bubble-menu>
      <editor-content class="content" :editor="editor" v-model="texte" />

      <input type="date" name="date" v-model="date" />
      <input type="text" name="alt" v-model="alt" placeholder="alt" />
      <input
        type="file"
        id="photoArticle"
        name="photoArticle"
        placeholder="ajouté photo ici"
      />
    </div>
    <button @click="envoyerArticle()">Ajouter article</button>
  </section>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: {
    EditorContent,
    BubbleMenu,
  },
  data() {
    return {
      titre: "",
      texte: "<p>Lorem Ipsum ...</p>",
      alt: "",
      date: new Date().toISOString().substr(0, 10),
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.texte,
    });
    this.texte = this.editor.getHTML();
    // … and get the content after every change.
    this.editor.on("update", () => {
      this.texte = this.editor.getHTML();
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    envoyerArticle() {
      let img = document.getElementById("photoArticle").files[0];

      let article = new FormData();
      article.append("titre", this.titre);
      article.append("texte", this.texte);
      article.append("date", this.date);
      article.append("src", img);
      article.append("alt", this.alt);

      console.log("article", this.texte);
      this.http
        .post("http://localhost:9000/articles/addArticle/Articles", article, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        })
        .then((resp) => {
          console.log("reponse", resp);
          window.alert(resp.data);
          this.titre = "";
          this.texte = "";
          this.alt = "";
          document.getElementById("photo").value = "";
        })
        .catch((err) => {
          console.log("erreur", err.response);
          window.alert(err.response.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ProseMirror {
  height: 100%;
  padding: 5%;
  overflow-y: scroll;
}
.content {
  background-color: white;
  color: black;
  height: 50%;
}
.bubble-menu {
  background-color: white;
  width: 20vh;
  height: 10vh;
  font-size: 5vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: 1px solid black;
  i {
    padding: 5% 10%;
  }
  i:active {
    border: black solid 1px;
  }
}
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
input {
  font-size: 2.5vh;
  border-radius: 5px;
  padding: 2%;
  border: 2px var(--thirdly-color) solid;
}

button {
  font-size: 3vh;
  background-color: var(--thirdly-color);
  color: var(--fourthly-color);
  border: none;
  padding: 2% 5%;
}
</style>