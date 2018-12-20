<template>
  <div id="video">
    <op-loading :waiting-text="waitingText" v-show="showLoader"></op-loading>
    <div id="jitsi" v-show="showConference" ref="jitsivideo"></div>
    <div v-show="showReopenRoomButton">
      <v-btn color="info" @click="openConference">{{$t("Reopen conference room")}}</v-btn>
    </div>
    <div class="text-xs-center" v-show="showErrorMessage">
      <v-icon class="mb-3" color="error" x-large>error</v-icon>
      <p class="title pa-3">
        {{$t("We are sorry, but the conference room couldn't be joined.")}}<br />
        {{$t("Please try again later. If the problem persists, try to contact the IT service")}}<br />
      </p>
      <v-btn color="info" @click="openConference">{{$t("Retry")}}</v-btn>
    </div>
  </div>
</template>

<script>
import { stripProtocol } from "@/lib/helpers";
import { mapGetters, mapState } from "vuex";
import { conferenceStates, types } from "@/store/modules/ui";
import getJitsiMeetExternalAPI from "@/lib/jitsi-meet-external-api-wrapper";
import { OPLoading } from "vue-openpaas-components";
import _partial from "lodash/partial";

export default {
  name: "VideoConference",
  components: { "op-loading": OPLoading },
  data() {
    return { videoConference: null };
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
    conferenceServerTimeout() {
      return this.$store.state.ui.conferenceServerTimeout * 1000;
    },
    conferenceState: {
      get() {
        return this.$store.state.ui.conferenceState;
      },
      set(newState) {
        this.$store.commit(`ui/${types.CONFERENCE_STATE}`, newState);
      }
    },
    jitsiOptions() {
      return {
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
      };
    },
    showConference() {
      return this.conferenceState === conferenceStates.LOADED;
    },
    safeJitsiInstanceUrl() {
      return stripProtocol(this.jitsiInstanceUrl);
    },
    showLoader() {
      return this.conferenceState === conferenceStates.LOADING || this.conferenceState === conferenceStates.TAKING_TIME;
    },
    showReopenRoomButton() {
      return this.conferenceState === conferenceStates.CALL_ENDED;
    },
    showErrorMessage() {
      return this.conferenceState === conferenceStates.TIMED_OUT;
    },
    takingTimeTimeout() {
      return this.$store.state.ui.takingTimeTimeout * 1000;
    },
    waitingText() {
      return (
        {
          [conferenceStates.LOADING]: "Loading conference...",
          [conferenceStates.TAKING_TIME]:
            "The video conference is taking time to load. Please wait. It should not be too long..."
        }[this.conferenceState] || ""
      );
    }
  },
  methods: {
    dispose() {
      this.videoConference && this.videoConference.dispose();
      this.videoConference = null;
    },
    onVideoConferenceJoined() {
      this.conferenceState = conferenceStates.LOADED;
      this.userAvatarUrl && this.videoConference.executeCommand("avatarUrl", this.userAvatarUrl);
      this.userName && this.videoConference.executeCommand("displayName", this.userName);
      this.userEmail && this.videoConference.executeCommand("email", this.userEmail);
    },
    async openConference() {
      const JitsiMeetExternalAPI = await getJitsiMeetExternalAPI();
      this.conferenceState = conferenceStates.LOADING;
      this.startCountdown();

      this.videoConference = new JitsiMeetExternalAPI(this.safeJitsiInstanceUrl, this.jitsiOptions);
      this.videoConference.on("videoConferenceJoined", this.onVideoConferenceJoined);
      this.videoConference.on("readyToClose", () => {
        this.dispose();
        this.conferenceState = conferenceStates.CALL_ENDED;
      });
    },
    startCountdown() {
      const assertStateAndMutate = state => this.showLoader && (this.conferenceState = state);
      const $timeout = timeout => new Promise(resolve => setTimeout(this.$nextTick, timeout, resolve));

      const firstPromise = $timeout(this.conferenceServerTimeout).then(
        _partial(assertStateAndMutate, conferenceStates.TAKING_TIME)
      );

      const secondPromise = firstPromise
        .then(_partial($timeout, this.conferenceServerTimeout))
        .then(_partial(assertStateAndMutate, conferenceStates.TIMED_OUT));

      return [firstPromise, secondPromise];
    }
  },
  beforeMount() {
    this.conferenceState = conferenceStates.LOADING;
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
