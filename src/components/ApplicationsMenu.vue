<template>
  <v-menu :close-on-content-click="true" :nudge-width="200" bottom offset-y>
    <v-btn icon slot="activator" color="primary">
      <v-icon>apps</v-icon>
    </v-btn>

    <v-card>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex xs4 d-flex>
            <router-link :to="{ name: routeNames.HOME }">
              <v-icon large color="blue">home</v-icon>
            </router-link>
          </v-flex>
          <v-flex xs4 d-flex>
            <router-link :to="{ name: routeNames.HOME }">
              <v-icon large color="blue">video_call</v-icon>
            </router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
import { routeNames } from "@/router";
export default {
  computed: {
    routeNames() {
      return routeNames;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
