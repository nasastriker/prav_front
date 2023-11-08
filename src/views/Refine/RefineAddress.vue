<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>

            <vs-tab :label="labl">
              <Debtor></Debtor>
            </vs-tab>
            <template v-if="credits.length>0">


                    <vs-tab :label="' №'+item.number_dog" v-for="item in credits" :key="item.id"  >
                        <DebtorID :idDep="item.id"></DebtorID>
                    </vs-tab>



            </template>

        </vs-tabs>

    </vx-card>
</template>

<script>
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import r from '../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../axios'
    import DebtorID from '../Debtor/DebtorID.vue'
    import Status from '../../components/Status.vue'
    import Jud from '../Debtor/Jud.vue'
    import Debtor from '../Debtor/DebtorTab/Debtor.vue'
    import VueSuggestions from 'vue-suggestions';
    import JsonViewer from 'vue-json-viewer'
    import Back from '../../components/Back.vue'
    export default {
        components: {
            VueSuggestions,
            DebtorID,
            Debtor,
            Jud,
            Back,
            Status,
            JsonViewer,
            ArrowLeftIcon
        },
        props:['id_deb'],
        data () {
            return {
                credits:[],
                labelPop:'Подсудность',
                ispl:[],
                popupActive:false,
                showJud:false,
                showIndex: null,

            }
        },
        mounted(){
            this.getDebtorOnlyCred(this.id_deb)
            if (this.$route.params.id){

                this.getData(this.$route.params.id);



            }
        },

        computed: {
            labl: function () {
              //  console.log(this.Deb)
              if(this.Deb.debtor.id_status==1){
                  return "Уточнить адрес"
              }
                if(this.Deb.debtor.id_status==2){
                    return "Уточнить подсудность"
                }
                return ''
            },
            ...mapGetters([
                'StatussDebtorArr','Deb', 'SuggestionOptionsAddress'

            ]),

        },
        methods: {
            getData(id){

                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getDebtorAndAllCredit',
                        param: id
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.credits=response.data.credit
                    }




                })
            },

            close(){

                this.$router.back()
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getDebtorOnlyCred'
            ]),

        },
    }
</script>
<style>
    .standart{
        color: #a9a7f0
    }
</style>
