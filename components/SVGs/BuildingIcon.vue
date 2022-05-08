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
        :stroke-width="strokeWidth"
        d="M3.8 3.8h16.4m-16.4 0h16.5v19.5H3.8zm16.4 19.4H3.8M20.2 3.8H3.8l1.4-3h13.6zM.8 23.2h22.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M14.2 21c0-1.2-1-2.2-2.2-2.2s-2.2 1-2.2 2.2v2.2h4.5V21zM7.5 6.4c.2 0 .4.2.4.4m-.8 0c0-.2.2-.4.4-.4m0 .7c-.2 0-.4-.1-.4-.3"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M7.9 6.8c0 .2-.2.4-.4.4m0 3.7c.2 0 .4.2.4.4m-.8-.1c0-.2.2-.4.4-.4m0 .8c-.2 0-.4-.2-.4-.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M7.9 11.2c0 .2-.2.4-.4.4m0 3.8c.2 0 .4.2.4.4m-.8 0c0-.2.2-.4.4-.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M7.5 16.1c-.2 0-.4-.2-.4-.4h0m.8.1c0 .2-.2.4-.4.4h0M12 6.4c.2 0 .4.2.4.4m-.8 0c0-.2.2-.4.4-.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M12 7.1c-.2 0-.4-.2-.4-.4m.8.1c0 .2-.2.4-.4.4m0 3.7c.2 0 .4.2.4.4m-.8-.1c0-.2.2-.4.4-.4m0 .8c-.2 0-.4-.2-.4-.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M12.4 11.2c0 .2-.2.4-.4.4m0 3.8c.2 0 .4.2.4.4m-.8 0c0-.2.2-.4.4-.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M12 16.1c-.2 0-.4-.2-.4-.4h0m.8.1c0 .2-.2.4-.4.4h0m4.5-9.8c.2 0 .4.2.4.4m-.8 0c0-.2.2-.4.4-.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M16.5 7.1c-.2 0-.4-.2-.4-.4m.8.1c0 .2-.2.4-.4.4m0 3.7c.2 0 .4.2.4.4m-.8-.1c0-.2.2-.4.4-.4m0 .8c-.2 0-.4-.2-.4-.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M16.9 11.2c0 .2-.2.4-.4.4m0 3.8c.2 0 .4.2.4.4m-.8 0c0-.2.2-.4.4-.4"
      ></path>
      <path
        :class="color"
        :stroke-width="strokeWidth"
        class="st0"
        d="M16.5 16.1c-.2 0-.4-.2-.4-.4h0m.8.1c0 .2-.2.4-.4.4h0"
      ></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: "BuildingIcon",
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
.blue {
  fill: #fff;
  stroke: #005dff;
}
</style>