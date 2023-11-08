<template>
    <vx-card no-shadow>
        <vs-tabs>
            <vs-tab label="Сообщения">
                <HistorySoft :id_debtorcredit="Deb.debtorCredit.id" :id="this.id" :id_credit="Deb.debtorCredit.id" ></HistorySoft>
            </vs-tab>
            <vs-tab label="Сайт">
                <Log :id_debtor="id_debtor"></Log>
            </vs-tab>
            <vs-tab label="История сообщений">
                <HistoryBot :id_debtor="Deb.debtor.id"></HistoryBot>
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
    import Log from './ChildTab/Log.vue'
    import HistorySoft from './ChildTab/HistorySoft.vue'
    import HistoryBot from './ChildTab/HistoryBot.vue'
    import r from '../../../route'
    import axios from '../../../axios'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,JsonViewer,Log,HistoryBot,HistorySoft,vSelect
        },
        props:['id','id_debtor'],
        data () {
            return {
                popupMenu:false,
                type:0,
                text:'',

            }
        },
        mounted(){
            this.getDataLogs(this.id);
        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb','LogsArr','TypeArr'

            ]),


        },
        methods: {

            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getDataLogs','sendMessageHistorySoftOnce','getDataHistorySoft'
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
