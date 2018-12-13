import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import PrivateVideoConference from "@/views/PrivateVideoConference";
import PublicVideoConference from "@/views/PublicVideoConference";
import CreateConference from "@/views/CreateConference.vue";

Vue.use(Router);

const routeNames = Object.freeze({
  HOME: "Home",
  LOGIN: "Login",
  PRIVATE_VIDEOCONFERENCE: "PrivateVideoConference",
  PUBLIC_VIDEOCONFERENCE: "PublicVideoConference",
  CREATE_CONFERENCE: "CreateConference"
});

export default new Router({
  base: process.env.BASE_URL, // Needed for dev/build and HTML history
  mode: "history",
  routes: [
    {
      path: "/",
      name: routeNames.HOME,
      redirect: {
        name: routeNames.PRIVATE_VIDEOCONFERENCE,
        params: { conferenceName: process.env.VUE_APP_JITSI_DEFAULT_CONFERENCE_ROOM }
      },
      meta: {
        auth: true
      }
    },
    {
      path: "/login",
      name: routeNames.LOGIN,
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: "/new",
      name: routeNames.CREATE_CONFERENCE,
      component: CreateConference,
      meta: {
        auth: true
      }
    },
    {
      path: "/:conferenceName",
      name: routeNames.PRIVATE_VIDEOCONFERENCE,
      component: PrivateVideoConference,
      props: route => ({ conferenceName: route.params.conferenceName }),
      meta: {
        auth: true
      }
    },
    {
      path: "/o/:publicId",
      name: routeNames.PUBLIC_VIDEOCONFERENCE,
      component: PublicVideoConference,
      props: route => ({ publicId: route.params.publicId })
    }
  ]
});

export { routeNames };
