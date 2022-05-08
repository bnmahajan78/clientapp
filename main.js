
//import { createApp } from 'vue'
import Vue from 'vue';
import App from './App.vue';
import AssessmentList from './components/AssessmentList.vue';
import LocationAssessmentService from './components/LocationAssessmentService.vue';

import vuetify from './plugins/vuetify';
//import vuetify from 'vuetify';

import VueRouter from 'vue-router';
import VueBingMaps from 'vue-bing-maps'

Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.use(VueBingMaps); // set debug = true here for dev only...

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
        path: '/:secret/:id/:zipcode', component: LocationAssessmentService
    },
    {
       path: '/listView', component: AssessmentList
    }
  ]
});

//createApp(App).mount('#app1')

  


new Vue({
  vuetify, router,
  render: h => h(App)
})
.$mount('#app')