<template>
  <div>
    <v-card tile class="summary-content-card mb-5 px-8" flat>
      <div class="summary-card mb-0 px-5 pt-5">
        <v-row align="center" class="mb-0">
          <gauge-component :size="'small'" :score="score"></gauge-component>
          <span>{{ displayName }}</span>
          <span class="assessment-detail-score">{{ score }}/100</span>
          <span class="info-align">
            <v-tooltip top max-width="325px">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="#005dff" style="vertical-align:-2px" dense v-bind="attrs" v-on="on">mdi-information-outline</v-icon>
              </template>
              <span>{{tooltipText}}</span>
            </v-tooltip>
          </span>
        </v-row>
      </div>
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="6" class="pl-10 pb-5 mt-10">
              <v-row v-if="additionalInfo.length > 0">
                 <v-col class="pl-0" cols="6" v-for="info in additionalInfo" :key="info.category">
                   <v-row>
                    <v-col class="">{{info.categoryPretty}}:</v-col>
                    <v-col class="pl-0"><span class="hazard-detail-text">{{info.valuePretty}}</span></v-col>
                   </v-row>
                </v-col>
              </v-row>
              <v-row v-if="additionalInfo.length == 0">
                <v-col class="pl-0"
                  >Roof Type
                  <span class="hazard-detail-text">{{
                    getRoofType
                  }}</span></v-col
                >
                <v-col class="pl-0"
                  >Complexity
                  <span class="hazard-detail-text">{{}}</span></v-col
                >
              </v-row>
              <v-row  v-if="additionalInfo.length == 0">
                <v-col class="pl-0"
                  >Est. Conditions
                  <span class="hazard-detail-text">{{}}</span></v-col
                >
                <v-col class="pl-0"
                  >Roof Footprint
                  <span class="hazard-detail-text">{{
                    getRoofFootprint
                  }}</span></v-col
                >
                <!-- gross square footage -->
              </v-row>

              <v-row class="card-sub-headings" style="margin-top: 40px"
                >Aerial Roof Hazards Detected</v-row
              >
              <v-row>
                <v-expansion-panels flat v-model="panelIndex">
                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon-rotate>
                      <div>
                        <span class="meter-align"
                          ><meter-icon></meter-icon
                        ></span>
                        <span class="hazard-text">High Hazards</span>
                        <span class="hazard-count"
                          >({{ highHazards.length }})</span
                        >
                      </div>
                      <template v-slot:actions>
                        <v-icon color="#005DFF" v-if="!isPanelOpen(0)"> mdi-plus </v-icon>
                        <v-icon color="#005DFF" v-if="isPanelOpen(0)"> mdi-minus </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row
                        class="hazard-row"
                        v-for="hazard in highHazards"
                        :key="hazard.value"
                      >
                        -
                        <span class="hazard-pretty-text">{{
                          hazard.valuePretty
                        }}</span>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon-rotate>
                      <div>
                        <span class="meter-align"
                          ><meter-icon v-bind:color="'yellow'"></meter-icon
                        ></span>
                        <span class="hazard-text">Moderate Hazards</span>
                        <span class="hazard-count"
                          >({{ midHazards.length }})</span
                        >
                      </div>
                      <template v-slot:actions>
                        <v-icon color="#005DFF" v-if="!isPanelOpen(1)"> mdi-plus </v-icon>
                        <v-icon color="#005DFF" v-if="isPanelOpen(1)"> mdi-minus </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row
                        class="hazard-row"
                        v-for="hazard in midHazards"
                        :key="hazard.value"
                      >
                        -
                        <span class="hazard-pretty-text">{{
                          hazard.valuePretty
                        }}</span>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon-rotate>
                      <div>
                        <span class="meter-align"
                          ><meter-icon v-bind:color="'green'"></meter-icon
                        ></span>
                        <span class="hazard-text">Low Hazards</span>
                        <span class="hazard-count"
                          >({{ lowHazards.length }})</span
                        >
                      </div>
                      <template v-slot:actions>
                        <v-icon color="#005DFF" v-if="!isPanelOpen(2)"> mdi-plus </v-icon>
                        <v-icon color="#005DFF" v-if="isPanelOpen(2)"> mdi-minus </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row
                        class="hazard-row"
                        v-for="hazard in lowHazards"
                        :key="hazard.value"
                      >
                        -
                        <span class="hazard-pretty-text">{{
                          hazard.valuePretty
                        }}</span>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-carousel
                height="400px"
                class="detail-image"
                hide-delimiters
                v-if="assessmentData.dataScienceResponse != undefined"
              >
                <template v-slot:prev="{ on, attrs }">
                  <v-btn
                    :exact="true"
                    fab
                    class="arrow-icon arrow-position-left"
                    v-bind="attrs"
                    v-on="on"
                    @click="previousInSet"
                  >
                    <v-icon large>mdi-chevron-left</v-icon>
                  </v-btn>
                </template>

                <template v-slot:next="{ on, attrs }">
                  <v-btn
                    fab
                    class="arrow-icon arrow-position-right"
                    large
                    v-bind="attrs"
                    v-on="on"
                    @click="nextInSet"
                  >
                    <v-icon large>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>

                <v-carousel-item eager
                  cover
                  v-for="photo in sliderPhotos"
                  :key="photo.photoId"
                  :src="photo.url"
                >
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import MeterIcon from "../SVGs/MeterIcon.vue";
// import InfoIcon from "../SVGs/InfoIcon.vue";
import GaugeComponent from "../GaugeComponent.vue";

export default {
  name: "OverheadSummary",
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
  },
  components: { GaugeComponent, MeterIcon },
  data() {
    return {
      additionalInfo: [],
      panelIndex: null,
      aerialHazards: [],
      sliderPhotos: [],
      activeSliderImage: 0,
      highHazards: [],
      midHazards: [],
      lowHazards: [],
      mapOptions: {
        zoom: 12,
      },
      pins: [
        {
          key: "pin1",
          location: {
            latitude: 40.90746,
            longitude: -74.160904,
          },
          options: {
            title: "pin 1",
            visible: true,
          },
        },
      ],
    };
  },
  created() {
    // var hazards = this.reportData.hazardList;
    //get all arial images...
    var allAerialPhotos = this.assessmentData.dataScienceResponse.photos.filter(
      (p) => p.settings.photoType == "aerial"
    );
    //get hazards
    allAerialPhotos.forEach((photo) => {
      if (photo.hazards.length > 0) {
        this.aerialHazards.push(...photo.hazards);
        this.sliderPhotos.push(photo);
      }

      if (photo.additionalInfo.length > 0) {
        this.additionalInfo.push(...photo.additionalInfo)
      }

      //search for hazards in augmented photos
      photo.augmentedPhotos.forEach((augPhoto) => {
        if (augPhoto.hazards.length > 0) {
          this.aerialHazards.push(...augPhoto.hazards);
          this.sliderPhotos.push(augPhoto);
        }

        if (augPhoto.additionalInfo.length > 0) {
          this.additionalInfo.push(...augPhoto.additionalInfo)
        }
      });
    });

    this.highHazards = this.aerialHazards.filter((h) => h.severity == "high");
    this.midHazards = this.aerialHazards.filter((h) => h.severity == "moderate");
    this.lowHazards = this.aerialHazards.filter((h) => h.severity == "low");

    if(this.sliderPhotos.length < 1) this.sliderPhotos = allAerialPhotos;
    
  },
  methods: {
    nextInSet() {
      if (this.activeSliderImage + 1 > this.sliderPhotos.length) {
        this.activeSliderImage = 0;
      } else {
        ++this.activeSliderImage;
      }
    },
    previousInSet() {
      if (this.activeSliderImage == 0) {
        this.activeSliderImage = this.sliderPhotos.length - 1;
      } else {
        --this.activeSliderImage;
      }
    },
    isPanelOpen(index) {
      if(index == this.panelIndex) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  computed: {
    getRoofFootprint() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.grossSquareFeet != ""
        ? this.assessmentData.mapRiskResponse.response.reportResults
            .propertyInformationFull.grossSquareFeet
        : "N/A";
    },
    getRoofType() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.roofType != ""
        ? this.assessmentData.mapRiskResponse.response.reportResults
            .propertyInformationFull.roofType
        : "N/A";
    },
    tooltipText() {
      return "Overhead Score represents the severity of hazards detected on a property by analyzing overhead images using AI. The score ranges from 0-100, a higher score indicates lesser severe hazards detected on a property and lower loss propensity.";
    }
  },
};
</script>

<style lang="scss" scoped>
.hazard-detail-text {
  font-weight: 600;
}

.arrow-position-left {
  position: absolute;
  bottom: -200px;
  left: 338px;
}

.arrow-position-right {
  position: absolute;
  bottom: -200px;
  right: 7px;
}

.hazard-pretty-text {
  padding-left: 10px;
}

.hazard-row {
  padding: 20px 0px 10px 35px;
}

.hazard-count {
  font-weight: bold;
  margin-left: 20px;
}

.hazard-text {
  padding-left: 20px;
}

.v-application--is-ltr .v-window__prev {
  bottom: 0px;
}

.v-expansion-panel-header {
  padding-left: 0px;
  padding-right:40px;
}

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