<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">Hybrid challenge mini-blog</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn text to="/new">
        <span class="mr-2">New Post</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <!-- <HelloWorld />-->
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("initStore");
  }
};
</script>
