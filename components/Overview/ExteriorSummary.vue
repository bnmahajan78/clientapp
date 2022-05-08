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
              <v-row>
                <v-col class="pl-0"
                  >Hazards Identifed
                  <span class="hazard-detail-text pl-5">{{
                    totalHazards
                  }}</span></v-col
                >
              </v-row>
              <v-row>
                <v-col class="pl-0" style="padding-top: 7px"
                  >Address Verification
                  <span class="hazard-detail-text pl-5" style="vertical-align: 5px">
                    <v-icon large color="#0CBD01" v-if="isVerified">
                      mdi-check-bold
                    </v-icon>
                    <v-icon large color="#FF0000" v-if="!isVerified">
                      mdi-close
                    </v-icon>
                  </span></v-col
                >
              </v-row>
              <!-- <v-row>
                <v-col class="pl-0" cols="6" v-for="info in additionalInfo" :key="info.category">
                   <v-row>
                    <v-col cols="6" class="">{{info.categoryPretty}}:</v-col>
                    <v-col class="pl-0" cols="6"><span class="hazard-detail-text">{{info.valuePretty}}</span></v-col>
                   </v-row>
                </v-col>
              </v-row> -->
              <v-row class="card-sub-headings" style="margin-top: 40px"
                >Exterior Image Hazards Detected</v-row
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
  name: "ExteriorSummary",
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
  components: {  GaugeComponent, MeterIcon },
  data() {
    return {
      additionalInfo: [],
      panelIndex: null,
      exteriorHazards: [],
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
    //get all streetview images...
    var allStreetViewPhotos =
      this.assessmentData.dataScienceResponse.photos.filter(
        (p) => p.settings.photoType == "streetview"
      );
    //get hazards
    allStreetViewPhotos.forEach((photo) => {
      if (photo.hazards.length > 0) {
        this.exteriorHazards.push(...photo.hazards);
        this.sliderPhotos.push(photo);
      }

      if (photo.additionalInfo.length > 0) {
        this.additionalInfo.push(...photo.additionalInfo)
      }

      //search for hazards in augmented photos
      photo.augmentedPhotos.forEach((augPhoto) => {
        if (augPhoto.hazards.length > 0) {
          this.exteriorHazards.push(...augPhoto.hazards);
          this.sliderPhotos.push(augPhoto);
        }

        if (augPhoto.additionalInfo.length > 0) {
          this.additionalInfo.push(...augPhoto.additionalInfo)
        }
      });
    });

    this.highHazards = this.exteriorHazards.filter((h) => h.severity == "high");
    this.midHazards = this.exteriorHazards.filter((h) => h.severity == "moderate");
    this.lowHazards = this.exteriorHazards.filter((h) => h.severity == "low");

    //if no hazard photos exist, just show non-augmented exterior photos
    if(this.sliderPhotos.length < 1) this.sliderPhotos = allStreetViewPhotos;
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
    totalHazards() {
      return (
        this.highHazards.length +
        this.midHazards.length +
        this.lowHazards.length
      );
    },
    isVerified() {
      return (
        this.assessmentData.mapRiskResponse.response.reportResults
          .addressVerification.verified == "true"
      );
    },
    tooltipText() {
      return "Exterior Score represents the severity of hazards detected on a property by analyzing ground level images using AI. The score ranges from 0-100, a higher score indicates lesser severe hazards detected on a property and lower loss propensity.";
    }
  },
};
</script>

<style lang="scss" scoped>
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

.hazard-detail-text {
  font-weight: 800;
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