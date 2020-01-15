<template>
  <div id="progress">
    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "OidcCallback",
  methods: {
    ...mapActions("oidcStore", ["oidcSignInCallback"])
  },
  created() {
    this.oidcSignInCallback()
      .then(() => this.$router.push("/"))
      .catch(err => {
        console.log("Error on auth callback", err);
        this.$router.push("/oidc/error");
      });
  }
};
</script>

<style lang="stylus" scoped>
#progress
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
</style>
