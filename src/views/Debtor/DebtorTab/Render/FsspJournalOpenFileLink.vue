<template>
  <div>
    <a v-if="params.value != null" v-auth-href :href="url">Файл</a>
    <span v-else style="color: #c2c2c2">Файл</span>
  </div>
</template>

<script>
import VueAuthHref from 'vue-auth-href';
import Vue from "vue";

const options = {
  token: () => `${localStorage.getItem('accessToken')}`
}
Vue.use(VueAuthHref, options)
export default {
  computed: {
    url() {
      return '/fssp_gu_req_file/?id_req=' + this.params.data.id;
    }
  },
}
</script>

<style lang="scss" scpoped>
</style>
