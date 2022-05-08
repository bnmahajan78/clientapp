<template>
  <div>
    <v-card tile class="mx-auto mb-5 px-5 py-5" max-width="1200" elevation="4">
      <v-card-title class="card-title">Property Score</v-card-title>
      <v-row justify="center">
        <v-col cols="4">
          <v-row>
            <v-col cols="12" class="py-0">
              <gauge-component v-bind:score="getScore"></gauge-component>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="px-1 pt-0 pb-2">
              <v-card-text class="text-center mb-2 pt-0">
                <div class="pb-2">
                  The Property Score for this location is
                  {{ getScore }}/100, indicating this location exhibits
                  {{ getRating }} Standing.
                </div>
                <div>
                  <a href="#" @click="dialog = true"
                    >Help me understand what this scores means</a
                  >
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="1" class="divider-column">
          <v-divider vertical></v-divider>
        </v-col>

        <v-col cols="7" class="pl-6 mt-5">
          <v-row class="card-sub-headings" justify="space-between">Location Details 
            <v-dialog v-model="dialogDetails" scrollable max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="details-btn pr-10" style="text-transform:none" 
                right text :ripple="false" elevation="0" color="#005DFF" height="24px" 
                v-bind="attrs" v-on="on">
                  See More Details
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="py-5">All Location Details</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="max-height: 450px; padding-top:30px; margin-bottom:20px">
                <v-row class="px-12">
                  <v-col cols="6" v-for="(item, key, index) in editedPropertyInfo" :key="index">
                    <v-row>
                      <v-col md="auto" class="icon-col pr-0">
                        <span class="icon-text">{{ prettyText(key) }}</span>
                      </v-col>
                      <v-col md="auto" class="icon-col pl-0">
                        <span class="icon-data">{{ item }}</span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-row no-gutters justify="end">
                  <v-btn class="white--text my-2 mr-2" color="#005DFF" @click="dialogDetails = false">
                    Close
                  </v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row class="mb-3">
            <v-col cols="6">
              <v-row class="icon-row"
                ><v-col class="icon-col"
                  ><span class="icon-align"><hammer-icon></hammer-icon></span
                  ><span class="icon-text">Year Built</span
                  ><span class="icon-data">{{ getYearBuilt }}</span></v-col
                ></v-row
              >
              <v-row class="icon-row"
                ><v-col class="icon-col"
                  ><span class="icon-align"><house-icon></house-icon></span
                  ><span class="icon-text">Number of Stories</span
                  ><span class="icon-data">{{ getStories }}</span></v-col
                ></v-row
              >
              <v-row class="icon-row"
                ><v-col class="icon-col"
                  ><span class="icon-align"
                    ><protractor-icon></protractor-icon></span
                  ><span class="icon-text">Lot Size</span
                  ><span class="icon-data">{{ getAcreage }}</span></v-col
                ></v-row
              >
            </v-col>
            <v-col cols="6">
              <v-row class="icon-row"
                ><v-col class="icon-col"
                  ><span class="icon-align"
                    ><ruler-icon transform="rotate(90)"></ruler-icon></span
                  ><span class="icon-text">Square Footage</span
                  ><span class="icon-data">{{ getSquareFootage }}</span></v-col
                ></v-row
              >
              <v-row class="icon-row"
                ><v-col class="icon-col"
                  ><span class="icon-align"><shield-icon></shield-icon></span
                  ><span class="icon-text">Construction Type</span
                  ><span class="icon-data">{{
                    getConstructionType
                  }}</span></v-col
                ></v-row
              >
              <v-row class="icon-row"
                ><v-col class="icon-col"
                  ><span class="icon-align"><coins-icon></coins-icon></span
                  ><span class="icon-text">Total Assessed Value</span
                  ><span class="icon-data">{{ getAssessedValue }}</span></v-col
                ></v-row
              >
            </v-col>
          </v-row>
           


           <v-row class="card-sub-headings mt-12">Hazards Detected</v-row>
          <v-row>
            <v-col cols="4"
              ><span class="meter-align">
                <meter-icon></meter-icon></span> 
              High Hazards
              <span class="hazard-count">({{ highHazardCount }})</span></v-col
            >
            <v-col cols="4"
              ><span class="meter-align"
                ><meter-icon v-bind:color="'yellow'"></meter-icon
              ></span>
              Moderate Hazards
              <span class="hazard-count">({{ midHazardCount }})</span></v-col
            >
            <v-col cols="4"
              ><span class="meter-align"
                ><meter-icon v-bind:color="'green'"></meter-icon
              ></span>
              Low Hazards
              <span class="hazard-count">({{ lowHazardCount }})</span></v-col
            >
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-card class="px-5 py-8" style="border-radius: 13px">
        <v-card-title class="text-h5">About Property Score</v-card-title>
        <v-card-text>
          Each individual property, identified by the address of its location,
          receives an aggregated score across multiple type of assessments done
          for a property, providing underwriters with insights into which
          aspects of the property pose the greatest risk. The score ranges from
          0-100, a higher score indicates a good condition of a property and
          lower loss propensity. The scores are classified into the following
          qualitative tiers:
          <v-row justify="center" class="mt-5">
            <table class="modal-table">
              <tr style="border: 1px solid">
                <th>Score Range</th>
                <th>Condition</th>
              </tr>
              <tr>
                <td>80-100</td>
                <td>Good</td>
              </tr>
              <tr>
                <td>56-79</td>
                <td>Fair</td>
              </tr>
              <tr>
                <td>1-55</td>
                <td>Poor</td>
              </tr>
            </table>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn style="color: #fff" color="#005dff" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
 
<script>
import GaugeComponent from "@/components/GaugeComponent.vue";
import MeterIcon from "../SVGs/MeterIcon.vue";
import HammerIcon from "../SVGs/HammerIcon.vue";
import HouseIcon from "../SVGs/HouseIcon.vue";
import RulerIcon from "../SVGs/RulerIcon.vue";
import ShieldIcon from "../SVGs/ShieldIcon.vue";
import CoinsIcon from "../SVGs/CoinsIcon.vue";
import ProtractorIcon from "../SVGs/ProtractorIcon.vue";

export default {
  name: "AssessmentScoreCard",
  props: {
    assessmentData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    GaugeComponent,
    MeterIcon,
    HammerIcon,
    HouseIcon,
    RulerIcon,
    ShieldIcon,
    ProtractorIcon,
    CoinsIcon,
  },
  data() {
    return {
      fullPropertyInfo: {},
      lowHazardCount: 0,
      midHazardCount: 0,
      highHazardCount: 0,
      dialog: false,
      dialogDetails: false,
      highHazardList: [],
      midHazardList: [],
      lowHazardList: []
    };
  },
  created() {
    this.highHazardCount =
      this.assessmentData.rollups.overheadRollup.hazardList.highHazards.length +
      this.assessmentData.rollups.exteriorRollup.hazardList.highHazards.length;

    if (this.assessmentData.rollups.overheadRollup.hazardList.highHazards.length > 0) {
      this.highHazardList.push(...this.assessmentData.rollups.overheadRollup.hazardList.highHazards);
    }
    if (this.assessmentData.rollups.exteriorRollup.hazardList.highHazards.length > 0) {
      this.highHazardList.push(...this.assessmentData.rollups.exteriorRollup.hazardList.highHazards);
    }

    this.midHazardCount = 
      this.assessmentData.rollups.overheadRollup.hazardList.moderateHazards.length +
      this.assessmentData.rollups.exteriorRollup.hazardList.moderateHazards.length;

    if (this.assessmentData.rollups.overheadRollup.hazardList.moderateHazards.length > 0) {
      this.midHazardList.push(...this.assessmentData.rollups.overheadRollup.hazardList.moderateHazards);
    }
    if (this.assessmentData.rollups.exteriorRollup.hazardList.moderateHazards.length > 0) {
      this.midHazardList.push(...this.assessmentData.rollups.exteriorRollup.hazardList.moderateHazards);
    }

    this.lowHazardCount =
      this.assessmentData.rollups.overheadRollup.hazardList.lowHazards.length +
      this.assessmentData.rollups.exteriorRollup.hazardList.lowHazards.length;

    if (this.assessmentData.rollups.overheadRollup.hazardList.lowHazards.length > 0) {
      this.lowHazardList.push(...this.assessmentData.rollups.overheadRollup.hazardList.lowHazards);
    }
    if (this.assessmentData.rollups.exteriorRollup.hazardList.lowHazards.length > 0) {
      this.lowHazardList.push(...this.assessmentData.rollups.exteriorRollup.hazardList.lowHazards);
    }

    var natCatHazards = this.assessmentData.rollups.natCatRollup.reportScoreDetails;
    natCatHazards.forEach((hazard) => {
      if (hazard.rawScore < 56 && hazard.rawScore != 0) {
        this.highHazardCount++;
        this.highHazardList.push({ severity: "high", valuePretty: "Natural Catastrophe - " + hazard.displayName, probability: 1, value: ""});
      } else if (hazard.rawScore < 81 && hazard.rawScore != 0) {
        this.midHazardCount++;
        this.highHazardList.push({ severity: "moderate", valuePretty: "Natural Catastrophe - " + hazard.displayName, probability: 1, value: ""});
      } else if (hazard.rawScore < 100) {
        // this.lowHazardCount++; //only create hazards for "not-good" scores
      }
    });

    //TODO: Add logic to pull hazards out of any future assessment types here...
    // This can't currently be done 100% dynamically because different assessment may produce different outputs
    ///

    //pull extneded property info
    this.fullPropertyInfo = this.assessmentData.mapRiskResponse.response.reportResults.propertyInformationFull;
    this.editedPropertyInfo = { ...this.fullPropertyInfo };

    //remove unecessary keys, or ones being displayed in the details already
    delete this.editedPropertyInfo.yearBuiltEffective;
    delete this.editedPropertyInfo.yearBuilt;
    delete this.editedPropertyInfo.results;
    delete this.editedPropertyInfo.features;
    delete this.editedPropertyInfo.error;
    delete this.editedPropertyInfo.grossLivingAreaSquareFeet;
    delete this.editedPropertyInfo.numberOfStories;
    delete this.editedPropertyInfo.acreage;
    delete this.editedPropertyInfo.totalAssessedValue;
    delete this.editedPropertyInfo.constructionType;
    delete this.editedPropertyInfo.address;
    //remove all null values
    Object.keys(this.editedPropertyInfo).forEach(el => 
      (!this.editedPropertyInfo[el] && this.editedPropertyInfo[el] !== undefined) 
        && delete this.editedPropertyInfo[el]);
  },
  methods: {
    formatMoneyString(value) {
      if (value != null && value != "") {
        return '$'+value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
      else {
        return "N/A";
      }
    },
    prettyText(str) {
      var output = "";
      var len = str.length;
      var char;

      for (var i = 0; i < len; i++) {
        char = str.charAt(i);

        if (i == 0) {
          output += char.toUpperCase();
        } else if (char !== char.toLowerCase() && char === char.toUpperCase()) {
          output += " " + char;
        } else if (char == "-" || char == "_") {
          output += " ";
        } else {
          output += char;
        }
      }

      return output;
    },
  },
  computed: {
    getScore() {
      return this.assessmentData.locationAssessmentServiceResponse.summary
        .locationAssessmentScore;
    },
    getRating() {
      if (
        this.assessmentData.locationAssessmentServiceResponse.summary
          .locationAssessmentScore > 80
      ) {
        return "Good";
      } else if (
        this.assessmentData.locationAssessmentServiceResponse.summary
          .locationAssessmentScore < 56
      ) {
        return "Poor";
      } else {
        return "Fair";
      }
    },
    getYearBuilt() {
      var year =
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.yearBuiltEffective != "" &&
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.yearBuiltEffective != null
          ? this.assessmentData.mapRiskResponse.response.reportResults
              .propertyInformationFull.yearBuiltEffective
          : this.assessmentData.mapRiskResponse.response.reportResults
              .propertyInformationFull.yearBuilt;

      return year != "" ? year : "N/A";
    },
    getStories() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.numberOfStories != "" &&
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.numberOfStories != null
        ? this.assessmentData.mapRiskResponse.response.reportResults
            .propertyInformationFull.numberOfStories
        : "N/A";
    },
    getSquareFootage() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.grossLivingAreaSquareFeet != "" &&
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.grossLivingAreaSquareFeet != null
        ? this.assessmentData.mapRiskResponse.response.reportResults
            .propertyInformationFull.grossLivingAreaSquareFeet
        : "N/A";
    },
    getRoofMaterial() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.roofMaterial != "" &&
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.roofMaterial != null
        ? this.assessmentData.mapRiskResponse.response.reportResults
            .propertyInformationFull.roofMaterial
        : "N/A";
    },
    getAcreage() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.acreage != "" &&
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.acreage != null
        ? this.assessmentData.mapRiskResponse.response.reportResults
            .propertyInformationFull.acreage + " AC"
        : "N/A";
    },
    getConstructionType() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.constructionType != "" &&
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.constructionType != null
        ? this.assessmentData.mapRiskResponse.response.reportResults
            .propertyInformationFull.constructionType
        : "N/A";
    },
    getAssessedValue() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.totalAssessedValue != "" &&
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.totalAssessedValue != null
        ? this.formatMoneyString(
            this.assessmentData.mapRiskResponse.response.reportResults
              .propertyInformationFull.totalAssessedValue
          )
        : "N/A";
    },
    getOccupancyType() {
      return this.assessmentData.mapRiskResponse.response.reportResults
        .propertyInformationFull.occupancyType != "" &&
        this.assessmentData.mapRiskResponse.response.reportResults
          .propertyInformationFull.occupancyType != null
        ? this.assessmentData.mapRiskResponse.response.reportResults
            .propertyInformationFull.occupancyType
        : "N/A";
    },
  },
};
</script>
<style lang="scss" scoped>
.details-btn::before {
   background-color: transparent !important;
}

::v-deep .v-expansion-panel-header__icon {
  visibility: hidden !important;
}
</style>
<style>
.modal-table {
  width: 250px;
  text-align: center;
}

.modal-table,
.modal-table td,
.modal-table th {
  border: 1px solid;
  border-collapse: collapse;
}

.meter-align {
  vertical-align: -5px;
  margin-right: 5px;
}

.header {
  text-align: center;
  order: 0;
  color: #005dff;
}

.card-sub-headings {
  font-weight: bold;
  padding-top: 10px;
  margin-bottom: 20px;
}

#additional-details > * {
  padding: 0 14px 20px 14px !important;
}

.hazard-count {
  margin-left: 4px;
  font-weight: bold;
}

.icon {
  order: 1;
}

.v-icon {
  color: #005dff;
}

.icon-col {
  padding-top:10px;
  padding-bottom: 0px;
}

.icon-text {
  padding-right: 15px;
}

.icon-align {
  vertical-align: -5px;
  margin-right: 20px;
}

.icon-data {
  font-weight: bold;
}

.divider-column {
  text-align: center;
  margin-bottom: 20px;
}
</style>

