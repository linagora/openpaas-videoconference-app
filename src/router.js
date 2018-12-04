import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import PrivateVideoConference from "@/views/PrivateVideoConference";
import PublicVideoConference from "@/views/PublicVideoConference";
import CreateConference from "@/views/CreateConference.vue";

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
      path: "/new",
      name: "CreateConference",
      component: CreateConference,
      meta: {
        auth: true
      }
    },
    {
      path: "/:conferenceid",
      name: "VideoConference",
      component: PrivateVideoConference,
      props: route => ({ conferenceid: route.params.conferenceid }),
      meta: {
        auth: true
      }
    },
    {
      path: "/o/:conferenceid",
      name: "PublicVideoConference",
      component: PublicVideoConference,
      props: route => ({ conferenceid: route.params.conferenceid })
    }
  ]
});
