<template>
  <div class="navbar">
    <v-list-item class="logo background">
      <v-img
        
        lazy-src="https://picsum.photos/id/11/10/6"
        min-height="55"
        height="55px"
        max-width="70"
        src="../../assets/img/logo.png"
      >
      </v-img>
      <v-list-item-content class="name-project"
        >Giản Dương</v-list-item-content
      >
    </v-list-item>
    <v-divider class="divider" dark></v-divider>
    <v-list>
      <v-list-item v-for="([icon, text], i) in items" :key="i" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        ["mdi-email", "Inbox"],
        ["mdi-account-supervisor-circle", "Supervisors"],
        ["mdi-clock-start", "Clock-in"],
      ],
    };
  },
};
</script>
<style lang="scss">
.logo {
  height: 60px;
}
.name-project {
  text-transform: uppercase;
  font-size: 19px;
  margin-left: 10px;
}
.divider {
  margin-top: 5px;
}
</style>