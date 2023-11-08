<template>
    <vx-card no-shadow>

        <div class="vx-row">
            <div class="vx-col">История</div>
            <!--<div class="vx-col" style="text-align: right">-->
                <!--<vs-button @click="CancelHistory">Отменить изменение</vs-button>-->
            <!--</div>-->
        </div>
        <!--<json-viewer :value="LogsArr" @click="debr"></json-viewer>-->
        <vs-tabs>
            <vs-tab label="Кредит">
                <HistoryDebtorCreditView :id="id"></HistoryDebtorCreditView>
            </vs-tab>
            <vs-tab label="Заемщик">
                <HistoryDebtorView :id="id"></HistoryDebtorView>
            </vs-tab>
            <vs-tab label="Суд">
                <HistoryDebtorCreditSud :id="id"></HistoryDebtorCreditSud>
            </vs-tab>

        </vs-tabs>



    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import axios from '../../../axios'
    import r from '../../../route'
    import HistoryDebtorView from './Render/HistoryDebtorView.vue'
    import HistoryDebtorCreditView from './Render/HistoryDebtorCreditView.vue'
    import HistoryDebtorCreditSud from './Render/HistoryDebtorCreditSud.vue'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,JsonViewer,HistoryDebtorCreditView,HistoryDebtorView,HistoryDebtorCreditSud
        },
        props:['id'],
        data () {
            return {


            }
        },
        mounted(){
            this.getDataLogs(this.id);
        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb','LogsArr'

            ]),


        },
        methods: {

            CancelHistory(){
                axios.get(r("logUser.index"), {
                    params: {
                        method: 'getCancelHistory',
                        param: this.id
                    }
                }).then(res=>{
                    this.getDataLogs(this.id)
                })
            },
            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getDataLogs'
            ]),


        },
    }
</script>

<style lang="scss">
.h6{
    font-size: 12px;
    color: cadetblue;
}
</style>
