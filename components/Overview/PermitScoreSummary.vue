<template>
  <div>
    <v-card tile class="summary-content-card mb-5 px-6" flat>
      <div class="summary-card mb-0 px-5 pt-5">
        <v-row align="center" class="mb-0">
          <gauge-component :size="'small'" :score="score"></gauge-component>
          <span>{{ displayName }}</span
          ><span class="assessment-detail-score">{{ score }}/100</span
          ><span class="info-align">
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
            <v-col cols="12" class="pl-10 pr-7 mt-5">
              <v-row class="pt-0">
                <v-col cols="12">
                  <v-row class="card-sub-headings mx-0 mt-0 mb-5">
                    Permits of Interest ({{ recentPermits.length }})
                  </v-row>

                  <v-divider class="mb-3"></v-divider>

                  <v-data-table
                    :headers="recentPermitHeaders"
                    :items="recentPermits"
                    :single-expand="singleExpand"
                    :expanded.sync="expandedRecent"
                    item-key="id"
                    show-expand
                    hide-default-footer
                    hide-default-header
                    class="simple-table-style mb-12"
                  >
                    <template v-slot:header>
                      <thead>
                        <tr>
                          <th
                            class="custom-header"
                            v-for="h in recentPermitHeaders"
                            :key="h.text"
                            :class="h.class"
                          >
                            <span style="background-color: #fff !important">{{
                              h.text
                            }}</span>
                          </th>
                        </tr>
                      </thead>
                    </template>

                    <template v-slot:[`item.type`]="{ item }">
                      <span style="font-size: 16px; font-weight: 600">{{
                        item.type
                      }}</span>
                    </template>

                    <template v-slot:[`item.status`]="">
                      <div style="text-align: center">
                        <meter-icon></meter-icon>
                      </div>
                    </template>

                    <template v-slot:[`item.effectiveDate`]="{ item }">
                      <span style="font-weight: 300">{{
                        item.effectiveDate != null ? formattedDate(item.effectiveDate) : "N/A"
                      }}</span>
                    </template>

                    <template v-slot:[`item.data-table-expand`]="{ item }">
                      <div style="text-align: center">
                        <v-icon @click="expandRecentItem(item)"
                          >mdi-arrow-expand</v-icon
                        >
                      </div>
                    </template>

                    <template v-slot:expanded-item="{ headers, item }">
                      <td :colspan="headers.length">
                        <v-container class="details-container">
                          <v-row justify="center">
                            <v-col cols="10">
                              <v-row>
                                <v-col cols="5">
                                  <v-row>
                                    <v-col cols="4">Permit Type: </v-col
                                    ><v-col
                                      cols="8"
                                      style="font-weight: bold"
                                      >{{ item.type != null ? item.type : "N/A" }}</v-col
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-col cols="4">Date: </v-col
                                    ><v-col
                                      cols="8"
                                      style="font-weight: bold"
                                      >{{ item.effectiveDate != null ? formattedDate(item.effectiveDate) : "N/A" }}</v-col
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-col cols="4">Status: </v-col
                                    ><v-col
                                      cols="8"
                                      style="font-weight: bold"
                                      >{{ item.status != null ? item.status : "N/A" }}</v-col
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-col cols="4">Permit #: </v-col
                                    ><v-col
                                      cols="8"
                                      style="font-weight: bold"
                                      >{{ item.permitNumber != null ? item.permitNumber : "N/A" }}</v-col
                                    >
                                  </v-row>
                                </v-col>
                                <v-col cols="7">
                                  <v-row>
                                    <v-col cols="3">Project Type: </v-col
                                    ><v-col
                                      cols="9"
                                      style="font-weight: bold"
                                      >{{ item.projectType != null ? item.projectType : "N/A" }}</v-col
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-col cols="3">Description: </v-col
                                    ><v-col
                                      cols="9"
                                      style="font-weight: bold"
                                      >{{ item.description != null ? item.description : "N/A" }}</v-col
                                    >
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-container>
                      </td>
                    </template>
                  </v-data-table>

                  <v-data-table
                    :headers="permitHeaders"
                    :items="permits"
                    :search="search"
                    :single-expand="singleExpand"
                    :expanded.sync="expanded"
                    :items-per-page="5"
                    item-key="id"
                    show-expand
                    class="table-style"
                  >
                    <template v-slot:top>
                      <v-toolbar
                        flat
                        rounded
                        height="50px"
                        class="toolbar-style"
                      >
                        <v-toolbar-title class="toolbar-title-spacing pr-5"
                          >Complete Permit Timeline ({{
                            permits.length
                          }})</v-toolbar-title
                        >

                        <v-chip class="mr-5" v-if="permits.length > 0">{{ getDateRange }}</v-chip>
                        Most Active Year <v-chip style="margin-left:10px">{{ getMostActiveByCount }}</v-chip>
                        <v-spacer></v-spacer>
                        <v-text-field
                          class="search-style"
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search Permits"
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-toolbar>
                    </template>
                    <template v-slot:[`item.type`]="{ item }">
                      <span style="font-size: 16px; font-weight: 600">{{
                        item.type
                      }}</span>
                    </template>

                    <template v-slot:[`item.effectiveDate`]="{ item }">
                      <span>{{
                        item.effectiveDate != null ? formattedDate(item.effectiveDate) : "N/A"
                      }}</span>
                    </template>
                    
                    <!-- <template v-slot:[`item.status`]="{ item }">
                      <v-chip
                        :color="getColor(item.status)"
                        dark
                      >
                        {{ item.status }}
                      </v-chip>
                    </template> -->

                    <template v-slot:expanded-item="{ headers, item }">
                      <td :colspan="headers.length">
                        <v-container class="details-container">
                          <v-row justify="center">
                            <v-col cols="10">
                              <v-row>
                                <v-col cols="5">
                                  <v-row>
                                    <v-col cols="4">Permit Type: </v-col
                                    ><v-col
                                      cols="8"
                                      style="font-weight: bold"
                                      >{{ item.type != null ? item.type : "N/A" }}</v-col
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-col cols="4">Effective Date: </v-col
                                    ><v-col
                                      cols="8"
                                      style="font-weight: bold"
                                      >{{ item.effectiveDate != null ? formattedDate(item.effectiveDate) : "N/A" }}</v-col
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-col cols="4">Status: </v-col
                                    ><v-col
                                      cols="8"
                                      style="font-weight: bold"
                                      >{{ item.status != null ? item.status : "N/A" }}</v-col
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-col cols="4">Permit #: </v-col
                                    ><v-col
                                      cols="8"
                                      style="font-weight: bold"
                                      >{{ item.permitNumber != null ? item.permitNumber : "N/A" }}</v-col
                                    >
                                  </v-row>
                                </v-col>
                                <v-col cols="7">
                                  <v-row>
                                    <v-col cols="3">Project Type: </v-col
                                    ><v-col
                                      cols="9"
                                      style="font-weight: bold"
                                      >{{ item.projectType != null ? item.projectType : "N/A" }}</v-col
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-col cols="3">Description: </v-col
                                    ><v-col
                                      cols="9"
                                      style="font-weight: bold"
                                      >{{ item.description != null ? item.description : "N/A" }}</v-col
                                    >
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-container>
                      </td>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
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
import moment from "moment";

export default {
  name: "PermitScoreSummary",
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
      search: "",
      expanded: [],
      expandedRecent: [],
      singleExpand: false,
      isExpanded: false,
      permitHeaders: [
        { text: "", align: "start", sortable: true, value: "type" },
        { text: "", value: "effectiveDate", sortable: true },
        { text: "", value: "status", sortable: true },
        { text: "", value: "data-table-expand" },
      ],
      recentPermitHeaders: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "type",
          class: "data-table-header-style",
        },
        {
          text: "Description",
          value: "description",
          class: "data-table-header-style",
        },
        // {
        //   text: "Hazard Level",
        //   value: "status",
        //   sortable: true,
        //   class: "data-table-header-center",
        // },
        {
          text: "Date",
          value: "effectiveDate",
          class: "data-table-header-style",
        },
        {
          text: "Expand",
          value: "data-table-expand",
          class: "data-table-header-center",
        },
      ],
      permits: [],
      recentermits: [],
    };
  },
  created() {
    this.permits = this.reportData.buildingPermits.results;
    var index = 0;
    //create index required for datatable, there is no value gaurenteed to be unique as-is
    this.permits.forEach((x) => {
      x.id = index++;
    });

    //use "cutoffDate" which is defined in Azure and returned in the report reponse.  If this is ont present, default to 2 years
    var filterDate = null;
    if (this.reportData.cutoffDate != null) {
      filterDate = moment(this.reportData.cutoffDate, "M-DD-YYYY hh:mm:ss");
    }
    else {
      filterDate = moment().subtract(2, "years");
    }

    //make sure dates are pre-sorted by date
    this.permits = this.permits.sort((a,b) => new Date(a.effectiveDate) - new Date(b.effectiveDate));
    //find "permits of interest" - permits between today and the supplied cutoff date
    this.recentPermits = this.permits.filter(
      (x) => moment(x.effectiveDate) > filterDate
    );
  },
  methods: {
    formattedDate(date) {
      return moment(date).format("MM/DD/YYYY");
    },
    expandRecentItem(item) {
      const index = this.expandedRecent.indexOf(item);
      if (index === -1) {
        this.expandedRecent.push(item);
      } else {
        this.expandedRecent.splice(index, 1);
      }
    },
    getColor(status) {
      if (status == "complete") {
        return "green";
      }
      else {
        return "red";
      }
    }
  },
  computed: {
    getMostActiveByCount() {
      return this.reportData.mostActiveYearByCount != null && this.reportData.mostActiveYearByCount != ""
      ? this.reportData.mostActiveYearByCount
      : "N/A";
    },
    getDateRange() {
      //permits are already sorted by date, get beginning and end of date range (year)
      var permitList = this.permits; //searching copy to prevent side-effects in a computed function error
      var mostRecentPermitDate = permitList.find(el => el.effectiveDate != null).effectiveDate;
      var earliestPermitDate = permitList.reverse().find(el => el.effectiveDate != null).effectiveDate;
      return moment(mostRecentPermitDate).format('YYYY') + ' - ' + moment(earliestPermitDate).format('YYYY');
    },
    tooltipText() {
      return "Permit Score represents the frequency and nature of work performed at property in given period. The score range is 0-100, a higher score indicates lesser number of permits leading to lower changes in property characteristics.";
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
  height: 50px;
}

::v-deep
  .simple-table-style
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  border-bottom: thin solid rgba(#e0e0e0, 0.04) !important;
}

::v-deep
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th
  > span {
  background-color: #fff !important;
}

.data-table-header-center {
  text-align: center !important;
}

::v-deep .simple-table-style tr:nth-of-type(odd) :not(.custom-header) {
  background-color: #eaeaea !important;
}

.table-style tr td {
  border-bottom: 0 !important;
}

::v-deep .v-toolbar__content {
  padding-left: 0px !important;
}

::v-deep .text-start .first-col {
  font-size: 16px;
  font-weight: 800;
}

::v-deep
  .v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: inset 0px 3px 8px -7px rgb(50 50 50 / 40%),
    inset 0px 1px 7px -3px rgb(50 50 50 / 76%);
}

.toolbar-title-spacing {
  font-size: 16px;
  font-weight: bold;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 16px;
  color: #000;
  font-weight: 600;
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
</style>