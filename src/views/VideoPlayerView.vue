<template>
  <div>
    <nav-bar />
    <v-container>
      <v-row justify="center">
        <v-col md="12" lg="12">
          <video controls v-bind:src="this.videoUrl">
            Your browser does not support the video tag.
          </video>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MovieService from "@/services/movie.service";
import NavBar from "@/components/NavBar";
export default {
  name: "VideoPlayerView",
  components: {
    NavBar,
  },
  data() {
    return {
      videoUrl: "",
    };
  },
  methods: {
    changeVideoPlaying(url) {
      this.videoURL = url;
    },
  },
  beforeCreate() {
    MovieService.getMovieById(this.$route.params.videoid).then(
      (result) => (this.videoUrl = result.videoLink)
    );
  },
};
</script>

<style scoped></style>
