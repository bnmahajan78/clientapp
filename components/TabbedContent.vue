<template>
  <v-container class="pt-0 px-0">
    <v-card class="mx-auto" max-width="1200" elevation="0">
      <v-tabs
        id="tabs"
        v-model="tab"
        background-color="var(--v-background-base)"
        height="50"
        slider-color="#005dff"
        slider-size="4"
      >
        <v-tab
          class="tab"
          v-for="selectedTab in tabs"
          :key="selectedTab.name"
          >{{ selectedTab.name }}</v-tab
        >
      </v-tabs>
    </v-card>

    <v-card
      class="mx-auto mt-3"
      max-width="1200"
      elevation="0"
      v-if="assessmentData != undefined"
    >
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="selectedTab in tabs" :key="selectedTab.name">
          <v-container class="tab-content-container px-1">
            <component
              v-bind:is="selectedTab.component"
              :photos="photos"
              :assessmentData="assessmentData"
            ></component>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import OverviewContent from "@/components/Overview/OverviewContent.vue";
import PhotoGallery from "@/components/PhotoGallery.vue";

export default {
  name: "TabbedContent",
  props: {
    assessmentData: {
      type: Object,
      default: () => ({}),
    },
    photos: {
      type: Array,
      default: () => [],
    },
  },
  components: { OverviewContent, PhotoGallery },
  data() {
    return {
      tab: null,
      tabs: [
        { name: "Overview", component: "OverviewContent" },
        { name: "Photo Gallery", component: "PhotoGallery" }
      ],
    };
  },
  methods: {},
};
</script>

<style>
.tab {
  text-transform: none !important;
}

#tabs {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.tab-content-container {
  background-color: var(--v-background-base);
}

.v-application .elevation-3 {
  box-shadow: 0px 3px 6px #00000029;
}

.v-tab:not(.v-tab--active) {
  color: #000 !important;
  font-weight: normal;
}
</style>