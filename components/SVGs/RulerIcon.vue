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
        d="M.75,5.25v4.5a1.5,1.5,0,0,0,1.5,1.5h15v7.5a1.5,1.5,0,0,0,1.5,1.5h3a1.5,1.5,0,0,0,1.5-1.5v-15h-21A1.5,1.5,0,0,0,.75,5.25Z"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M17.25 11.25L23.25 3.75"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M3.75 9L3.75 11.25"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M8.25 9L8.25 11.25"
        :color="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M12.75 9L12.75 11.25"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M6 3.75L6 6"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M10.5 3.75L10.5 6"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M15 3.75L15 6"
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
  name: "RulerIcon",
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