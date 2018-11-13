<template>
  <v-app id="openpaas">
    <div v-if="$auth.ready()">
      <v-toolbar clipped-left app fixed color="primary" v-if="$auth.check()">
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <img class="hidden-sm-and-down" id="header-logo" src="@/assets/logo.svg"/>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <op-user-menu/>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height pa-0>
          <v-layout justify-center align-center>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
    </div>
    <div v-else>
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
    <op-snackbar/>
  </v-app>
</template>

<script>
import UserMenu from "@/components/UserMenu.vue";
import Snackbar from "@/components/Snackbar.vue";


export default {
  components: {
    "op-user-menu": UserMenu,
    "op-snackbar": Snackbar
  },
  created() {
    this.$auth.ready(() => {
      this.$store.dispatch("user/fetchUser");
    });
  }
};
</script>

<style lang="stylus">
  #header-logo
    height: 35px;
    width: 150px;

</style>
