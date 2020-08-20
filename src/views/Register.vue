<template>
  <div class="container max-w-full mx-auto md:py-10 px-6">
    <div class="max-w-sm mx-auto">
      <div class="relative flex flex-wrap">
        <div class="w-full relative">
          <div class="md:mt-6">
            <div class="text-center font-semibold text-3xl">VideoManolo</div>
            <div class="text-center font-base">¡Bienvenido a bordo!</div>
            <form class="mt-8">
              <div class="mx-auto max-w-lg">
                <div class="py-1">
                  <span class="px-1 text-sm">Nombre</span>
                  <input
                    class="text-md block px-3 py-2 rounded-lg w-full text-gray-900 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    placeholder
                    type="text"
                    v-model="form.name"
                  />
                  <span
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                    v-if="errors.name"
                    >{{ errors.name[0] }}</span
                  >
                </div>
                <div class="py-1">
                  <span class="px-1 text-sm">Email</span>
                  <input
                    class="text-md block px-3 py-2 rounded-lg w-full text-gray-900 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    placeholder
                    type="email"
                    v-model="form.email"
                  />
                  <span
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                    v-if="errors.email"
                    >{{ errors.email[0] }}</span
                  >
                </div>
                <div class="flex py-1">
                  <div class="mr-2">
                    <span class="px-1 text-sm">Identificación</span>
                    <input
                      class="text-md block px-3 py-2 rounded-lg w-full text-gray-900 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      placeholder
                      type="text"
                      v-model="form.identification"
                    />
                    <span
                      class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                      v-if="errors.identification"
                      >{{ errors.identification[0] }}</span
                    >
                  </div>
                  <div class="ml-2">
                    <span class="px-1 text-sm">Celular</span>
                    <input
                      class="text-md block px-3 py-2 rounded-lg w-full text-gray-900 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      placeholder
                      type="number"
                      v-model="form.phone"
                    />
                    <span
                      class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                      v-if="errors.phone"
                      >{{ errors.phone[0] }}</span
                    >
                  </div>
                </div>
                <div class="py-1">
                  <span class="px-1 text-sm">Dirección</span>
                  <input
                    class="text-md block px-3 py-2 rounded-lg w-full text-gray-900 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    placeholder
                    type="text"
                    v-model="form.address"
                  />
                  <span
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                    v-if="errors.address"
                    >{{ errors.address[0] }}</span
                  >
                </div>
                <div class="py-1">
                  <span class="px-1 text-sm">Contraseña</span>
                  <input
                    class="text-md block px-3 py-2 rounded-lg w-full text-gray-900 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    placeholder
                    type="password"
                    v-model="form.password"
                  />
                  <span
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                    v-if="errors.password"
                    >{{ errors.password[0] }}</span
                  >
                </div>
                <div class="py-1">
                  <span class="px-1 text-sm">Confirmar Contraseña</span>
                  <input
                    class="text-md block px-3 py-2 rounded-lg w-full text-gray-900 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    placeholder
                    type="password"
                    v-model="form.password_confirmation"
                  />
                  <span
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                    v-if="errors.password_confirmation"
                    >{{ errors.password_confirmation[0] }}</span
                  >
                </div>
                <button
                  @click.prevent="register"
                  class="mt-3 text-lg bg-orange-500 text-gray-900 rounded font-semibold w-full text-white px-6 py-3 block shadow-xl hover:bg-orange-600"
                >
                  Registrarme
                </button>
              </div>
            </form>

            <div class="text-sm font-semibold block py-6 flex justify-center">
              <router-link :to="{ name: 'login' }">
                <a
                  class="font-normal border-b-2 border-gray-200 hover:border-teal-500"
                  href="#"
                >
                  ¿Ya eres miembro?
                  <span class="font-semibold">Login</span>
                </a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        identification: "",
        phone: "",
        address: "",
        password: "",
        password_confirmation: ""
      },
      errors: []
    };
  },

  methods: {
    register() {
      User.register(this.form)
        .then(() => {
          this.$router.push({
            name: "login",
            query: { email: this.form.email }
          });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>
