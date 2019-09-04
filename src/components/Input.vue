<template>
  <div>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      :label="input.label"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  props: ["input"],
  mixins: [validationMixin],
  data: () => ({
    name: "",
    len: 10
  }),
  validations: {
    name: {
      required
      // maxLength: maxLength(this.len)
      //len: maxLength(this.len)
    }
  },
  mounted: {},
  computed: {
    nameErrors() {
      console.log(this.$v);
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.len &&
        errors.push(`Name must be at most ${len} characters long`);
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    }
  },
  methods: {
    clear() {
      this.$v.$reset();
      this.name = "";
      this.text = "";
    }
  }
};
</script>
