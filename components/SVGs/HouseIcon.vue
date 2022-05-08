<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    xml:space="preserve"
    :width="width"
    :height="width"
  >
    <g transform="matrix(2,0,0,2,0,0)">
      <path
        d="M2.25,9.4V21.75h4.5v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h10.5V9.4"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M23.25,10.5,12.887,2.9a1.5,1.5,0,0,0-1.774,0L.75,10.5"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M15.75 5L15.75 2.25 20.25 2.25 20.25 8.3"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M14.25 14.25H18.75V18.75H14.25z"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M0.75 21.75L23.25 21.75"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: "HouseIcon",
  props: {
    color: {
      type: String,
      default: "gray",
      required: false,
    },
    strokeWidth: {
      type: Number,
      default: 2,
      required: false,
    },
    width: {
      type: Number,
      default: 23,
      required: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.gray {
  fill: #fff;
  stroke: #bfbfbf;
}
</style>