<template>
    <vx-card no-shadow>

        <template v-if="status==2">
            <RefinePodsuAddress :id_deb=Number(this.$route.params.id)></RefinePodsuAddress>

        </template>
        <template v-if="status>90">
            <RefinePodsuAddress :id_deb=Number(this.$route.params.id)></RefinePodsuAddress>

        </template>

        <template v-if="status==4">
            <RefineAddress :id_deb=Number(this.$route.params.id)></RefineAddress>

        </template>

        <template v-if="status==5">
            <RefineAddress :id_deb=Number(this.$route.params.id)></RefineAddress>

        </template>
        <template v-if="status==6">
            <RefinePodsuAddress :id_deb=Number(this.$route.params.id)></RefinePodsuAddress>

        </template>
        <template v-if="status==3">
            <RefineBankrot :id_deb=Number(this.$route.params.id)></RefineBankrot>

        </template>
        <template v-if="status==1">
            <RefineAddress :id_deb=Number(this.$route.params.id)></RefineAddress>

        </template>

    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../axios'
    import RefinePodsud from './RefinePodsud.vue'
    import RefineBankrot from './RefineBankrot.vue'
    import RefineAddress from './RefineAddress.vue'
    import RefinePodsuAddress from './RefinePodsuAddress.vue'
    export default {
        components: {
            RefinePodsud,
            RefineBankrot,
            RefineAddress,
            RefinePodsuAddress,

        },
        data () {
            return {
                status:0,
            }
        },
        mounted(){

                    this.getStatus(this.$route.params.id);

        },

        computed: {


        },
        methods: {
            getStatus(id){
                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getStatus',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.status=response.data.data
                    }



                })
            },


        },
    }
</script>
