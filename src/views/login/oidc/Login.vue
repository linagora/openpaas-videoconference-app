<template>
  <v-content id="login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4 text-xs-center>
          <v-card class="pa-4" flat>
            <v-card-title primary-title id="title" class="pt-0">
              <h3 class="subheading mb-0 grey--text text--darken-2">
                <span>{{ $t("You are not connected to OpenPaaS") }}</span>
              </h3>
            </v-card-title>
            <v-card-actions id="actions">
              <v-btn :disabled="logMeIn" :loading="logMeIn" @click="login" color="primary">
                {{ $t("Connect") }}
              </v-btn>
            </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { routeNames } from "@/router";

export default {
  data() {
    return {
      logMeIn: false
    };
  },
  methods: {
    login() {
      this.logMeIn = true;
      this.$router.push({ name: routeNames.HOME });
    }
  }
};
</script>

<style scoped lang="stylus">
#login
  height: 80vh

#title, #actions
  justify-content: center

#logo
  display: flex
  img
    height: 35px
    width: 150px
</style>
