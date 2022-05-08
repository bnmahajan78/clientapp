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
        d="M11.132,13.318a3.7,3.7,0,0,1,5.237-5.236L21.082,12.8a3.7,3.7,0,0,1,0,5.237l-2.1-2.1a3.967,3.967,0,0,0-5.237,0Z"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M5.876 0.975H9.579V8.381H5.876z"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        transform="translate(5.571 -4.094) rotate(45)"
      ></path>
      <path
        d="M10.608 4.416L13.227 7.034"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M7.466 7.558L10.084 10.176"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M10.308,12.048,2.3,20.059a1.836,1.836,0,0,0,2.6,2.6l7.787-7.788"
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
  name: "HammerIcon",
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
  stroke: #BFBFBF;
}
</style>