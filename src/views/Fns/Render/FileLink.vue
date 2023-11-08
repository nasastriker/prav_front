<template>
  <a v-if="params.data.status===4 || params.data.status===5" v-auth-href :href="url">{{ params.value }}</a>
  <span v-else>{{ params.value }}</span>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import VueAuthHref from 'vue-auth-href'
    import Vue from "vue";
    const options = {
      token: () => `${localStorage.getItem('accessToken')}`
    }
    Vue.use(VueAuthHref, options)
    export default {
        mounted(){},
        computed: {
            ...mapGetters(['']),
          url(){
            return '/fns_err_file/?id_fns='+this.params.data.id;
          }
        },
    }
</script>

<style lang="scss" scpoped>
</style>
