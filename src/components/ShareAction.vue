<template>
  <div class="share-action text-xs-center">
    <v-dialog v-model="dialog" width="600">
      <div slot="activator">
        {{$t('Share conference')}}
      </div>
      <v-card>
        <v-card-title class="white--text headline grey darken-2 justify-center">
          {{$t('Share conference')}}
        </v-card-title>
        <v-card-actions>
          <v-container grid-list-xl fluid>
            <v-layout row wrap>
              <v-flex class="hide" sm2 d-flex>
                <v-icon left color="black">link</v-icon>
              </v-flex>
              <v-flex class="url hide" sm8 d-flex>
                <v-btn v-clipboard:copy="link" @click="dialog = !dialog" flat>
                  {{link}}
                </v-btn> 
              </v-flex>
              <v-flex xs12 sm2 d-flex>
                <v-btn v-clipboard:copy="link" @click="dialog = !dialog" flat color="primary" >
                  {{$t('Copy link')}}
                </v-btn>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ShareAction",
  data() {
    return {
      dialog: false,
      link: ""
    };
  },
  mounted() {
    this.link = window.location.href; //To change once we have a variable for the adress
  }
};
</script>

<style lang="stylus" scoped>
  .url {
    overflow: hidden;
  }

  @media(max-width: 600px) {
    .hide {
      display: none !important;// to override the flex !important from the d-flex
    }
  }
</style>
