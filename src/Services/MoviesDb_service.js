import axios from "axios";
//τα headers ειναι fixed και εχουν την σχτεικη πληροφορια για το authentication
const headers = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDI2OTE0NzY2ZTgwNjg3OTU0YmM0Y2ZkYjBhYjVkYiIsInN1YiI6IjY0OTFiMjUxYzNjODkxMDBjYWRiZmMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dUEBNWcG4IVjpbnsEV12tzA0hfNbdP4Kp2Yf9ze7gJM",
};

const MoviesService = {
  //το getGenres επιστρεφει ολα τα ειδη ταινιων που υπαρχουν στο DB
  getGenres() {
    return axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?language=el-GR",
      { headers }
    );
  },

  //το getMoviesByGenre επιστρεφει ολες τις ταινιeς που υπαρχουν στο DB με βαση ενα συγκεκριμενο ειδος
  getMoviesByGenre(params) {
    return axios.get("https://api.themoviedb.org/3/discover/movie", {
      headers,
      params,
    });
  },

  //το getMovieById επιστρεφει πληροφοριες για μια ταινια με βαση το ID της, εδω χρησιμοποιησα το append_to_response στο τελος του url για να βαλω μεσα στα params το credits που περιεχει πληροφοριες σχετικα με το cast και τον director
  getMovieById(movieID, params) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
      headers,
      params,
    });
  },
};

export default MoviesService;
