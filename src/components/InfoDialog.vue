<template>
  <v-row justify="center">
    <v-dialog v-model="dialogAction" max-width="290">
      <v-card>
        <v-card-title class="headline">Record was edited</v-card-title>

        <v-card-text>
          Record was successfully edited. Thanks!
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["dialog"],
  data() {
    return {};
  },
  computed: {
    dialogAction: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit("clicked", value);
      }
    }
  }
};
</script>
