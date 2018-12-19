<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary">
            <v-toolbar-title class="white--text">{{$t('Create a new conference')}}</v-toolbar-title>
          </v-toolbar>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                @click="submit"
              >{{$t('Create')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
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
      conferenceNameRules: [
        v => !!v || this.$t("A conference name is required"),
        v => v.match(/^\S+$/) || this.$t("Whitespaces are not allowed")
      ]
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
