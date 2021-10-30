<template>
  <div>
    <v-autocomplete
      style="height:30px"
      v-model="friends"
      :items="people"
      chips
      color="blue-grey lighten-2"
      label="Chọn lớp dữ liệu"
      item-text="name"
      item-value="name"
      multiple
      outlined
      no-data-text="Không có dữ liệu"
      full-width
    >
      <template v-slot:selection="data" class="select-data">
        <div>
          <v-chip 
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          <v-icon left>
            {{ data.item.avatar }}
          </v-icon>
          {{ data.item.name }}
        </v-chip>
        </div>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-avatar>
            <v-icon left>
              {{ data.item.avatar }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="data.item.group"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
export default {
    props:{
        people:{
            type:Array,
            default: null,
        },
        friends:{
            type:Array,
            default:null,
        }
    },
    methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
  },

}
</script>
<style lang="scss" scoped>
.select-data{
  //overflow: scroll;
}

</style>
