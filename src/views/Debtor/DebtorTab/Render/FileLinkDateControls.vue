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
            return '/document/credit/?filename='+this.params.value+'&id_credit='+this.params.data.id_credit
                +'&id_doc='+this.params.data.doc_id;
          }
        },
    }
</script>

<style lang="scss" scpoped>
</style>
