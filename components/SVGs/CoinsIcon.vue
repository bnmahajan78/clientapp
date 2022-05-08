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
        :class="color"
        d="M4.125,7.5a.375.375,0,1,1-.375.375A.375.375,0,0,1,4.125,7.5"
      ></path>
      <path
        :class="color"
        d="M16.875,12.75a.375.375,0,1,1-.375.375.375.375,0,0,1,.375-.375"
      ></path>
      <rect
        :class="color"
        x="0.75"
        y="4.5"
        width="19.5"
        height="12"
        rx="1.5"
        ry="1.5"
      ></rect>
      <circle :class="color" cx="10.5" cy="10.5" r="3"></circle>
      <path :class="color" d="M23.25,9v9a1.5,1.5,0,0,1-1.5,1.5H5.25"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: "CoinsIcon",
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
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5px;
}
</style>