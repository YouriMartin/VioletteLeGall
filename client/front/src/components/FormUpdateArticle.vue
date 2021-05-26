<template>
  <div id="form-update-article" v-if="$store.state.admin">
    <div class="overlay" @click="toggleModal"></div>
    <div class="modal">
      <h3>Modification</h3>
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
      <p>{{ message }}</p>
      <button @click="updateArticle">Modifier</button>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

export default {
  name: "FormUpdateArticle",
  props: ["toggleModal", "id"],
  components: {
    EditorContent,
    BubbleMenu,
  },
  data() {
    return {
      titre: null,
      texte: null,
      editor: null,
      message: null,
    };
  },
  mounted() {
    this.http
      .get("http://localhost:9000/articles/getOne/" + this.id)
      .then((resp) => {
        console.log(resp.data);
        this.titre = resp.data.titre;
        this.texte = resp.data.texte;

        this.editor = new Editor({
          extensions: [StarterKit],
          content: this.texte,
        });
        this.texte = this.editor.getHTML();
        // … and get the content after every change.
        this.editor.on("update", () => {
          this.texte = this.editor.getHTML();
        });
      });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    updateArticle() {
      console.log(this.id);
      let infos = {
        id: this.id,
        titre: this.titre,
        texte: this.texte,
      };
      console.log(infos);
      this.http
        .post("http://localhost:9000/articles/update", infos, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        })
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
.modal {
  z-index: 3;
  border-radius: 10px;
  height: 60%;
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