import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import VideoConference from "@/views/VideoConference.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL, // Needed for dev/build and HTML history
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: {
        name: "VideoConference",
        params: { conferenceid: process.env.VUE_APP_JITSI_DEFAULT_CONFERENCE_ROOM }
      },
      meta: {
        auth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: "/:conferenceid",
      name: "VideoConference",
      component: VideoConference,
      props: route => ({ conferenceid: route.params.conferenceid }),
      meta: {
        auth: true
      }
    }
  ]
});
