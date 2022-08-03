import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "@/views/Profile";
import Missing from "@/views/Missing";
import movies from "@/views/Movies";
import Login from "@/views/Login";
import Signup from "@/views/Signup";
import VideoPlayerView from "@/views/VideoPlayerView";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/movies",
    name: "Movies",
    component: movies,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: Signup,
  },
  {
    path: "/videoplayer/:videoid",
    name: "Videoplayer",
    component: VideoPlayerView,
  },
  {
    path: "/",
    redirect: "Login",
  },
  {
    path: "*",
    component: Missing,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && to.name !== "Register" && !store.state.loggedIn) {
    next({ name: "Login" });
  } else next();
});

export default router;
