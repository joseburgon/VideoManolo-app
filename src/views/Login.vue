<template>
    <div
        class="container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg my-16 shadow overflow-hidden"
    >
        <div class="relative hidden xl:block xl:w-1/2 h-full">
            <img
                class="absolute h-auto w-full object-cover"
                :src="'/img/img_login.jpg'"
                alt="my zomato"
            />
        </div>
        <div class="w-full xl:w-1/2 p-8">
            <form method="post" action="#" @submit="login">
                <h1 class="text-gray-900 text-2xl font-bold">
                    Iniciar sesión en su cuenta
                </h1>
                <div>
                    <span class="text-gray-600 text-sm">
                        ¿No tienes una cuenta?
                    </span>

                    <router-link :to="{ name: 'register' }">
                        <span class="text-gray-700 text-sm font-semibold">Regístrate</span>
                    </router-link>
                </div>
                <div class="mb-4 mt-6">
                    <label
                        class="block text-gray-700 text-sm font-semibold mb-2"
                        for="email"
                    >
                        Email
                    </label>
                    <input
                        class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                        id="email"
                        type="text"
                        placeholder="Tu correo"
                        v-model="form.email"
                    />
                    <span
                        class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                        v-if="errors.email"
                    >
                        Email inválido!
                    </span>
                </div>
                <div class="mb-6 mt-6">
                    <label
                        class="block text-gray-700 text-sm font-semibold mb-2"
                        for="password"
                    >
                        Contraseña
                    </label>
                    <input
                        class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                        id="password"
                        type="password"
                        placeholder="Tu contraseña"
                        v-model="form.password"
                    />
                    <span
                        class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                        v-if="errors.password"
                    >
                        Password inválido!
                    </span>
                </div>
                <div class="flex w-full mt-8">
                    <button
                        class="w-full bg-orange-500 text-gray-900 hover:bg-orange-600 text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                        type="submit"
                        @click.prevent="login"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import User from "../apis/User";

export default {
    data() {
        return {
            form: {
                email: this.$route.query.email ?? "",
                password: "",
            },
            errors: [],
        };
    },

    methods: {
        login() {
            User.login(this.form)
                .then((response) => {
                    this.$store.commit("LOGIN", true);
                    localStorage.setItem("token", response.data);
                    this.$router.push({ name: "home" });
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },
    },
};
</script>

<style></style>
