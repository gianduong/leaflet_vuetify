<template>
  <div>
    <div class="component chart-list">
      <div class="chart">
        <AreaExample @handleChangeTypeDate="handleChangeTypeDate" />
      </div>
      <v-date-picker
        :class="{ hidden: typeDate }"
        class="date-time"
        color="green"
        v-model="picker"
      ></v-date-picker>
      <v-date-picker
        :class="{ hidden: !typeDate }"
        class="date-time"
        color="green"
        type="month"
        v-model="picker"
      ></v-date-picker>
    </div>
    <div class="table-title">Thống kê chi tiết</div>
    <div class="table">
      <v-card>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="desserts"
          checkbox-color="green"
          item-key="name"
          show-select
          :search="search"
          no-data-text="Không có dữ liệu!"
          no-results-text="Không có dữ liệu!"
          :footer-props="{
            itemsPerPageText: 'Số dòng trên một trang:',
          }"
        >
          <template v-slot:[`item.calories`]="{ item }">
            <v-chip :color="getColor(item.calories)" dark>
              {{ item.calories }}
            </v-chip>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green" small dark v-bind="attrs" v-on="on">
                    Thêm mới
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Dessert name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.calories"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.fat"
                            label="Fat (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.carbs"
                            label="Carbs (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      dark
                      outlined
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      dark
                      outlined
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-divider class="mx-4" inset vertical></v-divider>

              <div style="width: 300px" class="mr-2">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  placeholder="Nhập từ khóa tìm kiếm"
                  hide-details
                  color="teal"
                ></v-text-field>
              </div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mr-2" small icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                <span>Refresh</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mr-4" small icon v-bind="attrs" v-on="on">
                    <v-icon color="#0F773D">mdi-microsoft-excel</v-icon>
                  </v-btn>
                </template>
                <span>Xuất khẩu file excel</span>
              </v-tooltip>
              <v-dialog v-model="dialogDelete" width="450">
                <v-card>
                  <v-card-title class="base-toast">
                    <div class="toast-content">
                      <div class="logo-danger-2"></div>
                      <span class="ml-3"
                        >Bạn có chắc chắn muốn xóa phần tử này không ?</span
                      >
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      color="blue darken-1"
                      outlined
                      text
                      @click="closeDelete"
                      >Đóng</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-1"
                      outlined
                      text
                      @click="deleteItemConfirm"
                      >Xóa</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import AreaExample from "./AreaExample";
export default {
  components: {
    AreaExample,
  },
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      typeDate: false,
      selected: [],
      search: "",
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      headers: [
        {
          text: "Món tráng Miệng",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Chất béo (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Đạm (g)", value: "protein" },
        { text: "Sắt (%)", value: "iron" },
        { text: "Chức Năng", value: "actions", sortable: false },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    /**
     * Hàm lấy giá trị định dạng ngày, tháng
     * @param type true: tháng, false: ngày
     */
    handleChangeTypeDate(type) {
      this.typeDate = type;
    },
    getColor(calories) {
      if (calories > 400) return "red";
      else if (calories > 200) return "orange";
      else return "green";
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss"></style>
