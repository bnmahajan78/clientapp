<template>
  <v-card tile class="mx-auto mb-5 px-5 py-5" max-width="1200" elevation="4">
    <v-card-title class="card-title"
      >Individual Assessment Details</v-card-title
    >
    <v-row class="px-5 pb-2" align="center">
      <v-col class="pt-0"
        ><span class="chart-icon"><chart-icon></chart-icon></span>Assessments Available<span class="assessment-count">{{
          reportCount
        }}</span></v-col
      >
      <v-col class="text-right pt-0">
        <v-btn
          v-if="!isExpanded"
          color="primary"
          elevation="1"
          class="button-width"
          @click="isExpanded = !isExpanded"
          >Expand All</v-btn
        >
        <v-btn
          v-if="isExpanded"
          color="primary"
          elevation="1"
          class="button-width"
          @click="isExpanded = !isExpanded"
          >Collapse All</v-btn
        >
      </v-col>
    </v-row>

    <v-row class="gauge-row">
      <v-tabs
        v-model="tab"
        background-color="none"
        height="100%"
        slider-color="#005dff"
        slider-size="4"
      >
        <v-tab
          class="tab-override"
          v-for="selectedAssessment in assessmentList"
          :key="selectedAssessment.reportName"
        >
          <v-container>
            <gauge-component
              :size="'small'"
              :score="selectedAssessment.score"
              class="small-gauge"
            ></gauge-component>
            <div class="tab-text">{{ selectedAssessment.displayName }}</div>
          </v-container>
        </v-tab>
      </v-tabs>
    </v-row>

    <v-card tile class="mx-5 my-5 px-0 py-0" elevation="2" v-if="!isExpanded">
      <v-row align="center" class="px-0 mx-0">
        <v-carousel hide-delimiters height="100%" class="carousel-btns">
          <template v-slot:prev="{ on, attrs }">
            <v-btn
              class="arrow-icon left-btn-position"
              style=""
              :exact="true"
              fab
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
              class="arrow-icon right-btn-position"
              large
              v-bind="attrs"
              v-on="on"
              @click="nextInSet"
            >
              <v-icon large>mdi-chevron-right</v-icon>
            </v-btn>
          </template>

          <v-carousel-item>
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="selectedAssessment in assessmentList"
                :key="selectedAssessment.reportName"
              >
                <component
                  v-bind:is="selectedAssessment.component"
                  :assessmentData="selectedAssessment.assessmentData"
                  :reportData="selectedAssessment.reportData"
                  :displayComp="selectedAssessment.component"
                  :displayName="selectedAssessment.displayName"
                  :score="selectedAssessment.score"
                ></component>
              </v-tab-item>
            </v-tabs-items>
          </v-carousel-item>
        </v-carousel>
      </v-row>
    </v-card>

    <v-card tile flat class="mx-0 my-0 px-0 py-0" v-if="isExpanded">
      <v-row
        class="mx-0 px-0 py-0"
        v-for="assessment in assessmentList"
        :key="assessment.reportName"
      >
        <v-card
          tile
          class="mx-5 mt-0 mb-10 px-0 py-0"
          width="100%"
          elevation="2"
        >
          <component 
            v-bind:is="assessment.component"
            :assessmentData="assessment.assessmentData"
            :reportData="assessment.reportData"
            :displayComp="assessment.component"
            :displayName="assessment.displayName"
            :score="assessment.score"
          ></component>
        </v-card>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import GaugeComponent from "../GaugeComponent.vue";
import NatCatSummary from "./NatCatSummary.vue";
import PermitScoreSummary from "./PermitScoreSummary.vue";
import OverheadSummary from "./OverheadSummary.vue";
import ExteriorSummary from "./ExteriorSummary.vue";
import ChartIcon from "../SVGs/ChartIcon.vue";

export default {
  name: "AssessmentDetailsCard",
  props: {
    assessmentData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    GaugeComponent,
    NatCatSummary,
    PermitScoreSummary,
    OverheadSummary,
    ExteriorSummary,
    ChartIcon
  },
  data() {
    return {
      isExpanded: false,
      activeAssessment: {},
      tab: null,
      assessmentList: [],
      selectedAssessment: {},
    };
  },
  created() {

    var natCatData = this.assessmentData.rollups.natCatRollup;
    var permitData = this.assessmentData.rollups.permitRollup;
    var overheadData = this.assessmentData.rollups.overheadRollup;
    var exteriorData = this.assessmentData.rollups.exteriorRollup;

    this.assessmentList.push({
      displayName: overheadData.assessmentType,
      reportData: overheadData,
      assessmentData: this.assessmentData,
      score: overheadData.assessmentScore,
      component: "OverheadSummary",
    });
    this.assessmentList.push({
      displayName: exteriorData.assessmentType,
      reportData: exteriorData,
      assessmentData: this.assessmentData,
      score: exteriorData.assessmentScore,
      component: "ExteriorSummary",
    });
    this.assessmentList.push({
      displayName: permitData.assessmentType,
      reportData: permitData,
      assessmentData: this.assessmentData,
      score: permitData.assessmentScore,
      component: "PermitScoreSummary",
    });
    this.assessmentList.push({
      displayName: natCatData.assessmentType,
      reportData: natCatData,
      assessmentData: this.assessmentData,
      score: natCatData.assessmentScore,
      component: "NatCatSummary",
    });  
  },
  methods: {
    nextInSet() {
      if (this.tab + 1 > this.assessmentList.length) {
        this.tab = 0;
      } else {
        ++this.tab;
      }
    },
    previousInSet() {
      if (this.tab == 0) {
        this.tab = this.assessmentList.length - 1;
      } else {
        --this.tab;
      }
    },
  },
  computed: {
    reportCount() {
      return this.assessmentList.length;
    },
  },
};
</script>

<style>
.gauge-col {
  flex: 0 0 auto;
}

.assessment-count {
  font-weight: bold;
  margin-left: 10px;
}

.button-width {
  width: 197px;
  height: 45px !important;
  font-size: 18px !important;
  text-transform: none !important;
}
</style>

<style lang="scss" scoped>
.chart-icon {
  vertical-align: -6px;
  padding-right:12px
}

.gauge-row {
  display: flex;
  flex-wrap: nowrap;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 60px;
  overflow-x: auto;
}

.tab-override {
  text-transform: capitalize;
}

.tab-text {
  font-size: 14px;
  text-transform: capitalize;
  padding-bottom: 10px;
}

.v-tab:before {
  background-color: #fff;
}

.left-btn-position {
  position: absolute;
  left: -46px;
}

.right-btn-position {
  position: absolute;
  right: -46px;
}

.carousel-btns {
  overflow: visible;
}

.v-window v-item-group theme--dark v-carousel {
  overflow: visible;
}
</style>