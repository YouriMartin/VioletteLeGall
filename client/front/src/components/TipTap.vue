<template>
  <div id="TipTap">
    <bubble-menu
      class="bubble-menu"
      :editor="editor"
      v-if="editor && $store.state.mobile"
    >
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
    <div id="tool-bar" v-if="editor && !$store.state.mobile">
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
      <i
        class="fas fa-align-left"
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
      ></i>
      <i
        class="fas fa-align-center"
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      ></i>
      <i
        class="fas fa-align-right"
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      ></i>
    </div>
    <editor-content class="content" :editor="editor" v-model="newTexte" />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-2";
import TextAlign from "@tiptap/extension-text-align";
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
      extensions: [StarterKit, TextAlign],
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
  width: 100%;
}
::v-deep .ProseMirror {
  height: 100%;
  padding: 5%;
  overflow-y: scroll;
  width: 90%;

  // margin: auto;
}
.content {
  background-color: white;
  color: black;
  height: 100%;
  width: 100%;
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
@media screen and (min-width: 768px) {
  #TipTap {
    height: 50%;
    overflow-y: hidden;
  }
  ::v-deep .ProseMirror {
    height: 89%;
    width: 100%;
  }
  #tool-bar {
    background-color: white;
    border-bottom: 1px solid black;
    color: black;
    font-size: 2vh;
    display: flex;
    justify-content: space-evenly;
    padding: 1%;
    height: 18%;
    i {
      cursor: pointer;
    }
  }
}
</style>