<template>
  <div>
    <v-card class="mx-auto" tile>
      <v-subheader>Info about Post</v-subheader>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loadedPost.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ loadedPost.text }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card class="mx-auto" tile v-show="loadedPost.comments">
      <v-subheader>Comments</v-subheader>
      <div two-line v-for="(comment, i) in loadedPost.comments" :key="i">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ comment.author }}</v-list-item-title>
            <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn>Edit</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="onDeleteComment(comment.id)">Delete</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["loadedPost"],
  methods: {
    onDeleteComment(commentId) {
      const payload = { commentId, postId: this.$route.params.id.slice(1) };
      this.$store.dispatch("delCommentfromPost", payload);
    }
  }
};
</script>
