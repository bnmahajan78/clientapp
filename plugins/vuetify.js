import Vue from 'vue';
//import Vuetify from 'vuetify/lib/framework';
import Vuetify from 'vuetify';

//cusotmize theme here...
const vuetify = new Vuetify({
    theme: {
        themes: {
             light: {
                 primary: '#005dff',
                 background: '#F5F5F5',
             },
        },
        options: {
            customProperties: true
        },
    }, 
  })

Vue.use(Vuetify);

export default vuetify

// export default new Vuetify({
//     theme: {}
// });
