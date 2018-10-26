<template>
  <v-app id="openpaas">
    <v-navigation-drawer clipped fixed app>
      <!--<op-sidebar/>-->
    </v-navigation-drawer>
    <v-toolbar clipped-left app fixed color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <img class="hidden-sm-and-down" id="header-logo" src="@/assets/logo.svg"/>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<op-applications-menu/>-->
      <!--<op-user-menu/>-->
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <snackbar/>
  </v-app>
</template>
<style lang="stylus">
  #header-logo
    height: 35px;
    width: 150px;
</style>
