<template>
  <v-dialog style="background-color:#272727; overflow-x:hidden !important;" dark fullscreen v-model="show">
    <!-- <v-dialog style="background-color:#272727" fullscreen v-model="show"> -->

    <v-toolbar flat>
      <v-btn icon dark @click="show = false">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid pa-0>
      <v-row no-gutters align="center" justify="center">
        <v-col cols="12" style="padding-right:0px !important">
          <v-card color="#272727" tile flat>

          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" style="text-align: center;">

               <v-carousel height="calc(100vh - 128px)" hide-delimiters>
                <template v-slot:prev="{ on, attrs }">
                  <v-btn
                    :exact="true"
                    fab
                    class="arrow-icon"
                    v-bind="attrs"
                    v-on="on"
                    @click="previousInSet"
                  >
                    <v-icon large>mdi-chevron-left</v-icon>
                  </v-btn>
                </template>

                <template v-slot:next="{ on, attrs }">
                  <v-btn
                    fab
                    class="arrow-icon"
                    large
                    v-bind="attrs"
                    v-on="on"
                    @click="nextInSet"
                  >
                    <v-icon large>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>
                <v-carousel-item
                  class="carousel-item-size pb-5"
                  transition="scroll-x-transition"
                  reverse-transition="scroll-x-reverse-transition"
                  v-for="photo in photoCollection"
                  :key="photo.photoId"
                >
                  <v-img :src="currentImage" contain class="carousel-img-sizing">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-carousel-item>

              </v-carousel> 

            </v-col>
          </v-row>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-toolbar flat>

    </v-toolbar>
  </v-dialog>
</template>

<script>
export default {
  name: "PhotoModal",
  props: {
    value: Boolean,
    photoCollection: {
      type: Array,
      default: () => [],
    },
    activeImage: {
      type: Number,
      default: () => 0,
    },
  },
  components: {},
  data() {
    return {
      activeIndex: this.activeImage,
    };
  },
  created() {
    this.activeIndex = this.activeImage;
  },
  methods: {
    nextInSet() {
      var active = this.activeIndex + 1;
      if (active >= this.photoCollection.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    previousInSet() {
      var active = this.activeIndex - 1;
      if (active < 0) {
        active = this.photoCollection.length - 1;
      }
      this.activateImage(active);
    },
    activateImage(imageIndex) {
      this.activeIndex = imageIndex;
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    currentImage() {
      return this.photoCollection[this.activeIndex].url;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-bg {
  background-color: #272727 !important;
  border: 1px solid #e0e0e0 !important;
}

btn-position {
  text-align: left;
}

.carousel-item-size {
  margin: auto;
  width: 88%;
}

.v-dialog--fullscreen {
  overflow-x:hidden !important;
}
</style>