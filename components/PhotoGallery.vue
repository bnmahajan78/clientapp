<template>
  <v-card tile class="mx-auto px-5 py-5" max-width="1200" elevation="4">
    <v-card-title class="card-title">Photo Gallery</v-card-title>

    <div class="galleryTabs">
      <v-tabs v-model="photoTab">
        <v-tab
          v-for="photoType in photoCategories"
          :key="photoType"
          @click="changeCategory(photoType)"
          >{{ photoType }}</v-tab
        >
      </v-tabs>
    </div>

    <v-row class="mx-auto px-0 pt-4 pb-2">
      <v-col cols="12" sm="9">
        <div class="main-image-panel">
          <v-btn
            v-if="!isZoomed"
            @click="zoom(1)"
            color="#000000AB"
            width="44px"
            height="44px"
            fab
            class="zoom"
            ><v-icon>mdi-magnify-plus-outline</v-icon></v-btn
          >
          <v-btn
            v-if="isZoomed"
            @click="zoom(-1)"
            color="#000000AB"
            width="44px"
            height="44px"
            fab
            class="zoom"
            ><v-icon>mdi-magnify-minus-outline</v-icon></v-btn
          >
          <v-btn
            @click.stop="showLightbox = true"
            color="#000000AB"
            width="44px"
            height="44px"
            fab
            class="expand"
            ><v-icon>mdi-arrow-expand</v-icon></v-btn
          >
          <v-btn color="#000000AB" width="44px" height="44px" fab class="count"
            ><span class="count-text"
              >{{ activeImage + 1 }}/{{ activePhotoCollection.length }}</span
            ></v-btn
          >

          <div class="overlay"></div>
          <v-carousel hide-delimiters>
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

            <div id="panzoom-element">
              <v-carousel-item
                contain eager
                v-for="photo in activePhotoCollection"
                :key="photo.photoId"
              >
                <v-img eager :src="currentImage" contain class="carousel-img-sizing">
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
            </div>
            
          </v-carousel>
        </div>
      </v-col>

      <v-col cols="12" sm="3" class="px-0 thumbnails">
        <v-row no-gutters class="d-flex justify-space-between">
          <v-col class="thumbnail-col"
            cols="4"
            lg="4"
            md="6"
            sm="6"
            v-for="(photo, index) in activePhotoCollection"
            :key="photo.photoId"
            :class="['thumbnail-panel', activeImage == index ? 'active' : '']"
            @click="activateImage(index)"
          >
            <img :src="photo.thumbnailUrl" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <photo-modal
      v-if="showLightbox == true && activePhotoCollection.length > 0"
      :photoCollection="activePhotoCollection"
      :activeIndex="activeImage"
      v-model="showLightbox"
    />
  </v-card>
</template>

<script>
import PhotoModal from "./PhotoModal.vue";
import Panzoom from "@panzoom/panzoom";

export default {
  name: "PhotoGallery",
  props: {
    assessmentData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { PhotoModal },
  created: function () {
    this.loadPhotos();
  },
  data() {
    return {
      showLightbox: false,
      activeImage: 0,
      photoCategories: [],
      activePhotoCollection: [],
      photoTab: null,
      isZoomed: false,
    };
  },
  methods: {
    loadPhotos() {
      this.photos = this.assessmentData.dataScienceResponse.photos;
      this.photoCategories = [
        ...new Set(this.photos.map((photo) => photo.settings.photoType)),
      ];
      this.activePhotoCollection = this.photos.filter(
        (x) => x.settings.photoType == this.photoCategories[0]
      );
    },
    activateImage(imageIndex) {
      this.panzoom.reset();
      this.isZoomed = false;
      this.activeImage = imageIndex;
    },
    nextInSet() {
      this.panzoom.reset();
      this.isZoomed = false;
      var active = this.activeImage + 1;
      if (active >= this.activePhotoCollection.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    previousInSet() {
      this.panzoom.reset();
      this.isZoomed = false;
      var active = this.activeImage - 1;
      if (active < 0) {
        active = this.activePhotoCollection.length - 1;
      }
      this.activateImage(active);
    },
    changeCategory(category) {
      //filter active image collection by selected category
      this.activeImage = 0;
      this.activePhotoCollection = this.photos.filter(
        (x) => x.settings.photoType == category
      );
    },
    zoom(level) {
      if (level === -1) {
        this.panzoom.setOptions({ cursor: 'default'})
        this.panzoom.zoomOut();
        this.panzoom.reset();
      } else {
        this.panzoom.setOptions({ cursor: 'move'})
        this.panzoom.zoomIn();
      }

      this.isZoomed = !this.isZoomed;
    },
  },
  computed: {
    currentImage() {
      return this.activePhotoCollection[this.activeImage].url;
    },
  },
  mounted() {
    this.panzoom = Panzoom(document.getElementById("panzoom-element"), {
      maxScale: 5,
      step: 0.8,
      panOnlyWhenZoomed: true,
      contain: 'outside',
      cursor: "default"
    });
  },
};
</script>

<style lang="scss" scoped>
.thumbnails {
  height:500px;
  overflow-y: auto;
}

.thumbnail-panel img {
  width: 85px;
  object-fit: cover;
  border-radius: 4px;
}

.thumbnail-panel img:hover {
  cursor: pointer;
  border: 2px solid #005dff;
}

.active img {
  border: 2px solid #005dff;
}

.main-image-panel {
  position: relative;
  width: 100%;
  object-fit: cover;
}

.v-tabs {
  border-bottom: 1px solid #e0e0e0 !important;
  margin-bottom: 5px;
}

.v-tab {
  text-transform: capitalize;
}

.galleryTabs {
  padding: 0 12px !important;
}

.overlay {
  height: 100%;
  width: 100%;
  opacity: 0;
  background-color: #272727;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 0.3s ease;
}

position-icons {
  position: absolute;
}

.zoom {
  z-index: 2;
  position: absolute;
  top: 22px;
  right: 146px;
  color: #ffffff;
}

.expand {
  z-index: 2;
  position: absolute;
  top: 22px;
  right: 85px;
  color: #ffffff;
}

.count {
  z-index: 2;
  position: absolute;
  top: 22px;
  right: 24px;
  color: #ffffff;
}

.count-text {
  font-size: 15px;
}
</style>

<style>
.arrow-icon {
  height: 50px !important;
  width: 50px !important;
  background: #ffffff !important;
  color: #000 !important;
}

.arrow-icon:focus::before {
  opacity: 0 !important;
}

.carousel-img-sizing {
  height: 100%;
  width: auto;
}
</style>