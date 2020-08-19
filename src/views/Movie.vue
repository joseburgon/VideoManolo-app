<template>
  <div>
    <the-header />
    <div class="movie-info border-b border-gray-800" v-if="movie.data">
      <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
        <div class="flex-none justify-center">
          <img :src="imgUrl" alt="poster" class="w-64 lg:w-96" />
        </div>
        <div class="md:ml-24">
          <h2 class="text-4xl mt-4 md:mt-0 font-semibold">
            {{ movie.data.attributes.title }}
          </h2>
          <div class="flex flex-wrap items-center text-gray-400 text-sm">
            <svg class="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
              <g data-name="Layer 2">
                <path
                  d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                  data-name="star"
                />
              </g>
            </svg>
            <span class="ml-1">{{ movie.data.attributes.vote_average }}</span>
            <span class="mx-2">|</span>
            <span>{{ movie.data.attributes.release_date }}</span>
            <span class="mx-2">|</span>
            <span>{{ genres }}</span>
          </div>

          <p class="text-gray-300 mt-8">{{ movie.data.attributes.overview }}</p>

          <div class="mt-12">
            <h4 class="text-white font-semibold">Featured Crew</h4>
            <div class="flex mt-4">
              <div class="mr-8" v-for="member in crew" :key="member.credit_id">
                <div>{{ member.name }}</div>
                <div class="text-sm text-gray-400">{{ member.job }}</div>
              </div>
            </div>
          </div>

          <div class="mt-12 flex">
            <div
              class="flex inline-flex items-center bg-gray-700 text-white rounded font-semibold px-5 py-4 opacity-50"
            >
              {{ "Stock: " + stock }}
            </div>
            <div class="ml-0 lg:ml-6">
              <span
                class="flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1"
                v-if="stock === 0"
                >La película no cuenta con unidades disponibles. Intente
                nuevamente en unos minutos.</span
              >
            </div>
          </div>
          <div class="reservation-form" v-if="stock > 0 && !reserved">
            <div class="mt-12">
              <label for="return_date">Fecha de retorno:</label>
            </div>
            <div class="mt-2 flex">
              <div>
                <VueTailwindPicker @change="v => (form.return_date = v)">
                  <input
                    type="text"
                    name="return_date"
                    v-model="form.return_date"
                    class="text-black text-center rounded py-2 px-2 mr-6 text-gray-700 bg-gray-200"
                  />
                </VueTailwindPicker>
              </div>
              <button
                class="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-2 hover:bg-orange-600 transition ease-in-out duration-150"
                @click="reserve"
              >
                <svg class="w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  />
                </svg>
                <span class="ml-2">Reservar</span>
              </button>
            </div>
          </div>
          <div class="flex mt-2">
            <span
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              v-if="errors['data.attributes.return_date']"
              >La fecha de retorno debe ser después de hoy</span
            >

            <div
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
              role="alert"
              v-if="reserved"
            >
              <strong class="font-bold">¡Pel&iacute;cula Reservada!</strong>
              <span class="block sm:inline"
                >Debes retornarla antes de {{ form.return_date }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- end movie-info -->

    <div class="movie-cast border-b border-gray-800">
      <div class="container mx-auto px-4 py-16">
        <h2 class="text-4xl font-semibold">Cast</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          <div class="mt-8" v-for="actor in cast" :key="actor.cast_id">
            <img
              :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`"
              alt="actor pic"
              class="hover:opacity-75 transition ease-in-out duration-150"
            />
            <div class="mt-2">
              <div class="text-lg mt-2 hover:text-gray:300">
                {{ actor.name }}
              </div>
              <div class="text-sm text-gray-400">{{ actor.character }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end movie-cast -->
  </div>
</template>

<script>
import Movies from "../apis/Movies";
import Tmdb from "../apis/Tmdb";
import Reservation from "../apis/Reservation";
import TheHeader from "../components/TheHeader";
import VueTailwindPicker from "vue-tailwind-picker";

export default {
  name: "Movie",

  data: () => {
    return {
      movie: {},
      genres: "",
      imgUrl: "https://image.tmdb.org/t/p/w500",
      stock: 0,
      crew: {},
      cast: {},
      reserved: false,
      form: {
        return_date: "",
        movie_id: ""
      },
      errors: []
    };
  },

  components: { TheHeader, VueTailwindPicker },

  methods: {
    reserve() {
      this.errors = [];

      Reservation.store(this.form)
        .then(res => {
          console.log(res.data);
          this.stock--;
          this.reserved = true;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
          console.log(this.errors);
        });
    },

    checkUserHasMovie(movie) {
      Reservation.checkUserHasMovie(movie)
        .then(res => {
          console.log(`User has movie? ${res.data.result}`);
          this.reserved = res.data.result;
          this.form.return_date = res.data.reservation.return_date;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getMovieCast(movie) {
      Tmdb.getMovieCredits(movie)
        .then(res => {
          console.log(res);
          this.crew = res.crew.slice(0, 3);
          this.cast = res.cast.slice(0, 5);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {
    Movies.getOne(this.$route.params.id)
      .then(res => {
        this.movie = res.data;

        this.form.movie_id = this.movie.data.movie_id;
        this.stock += this.movie.data.attributes.stock;
        this.imgUrl += this.movie.data.attributes.poster_path;

        this.movie.data.attributes.genres.forEach(genre => {
          if (this.genres === "") {
            this.genres += genre.name;
          } else {
            this.genres += ", " + genre.name;
          }
        });

        this.checkUserHasMovie(this.movie.data.movie_id);
        this.getMovieCast(this.movie.data.movie_id);
      })
      .catch(error => {
        console.log("Unable to fetch movie.");
        console.log(error);
      });
  }
};
</script>

<style></style>
