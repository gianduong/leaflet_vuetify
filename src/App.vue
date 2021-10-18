<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <Navbar/>
    </v-navigation-drawer>

    <v-app-bar app src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <Header/>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <Content />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar.vue";
import Header from "./components/layout/Header.vue";
import Content from "./components/layout/Content.vue";
import "./css/main.css";
export default {
  name: "App",

  components: {
    Navbar,
    Header,
    Content,
  },

  data: () => ({
    drawer: true,
    group: null,
    
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style lang="scss">
@import "./css/style.scss";
.hidden{
  display: hidden !important;
}
</style>