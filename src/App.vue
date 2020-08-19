<template>
  <main>
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

<style>
</style>
