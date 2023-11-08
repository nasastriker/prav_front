<template>
    <a v-auth-href v-if="params.value" :href="url">{{ params.value }}</a>
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
            return '/gas_file/?id_appeal='+this.params.data.id+'&file_name='+this.params.value;
          }
        },
    }
</script>

<style lang="scss" scpoped>
</style>
