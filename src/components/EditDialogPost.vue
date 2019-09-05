<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <form @submit.prevent="onEditPost">
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-textarea
          v-model="loadedPost.text"
          :error-messages="textErrors"
          required
          @input="$v.text.$touch()"
          @blur="$v.text.$touch()"
          label="Text of Post"
        ></v-textarea>
        <v-btn class="mr-4" :disabled="$v.$invalid" type="submit"
          >Edit Post</v-btn
        >
        <v-btn class="mr-4" type="submit" @click="cancel">Cancel</v-btn>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  props: ["loadedPost", "dialog"],
  validations: {
    name: { required, maxLength: maxLength(10) },
    text: { required, maxLength: maxLength(10) }
  },
  data() {
    return {
      name: this.loadedPost.name,
      text: this.loadedPost.text
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be not less 50 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    textErrors() {
      const errors = [];
      if (!this.$v.text.$dirty) return errors;
      !this.$v.text.maxLength &&
        errors.push("Text must be not less 50 characters long");
      !this.$v.text.required && errors.push("Text is required.");
      return errors;
    }
  },

  methods: {
    cancel() {
      this.$v.$reset();
      this.$emit("clicked", false);
    },
    onEditPost() {
      console.log("method for edit");
      const post = {
        id: this.$route.params.id.slice(1),
        name: this.name,
        text: this.text,
        comments: this.loadedPost.comments
      };
      this.$store.dispatch("updatePost", post);
      this.cancel();
    }
  }
};
</script>
