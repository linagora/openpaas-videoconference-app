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
  props: { conferenceid: String },
  computed: {
    ...mapGetters("user", ["getDisplayName", "getAvatarUrl", "getEmail"]),
    ...mapGetters("session", { sessionReady: "ready" }),
    ...mapState("applicationConfiguration", ["jitsiToolbarButtons"]),
    jitsiInstanceUrl() {
      const stripProtocol = urlString => (urlString ? urlString.replace(`${new URL(urlString).protocol}//`, "") : "");
      return stripProtocol(this.configurations("linagora.esn.videoconference:jitsiInstanceUrl"));
    },
    videoConferenceProps() {
      return this.component === "op-loading"
        ? { waitingText: "Loading conference..." }
        : {
            jitsiInstanceUrl: this.jitsiInstanceUrl,
            roomName: this.conferenceid,
            userName: this.getDisplayName,
            userAvatarUrl: this.getAvatarUrl,
            userEmail: this.getEmail
          };
    }
  },
  methods: {
    async getComponent() {
      await this.sessionReady;
      this.roomName = this.conferenceid;

      return "op-videoconference";
    }
  },
  async beforeMount() {
    this.component = await this.getComponent();
  },
  async beforeRouteUpdate(to, _, next) {
    if (to.params.conferenceid !== this.conferenceid) {
      this.component = "op-loading";
      next();
      this.component = await this.getComponent();
    }
  }
};
</script>
