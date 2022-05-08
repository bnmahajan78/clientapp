<template>
  <v-container class="py-0">
    <v-card id="header" class="mx-auto mb-3" max-width="1200" elevation="0">
      <v-row align="center" class="mt-6">
        <v-col cols="2" align="center">
          <v-avatar id="avatar" size="162" color="white">
            <img alt="address image" :src="headerImage" />
          </v-avatar>
        </v-col>
        <v-col cols="10">
          <v-card-title class="text-h4">Property Intelligence</v-card-title>
          <v-card-subtitle class="text-h6 mt-0">
            <a href="#" style="text-decoration: none; color: #005dff"
              ><building-icon style="margin-right: 12px"></building-icon
              >{{ computeFullAddress }}</a
            >
          </v-card-subtitle>
          <v-card-text id="headerDetails">
            <p class="mb-1">Date generated: <span class="gen-date">{{dateGenerated}}</span></p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import BuildingIcon from "./SVGs/BuildingIcon.vue";
import moment from 'moment';

export default {
  name: "MainHeader",
  props: {
    assessmentData: {
      type: Object,
      default: () => ({}),
    }
  },
  components: { BuildingIcon },
  data() {
    return {};
  },
  methods: {},
  computed: {
    computeFullAddress() {
      var address =
        this.assessmentData.locationAssessmentServiceRequest.address;
      let street = address.addressLine1;
      let city = address.cityOrLocality;
      let state = address.stateOrAdministrativeArea;
      let zip = address.zipOrPostalCode;

      return street + ", " + city + ", " + state + " " + zip;
    },
    headerImage() {
      //grab first aerial image if available, else the first image regardless of type
      if (this.assessmentData.dataScienceResponse.photos != null && this.assessmentData.dataScienceResponse.photos.length > 0) {
        var aerialPhotos = this.assessmentData.dataScienceResponse.photos.filter(p => p.settings.photoType == "aerial");
        if(aerialPhotos.length > 0) {
          return aerialPhotos[0].url;
        } else {
          return this.assessmentData.dataScienceResponse.photos[0].url;
        }
      } else {
        return "" //return some sort of stock image url...
      }
    },
    dateGenerated() {
      let date = this.assessmentData.locationAssessmentServiceResponse.summary.dateGenerated;
      return moment(date).format('MM/DD/YYYY');
    }
  },
};
</script>

<style>
#header {
  background-color: #f5f5f5;
}

#headerDetails {
  font-size: 1rem;
  margin-bottom: 20px;
}

.header-title {
  font-size: 2rem !important;
}

#avatar {
  box-shadow: #00000029 0px 3px 6px;
}

#avatar img {
  border: 5px solid #fff;
}

.gen-date {
  font-weight: 600;
}
</style>