<template>
    <component :is="component" v-bind="videoConferenceProps"></component>
</template>

<script>
import { OPLoading } from "vue-openpaas-components";
import { mapGetters, mapState } from "vuex";
import VideoConference from "@/components/VideoConference";

export default {
  name: "PrivateVideoConference",
  components: {
    "op-loading": OPLoading,
    "op-videoconference": VideoConference
  },
  data() {
    return {
      roomName: undefined,
      component: "op-loading"
    };
  },
  props: { conferenceName: { type: String, required: true } },
  computed: {
    ...mapGetters("user", ["getDisplayName", "getAvatarUrl", "getEmail", "configurations"]),
    ...mapGetters("session", { sessionReady: "ready" }),
    ...mapState("applicationConfiguration", ["jitsiToolbarButtons", "jitsiUrl"]),
    jitsiInstanceUrl() {
      return this.jitsiUrl;
    },
    videoConferenceProps() {
      return this.component === "op-loading"
        ? { waitingText: "Loading conference..." }
        : {
            jitsiInstanceUrl: this.jitsiInstanceUrl,
            roomName: this.conferenceName,
            userName: this.getDisplayName,
            userAvatarUrl: this.getAvatarUrl,
            userEmail: this.getEmail
          };
    }
  },
  methods: {
    async getComponent() {
      await this.sessionReady;
      this.roomName = this.conferenceName;

      return "op-videoconference";
    }
  },
  async beforeMount() {
    this.component = await this.getComponent();
  },
  async beforeRouteUpdate(to, _, next) {
    if (to.params.conferenceName !== this.conferenceName) {
      this.component = "op-loading";
      next();
      this.component = await this.getComponent();
    }
  }
};
</script>
