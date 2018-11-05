<template>
    <v-menu
            :close-on-content-click="true"
            :nudge-width="200"
            bottom
            offset-y
    >
        <v-btn icon slot="activator" color="primary">
            <v-icon>apps</v-icon>
        </v-btn>

        <v-card>
            <v-container grid-list-xl fluid>
                <v-layout row wrap>
                    <v-flex xs4 d-flex>
                        <router-link :to="{ name: 'Home' }">
                            <v-icon large color="blue">home</v-icon>
                        </router-link>
                    </v-flex>
                    <v-flex xs4 d-flex>
                        <router-link :to="{ name: 'VideoConference' }">
                            <v-icon large color="blue">video_call</v-icon>
                        </router-link>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-menu>
</template>


<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
