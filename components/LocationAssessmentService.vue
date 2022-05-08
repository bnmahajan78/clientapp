<template>
  <div>
    <v-app-bar app color="#ffffff" light>
      <div class="d-flex align-center">
        <v-img
          :src="require('@/assets/majesco-social-logo-optimized.png')"
          alt="Majesco Logo"
          class="shrink mx-2"
          contain
          transition="scale-transition"
          width="150"
        />
      </div>
    </v-app-bar>

    <v-row align="center" justify="center" v-if="loading">
      <v-col cols="2">
        <div class="loader">
          <div class="loader-text">Loading...</div>
          <v-progress-circular
            indeterminate
            :size="50"
            :width="5"
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    
    <main-header
      v-bind:assessmentData="assessmentData"
      v-if="assessmentData.locationAssessmentServiceRequest != undefined && !loading"
    ></main-header>
    <tabbed-content
      v-bind:assessmentData="assessmentData"
      v-if="assessmentData.locationAssessmentServiceRequest != undefined && !loading"
    ></tabbed-content>

    <v-footer
      app
      padless
      class="font-weight-medium"
      style="border-top: 1px solid #e0e0e0"
    >
      <v-row justify="center">
        <v-col class="text-center" cols="12 my-3">
          &copy; 2022 Majesco |
          <a href="#" style="text-decoration: none; color: #000"
            >Terms and Conditions</a
          >
          |
          <a href="#" style="text-decoration: none; color: #000"
            >Privacy Policy</a
          >
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import MainHeader from "./MainHeader.vue";
import TabbedContent from "./TabbedContent.vue";
const axios = require("axios");

export default {
  name: "LocationAssessmentService",
  props: [],
  components: { MainHeader, TabbedContent },
  data() {
    return {
      loading: false,
      assessmentData: {},
      photos: [],
      error: null,
    };
  },
  methods: {},
  mounted() {
    this.loading = true;

    axios
      .get(
        "/api/LocationAssessment/" +
          this.$route.params.secret +
          "/" +
          this.$route.params.id +
          "/" +
          this.$route.params.zipcode
      )
      .then((response) => {
        this.assessmentData = response.data;
        // handle success response
      })
      .catch((error) => {
        console.log(error);
        this.loading = true;
        // handle error
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
  margin-top: 50%;
}

.loader-text {
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
