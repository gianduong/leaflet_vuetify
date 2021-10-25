<template>
  <div class="component chart-list">
    <div class="chart"><AreaExample/></div>
    <div class="chart"><BarExample/></div>
    <div class="chart"><ColumnExample/></div>
    <div class="chart"><ScatterExample/></div>
    <div class="chart"><MixedExample/></div>
    <div class="chart"><DonutExample/></div>
    <div class="chart"><RadialBarExample/></div>
    <div class="chart"><BubbleExample/></div>
    <div class="chart"><HeatmapExample/></div>
    <div class="chart"><LineExample/></div>
  </div>
</template>

<script>
import AreaExample from "../charts/AreaExample";
import BarExample from "../charts/BarExample";
import ColumnExample from "../charts/ColumnExample";
import ScatterExample from "../charts/ScatterExample";
import MixedExample from "../charts/MixedExample";
import DonutExample from "../charts/DonutExample";
import RadialBarExample from "../charts/RadialBarExample";
import BubbleExample from "../charts/BubbleExample";
import HeatmapExample from "../charts/HeatmapExample";
import LineExample from "../charts/LineExample";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  components: {
    AreaExample,
    BarExample,
    ColumnExample,
    ScatterExample,
    MixedExample,
    DonutExample,
    RadialBarExample,
    BubbleExample,
    HeatmapExample,
    LineExample,
  },
  data() {
    return {
      fill: true,
      selectedGradient: gradients[5],
      gradients,
      padding: 8,
      radius: 10,
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      labels: [1, 2, 3, 5, 3, 2, 2, 3, 2, 5, 1, 2, 1, 2, 1],
      width: 2,
      value_2: [423, 446, 675, 510, 590, 610, 760],
      // pie
      title: {
        text: "Gross Profit",
      },
      legend: {
        position: "top",
      },
      tooltip: {
        visible: true,
        format: "${0:N}",
      },
      series: [
        {
          type: "line",
          data: [
            {
              category: "Apple",
              value: 101839000000,
            },
            {
              category: "Amazon",
              value: 65932000000,
            },
            {
              category: "IBM",
              value: 36227000000,
            },
            {
              category: "Microsoft",
              value: 72007000000,
            },
          ],
          labels: {
            visible: true,
            template: "#: category #",
          },
        },
      ],
      seriesAPI: [
        {
          type: "donut",
          field: "marketCap",
          categoryField: "symbol",
          labels: {
            visible: true,
            template: "#: category #",
          },
        },
      ],
      // apex
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      seriesApex: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    updateChart() {
      const max = 90;
      const min = 20;
      const newData = this.seriesApex[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });

      const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        colors: [colors[Math.floor(Math.random() * colors.length)]],
      };
      // In the same way, update the series option
      this.seriesApex = [
        {
          data: newData,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
</style>