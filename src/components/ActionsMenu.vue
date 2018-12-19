<template>
  <v-menu v-if="showMenu" class="conference-options-menu" :nudge-width="100" bottom offset-y>
    <v-btn icon slot="activator" color="primary">
        <v-icon medium>more_vert</v-icon>
    </v-btn>
    <v-list>
        <v-list-tile>
          <v-list-tile-title>
            <op-share-action v-if="conferenceName"></op-share-action>
          </v-list-tile-title>
        </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import ShareAction from "@/components/ShareAction.vue";

export default {
  name: "ActionsMenu",
  components: {
    "op-share-action": ShareAction
  },
  computed: {
    conferenceName() {
      return this.$route.params.conferenceName;
    },
    showMenu() {
      return this.conferenceName; // Add other menu conditions here
    }
  }
};
</script>

<style scoped>
</style>
