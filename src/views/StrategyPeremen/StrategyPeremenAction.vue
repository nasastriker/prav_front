<template>
    <div id="page-user-list">
        <div class="flex flex-wrap justify-between items-center">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <h3>Действия:</h3>
            </div>
            <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                <vs-button color="success" style="margin-bottom: 5px"  class="pull-right" type="filled"  @click="addPeremen">Новое действие</vs-button>
            </div>
        </div>

        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-30 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="actionArr"
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
        <vs-popup style="min-height: 500px;" classContent="popup-example" title="Действия" :active.sync="popupActive">
            <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Действие:</h6>
            <v-select  class="w-50"  style="margin-top: 15px" :reduce="label => label.id" label="name" :options="StrategyPeremensActionArr"  v-model="fieldNowAction"   ></v-select>
            <template v-if="fieldNowAction==0">
                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Статус:</h6>
                <vx-input-group class="w-100 ">
                    <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="statusLast"   ></v-select>
                </vx-input-group>
            </template>
            <template v-if="fieldNowAction==1">
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
            </template>
            <div class="flex flex-wrap">
                <vs-button class="w-1/3 ml-auto"  style="margin-top: 15px" color="primary" type="filled" @click="addUsl">Добавить</vs-button>
            </div>

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
    import OpenAction from './Render/OpenAction.vue'
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
            OpenAction,
            VueCsvImport,
        },
        props:['id_strategy'],
        data () {
            return {
                fieldNowUsl:0,
                typeFieldStore:'1',
                typeFieldInput:'1',
                fieldInput:'',
                popupActive:false,
                statusLast:2,
                actionArr:[],
                fieldNowAction:0,
                fieldNowId:0,
                csv:[],
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
                        width: 100
                    },

                    {
                        headerName: 'Действие',
                        field: 'action',
                        filter: true,
                        width: 450,
                        cellRendererFramework: 'OpenAction'
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
                    Open,OpenUsl,EditUsl,OpenAction
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalStrategyPeremensActionArr/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalStrategyPeremensActionArr/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
               'AtrDebtorCreditsTotal','AtrDebtorCredits','StrategyPeremensActionArr','TotalStrategyPeremensActionArr','StatussArr','StrategyPeremensUslArr'

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
            deleteUsl(data){
                for (let i = 0; i < this.actionArr.length; i++) {
                    if(data.action==this.actionArr[i].action&&data.id_status==this.actionArr[i].id_status){
                        this.actionArr.splice(i,1)
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
                let flag=true

                if(this.fieldNowAction==1){
                    this.statusLast=0;

                }else{
                    this.fieldNow=''
                    this.fieldInput=''
                    this.fieldNowUsl=''
                }
                if(flag){
                    this.popupActive=false
                    this.actionArr.push(
                        {
                            usl:this.fieldNowUsl,
                            peremen:this.fieldNow.atr,
                            id:this.fieldNowId,
                            action:this.fieldNowAction,
                            value:this.fieldInput,
                            id_status:this.statusLast
                        }
                    )
                }else{
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка в действиях !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                }


            },
            addPeremen(){
                this.popupActive=true
            },
            onrowDoubleClicked(event){
            },
            ...mapActions([
               'getDataStrategyPeremensAction','getDataStatuss'
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
                        method: 'getStrategyPeremenActionById',
                        param: this.id_strategy

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.actionArr=response.data.data
                    }



                })
            },

        },
        mounted () {
            this.getData();
            this.gridApi = this.gridOptions.api
            this.getDataStrategyPeremensAction();
            this.getDataStatuss()

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
