<template>
  <div>
    <v-text-field
      :v-model="properInput.label"
      :error-messages="nameErrors"
      :counter="properInput.len"
      :label="properInput.label"
      required
      @blur="$v.name.$touch()"
      @input="$v.name.$touch()"
    ></v-text-field>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  props: ["properInput"],
  mixins: [validationMixin],
  data: () => ({
    name: "",
    len: 20
  }),
  validations() {
    return {
      name: {
        required,
        maxLength: maxLength(this.len)
      }
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push(
          `${this.properInput.label} must be not less ${this.properInput.len} characters long`
        );
      !this.$v.name.required &&
        errors.push(`${this.properInput.label}is required.`);
      return errors;
    }
  }
};
</script>
