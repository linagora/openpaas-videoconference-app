<template>
  <v-app id="openpaas">
    <v-toolbar clipped-left app fixed color="primary">
      <v-toolbar-title>
        <img id="header-logo" src="@/assets/logo.svg" alt="OpenPaas logo"/>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <op-actions-menu/>
      <op-user-menu v-if="$auth.check()"/>
    </v-toolbar>

    <template v-if="$auth.ready()">
      <v-content>
        <v-container fluid fill-height pa-0>
          <v-layout justify-center align-center>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
    </template>
    <template v-else>
      <v-content>
        <v-container fluid fill-height pa-0>
          <v-layout justify-center align-center>
            <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-content>
    </template>
    <op-snackbar/>
  </v-app>
</template>

<script>
import UserMenu from "@/components/UserMenu.vue";
import Snackbar from "@/components/Snackbar.vue";
import ActionsMenu from "@/components/ActionsMenu.vue";

export default {
  components: {
    "op-user-menu": UserMenu,
    "op-snackbar": Snackbar,
    "op-actions-menu": ActionsMenu
  },
  created() {
    this.$auth.ready(() => {
      this.$store.dispatch("session/init");
      this.$store.dispatch("session/setResolved");
    });
  }
};
</script>

<style lang="stylus">
  #header-logo
    height: 35px;
    width: 150px;

</style>
