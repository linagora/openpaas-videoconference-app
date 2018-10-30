<template>
  <v-app id="openpaas">
    <div v-if="$auth.ready()">
      <v-navigation-drawer clipped fixed app>
        <!--<op-sidebar/>-->
      </v-navigation-drawer>
      <v-toolbar clipped-left app fixed color="primary" v-if="$auth.check()">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <img class="hidden-sm-and-down" id="header-logo" src="@/assets/logo.svg"/>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!--<op-applications-menu/>-->
        <op-user-menu/>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
      <!--<snackbar/>-->
    </div>
    <div v-else>
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
  </v-app>
</template>

<script>
import UserMenu from "@/components/UserMenu.vue";

export default {
  components: {
    'op-user-menu': UserMenu
  },
  created () {
    this.$auth.ready(() => {
      this.$store.dispatch('user/fetchUser');
    });
  },
};
</script>

<style lang="stylus">
  #header-logo
    height: 35px;
    width: 150px;
</style>
