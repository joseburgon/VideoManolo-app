<template>
  <div>
    <the-header />

    <div class="container mx-auto px-4 pt-16">
      <div class="popular-movies">
        <h2
          class="uppercase tracking-wider text-orange-500 text-lg font-semibold"
        >
          Películas Mejor Punteadas
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          <movie-card
            :key="movie.data.movie_id"
            :movie="movie"
            v-for="movie in movies.data"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import Movies from "../apis/Movies";
import { mapState } from "vuex";
import TheHeader from "../components/TheHeader";
import MovieCard from "../components/MovieCard";

export default {
  name: "Home",

  components: { MovieCard, TheHeader },

  data: () => {
    return {
      movies: ""
    };
  },

  created() {
    Movies.getAll()
      .then(res => {
        this.movies = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },

  mounted() {
    User.auth().then(response => {
      this.$store.commit("AUTH_USER", response.data);
    });
  }
};
</script>

<style></style>
