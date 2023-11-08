<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>
            <vs-tab label="Уточнить адрес">
                <Debtor></Debtor>



            </vs-tab>

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
                labelPop:'Подсудность',
                ispl:[],
                popupActive:false,
                showJud:false,
                showIndex: null,

            }
        },
        mounted(){
            this.getDebtorOnly(this.id_deb)
        },

        computed: {
            ...mapGetters([
                'StatussDebtorArr','Deb', 'SuggestionOptionsAddress'

            ]),

        },
        methods: {

            getBankrot(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtors.index"), {
                    params: {
                        method: 'getBankrot',
                        param: this.Deb.debtor

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result) {
                        this.Deb.debtor.bankrot = 1;
                        this.Deb.debtor.bankrot_delo = 'https://bankrot.fedresurs.ru/PrivatePersonCard.aspx?ID=' + response.data.data
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Банкротство определено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.Deb.debtor.bankrot = 0;
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Не банкрот !!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }

                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },

            showIndexProc(index){
                if(this.showIndex!=index){
                    this.showIndex = index
                }
                else{
                    this.showIndex = null
                }

            },
            showEditForm(e){
                axios.get(r("jurisdiction.index"), {
                    params: {
                        method: 'getJurisdictionsByStreetFias',
                        param: e

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.popupActive=true;
                        this.labelPop='Адреса в базе данных по данному коду'
                        this.ispl=response.data.data
                    }



                })
            },

            setJud(){
                axios.post(r("jurisdiction.index"), {
                    params: {
                        method: 'setJurisdictions',
                        param: {
                            jud_number:this.Deb.debtor.jud_number,
                            address_reg:this.Deb.debtor.address_reg,
                            data_reg:this.Deb.debtor.data_reg,
                            id_debtor:this.Deb.debtor.id,
                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            close(){

                this.$router.back()
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getDebtorOnly'
            ]),

        },
    }
</script>
<style>
    .standart{
        color: #a9a7f0
    }
</style>
