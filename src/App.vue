<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    document.title = "安行指南";
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  padding: 0;
  margin: 0;
}
</style>
