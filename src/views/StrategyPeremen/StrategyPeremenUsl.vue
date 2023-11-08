<template>
    <div id="page-user-list">
        <div class="flex flex-wrap justify-between items-center">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <h3>Переменные:</h3>
            </div>
            <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                <vs-button color="success" style="margin-bottom: 5px" class="pull-right" type="filled"  @click="addPeremen">Новaя переменная</vs-button>
            </div>
        </div>

        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-30 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="peremenArr"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
        @grid-size-changed="onGridSizeChanged"
        @column-resized="onColumnResized"
        @column-visible="onColumnVisible"
        @rowDoubleClicked="onrowDoubleClicked"
        :enableRtl="$vs.rtl">
        </ag-grid-vue>
        <vs-popup style="min-height: 500px;" classContent="popup-example" title="Изменение поля" :active.sync="popupActive">


            <template v-if="AtrDebtorCreditsTotal!=0">


                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Название поля:</h6>
                <v-select  class="w-50 " :reduce="label => label" label="atr" :options="AtrDebtorCredits"  v-model="fieldNow"   ></v-select>

                <v-select  class="w-50"  style="margin-top: 15px" :reduce="label => label.id" label="name" :options="StrategyPeremensUslArr"  v-model="fieldNowUsl" @input="checkChange"   ></v-select>
                <template v-if="fieldNowUsl==1">
                    <template v-if="typeFieldInput==='boolean'">
                        <vs-checkbox style="margin-bottom: 15px" v-model="fieldInput">Активно</vs-checkbox>
                    </template>
                    <template v-if="typeFieldInput==='integer'">
                        <vs-input class="w-100" type="Number" style="margin-top : 7px;margin-bottom: 7px"  v-model="fieldInput" @keypress="validateNumberInt"></vs-input>
                    </template>
                    <template v-if="typeFieldInput==='date'">
                        <vs-input class="w-100" type="date" style="margin-top: 7px;margin-bottom: 7px"  v-model="fieldInput" ></vs-input>
                    </template>
                    <template v-if="typeFieldInput==='string'">
                        <vs-input class="w-100"  style="margin-top: 7px;margin-bottom: 7px;min-width: 400px"  v-model="fieldInput" ></vs-input>
                    </template>
                    <template v-if="typeFieldInput==='text'">
                        <vs-input class="w-100" type="text" style="margin-top: 7px;margin-bottom: 7px;min-width: 600px"  v-model="fieldInput" ></vs-input>
                    </template>
                    <template v-if="typeFieldInput==='decimal'">
                        <vs-input class="w-100" type="Number" style="margin-top : 7px;margin-bottom: 7px"  v-model="fieldInput" @keypress="validateNumberDecimal"></vs-input>
                    </template>

                </template>
                <template v-if="fieldNowUsl==3">
                    <vs-input class="w-100"  style="margin-top: 7px;margin-bottom: 7px;min-width: 400px"  v-model="fieldInput" ></vs-input>
                </template>
                <template v-if="fieldNowUsl==4">
                    <vs-input class="w-100"  style="margin-top: 7px;margin-bottom: 7px;min-width: 400px"  v-model="fieldInput" ></vs-input>
                </template>
                <div class="flex flex-wrap">
                    <vs-button class="w-1/3 ml-auto"  style="margin-top: 15px" color="primary" type="filled" @click="addUsl">Добавить</vs-button>
                </div>
            </template>
            <template v-else>
                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px; font-size: 16px">Загрузка полей, пожалуйста подождите</h6>
            </template>
        </vs-popup>


        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />


    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/Open.vue'
    import OpenUsl from './Render/OpenUsl.vue'
    import EditUsl from './Render/EditUsl.vue'
    import { mapActions,mapGetters } from 'vuex'

    import r from '../../route';
    import axios from '../../axios'

    export default {
        components: {
            AgGridVue,
            vSelect,
            Open,
            OpenUsl,
            EditUsl,
            VueCsvImport,
        },
        props:['id_strategy'],
        data () {
            return {
                popupActive:false,

                peremenArr:[],
                fieldNowUsl:0,
                fieldNowId:0,
                typeFieldStore:'1',
                typeFieldInput:'1',
                csv:[],
                fieldInput:'',
                fieldNow:'',
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
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        width: 80
                    },

                    {
                        headerName: 'Переменная',
                        field: 'peremen',
                        filter: true,
                        width: 200,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Условие',
                        field: 'usl',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenUsl'
                    },


                    {
                        headerName: 'Значение',
                        field: 'value',
                        filter: true,
                        width: 150,
                    },

                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'EditUsl',
                        cellRendererParams: {
                            my_action_delete: this.deleteUsl.bind(this),
                        }
                    },



                ],

                // Cell Renderer Components
                components: {
                    Open,OpenUsl,EditUsl
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalStrategyPeremensUslArr/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalStrategyPeremensUslArr/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
               'AtrDebtorCreditsTotal','AtrDebtorCredits','StrategyPeremensUslArr','TotalStrategyPeremensUslArr'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {

            validateNumberInt: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateNumberDecimal: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,.]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            checkChange(){
                if((this.fieldNow.type==='integer')||(this.fieldNow.type==='bigint')){
                    this.typeFieldInput='integer'
                    return 'integer'
                }
                if(this.fieldNow.type==='string'){
                    this.typeFieldInput='string'
                    return 'string'
                }
                if(this.fieldNow.type==='date'){
                    this.typeFieldInput='date'
                    return 'date'
                }
                if(this.fieldNow.type==='decimal'){
                    this.typeFieldInput='decimal'
                    return 'decimal'
                }
                if(this.fieldNow.type==='text'){
                    this.typeFieldInput='text'
                    return 'text'
                }
                if(this.fieldNow.type==='boolean'){
                    this.typeFieldInput='boolean'
                    return 'boolean'
                }
            },
            deleteUsl(data){
                for (let i = 0; i < this.peremenArr.length; i++) {
                    if(data.peremen==this.peremenArr[i].peremen&&data.usl==this.peremenArr[i].usl&&data.value==this.peremenArr[i].value){
                        this.peremenArr.splice(i,1)
                    }

                }


            },

            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
            },
            onGridSizeChanged(params) {
                if (params.clientWidth > 500) {
                    this.gridApi.sizeColumnsToFit();
                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }
            },
            addUsl(){
                this.popupActive=false
                this.peremenArr.push(
                    {
                        id:this.fieldNowId,
                        peremen:this.fieldNow.atr,
                        usl:this.fieldNowUsl,
                        value:this.fieldInput,
                    }
                )

            },
            addPeremen(){
                this.popupActive=true
            },
            onrowDoubleClicked(event){
            },
            ...mapActions([
               'getDataStrategyPeremensUsl'
            ]),
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
            getData(id){
                axios.get(r("strategyPeremen.index"), {
                    params: {
                        method: 'getStrategyPeremenUslById',
                        param: this.id_strategy

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.peremenArr=response.data.data
                    }



                })
            },

        },
        mounted () {
            this.getData();
            this.gridApi = this.gridOptions.api
            this.getDataStrategyPeremensUsl();

        }
    }

</script>

<style lang="scss">
    .vs-popup--content.popup-example {
        min-height: 400px;
    }
    .my-30{
        height: 30vh;
    }
    #page-user-list {
    .user-list-filters {
    .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
    }
    }
    }
</style>
