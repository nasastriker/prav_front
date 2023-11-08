/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'

Vue.use(Vuesax)

import $ from "jquery";

// axios
import axios from './axios.js'
Vue.prototype.$http = axios
window.axios = require('axios');
import VueResource from 'vue-resource';

// telling vue.js to use this package
Vue.use(VueResource);
const token = localStorage.getItem('accessToken')
let token1 = $('meta[name="csrf-token"]').attr('content');
if (token1) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token1.content;
} else {

}
if (token) {
    window.axios.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('accessToken')}`
    Vue.http.interceptors.push((request, next) => {
        request.headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
        next();
    });

}

// API Calls
import './http/requests'


// Theme Configurations
import '../themeConfig.js'


// Firebase
//import '@/firebase/firebaseConfig'


// Auth0 Plugin
import AuthPlugin from './plugins/auth'
Vue.use(AuthPlugin)

import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
    name: '_blank',
    specs: [
        'fullscreen=no',
        'titlebar=no',
        'scrollbars=no'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
}
Vue.use(VueHtmlToPaper, options);



// ACL
import acl from './acl/acl'


// Globally Registered Components
import './globalComponents.js'


// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'


// Vuexy Admin Filters
import './filters/filters'


// Clipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


// Tour
import VueTour from 'vue-tour'
Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')


import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, { Validator } from 'vee-validate';

import VueCookie from 'vue-cookie';
// Tell Vue to use the plugin
Vue.use(VueCookie);


// Install the Plugin.
Vue.use(VeeValidate);

// Localize takes the locale object as the second argument (optional) and merges it.
Validator.localize('ru', ru);

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: 'AIzaSyB4DDathvvwuwlwnUu7F4Sow3oU22y5T1Y',
    libraries: 'places' // This is required if you use the Auto complete plug-in
  }
})

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

import AsyncComputed from 'vue-async-computed'

/* Initialize the plugin */
Vue.use(AsyncComputed)
// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('@assets/css/iconfont.css')




import Echo from 'laravel-echo';
import VueEcho from 'vue-echo';
window.io = require('socket.io-client');

let name=window.location.protocol+'//'+window.location.hostname
const EchoInstance = new Echo({
    broadcaster: 'socket.io',
    host: name + ':6001',
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    },
});

Vue.use(VueEcho, EchoInstance);

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
import r from './route';



Vue.config.productionTip = false

new Vue({
  router,
  r,
  axios,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount('#app')
