<template>
    <div id="video">
        <div class="text-xs-center" v-show="showLoader">
            <v-progress-circular indeterminate color="amber" :size="50"></v-progress-circular>
            <div class="title pa-3">
              {{$t('Loading conference...')}}
            </div>
        </div>
        <div id="jitsi" v-show="loaded" ref="jitsivideo"></div>
        <div v-show="displayReopenRoomButton">
            <v-btn color="info" @click="openConference">{{$t('Reopen conference room')}}</v-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import getJitsiMeetExternalAPI from "@/lib/jitsi-meet-external-api-wrapper";

export default {
  name: "VideoConference",
  data() {
    return {
      videoConference: null,
      loaded: false,
      roomName: "",
      displayReopenRoomButton: false
    };
  },
  props: { conferenceid: String },
  computed: {
    ...mapGetters("user", ["getDisplayName", "getAvatarUrl", "getEmail", "configurations"]),
    ...mapGetters("session", { sessionReady: "ready" }),
    ...mapState("applicationConfiguration", ["jitsiToolbarButtons"]),
    showLoader() {
      return !this.loaded && !this.displayReopenRoomButton;
    }
  },
  methods: {
    dispose() {
      if (this.videoConference) {
        this.videoConference.dispose();
        this.videoConference = null;
      }
      this.displayReopenRoomButton = true;
      this.loaded = false;
    },
    async getJitsiUrl() {
      const stripProtocol = urlString => urlString.replace(`${new URL(urlString).protocol}//`, "");
      await this.sessionReady;
      return stripProtocol(this.configurations("linagora.esn.videoconference:jitsiInstanceUrl"));
    },
    async openConference() {
      const JitsiMeetExternalAPI = await getJitsiMeetExternalAPI();
      const jitsiUrl = await this.getJitsiUrl();
      this.loaded = false;
      this.displayReopenRoomButton = false;
      this.videoConference = new JitsiMeetExternalAPI(jitsiUrl, {
        roomName: this.conferenceid,
        parentNode: this.$refs.jitsivideo,
        configOverwrite: {
          enableClosePage: false
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          TOOLBAR_ALWAYS_VISIBLE: true,
          TOOLBAR_BUTTONS: this.jitsiToolbarButtons
        }
      });

      this.videoConference.on("videoConferenceJoined", () => {
        this.loaded = true;
        this.videoConference.executeCommand("avatarUrl", this.getAvatarUrl);
        this.videoConference.executeCommand("displayName", this.getDisplayName);
        this.videoConference.executeCommand("email", this.getEmail);
      });

      this.videoConference.on("readyToClose", this.dispose);
    }
  },
  mounted() {
    this.openConference();
  },
  beforeRouteUpdate(to, _, next) {
    if (to.params.conferenceid !== this.conferenceid) {
      this.dispose();
      next();
      this.openConference();
    }
  }
};
</script>

<style scoped lang="stylus">
    #video {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    #jitsi {
      width: 100%
      height: calc(100vh - 64px)
    }

    @media only screen and (max-width: 959px) {
      #jitsi {
        height: calc(100vh - 48px)
      }
    }
</style>
