<template>
  <!-- Don't show the share link if this is not a conference (just for security matters) -->
  <div class="share-action text-xs-center">
    <button @click.prevent.stop="generatePublicConference">
      {{$t('Share conference')}}
    </button>

    <v-dialog content-class="share-conference-modal" v-model="showDialog" lazy width="600">
      <v-card id="conference-modal">

        <!-- Modal content when state is loading -->
        <template v-if="showLoading">
          <v-card-title class="white--text headline grey darken-2 justify-center">
            {{$t('Please wait...')}}
          </v-card-title>

          <v-container grid-list-xl fluid>
            <v-layout align-center justify-center row fill-height>
              <v-card-text>
                <op-loading waiting-text="We are generating a public conference"></op-loading>
              </v-card-text>
            </v-layout>
          </v-container>

        </template>


        <!-- Modal content when state is error -->
        <template v-else-if="showError">
          <v-card-title class="white--text headline error justify-center">
            {{$t('Error')}}
          </v-card-title>
          <v-card-text>
            <v-container grid-list-xl fluid d-inline-flex>
              <v-layout align-center justify-center row fill-height>
                <v-flex class="hidden-xs-and-down flex-grow-0" d-inline-flex align-self-center>
                  <v-icon left color="error">error</v-icon>
                </v-flex>
                <v-flex class="flex-grow-0" d-inline-flex align-self-center>
                  <p class="conference-error-message text-xs-center pa-0 ma-0">
                    {{$t('We have not been able to generate your public conference')}}
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider light></v-divider>

          <v-card-actions>
            <v-container grid-list-xl fluid>
              <v-layout align-center justify-center column fill-height>
                <v-btn @click.prevent.stop="generatePublicConference">{{$t('Retry')}}</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </template>

        <!-- Modal content when state is loaded -->
        <template v-else>
          <v-card-title class="white--text headline grey darken-2 justify-center">
            {{$t('Share conference')}}
          </v-card-title>
          <v-card-actions>
            <v-container grid-list-xl fluid>
              <v-layout row nowrap>
                <v-flex class="hidden-xs-and-down" d-flex>
                  <v-icon left color="black">link</v-icon>
                </v-flex>
                <v-flex class="url hidden-xs-and-down px-0" d-flex>
                  <v-btn
                    class="url-link-btn"
                    v-clipboard:copy="publicRoute"
                    @click="onPublicLinkCopied()"
                    flat
                  >
                    {{publicRoute}}
                  </v-btn>
                </v-flex>
                <v-flex d-flex>
                  <v-btn
                    class="copy-link-btn"
                    v-clipboard:copy="publicRoute"
                    @click="onPublicLinkCopied()"
                    flat
                    color="primary"
                  >
                    {{$t('Copy link')}}
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
            </v-container>
          </v-card-actions>
        </template>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { routeNames } from "@/router";
import { OPLoading } from "vue-openpaas-components";

const states = Object.freeze({
  HIDDEN: "HIDDEN",
  LOADED: "LOADED",
  LOADING: "LOADING",
  ERROR: "ERROR"
});

export default {
  name: "ShareAction",
  components: {
    "op-loading": OPLoading
  },
  data() {
    return {
      state: undefined,
      publicId: undefined
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.state !== states.HIDDEN;
      },
      set(value) {
        value === false && (this.state = states.HIDDEN);
      }
    },
    showError() {
      return this.state === states.ERROR;
    },
    showLoading() {
      return this.state === states.LOADING;
    },
    conferenceName() {
      return this.$route.params.conferenceName;
    },
    publicRoute() {
      if (!this.publicId) {
        return "";
      }

      const { route } = this.$router.resolve({
        name: routeNames.PUBLIC_VIDEOCONFERENCE,
        params: { publicId: this.publicId }
      });

      return `${window.location.origin}${route.fullPath}`;
    }
  },
  beforeMount() {
    this.state = states.HIDDEN;
  },
  methods: {
    generatePublicConference() {
      this.state = states.LOADING;
      this.$http
        .createConference(this.conferenceName)
        .then(({ data }) => {
          this.publicId = data.publicId;
          this.state = states.LOADED;
        })
        .catch(() => (this.state = states.ERROR));
    },

    onPublicLinkCopied() {
      this.showDialog = false;
      this.$store.dispatch("ui/displaySnackbar", {
        message: this.$t("Link has been copied in your clipboard")
      });
    }
  }
};
</script>

<style lang="stylus">
  #conference-modal // Setting ID because scoped styles do not behave correctly with slots

    .url
      flex-shrink: 2

      &, *
        text-transform: none
        justify-content: end
        overflow: hidden
        // `text-overflow: ellipsis` won't work is you don't specify width in *pixels*
        // % won't work... Who knows why !? *sigh* CSS...
        width: calc(100% - 0px)
        // Oh, yes, and display must be set to block because everybody uses flexboxes now
        // and it's really to easy to make something that just works...
        // See https://stackoverflow.com/a/17783233
        display: block
        text-overflow: ellipsis
</style>
