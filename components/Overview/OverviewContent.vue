<template>
  <div>
    <!-- main score card -->
    <assessment-score-card
      :assessmentData="assessmentData"
    ></assessment-score-card>
    <!-- assessment card with dynamic inner content -->
    <assessment-details-card
      :assessmentData="assessmentData"
    ></assessment-details-card>
  </div>
</template>

<script>
import AssessmentScoreCard from "@/components/Overview/AssessmentScoreCard.vue";
import AssessmentDetailsCard from "@/components/Overview/AssessmentDetailsCard.vue";

export default {
  name: "OverviewContent",
  props: {
    assessmentData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { AssessmentScoreCard, AssessmentDetailsCard },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>