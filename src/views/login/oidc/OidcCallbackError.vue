<template>
  <div id="error">
    <v-icon size="70" color="red">error</v-icon>
    <span class="headline grey--text text--darken-1 mt-3">{{$t("There was an error while authenticating")}}</span>
  </div>
</template>

<script>
export default {
  name: "OidcCallbackError"
};
</script>

<style lang="stylus" scoped>
#error
  display: flex
  flex-direction: column
  height: 60vh
  display: flex
  align-items: center
  justify-content: center
</style>
