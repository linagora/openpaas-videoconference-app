<template>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
          <v-card width="60vw" class="elevation-12">
            <v-card-title class="white--text headline primary lighten-2 justify-center">
              {{$t('Create a new conference')}}
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" @keydown.native.enter="submit"  onSubmit="return false;">
                <v-text-field
                  v-model="conferenceName"
                  :rules="conferenceNameRules"
                  :label="$t('Enter your conference name')"
                  type="text"
                  autofocus
                  required
                ></v-text-field>
                <v-btn
                  :disabled="!valid"
                  @click="submit"
                >{{$t('Create')}}</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
      </v-layout>
    </v-container>
</template>

<script>
import { routeNames } from "@/router";

export default {
  data() {
    return {
      valid: true,
      conferenceName: null,
      conferenceNameRules: [v => !!v || this.$t("A conference name is required")]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$router.push({
          name: routeNames.PRIVATE_VIDEOCONFERENCE,
          params: { conferenceName: this.conferenceName }
        });
      }
    }
  }
};
</script>
