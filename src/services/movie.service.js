import axios from "axios";

const API_URL = "http://35.195.224.224:8082/movies/movies/";

class MovieService {
  getAllMovies() {
    return axios({
      method: "GET",
      url: API_URL + "allmovies",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      return response.data;
    });
  }
  getMovieById(id) {
    return axios({
      method: "GET",
      url: API_URL + "movie?id=" +id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      return response.data;
    });
  }
}
export default new MovieService();
