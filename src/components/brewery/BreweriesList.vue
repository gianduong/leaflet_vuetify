<template>
  <div class="card">
    <v-list class="list-group list-group-flush brew-list" dense>
      <v-subheader
        >Danh sách các cửa hàng(Tên thành phố + tên cửa hàng)</v-subheader
      >
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="(brew, index) in brewList"
          :key="index"
          @mouseover="mouseOver(index)"
          @mouseleave="mouseLeave(index)"
          class="d-flex justify-space-between"
        >
          <v-list-item-icon>
            <v-icon>mdi-beer</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ brew.state + ": " +  brew.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "BreweriesList",
  props: ["brewList"],
  data() {
    return {
      selectedItem: 1,
    };
  },
  methods: {
    mouseOver: function (index) {
      this.$emit("mouse-over-brew", index);
    },
    mouseLeave: function (index) {
      this.$emit("mouse-left-brew", index);
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 20px;
}
.brew-list {
  overflow-y: scroll;
  height: 80vh;
  li {
    &:hover {
      background-color: darkgrey;
    }
  }
}
</style>
