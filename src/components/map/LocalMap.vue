<template>
  <div>
    <v-card elevation="5" class="header">
      <div class="search">
        <div class="auc--search-type">
          <v-autocomplete
            v-model="listTypeValues"
            :items="listType"
            item-text="name"
            item-value="name"
            dense
            chips
            small-chips
            label="Chọn lớp dữ liệu"
            multiple
            solo
            deletable-chips
            clearable
            color="teal"
            clear-icon="mdi-close-circle-outline"
            style="z-index: 1000"
          ></v-autocomplete>
        </div>
        <v-text-field
          style="max-width: 230px"
          color="teal"
          full-width
          solo
          dense
          append-icon="mdi-map-marker"
          label="Tên hoặc vị trí"
          @input="value = 2"
        ></v-text-field>
      </div>
    </v-card>
    <div class="main-content">
      <div class="navbar-map">
        <v-bottom-navigation :background-color="color" dark shift grow>
          <v-btn @click="value = 1" :to="'/statistic/DataHeader'">
            <span>Lớp dữ liệu</span>

            <v-icon>mdi-database-marker</v-icon>
          </v-btn>

          <v-btn @click="value = 2" to="/statistic/SearchList">
            <span>Tim kiếm</span>

            <v-icon>mdi-map-search</v-icon>
          </v-btn>

          <!-- <v-btn @click="value = 3" to="/statistic/InfoDetail">
            <span>Chi tiết</span>

            <v-icon>mdi-axis-arrow-info</v-icon>
          </v-btn> -->
        </v-bottom-navigation>
        <div class="info-detail">
          <div v-if="value == 1"><DataHeader :items="listDataheader" /></div>
          <div v-else-if="value == 2"><SearchList /></div>
          <div v-else><InfoDetail /></div>
        </div>
      </div>
      <v-card elevation="5" class="detail-map" width="100%" height="100%"
        ><MapDetail
      /></v-card>
    </div>
  </div>
</template>
<script>
/** navbar */
import DataHeader from "./navbar-map/DataHeader.vue";
import InfoDetail from "./navbar-map/InfoDetail.vue";
import SearchList from "./navbar-map/SearchList.vue";
/** map */
import MapDetail from "./MapDetail.vue";

export default {
  components: {
    SearchList,
    InfoDetail,
    DataHeader,
    MapDetail,
  },
  data() {
    return {
      value: 1,
      isLogin: false,
      listTypeValues: [],
      listType: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1" },
        { name: "Ali Connors", group: "Group 1" },
        { name: "Trevor Hansen", group: "Group 1" },
        { name: "Tucker Smith", group: "Group 1" },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2" },
        { name: "Jane Smith ", group: "Group 2" },
        { name: "John Smith", group: "Group 2" },
        { name: "Sandra Williams", group: "Group 2" },
      ],
      title: "The summer breeze",
      listDataheader: [
        {
          id: 1,
          name: "Applications :",
          children: [
            { id: 2, name: "Calendar : app" },
            { id: 3, name: "Chrome : app" },
            { id: 4, name: "Webstorm : app" },
          ],
        },
        {
          id: 5,
          name: "Documents :",
          children: [
            {
              id: 6,
              name: "vuetify :",
              children: [
                {
                  id: 7,
                  name: "src :",
                  children: [
                    { id: 8, name: "index : ts" },
                    { id: 9, name: "bootstrap : ts" },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: "material2 :",
              children: [
                {
                  id: 11,
                  name: "src :",
                  children: [
                    { id: 12, name: "v-btn : ts" },
                    { id: 13, name: "v-card : ts" },
                    { id: 14, name: "v-window : ts" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: "Downloads :",
          children: [
            { id: 16, name: "October : pdf" },
            { id: 17, name: "November : pdf" },
            { id: 18, name: "Tutorial : html" },
          ],
        },
        {
          id: 19,
          name: "Videos :",
          children: [
            {
              id: 20,
              name: "Tutorials :",
              children: [
                { id: 21, name: "Basic layouts : mp4" },
                { id: 22, name: "Advanced techniques : mp4" },
                { id: 23, name: "All about app : dir" },
              ],
            },
            { id: 24, name: "Intro : mov" },
            { id: 25, name: "Conference introduction : avi" },
          ],
        },
      ],
    };
  },
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@mixin wh($w, $h) {
  width: $w;
  height: $h;
}
@mixin flex-center {
  display: flex;
}
.search {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 10px;
  right: 10%;

  .auc--search-type {
    width: 50%;
    margin-right: 15px;
  }
}
/* main */
.main-content {
  @include flex-center();
  @include wh(100%, 100%);
  .navbar-map {
    @include wh(30%, 100%);
    margin-right: 1%;
    .info-detail {
      @include wh(100%, 440px);
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 0;
        background-color: #f5f5f5;
      }
    }
  }
  .detail-map {
    width: 59%;
    height: 100%;
  }
}
</style>
