<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs6 class="text-xs-center">
        <form @submit.prevent="onCreatePost">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="50"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-textarea
            v-model="text"
            :error-messages="textErrors"
            required
            @input="$v.text.$touch()"
            @blur="$v.text.$touch()"
            label="Text of Post"
          ></v-textarea>
          <v-btn class="mr-4" :disabled="$v.$invalid" type="submit"
            >Create Post</v-btn
          >
          <v-btn @click="clear">Clear Fields</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(50) },
    text: { required, maxLength: maxLength(5000) }
  },

  data: () => ({
    name: "",
    text: ""
  }),

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
        errors.push("Text must be not less 5000 characters long");
      !this.$v.text.required && errors.push("Text is required.");
      return errors;
    }
  },

  methods: {
    clear() {
      this.$v.$reset();
      this.name = "";
      this.text = "";
    },
    onCreatePost() {
      const uuidv1 = require("uuid/v4");
      const post = {
        id: uuidv1(),
        name: this.name,
        text: this.text
      };
      this.$store.dispatch("createPost", post);
      this.clear();
      this.$router.push({ path: "/" });
    }
  }
};
</script>
