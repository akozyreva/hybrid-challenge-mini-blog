import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    initStore(vuexContext) {
      let retrievedPosts = JSON.parse(localStorage.getItem("posts"));
      vuexContext.commit("setPosts", retrievedPosts);
    },
    createPost(vuexContext, post) {
      let retrievedPosts = JSON.parse(localStorage.getItem("posts"));
      if (!retrievedPosts) {
        let posts = [];
        posts.push(post);
        localStorage.setItem("posts", JSON.stringify(posts));
        vuexContext.commit("setPosts", posts);
      } else {
        retrievedPosts.push(post);
        localStorage.setItem("posts", JSON.stringify(retrievedPosts));
        vuexContext.commit("setPosts", retrievedPosts);
      }
    },
    updatePost(vuexContext, post) {
      console.log(post);
      let retrievedPosts = JSON.parse(localStorage.getItem("posts"));
      const postIndex = retrievedPosts.findIndex(el => el.id === post.id);
      retrievedPosts[postIndex] = post;
      localStorage.setItem("posts", JSON.stringify(retrievedPosts));
      vuexContext.commit("setPosts", retrievedPosts);
    },
    deletePost(vuexContext, postId) {
      let retrievedPosts = JSON.parse(localStorage.getItem("posts"));
      const postIndex = retrievedPosts.findIndex(el => el.id === postId);
      console.log(postIndex);
      retrievedPosts = retrievedPosts
        .slice(0, postIndex)
        .concat(retrievedPosts.slice(postIndex + 1, retrievedPosts.length));
      localStorage.setItem("posts", JSON.stringify(retrievedPosts));
      vuexContext.commit("setPosts", retrievedPosts);
    },
    addCommentToPost(vuexContext, payload) {
      let retrievedPosts = JSON.parse(localStorage.getItem("posts"));
      const postIndex = retrievedPosts.findIndex(
        el => el.id === payload.postId
      );
      if (!retrievedPosts[postIndex].comments)
        retrievedPosts[postIndex].comments = [];
      retrievedPosts[postIndex].comments.push(payload.comment);
      vuexContext.dispatch("updatePost", retrievedPosts[postIndex]);
    },
    delCommentfromPost(vuexContext, payload) {
      let retrievedPosts = JSON.parse(localStorage.getItem("posts"));
      const postIndex = retrievedPosts.findIndex(
        el => el.id === payload.postId
      );
      const commentIndex = retrievedPosts[postIndex].comments.findIndex(
        el => el.id === payload.commentId
      );
      retrievedPosts[postIndex].comments = retrievedPosts[postIndex].comments
        .slice(0, commentIndex)
        .concat(
          retrievedPosts[postIndex].comments.slice(
            commentIndex + 1,
            retrievedPosts[postIndex].comments.length
          )
        );
      vuexContext.dispatch("updatePost", retrievedPosts[postIndex]);
    }
  },
  getters: {
    loadedPosts(state) {
      return state.posts;
    },
    loadedPost(state, id) {
      return state.posts;
    }
  }
});
