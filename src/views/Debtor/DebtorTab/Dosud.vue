<template>
    <vx-card no-shadow>
        <vs-tabs color="warning"  class="mt-4">

            <vs-tab label="Отказы">

                <fieldset class="f" >
                    <legend class="l">Отказ от взаимодействия:</legend>
                    <div class="vx-row" style=" padding-left: 20px;border-color: #62626262;">
                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                            <vs-checkbox class="mb-4" v-model="Deb.debtorCredit.otkaz" @input="changeDeb"> Отказ от взаимодействия</vs-checkbox>
                            <h6 class="h6 mb-1">Дата поступления:<VarToClipboard name="dc_date_otkaz"/></h6>
                            <vs-input type="date" class="w-100 mb-4"  v-model="Deb.debtorCredit.date_otkaz"  @blur="changeDeb"></vs-input>
                            <h6 class="h6 mb-1">№ ШПИ:<VarToClipboard name="dc_otkaz_shpi"/></h6>
                            <vs-input class="w-100"  v-model="Deb.debtorCredit.otkaz_shpi"  @change="changeDeb"> </vs-input>
                        </div>
                    </div>
                </fieldset>

            </vs-tab>

            <vs-tab label="Входящие обращения">
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
    import Status from '../../../components/Status.vue'
    import History from './ChildTab/History.vue'
    import HistoryBot from './ChildTab/HistoryBot.vue'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,Status,History,HistoryBot
        },
        data () {
            return {
                pop:false,
                error:'',
                import_type:'',
                onlyBic:false,
                // Filter Options
                data:[],
                popupActive2:false,
                searchQuery: '',
                csv:[],
                // AgGrid
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'Количество',
                        headerTooltip: 'Количество',
                        tooltipField: 'count',
                        field: 'count',
                        filter: true,
                        width: 80,
                    },
                    {
                        headerName: 'Сумма',
                        headerTooltip: 'Сумма',
                        tooltipField: 'sum',
                        field: 'sum',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'name_status',
                        field: 'name_status',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Пользователь',
                        headerTooltip: 'Пользователь',
                        tooltipField: 'name_users',
                        field: 'name_users',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Создан',
                        headerTooltip: 'Создан',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 120,
                        cellRenderer: params => moment(params.value).format('HH:MM DD.MM.YYYY')
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenReestr',
                        cellRendererParams: {
                          showPop: this.showPop.bind(this)
                        }
                    },
                ],
                components: {
                  OpenReestr,OpenReestrRec
                }
            }
        },
        mounted(){

        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb'

            ]),


        },
        methods: {

            close(){

                this.$router.back()
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','changeDeb'
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
