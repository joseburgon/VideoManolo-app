<template>
  <main class="font-sans bg-gray-900 text-white py-4">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "App",

  mounted() {
    this.$store.commit("LOGIN", !!localStorage.getItem("token"));
  }
};
</script>

<style></style>
