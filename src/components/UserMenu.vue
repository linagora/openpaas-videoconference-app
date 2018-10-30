<template>
  <v-menu bottom left offset-y>
    <v-avatar size="32px" slot="activator">
      <img v-if="getAvatarUrl" :src="getAvatarUrl">
      <v-icon v-else>account_circle</v-icon>
    </v-avatar>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
        <v-list-tile-title class="title">{{getDisplayName}}</v-list-tile-title>
        <v-list-tile-sub-title>{{getEmail}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-list-tile @click.prevent="profile">
        <v-list-tile-title>Profile</v-list-tile-title>
      </v-list-tile>
      <v-divider/>
      <v-list-tile @click.prevent="settings">
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click.prevent="logout">
        <v-list-tile-title>Log out</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'op-user-menu',
  methods: {
    logout() {
      this.$store.dispatch('session/logout').then(() => {
        this.$router.push({name: 'login'});
      });
    },

    profile() {
    },

    settings() {
    }
  },
  computed: {
    ...mapGetters({
      getAvatarUrl: 'user/getAvatarUrl',
      getDisplayName: 'user/getDisplayName',
      getEmail: 'user/getEmail'
    })
  }
}
</script>

<style lang="stylus" scoped>
</style>
