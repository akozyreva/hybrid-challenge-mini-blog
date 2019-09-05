import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const getPosts = () => JSON.parse(localStorage.getItem("posts"));
const findIndexById = (arr, valId) => arr.findIndex(el => el.id === valId);
const delRowFromArr = (arr, index) =>
  arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
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
      let retrievedPosts = getPosts();
      vuexContext.commit("setPosts", retrievedPosts);
    },
    createPost(vuexContext, post) {
      let retrievedPosts = getPosts();
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
      let retrievedPosts = getPosts();
      const postIndex = findIndexById(retrievedPosts, post.id);
      retrievedPosts[postIndex] = post;
      localStorage.setItem("posts", JSON.stringify(retrievedPosts));
      vuexContext.commit("setPosts", retrievedPosts);
    },
    deletePost(vuexContext, postId) {
      let retrievedPosts = getPosts();
      const postIndex = findIndexById(retrievedPosts, postId);
      retrievedPosts = delRowFromArr(retrievedPosts, postIndex);
      localStorage.setItem("posts", JSON.stringify(retrievedPosts));
      vuexContext.commit("setPosts", retrievedPosts);
    },
    addCommentToPost(vuexContext, payload) {
      let retrievedPosts = getPosts();
      const postIndex = findIndexById(retrievedPosts, payload.postId);
      if (!retrievedPosts[postIndex].comments)
        retrievedPosts[postIndex].comments = [];
      retrievedPosts[postIndex].comments.push(payload.comment);
      vuexContext.dispatch("updatePost", retrievedPosts[postIndex]);
    },
    editComment(vuexContext, payload) {
      let retrievedPosts = getPosts();
      const postIndex = findIndexById(retrievedPosts, payload.postId);
      const commentIndex = findIndexById(
        retrievedPosts[postIndex].comments,
        payload.comment.id
      );
      retrievedPosts[postIndex].comments[commentIndex] = payload.comment;
      vuexContext.dispatch("updatePost", retrievedPosts[postIndex]);
    },

    delCommentfromPost(vuexContext, payload) {
      let retrievedPosts = getPosts();
      const postIndex = findIndexById(retrievedPosts, payload.postId);
      const commentIndex = findIndexById(
        retrievedPosts[postIndex].comments,
        payload.commentId
      );
      retrievedPosts[postIndex].comments = delRowFromArr(
        retrievedPosts[postIndex].comments,
        commentIndex
      );
      vuexContext.dispatch("updatePost", retrievedPosts[postIndex]);
    }
  },
  getters: {
    loadedPosts(state) {
      return state.posts;
    }
  }
});
