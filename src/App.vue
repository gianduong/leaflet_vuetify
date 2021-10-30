<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <Navbar />
    </v-navigation-drawer>
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      v-model="drawer"
      :class="{ hidden: drawer }"
      class="app-bar-show-icon"
    ></v-app-bar-nav-icon>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <Header style="width: 100%; height: 100%" />
      <v-spacer></v-spacer>
      <v-menu
        z-index="1000"
        offset-y
        v-model="dialog"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text class="mt-3" v-bind="attrs" v-on="on">
            <span class="mr-2" v-if="login == false">Login</span>
            <span class="mr-2" v-if="login == true">logout</span>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </template>

        <v-card :class="{'hidden':login}">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>ĐĂNG NHẬP</v-list-item-title>
                <v-list-item-subtitle>Đăng nhập để sử dụng dịch vụ</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-list>
            <v-list-item>
              <v-text-field
                outlined
                label="Tên đăng nhập"
                color="teal"
                clearable
                clear-icon="mdi-close-circle-outline"
                dense
              ></v-text-field>
            </v-list-item>

            <v-list-item>
              <v-text-field
                dense
                outlined
                label="Mật khẩu"
                type="password"
                color="teal"
                clearable
                clear-icon="mdi-close-circle-outline"
              ></v-text-field>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false"> Đóng </v-btn>
            <v-btn color="primary" text @click="login = true,logout = false, dialog = false"> Login </v-btn>
          </v-card-actions>
        </v-card>
        <v-card :class="{'hidden':logout}">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
                <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="login = false,logout = true, dialog = false"> Đăng xuất </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
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
// import Login from "./components/layout/CardLogin.vue";
import "./css/main.css";
export default {
  name: "App",

  components: {
    Navbar,
    Header,
    Content,
    // Login,
  },

  data: () => ({
    drawer: true,
    group: null,
    dialog: false,login:false,logout:true
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
.app-bar-show-icon {
  position: absolute !important;
  z-index: 1000;
}
</style>