<template>
  <v-menu class="user-menu" bottom left offset-y>
    <v-avatar size="32px" slot="activator">
      <img v-if="getAvatarUrl" :src="getAvatarUrl" />
      <v-icon v-else>account_circle</v-icon>
    </v-avatar>
    <v-list class="user-menu-items">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="title">{{ getDisplayName }}</v-list-tile-title>
          <v-list-tile-sub-title class="sub-title">{{ getEmail }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
      <v-list-tile class="logout" @click.prevent="logout">
        <v-list-tile-title>{{ $t("Logout") }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "op-user-menu",
  methods: {
    logout() {
      this.$store.dispatch("session/logout").then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  },
  computed: {
    ...mapGetters({
      getAvatarUrl: "user/getAvatarUrl",
      getDisplayName: "user/getDisplayName",
      getEmail: "user/getEmail"
    })
  }
};
</script>

<style lang="stylus" scoped></style>
