<template>
  <div class="red">
    <v-card class="mx-auto">
      <v-sheet class="pa-4 teal">
        <v-text-field
          v-model="search"
          label="Nhập nội dung tìm kiếm"
          append-icon="mdi-filter-outline"
          flat
          rounded
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
          color="teal"
          dark
        ></v-text-field>
      </v-sheet>
      <v-card-text >
        <v-treeview
          :items="items"
          :search="search"
          :filter="filter"
          :open.sync="open"
          selectable
          transition
          selected-color="teal"
          open-on-click
          multiple-active
        >
        </v-treeview>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props:{
      items:{
          type:Array, default:null,
      }
  } , 
  data() {
    return {
      open: [1, 2],
      search: null,
      caseSensitive: false,
    };
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
  },
};
</script>
<style lang="scss">
</style>