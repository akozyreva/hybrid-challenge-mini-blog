import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NewPost from "./views/NewPost.vue";
import Post from "./views/Post.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/new",
      name: "newPost",
      component: NewPost
    },
    {
      path: "/:id",
      name: "Post",
      component: Post
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
