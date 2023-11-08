<template>
    <vx-card no-shadow>
        <div class="mt-5">
            <div v-if="back" style="display: flex">
                <Back></Back>
            </div>
            <fieldset class="f" >
                <legend class="l">{{Deb.debtor.name_family}} {{Deb.debtor.name}} {{Deb.debtor.name_patronymic}} {{birthdate}}: <span style="color: red;cursor: pointer;" @click="copy">copy</span></legend>
                <Debtor></Debtor>
            </fieldset>
        </div>



    </vx-card>
</template>

<script>
    import moment from "moment";
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import VueDadata from 'vue-dadata'
    import Debtor from '../Debtor/DebtorTab/Debtor.vue';
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import Back from '../../components/Back.vue'
    import { RefreshCwIcon } from 'vue-feather-icons'
    Vue.use(AsyncComputed)
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true // add this line
    Vue.use(VueClipboard)
    export default {
        components: {
            VueSuggestions,
            'vue-dadata': VueDadata,
             Back,

            Debtor,

        },
        props: {
            idDep: {
                default: '',
                // type: Number
            },
            back:{
                default: true,

            },
            tabIndex:{
                default: 0,

            },
            from_fns_answers: null,
        },
        //props:['idDep','back'],
        data () {
            return {
                mutableList: JSON.parse(this.tabIndex),
                access_change_recover: false
            }
        },
        mounted(){

            this.getUserAccessChangeRecover().then((response) => {
                if (response.result) {
                    this.access_change_recover = response.granted;
                }
            });
            this.getDataShablonDocumentsLk();
            this.getDataStatuss()

            if (this.from_fns_answers==null) {
                if (this.$route.params.id) {
                    if (this.idDep) {

                        this.getDataDebtorsById(this.idDep);
                        this.getDataDebtorsByIdAll(this.idDep);
                    } else {
                        this.getDataDebtorsByIdAll(this.$route.params.id);
                        this.getDataDebtorsById(this.$route.params.id).then(() => {

                            this.getBanksListSudOrder(this.Deb.sudOrder.id);
                        })

                    }


                }
            }

        },

        asyncComputed: {

        },
        watch: {
            $route() {
                if (this.$route.params.id) {
                    if (this.idDep) {

                        this.getDataDebtorsById(this.idDep);
                        this.getDataDebtorsByIdAll(this.idDep);
                    } else {
                        this.getDataDebtorsByIdAll(this.$route.params.id);
                        this.getDataDebtorsById(this.$route.params.id).then(() => {

                            this.getBanksListSudOrder(this.Deb.sudOrder.id);
                        })

                    }


                }
            },

        },
        computed: {
            birthdate(){
                if(typeof this.Deb.debtor.birthdate!='undefined'){
                    if(this.Deb.debtor.birthdate!=null){
                        let date1 = new Date(this.Deb.debtor.birthdate);


                        return  moment(date1.toString()).format("DD.MM.YYYY")
                    }
                }
                return null
            },
            ...mapGetters([
                'StatussDebtorArr','Deb','DebAll','VidRecoverInDebtorCreditArr'

            ]),


        },
        methods: {

            copy(){
                let data=this.Deb.debtor.name_family+' '+this.Deb.debtor.name+' '+this.Deb.debtor.name_patronymic+' '+this.birthdate
                this.$copyText(data)

            },
            VidRecover(id){
                return this.VidRecoverInDebtorCreditArr.find(vid =>{
                    return vid.id==id
                }).name
            },
            goCredit(id){
                let str='/debtors/'+id
                this.$router.push(str);
            },
            dossierRefresh(){
                this.getDataDebtorsById(this.$route.params.id).then(() => {
                    this.getBanksListSudOrder(this.Deb.sudOrder.id);
                })
            },

            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getDataShablonDocumentsLk', 'getBanksListSudOrder',
                'getUserAccessChangeRecover','getDataLogs','getDataDebtorsByIdAll','getDataRecoverers','getVidRecoverInDebtorCreditArr'
            ]),


        },
    }
</script>

<style lang="scss">
    .f {

        border: 1px;
        border-style: double;
        border-color: #62626262;
        border-radius: 8px;
        padding: 15px;
    }

    .l {
        color: #a00;
        padding: 0 10px;
    }
    .address-component {
        flex: 1 1 auto;
        width: 1%;

    input {
        height: auto;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

    &:focus {
         color: #495057;
         background-color: #fff;
         border-color: #80bdff;
         outline: 0;
         box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
     }
    }
    }
</style>
