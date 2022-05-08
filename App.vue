<template>


  <v-app :class="isListViewComputed ? 'list-view-wrapper' : ''" id="app">
    <v-container fluid :class="isListViewComputed ? 'list-view-container' : ''">
      <v-main>
               <app-header />
        <router-view/>
          <!--  
         <HelloWorld  msg="Welcome to Your Vue.js from App.vue "/>
          <GaugeGenerator inputScore="60"  />
        <GaugeComponent inputScore="60"  />
        <LocationAssessmentService />
      <PhotoGallery/>
      <PhotoModal/>
      <TabbedContent></TabbedContent>
        <app-footer />
        -->
      </v-main>
    </v-container>
    
  </v-app>

  
  
</template>
 
<script>
/*
 import HelloWorld from './components/HelloWorld.vue'
 import AppHeader from '@/components/AppHeader.vue'
 import AppFooter from '@/components/AppFooter.vue'
 import GaugeGenerator from './components/GaugeGenerator.vue';
import GaugeComponent from './components/GaugeComponent.vue';
import LocationAssessmentService from './components/LocationAssessmentService.vue';
 import PhotoGallery from './components/PhotoGallery.vue';
import PhotoModal from './components/PhotoModal.vue';
*/

export default {
  name: "App",

  components: {
    /*
    HelloWorld,
    AppHeader,
    AppFooter,
    GaugeGenerator,
    GaugeComponent,
    LocationAssessmentService,
    PhotoGallery,
    PhotoModal
    */

},
  data() {
    return {

    };
  },
  methods: {},
  computed: {
    isListViewComputed() {
      if(this.$router.history.current.path == "/listView") {
        return true;
      }
      else {
        return false;
      } 
    }
  },
  mounted() {

  },
  
};


</script>



<style>


#app1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  
#app {
  background-color: var(--v-background-base);
}

.theme--light.v-sheet {
  color: #000;
}

/**
* add overflow-y and padding overrides for iframe list 
**/
html {
  overflow-y: auto !important;
}

.list-view-container {
  padding:0px !important;
}

.list-view-wrapper .v-application--wrap{
  min-height: 100px !important; 
}

</style>

