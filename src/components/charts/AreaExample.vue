<template>
  <div>
    <v-autocomplete
      color="teal"
      class="title-date"
      v-model="typeDate"
      :items="items"
      item-text="name"
      item-value="value"
      outlined
      dense
      solo
    ></v-autocomplete>
    <apexchart style="border: 1px solid #ECEFF1;" type="area" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "AreaExample",
  data: function () {
    return {
      typeDate: "day",
      items: [
        { header: "Lựa chọn định dạng thời gian" },
        { name: "Xem theo ngày",value:"day", group: "Group 1" },
        { name: "Xem theo tháng",value:"month", group: "Group 1" },
      ],
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        tooltip: {
          fixed: {
            enabled: false,
            position: "topRight",
          },
        },
      },
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
    };
  },
  watch:{
    typeDate(){
      var type = true;
      if(this.typeDate == "day")
        type = false;
      else
        type = true;
      this.$emit("handleChangeTypeDate",type);  

    }
  }
};
</script>
<style lang="scss" scope>
.v-application .primary--text {
    color: #00d802 !important;
    caret-color: #1cdd2c !important;
}
.title-date {
  font-size: 20px;
  color: #2e4a66;
  margin-bottom: 5px;
  width: 200px;
}
</style>
