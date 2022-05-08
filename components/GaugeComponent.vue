<template>
  <div class="d-flex justify-center">
    <v-card :style="{ width: dynamicSize + 'px' }" elevation="0">
      <JSCharting
        :options="applyGaugeOptions"
        class="columnChart"
        :style="{ height: dynamicHeight + 'px' }"
      ></JSCharting>
    </v-card>
  </div>
</template>

<script>
import JSCharting from "jscharting-vue";

export default {
  name: "GaugeComponent",
  props: ["score", "size"],
  components: {
    JSCharting,
  },
  data() {
    return {
      dynamicSize: this.size == "small" ? "160" : "250",
      dynamicHeight: this.size == "small" ? "180" : "300",
      gaugeOptions: {
        debug: false,
        type: "gauge ",
        legend_visible: false,
        chartArea_boxVisible: false,
        xAxis: {
          scale: { range: [0, 1], invert: true },
        },
        palette: {
          pointValue: "%yValue",
          ranges: [],
        },
        yAxis: {
          defaultTick: { padding: 13, enabled: false },
          customTicks: [
            {
              label_text: "",
              value: 0,
            },
            {
              label_text: "",
              value: 56,
            },
            {
              label_text: "",
              value: 80,
            },
            {
              label_text: "",
              value: 100,
            },
          ],
          line: {
            width: 8,
            breaks_gap: 0.03,
            color: "smartPalette",
          },
          scale: { range: [0, 100] },
        },
        defaultSeries: {
          opacity: 1,
          shape: {
            label: { align: "center", verticalAlign: "middle" },
          },
        },
        series: [
          {
            type: "marker",
            name: "Score",
            shape_label: {
              text: "",
              style: { fontSize: 12 },
            },
            defaultPoint: {
              tooltip: "%yValue",
              marker: {
                outline: { width: 9, color: "currentColor" },
                fill: "white",
                type: "circle",
                visible: true,
                size: 25,
              },
            },
            points: [], //determined from score prop
          },
        ],
      },
    };
  },
  methods: {},
  computed: {
    applyGaugeOptions() {
      let dynamicOptions = Object.assign({}, this.gaugeOptions);
      var stringRange = [];
      var numberElementValue = Number(this.score);

      var firstRange,
        LastRange,
        defaultPointColor,
        riskLevel = null;

      //adjust plot values to compenstate for bleed, which is more apparent on small gauges...this is dumb but it works
      if (numberElementValue < 56) {
        //bleed correction
        if (numberElementValue < 4) {
          firstRange = { value: [0, numberElementValue - 3], color: "#FF0000" };
          LastRange = {
            value: [numberElementValue - 1, 100],
            color: "#D3D3D3",
          };
        } else if (numberElementValue > 3 && numberElementValue < 7) {
          firstRange = {
            value: [0, numberElementValue - 16],
            color: "#FF0000",
          };
          LastRange = {
            value: [numberElementValue - 10, 100],
            color: "#D3D3D3",
          };
        } else if (numberElementValue > 6 && numberElementValue < 12) {
          firstRange = { value: [0, numberElementValue - 8], color: "#FF0000" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else if (numberElementValue > 11 && numberElementValue < 16) {
          firstRange = { value: [0, numberElementValue - 2], color: "#FF0000" };
          LastRange = {
            value: [numberElementValue + 1, 100],
            color: "#D3D3D3",
          };
        } else if (numberElementValue > 15 && numberElementValue < 18) {
          firstRange = { value: [0, numberElementValue + 1], color: "#FF0000" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else if (numberElementValue == 18) {
          firstRange = { value: [0, numberElementValue - 1], color: "#FF0000" };
          LastRange = {
            value: [numberElementValue + 1, 100],
            color: "#D3D3D3",
          };
        } else if (numberElementValue > 18 && numberElementValue < 26) {
          firstRange = { value: [0, numberElementValue - 6], color: "#FF0000" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else if (numberElementValue > 31 && numberElementValue < 40) {
          firstRange = { value: [0, numberElementValue - 6], color: "#FF0000" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else if (numberElementValue > 39 && numberElementValue < 43) {
          firstRange = { value: [0, numberElementValue - 8], color: "#FF0000" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else if (numberElementValue > 42 && numberElementValue < 46) {
          firstRange = { value: [0, numberElementValue - 9], color: "#FF0000" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else {
          firstRange = { value: [0, numberElementValue], color: "#FF0000" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        }

        defaultPointColor = "#FF0000";
        riskLevel = "Poor";
        stringRange.push(firstRange);
        stringRange.push(LastRange);
      } else if (numberElementValue > 80) {
        //bleed correction
        if (numberElementValue > 95) {
          firstRange = { value: [0, numberElementValue + 1], color: "#0CBD01" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else {
          firstRange = { value: [0, numberElementValue - 7], color: "#0CBD01" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        }

        riskLevel = "Good";
        defaultPointColor = "#0CBD01";
        stringRange.push(firstRange);
        stringRange.push(LastRange);
      } else {
        //bleed correction
        if (numberElementValue > 57 && numberElementValue < 65) {
          firstRange = { value: [0, numberElementValue - 6], color: "#FFDE28" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else if (numberElementValue > 71 && numberElementValue < 75) {
          firstRange = { value: [0, numberElementValue + 1], color: "#FFDE28" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        } else {
          firstRange = { value: [0, numberElementValue - 1], color: "#FFDE28" };
          LastRange = { value: [numberElementValue, 100], color: "#D3D3D3" };
        }

        riskLevel = "Fair";
        defaultPointColor = "#FFDE28";
        stringRange.push(firstRange);
        stringRange.push(LastRange);
      }

      dynamicOptions.palette.ranges = stringRange;

      //set score point off prop input
      dynamicOptions.series[0].points = [[1, numberElementValue]];
      //set actual score text and format for each possible size
      if (this.size == "small") {
        //adjust line and score marker widths for smaller gauge
        dynamicOptions.yAxis.line.width = 6;
        dynamicOptions.series[0].defaultPoint.marker.size = 14;
        dynamicOptions.series[0].defaultPoint.marker.outline.width = 5;

        //adjust for small gauge size
        dynamicOptions.series[0].shape_label.text =
          "<br/><br/><br/><span style='fontSize: 50;fontFamily: sans-serif; color: #000000;'>" +
          numberElementValue +
          "</span><span style='fontSize: 12; fontFamily: sans-serif; color: #BFBFBF;'>/100</span><br/><br/><span style='fontSize: 12; fontFamily: sans-serif;'>" +
          riskLevel +
          "</span>";
      } else {
        //large
        dynamicOptions.series[0].shape_label.text =
          "<br/><br/><br/><br/><span style='fontSize: 87;fontFamily: sans-serif; color: #000000;'>" +
          numberElementValue +
          "</span><span style='fontSize: 22; fontFamily: sans-serif; color: #BFBFBF;'>/100</span><br/><br/><br/><span style='fontSize: 22; fontFamily: sans-serif;'>" +
          riskLevel +
          "</span>";
      }

      dynamicOptions.series[0].defaultPoint.marker.outline.color =
        defaultPointColor;

      return dynamicOptions;
    },
  },
};
</script>

<style>
.columnChart {
  height: 300px;
}
</style>