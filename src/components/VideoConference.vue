<template>
  <div id="video">
    <op-loading waiting-text="Loading conference..." v-show="showLoader"></op-loading>
    <div id="jitsi" v-show="loaded" ref="jitsivideo"></div>
    <div v-show="displayReopenRoomButton">
      <v-btn color="info" @click="openConference">{{$t('Reopen conference room')}}</v-btn>
    </div>
  </div>
</template>

<script>
import { stripProtocol } from "@/lib/helpers";
import { mapGetters, mapState } from "vuex";
import getJitsiMeetExternalAPI from "@/lib/jitsi-meet-external-api-wrapper";
import { OPLoading } from "vue-openpaas-components";

export default {
  name: "VideoConference",
  components: { "op-loading": OPLoading },
  data() {
    return {
      videoConference: null,
      loaded: false,
      displayReopenRoomButton: false
    };
  },
  props: {
    roomName: { type: String, required: true },
    jitsiInstanceUrl: { type: String, required: true },
    userName: String,
    userAvatarUrl: String,
    userEmail: String
  },
  computed: {
    ...mapState("applicationConfiguration", ["jitsiToolbarButtons"]),
    ...mapGetters("user", ["configurations"]),
    showLoader() {
      return !this.loaded && !this.displayReopenRoomButton;
    },
    safeJitsiInstanceUrl() {
      return stripProtocol(this.jitsiInstanceUrl);
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
    async openConference() {
      const JitsiMeetExternalAPI = await getJitsiMeetExternalAPI();

      this.loaded = false;
      this.displayReopenRoomButton = false;
      this.videoConference = new JitsiMeetExternalAPI(this.safeJitsiInstanceUrl, {
        roomName: this.roomName,
        parentNode: this.$refs.jitsivideo,
        configOverwrite: { enableClosePage: false },
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
        this.userAvatarUrl && this.videoConference.executeCommand("avatarUrl", this.userAvatarUrl);
        this.userName && this.videoConference.executeCommand("displayName", this.userName);
        this.userEmail && this.videoConference.executeCommand("email", this.userEmail);
      });

      this.videoConference.on("readyToClose", this.dispose);
    }
  },
  mounted() {
    this.openConference().catch(/* Handle error ?*/);
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
