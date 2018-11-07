import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import VideoConference from "@/views/VideoConference.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "VideoConference" },
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
      path: "/conference",
      name: "VideoConference",
      component: VideoConference,
      children: [
        {
          path: ":conferenceid",
          component: VideoConference
        }
      ],
      meta: {
        auth: true
      }
    }
  ]
});
