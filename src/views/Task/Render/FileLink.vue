<template>
    <a v-auth-href :href="url">{{ params.value }}</a>
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
            return '/task_upload/?id_task='+this.params.data.id;
          }
        },
    }
</script>

<style lang="scss" scpoped>
</style>
