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
        d="M14.25,16.5H13.5A1.5,1.5,0,0,1,12,15V11.25a.75.75,0,0,0-.75-.75H10.5"
        :class="color"
      ></path>
      <path
        d="M11.625,6.75A.375.375,0,1,0,12,7.125a.375.375,0,0,0-.375-.375h0"
        :class="color"
      ></path>
      <path
        d="M0.750 12.000 A11.250 11.250 0 1 0 23.250 12.000 A11.250 11.250 0 1 0 0.750 12.000 Z"
        :class="color"
      ></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: "InfoIcon",
  props: {
    color: {
      type: String,
      default: "blue",
      required: false,
    },
    strokeWidth: {
      type: Number,
      default: 2,
      required: false,
    },
    width: {
      type: Number,
      default: 16.5,
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
.blue {
  fill: none;
  stroke: #005dff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5px;
}
</style>