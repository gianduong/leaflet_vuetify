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
      <v-list-item-content class="name-project">GISMap</v-list-item-content>
    </v-list-item>
    <v-divider class="divider" dark></v-divider>
    <v-list>
      <v-list-item
        v-for="([icon, text, linkto, item]) in items"
        :key="item"
        link
        :to="linkto"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="([icon, text], i) in items2"
        :key="i"
        link
        :to="'/vd' + i"
      >
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
        ["mdi-google-maps","Bản đồ", "/statistic", "a"],
        ["mdi-beer", "Breweries", "/Breweries","b"],
        ["mdi-chart-areaspline", "Charts","/charts","c"],
      ],
      items2: [
        ["mdi-email", "Ví Dụ 1"],
        ["mdi-account-supervisor-circle", "Ví Dụ 2"],
        ["mdi-clock-start", "Ví Dụ 3"],
        ["mdi-email", "Ví Dụ 4"],
        ["mdi-account-supervisor-circle", "Ví Dụ 5"],
        ["mdi-clock-start", "Ví Dụ 6"],
        ["mdi-email", "Ví Dụ 7"],
        ["mdi-account-supervisor-circle", "Ví Dụ 8"],
        ["mdi-clock-start", "Ví Dụ 9"],
        ["mdi-email", "Ví Dụ 10"],
        ["mdi-account-supervisor-circle", "Ví Dụ 11"],
        ["mdi-clock-start", "Ví Dụ 12"],
        ["mdi-email", "Ví Dụ 13"],
      ],
    };
  },
};
</script>
<style lang="scss" scope>
.logo {
  height: 60px;
}
.name-project {
  text-transform: uppercase;
  font-size: 22px;
  margin-left: 20px;
  color: teal;
  font-weight: 700;
}
.divider {
  margin-top: 5px;
}
</style>