<template>
    <component :is="component" v-bind="videoConferenceProps"></component>
</template>

<script>
import { OPLoading } from "vue-openpaas-components";
import { mapGetters, mapState } from "vuex";
import VideoConference from "@/components/VideoConference";

export default {
  name: "PublicVideoConference",
  components: {
    "op-loading": OPLoading,
    "op-videoconference": VideoConference
  },
  data() {
    return {
      roomName: undefined,
      jitsiInstanceUrl: undefined,
      component: "op-loading"
    };
  },
  props: { conferenceid: String },
  computed: {
    ...mapGetters("user", ["getDisplayName", "getAvatarUrl", "getEmail"]),
    ...mapGetters("session", { sessionReady: "ready" }),
    ...mapState("applicationConfiguration", ["jitsiToolbarButtons"]),
    videoConferenceProps() {
      return this.component === "op-loading"
        ? { waitingText: "Loading conference..." }
        : { roomName: this.roomName, jitsiInstanceUrl: this.jitsiInstanceUrl };
    }
  },
  methods: {
    async getComponent() {
      const { data } = await this.$http.get(`/videoconference/api/conference/${this.conferenceid}`);
      this.roomName = data.conferenceName;
      this.jitsiInstanceUrl = data.jitsiInstanceUrl;

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
