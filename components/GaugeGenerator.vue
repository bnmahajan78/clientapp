<template>
  <v-card tile class="mx-auto px-5 py-5" max-width="1200" elevation="4">
    <v-card-title class="card-title">Gauge Generator</v-card-title>

    <v-row class="mx-auto px-0 py-2">
        <v-col cols="10">
            <gauge-component v-bind:score=inputScore></gauge-component>
        </v-col>
        <v-col cols="2">
            <v-row>
                <v-col>Score: <input type="text" v-model="inputScore" /></v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-card>
</template>

<script>
import GaugeComponent from './GaugeComponent.vue';

export default {
  name: "GaugeGenerator",
  props: [],
  components: { GaugeComponent },
  data() {
    return {
        inputScore: 60
    };
  },
  methods: {

  },
};
</script>

<style>

</style>