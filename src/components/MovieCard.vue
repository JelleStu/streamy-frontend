<template>
  <v-card
    v-bind:class="movie.id"
    max-width="300px"
    max-height="150px"
    class="moviecard d-flex justify-center mb-6"
    @click="playVideo"
  >
    <v-img
      v-bind:src="movie.thumbnail"
      v-bind:lazy-src="movie.thumbnail"
      alt="Blob storage account is expired"
      max-height="100px"
    >
    </v-img>
    <v-list-item two-line>
      <v-list-item-title>
        <div class="movieTitle">
          <h2>{{ movie.title }}</h2>
        </div>
      </v-list-item-title>
    </v-list-item>
  </v-card>
</template>

<script>
import router from "@/router";
export default {
  name: "MovieCard",
  props: {
    MovieID: String,
    Title: String,
    Thumbnail: String,
    Videolink: String,
  },
  data() {
    return {
      movie: {
        id: this.MovieID,
        title: this.Title,
        thumbnail: this.Thumbnail,
        videoLink: this.VideoLink,
      },
    };
  },
  methods: {
    playVideo() {
      router.push({ name: 'Videoplayer', params: { videoid: this.MovieID } })
      console.log(this.movie.id);
    },
  },
};
</script>

<style scoped>
.moviecard {
  margin-bottom: 3rem;
}
.moviecard:hover {
  transform: scale(1.2);
  box-shadow: rgb(100 100 111 / 77%) 0px 7px 29px 0px;
}
</style>
