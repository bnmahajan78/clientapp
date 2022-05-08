<template>
  <v-container>
    <v-card tile class="mx-auto px-0 py-3" max-width="800" elevation="2">
      <v-row no-gutters>
        <v-col cols="9">
          <v-card-title class="card-title"
            >Assessments ({{ assessmentList.length }})</v-card-title
          >
        </v-col>
        <v-col cols="3" class="pr-10">
          <v-select
            single-line
            :items="sortOptions"
            v-model="selected"
            v-on:change="sortBy"
            label="View"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="table-heading mx-0">
        <v-col cols="4" class="pl-10">Property Score</v-col
        ><v-col cols="8" class="pl-0">Address</v-col>
      </v-row>
      <v-card
        tile
        class="inner-card"
        v-for="assessment in filteredList"
        :key="assessment.assessmentId"
      >
        <v-row class="mx-0">
          <v-col cols="4" class="gauge-col"
            ><gauge-component
              :score="assessment.locationAssessmentScore"
              size="small"
            ></gauge-component
          ></v-col>
          <v-col class="pl-0" cols="8">
            <v-row class="main-address"
              ><v-col class="pb-0">{{
                getAddress(assessment.address)
              }}</v-col></v-row
            >
            <v-row
              ><v-col
                ><a
                  target="_blank"
                  rel="noopener noreferrer"
                  class="assessment-link"
                  :href="assessment.assessmentUrl"
                  >View Property Intelligence</a
                ></v-col
              ></v-row
            >
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import GaugeComponent from "./GaugeComponent.vue";
const axios = require("axios");

export default {
  name: "AssessmentList",

  components: { GaugeComponent },
  data: () => ({
    assessmentList: [],
    filteredList: [],
    requestData: null,
    sortOptions: ["All", "Good", "Fair", "Bad"],
    selected: "All",
  }),
  methods: {
    sortBy() {
      //filter results by score
      switch (this.selected) {
        case "Good":
          this.filteredList = this.assessmentList.filter(
            (x) => x.locationAssessmentScore > 80
          );
          break;

        case "Fair":
          this.filteredList = this.assessmentList.filter(
            (x) =>
              x.locationAssessmentScore > 55 && x.locationAssessmentScore < 81
          );
          break;

        case "Bad":
          this.filteredList = this.assessmentList.filter(
            (x) => x.locationAssessmentScore < 56
          );
          break;

        default:
          this.filteredList = this.assessmentList;
      }
    },
    getAddress(address) {
      return (
        address.addressLine1 +
        ", " +
        address.cityOrLocality +
        ", " +
        address.stateOrAdministrativeArea +
        " " +
        address.zipOrPostalCode
      );
    },
  },
  created() {},
  mounted() {
    if (localStorage.getItem("assessment-list-request")) {
      this.requestData = JSON.parse(
        localStorage.getItem("assessment-list-request")
      );

      axios
        .post(
          "/api/LocationAssessment/compileAssessmentList",
          JSON.stringify(this.requestData),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          this.assessmentList = response.data;
          this.filteredList = this.assessmentList;
        })
        .catch((error) => {
          console.log(error);
          // handle error
        })
        .finally(() => (this.loading = false));

      localStorage.removeItem("assessment-list-request");
    }
  },
};
</script>

<style lang="scss" scoped>
.v-application--wrap {
  min-height: 100px !important;
}

.container {
  padding: 0px !important;
}

.card-title {
  padding-left: 40px;
}

.inner-card {
  box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 5%) !important;
}

.table-heading {
  font-weight: 600;
  text-transform: capitalize;
  padding-left: 0px;
  padding-bottom: 5px;
}

.main-address {
  padding-top: 10px;
  font-size: 24px;
  font-weight: bold;
}

.gauge-col {
  padding: 0px !important;
}

.col {
  padding: 16px;
}

.assessment-link {
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
}
</style>