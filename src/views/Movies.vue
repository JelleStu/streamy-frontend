<template>
  <div>
    <nav-bar />
    <div style="margin: 0 auto">
      <h1 style="font-weight: 400; size: 3rem; text-align: center">Movies</h1>
    </div>
    <div>
      <v-alert class="errorlabelSubsription" dense type="error" :value="alert">
        <h3 class="text-h5" style="text-align: center">
          You are not subscribed to our service.
        </h3>
      </v-alert>
    </div>
    <div class="movies">
      <div v-for="movie in movies" :key="movie.id" class="movie">
        <movie-card
          :MovieID="movie.id"
          :Title="movie.title"
          :videoLink="movie.videoLink"
          :Thumbnail="movie.thumbnail"
        ></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard";
import NavBar from "@/components/NavBar";
import MovieService from "@/services/movie.service";
export default {
  name: "Movies",
  components: { NavBar, MovieCard },
  data: () => ({
    alert: !alert,
    movies: [],
  }),
  mounted() {
    MovieService.getAllMovies().then((result) => (this.movies = result));
    console.log(this.movies);
  },
};
</script>

<style scoped>
.movies {
  display: grid;
  grid-template-columns: auto auto auto auto;
  align-items: center;
  justify-content: center;
  column-gap: 5rem;
}
.errorlabelSubsription {
  background-color: red;
}
</style>
