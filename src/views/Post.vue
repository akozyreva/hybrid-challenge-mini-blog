<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs6 class="text-xs-center">
        <EditDialogPost
          :loadedPost="singlePost"
          @clicked="onClickChild"
        ></EditDialogPost>
        <v-btn @click="deletePost">Delete Post</v-btn>
        <PostCard :loadedPost="singlePost"></PostCard>
        <h2>Add new Comment</h2>
        <form @submit.prevent="onCreateComment">
          <v-text-field
            v-model="author"
            :error-messages="nameErrors"
            :counter="50"
            label="Author"
            required
            @input="$v.author.$touch()"
            @blur="$v.author.$touch()"
          ></v-text-field>
          <v-textarea
            v-model="text"
            :error-messages="textErrors"
            required
            @input="$v.text.$touch()"
            @blur="$v.text.$touch()"
            label="Text of Comment"
          ></v-textarea>
          <v-btn class="mr-4" type="submit" :disabled="$v.$invalid"
            >Create Comment</v-btn
          >
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import PostCard from "@/components/PostCard";
import EditDialogPost from "@/components/EditDialogPost";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  data: () => ({
    author: "",
    text: ""
  }),
  components: {
    PostCard,
    EditDialogPost
  },
  mixins: [validationMixin],

  validations: {
    author: { required, maxLength: maxLength(50) },
    text: { required, maxLength: maxLength(5000) }
  },
  computed: {
    ...mapGetters({ posts: "loadedPosts" }),
    singlePost() {
      const postId = this.$route.params.id.slice(1);
      let posts = this.posts;
      return posts.find(el => el.id === postId);
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.author.$dirty) return errors;
      !this.$v.author.maxLength &&
        errors.push("Author must be not less 50 characters long");
      !this.$v.author.required && errors.push("Author is required.");
      return errors;
    },
    textErrors() {
      const errors = [];
      if (!this.$v.text.$dirty) return errors;
      !this.$v.text.maxLength &&
        errors.push("Text must be be not less 5000 characters long");
      !this.$v.text.required && errors.push("Text is required.");
      return errors;
    }
  },
  methods: {
    onCreateComment() {
      const uuidv1 = require("uuid/v4");
      const comment = {
        id: uuidv1(),
        author: this.author,
        text: this.text
      };
      const payload = { comment, postId: this.$route.params.id.slice(1) };
      this.$store.dispatch("addCommentToPost", payload);
    },
    onClickChild(val) {
      this.dialog = val;
    },
    deletePost() {
      this.$store.dispatch("deletePost", this.$route.params.id.slice(1));
      this.$router.push({ path: "/" });
    }
  }
};
</script>
