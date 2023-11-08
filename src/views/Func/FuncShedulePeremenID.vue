<template>
    <div id="page-user-list">
        <div class="flex flex-wrap justify-between items-center">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <h3>Переменные:</h3>
            </div>

        </div>

        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-30 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="arrValue"
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




            <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Название поля:</h6>
            <vs-input class="w-full mb-base" disabled  v-model="fieldNow"></vs-input>


            <div style="margin-top: 15px">
                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Значение:</h6>
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
            </div>



            <div class="flex flex-wrap">
                <vs-button class="w-1/3 ml-auto"  style="margin-top: 15px" color="primary" type="filled" @click="addUsl">Изменить</vs-button>
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
    import Open from './Render/Open.vue'
    import OpenUsl from './Render/OpenUsl.vue'
    import EditUsl from './Render/EditUslFuncShed.vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'

    export default {
        components: {
            Open,
            OpenUsl,
            EditUsl,
            VueCsvImport,
        },
        data () {
            return {
                id_func:0,
                showType:true,
                popupActive:false,
                arrValue:[],
                peremenArrType:[
                    'boolean','integer','date','string','text','decimal'
                ],
                peremenArr:[],
                fieldNowUsl:0,
                fieldNowId:0,
                fieldNowNumber:0,
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
                        headerName: 'number',
                        field: 'number',
                        filter: true,
                        width: 80,
                    },

                    {
                        headerName: 'Переменная',
                        field: 'peremen',
                        filter: true,
                        width: 200,
                        //cellRendererFramework: 'OpenJudicialName'
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
                            my_action_edit: this.editUsl.bind(this),
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
                return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([


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

            editUsl(data){

                this.fieldNowId=data.id
                this.fieldNow=data.peremen
                this.fieldNowNumber=data.number
                this.typeFieldInput=data.type
                this.fieldInput=data.value

                this.popupActive=true


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
                for (let i = 0; i < this.arrValue.length; i++) {
                    if(this.fieldNowId==this.arrValue[i].id&&this.fieldNowNumber==this.arrValue[i].number){

                        this.arrValue[i].value=this.fieldInput

                    }


                }
                this.saveDataCur();
                this.popupActive=false

            },
            addPeremen(){
                this.popupActive=true
            },
            onrowDoubleClicked(data){
                this.fieldNowId=data.data.id
                this.fieldNow=data.data.peremen
                this.fieldNowNumber=data.data.number
                this.typeFieldInput=data.data.type
                this.fieldInput=data.data.value

                this.popupActive=true
            },
            ...mapActions([
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
            saveDataCur(){
                axios.post(r("funcshedule.index"), {
                    params: {
                        method: 'saveDataCur',
                        param: {
                            id:this.$route.params.id,
                            arr:this.arrValue,
                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.getDataCur(this.$route.params.id)

                    }



                })
            },
            getDataCur(id){
                axios.get(r("funcshedule.index"), {
                    params: {
                        method: 'getFuncPeremenIdCur',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.arrValue=response.data.data

                    }



                })
            },
            getData(id){
                axios.get(r("func.index"), {
                    params: {
                        method: 'getFuncPeremenId',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.peremenArr=response.data.data
                    }



                })
            },

        },
        mounted () {
            this.id_func=this.$route.params.id
            this.getData(this.$route.params.id);
            this.getDataCur(this.$route.params.id);
            this.gridApi = this.gridOptions.api

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
