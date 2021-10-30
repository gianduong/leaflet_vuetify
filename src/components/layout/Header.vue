<template>
  <div class="content-header">
    <div class="title">Bản đồ nông nghiệp</div>
    <div class="support">
      <div class="input-search">
        <v-tooltip v-model="show" top>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-bind="attrs"
              v-on="on"
              dense
              append-icon="mdi-magnify"
              color="teal"
              placeholder="Nhập từ khóa tim kiếm"
              solo
            ></v-text-field>
          </template>
          <span>Chức năng này đang tạm dừng để tối ưu</span>
        </v-tooltip>
      </div>

      <div class="icon-list">
        <v-tooltip bottom z-index="100">
          <template v-slot:activator="{ on, attrs }"
            ><v-btn icon v-bind="attrs" v-on="on"
              ><v-icon class="icon"> mdi-cog-outline </v-icon></v-btn
            >
          </template>
          <span>Cài đặt</span>
        </v-tooltip>
        <v-tooltip bottom z-index="100">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-badge
                color="green"
                class="icon"
                content="0"
                offset-x="10"
                offset-y="10"
                left
                bottom
                ><v-icon> mdi-bell-outline </v-icon>
              </v-badge>
            </v-btn>
          </template>
          <span>Thông báo</span>
        </v-tooltip>
        <v-tooltip bottom z-index="100">
          <template v-slot:activator="{ on, attrs }"
            ><v-btn icon v-bind="attrs" v-on="on"
              ><v-icon class="icon"> mdi-email </v-icon></v-btn
            >
          </template>
          <span>Tin nhắn</span>
        </v-tooltip>
        <v-tooltip bottom z-index="100">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-badge
                color="green"
                class="icon"
                content="0"
                offset-x="10"
                offset-y="10"
                left
                bottom 
                ><v-icon> mdi-message-reply-text-outline </v-icon>
              </v-badge>
            </v-btn>
          </template>
          <span>Thông báo</span>
        </v-tooltip>
        <v-tooltip bottom z-index="100">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon class="icon"> mdi-help-circle-outline </v-icon>
            </v-btn>
          </template>
          <span>Trợ giúp</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      show: false,
    };
  },
};
</script>
<style lang="scss" scope>
.content-header {
  display: flex;
  height: 64px;
  margin-top: 4px;
  justify-content: space-between;
  .support {
    display: flex;
    .icon-list {
 
      .icon {
        margin: 0 5px;
      }
    }
  }
}
.title {
  font-size: xx-large;
}
.input-search {
  margin-top: 5px;
  margin-right: 20px;
}
</style>