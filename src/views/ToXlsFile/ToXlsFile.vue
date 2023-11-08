<template>
  <a v-auth-href :href="url">
    <feather-icon icon="FileTextIcon" svgClasses="h-5 w-5"/>
    Выгрузить в файл</a>
</template>

<script>
import Vue from 'vue'
import VueAuthHref from "vue-auth-href";

const options = {
  token: () => `${localStorage.getItem('accessToken')}`
}
Vue.use(VueAuthHref, options);
export default {
  props:['url_text'],
  computed: {
    url() {
      return this.url_text;
    }
  },
}
</script>
