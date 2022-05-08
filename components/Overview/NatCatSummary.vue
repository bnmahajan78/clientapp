<template>
  <div>
    <v-card tile class="summary-content-card mb-5 px-7" flat>
      <div class="summary-card mb-0 px-5 pt-5">
        <v-row align="center" class="mb-0">
          <gauge-component :size="'small'" :score="score"></gauge-component>
          <span>{{ displayName }}</span>
          <span class="assessment-detail-score"
            >{{ reportData.assessmentScore }}/100</span
          >
          <span class="info-align">
            <v-tooltip top max-width="325px">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="#005dff" style="vertical-align:-2px" dense v-bind="attrs" v-on="on"
                  >mdi-information-outline</v-icon
                >
              </template>
              <span>{{ tooltipText }}</span>
            </v-tooltip>
          </span>
        </v-row>
      </div>
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="6" class="pl-10 pr-5 mt-5">
              <v-row class="card-sub-headings mx-0 my-5">
                Risk Factors Identified
              </v-row>

              <v-divider></v-divider>

              <v-row class="mt-8">
                <v-col
                  cols="6"
                  v-for="summary in reportData.reportScoreDetails"
                  :key="summary.reportName"
                >
                  <v-btn
                    class="display-buttons"
                    width="213px"
                    height="45px"
                    color="#ffffff"
                    depressed
                  >
                    <v-row>
                      <v-col cols="4"
                        ><v-icon :color="getColor(summary)"
                          >mdi-alert-circle</v-icon
                        ></v-col
                      >
                      <v-col cols="8" class="button-name"
                        ><span class="button-text">{{
                          summary.displayName
                        }}</span></v-col
                      >
                    </v-row>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" height="100%">
              <div class="map-panel">
                <!-- temp quick fix: using lc360 account creds -->
                <bing-map
                  credentials="ApQVWLskm-d6dSggIGjP-o6VjloaNJLb7NXjkRtoJJHFbxpDoUjaqIzg9E6a_9Ak"
                  :options="mapOptions"
                >
                  <bing-map-layer name="natCatMap">
                    <bing-map-pushpin
                      v-for="item in pins"
                      :key="item.key"
                      :location="getLocation"
                      :options="item.options"
                    >
                    </bing-map-pushpin>
                  </bing-map-layer>
                </bing-map>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
// import InfoIcon from "../SVGs/InfoIcon.vue";
import GaugeComponent from "../GaugeComponent.vue";

export default {
  name: "NatCatSummary",
  props: {
    assessmentData: {
      type: Object,
      default: () => ({}),
    },
    score: {
      type: Number,
      default: () => 0,
    },
    reportData: {},
    displayComp: String,
    displayName: String,
    lat: Number,
    long: Number,
  },
  components: { GaugeComponent },
  data() {
    return {
      pinLocation: { latitude: 40, longitude: -70 },
      pins: [
        {
          key: "pin1",
          location: {
            latitude:
              this.assessmentData.dataScienceResponse.coordinates.latitude,
            longitude:
              this.assessmentData.dataScienceResponse.coordinates.longitude,
          },
          options: {
            title: "Assessment Location",
            visible: true,
          },
        },
      ],
      mapOptions: {
        zoom: 13,
        showDashboard: false,
        center: {
          latitude:
            this.assessmentData.dataScienceResponse.coordinates.latitude,
          longitude:
            this.assessmentData.dataScienceResponse.coordinates.longitude,
        },
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    getColor(summary) {
      if (summary.rawScore > 80 || summary.rawScore == 0) {
        //0 is returned for reports without responses, so 0 = 100
        return "#0CBD01";
      } else if (summary.rawScore < 56) {
        return "#FF0000";
      } else {
        return "#FFDE28";
      }
    },
  },
  computed: {
    getLocation() {
      return {
        latitude: this.assessmentData.dataScienceResponse.coordinates.latitude,
        longitude:
          this.assessmentData.dataScienceResponse.coordinates.longitude,
      };
    },
    tooltipText() {
      return "Natural Catastrophe Score represents a property's exposure to multiple natural perils. The score range is 0-100, a higher score indicates less potential of negative impacts as a result of a natural peril.";
    },
  },
};
</script>

<style lang="scss" scoped>
.map-panel {
  width: 100%;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;
}

.display-buttons {
  text-transform: capitalize;
  font-size: 16px !important;
  font-weight: 600;
  border: 2px solid;
  border-color: #d8d9db !important;
}

.button-name {
  text-align: left;
  padding-left: 0px;
}

.align-assessment-name {
  justify-content: center;
}

.assessment-detail-score {
  margin-left: 10px;
  font-weight: bold;
}

.info-align {
  margin-left: 10px;
  // margin-top: 6px;
}

.v-application--is-ltr .v-window__prev {
  bottom: 0px;
}

.v-expansion-panel-header {
  padding-left: 0px;
}

.detail-image {
  border-radius: 20px;
}

img {
  border-radius: 20px;
}
</style>