<template>
  <div id="logout">
    <h3 class="subheading mb-0 grey--text text--darken-2 mb-2">
      <span>{{ $t("Disconnecting") }}</span>
    </h3>
    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      return this.$store.dispatch("session/logout");
    }
  },
  created() {
    this.logout()
      .then(() => {
        console.log("Logged out");
        this.$router.push("/login");
      })
      .catch(err => {
        console.log("Error on logout callback", err);
        this.$router.push("/oidc/error");
      });
  }
};
</script>

<style lang="stylus" scoped>
#logout
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
</style>
