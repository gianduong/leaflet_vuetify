<template>
  <div>
    <div class="header">
      <div class="search">
        <div class="auc--search-type">
          <v-autocomplete
            v-model="friends"
            :items="people"
            chips
            color="blue-grey lighten-2"
            label="Chọn lớp dữ liệu"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
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
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.group"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
          <v-text-field label="Tên hoặc vị trí"></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listType: ["foo", "bar", "fizz", "buzz"],
      listTypeValues: ["foo", "bar"],
      value: null,
      name: "Midnight Crew",
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: "mdi-chart-arc" },
        { name: "Ali Connors", group: "Group 1", avatar: "mdi-chart-arc" },
        { name: "Trevor Hansen", group: "Group 1", avatar: "mdi-chart-arc" },
        { name: "Tucker Smith", group: "Group 1", avatar: "mdi-chart-arc" },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2", avatar: "mdi-chart-arc" },
        { name: "Jane Smith ", group: "Group 2", avatar: "mdi-chart-arc" },
        { name: "John Smith", group: "Group 2", avatar: "mdi-chart-arc" },
        { name: "Sandra Williams", group: "Group 2", avatar: "mdi-chart-arc" },
      ],
      title: "The summer breeze",
    };
  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  display: flex;
}
</style>
