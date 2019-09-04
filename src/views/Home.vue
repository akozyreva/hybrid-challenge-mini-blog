<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs6 class="text-xs-center">
        <v-card class="mx-auto" tile>
          <v-list shaped>
            <v-subheader>POSTS</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(post, i) in posts"
                :key="i"
                :to="`/:${post.id}`"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="post.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import { mapGetters } from "vuex";
export default {
  components: {
    HelloWorld
  },

  computed: {
    ...mapGetters({ posts: "loadedPosts" })
  }
};
</script>
