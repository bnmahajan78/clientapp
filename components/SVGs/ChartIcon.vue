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
      <rect
        :class="color"
        x="1.51"
        y="2.253"
        width="21"
        height="19.5"
        rx="1.5"
        ry="1.5"
      ></rect>
      <line :class="color" x1="1.51" y1="6.753" x2="22.51" y2="6.753"></line>
      <circle :class="color" cx="9.01" cy="14.253" r="4.5"></circle>
      <polyline
        :class="color"
        points="9.01 9.753 9.01 14.253 12.192 17.435"
      ></polyline>
      <line :class="color" x1="16.51" y1="11.253" x2="19.51" y2="11.253"></line>
      <line :class="color" x1="16.51" y1="14.253" x2="19.51" y2="14.253"></line>
      <line :class="color" x1="16.51" y1="17.253" x2="19.51" y2="17.253"></line>
    </g>
  </svg>
</template>

<script>
export default {
  name: "ChartIcon",
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