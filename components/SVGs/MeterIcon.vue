<template>
  <svg 
    viewBox="0 0 48 48" 
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="width">
    <g transform="matrix(2,0,0,2,0,0)">
      <path
        d="M12,4.5A11.336,11.336,0,0,0,.75,15.923V18a1.5,1.5,0,0,0,1.5,1.5h19.5a1.5,1.5,0,0,0,1.5-1.5v-2.08A11.336,11.336,0,0,0,12,4.5Z"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M9,19.5v-.75a3,3,0,0,1,6,0v.75"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M14.25 9.003L12 15.753"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M4.875 15.003L4.875 15.003"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M4.875,15a.375.375,0,1,0,.375.375A.375.375,0,0,0,4.875,15"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M6.375 11.253L6.375 11.253"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M6.375,11.253a.375.375,0,1,0,.375.375.375.375,0,0,0-.375-.375"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M19.125 15.003L19.125 15.003"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M19.125,15a.375.375,0,1,0,.375.375A.375.375,0,0,0,19.125,15"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M17.625 11.253L17.625 11.253"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M17.625,11.253a.375.375,0,1,0,.375.375.375.375,0,0,0-.375-.375"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M9.375 8.253L9.375 8.253"
        :class="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
      <path
        d="M9.375,8.253a.375.375,0,1,0,.375.375.375.375,0,0,0-.375-.375"
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
  name: "MeterIcon",
  props: {
    color: {
      type: String,
      default: "red",
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
.red {
  fill: #fff;
  stroke: #ff0000;
}
.green {
  fill: #fff;
  stroke: #0cbd01;
}
.yellow {
  fill: #fff;
  stroke: #ffde28;
}
</style>