<template>
  <div id="TipTap">
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
    <editor-content class="content" :editor="editor" v-model="newTexte" />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
export default {
  name: "TipTap",
  components: {
    EditorContent,
    BubbleMenu,
  },
  props: ["texte"],
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    newTexte: {
      get() {
        return this.texte;
      },
      set(value) {
        this.$emit("newTexte", value);
      },
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.newTexte,
    });
    this.newTexte = this.editor.getHTML();
    // … and get the content after every change.
    this.editor.on("update", () => {
      this.newTexte = this.editor.getHTML();
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
#TipTap {
  height: 100%;
  overflow-y: scroll;
}
::v-deep .ProseMirror {
  height: 100%;
  padding: 5%;
  overflow-y: scroll;
  width: 90%;
  margin: auto;
}
.content {
  background-color: white;
  color: black;
  height: 100%;
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
</style>