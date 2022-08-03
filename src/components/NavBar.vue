<template>
  <nav>
    <div>
      <v-app-bar>
        <v-toolbar-title>Streamy</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text class="grey" v-on:click="goToMovies">
          <span>Movies</span>
          <v-icon>mdi-video-vintage</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text class="grey" v-on:click="goToProfile">
          <span>Profile</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text class="grey" v-on:click="logout">
          <span>Sign out</span>
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
  </nav>
</template>

<script>
import authService from "@/services/auth.service";
export default {
  name: "NavBar",
  methods: {
    logout() {
      authService.logout();
      this.$router.push("/").catch(() => {});
    },
    goToProfile() {
      this.$router.push({ name: "Profile" }).catch(() => {});
    },
    goToMovies() {
      this.$router.push({ name: "Movies" }).catch(() => {});
    },
  },
};
</script>

<style scoped></style>
