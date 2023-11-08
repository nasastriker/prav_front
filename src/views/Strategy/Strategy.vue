<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">


                <div class="vx-col w-2/3">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalStrategys - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalStrategys }} of {{ TotalStrategys }}</span>
                                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>
                            <vs-dropdown-menu>
                                <vs-dropdown-item @click="changePag(20)">
                                    <span>20</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="changePag(50)">
                                    <span>50</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="changePag(100)">
                                    <span>100</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="changePag(150)">
                                    <span>150</span>
                                </vs-dropdown-item>
                            </vs-dropdown-menu>
                        </vs-dropdown>
                        <div class="vx-col 2" style="    min-width: 250px;">
                            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="RecoverersArr"  v-model="rec_id" @input="setRecover" ></v-select>

                        </div>
                    </div>

                </div>

                <div class="vx-col w-1/3  mb-2 " style="    text-align: end;">
                    <vs-button color="primary" class="pull-right" type="filled"  @click="add">Создать</vs-button>
                </div>


            </div>
            <div class="out-main">
                <ag-grid-vue
                        ref="agGridTable"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="StrategysArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        :floatingFilter="false"
                        :pagination="true"
                @grid-size-changed="onGridSizeChanged"
                @rowDoubleClicked="onrowDoubleClicked"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :overlayNoRowsTemplate="'Нет записей'"
                :enableRtl="$vs.rtl">
                </ag-grid-vue>
                <transition name="fade">
                    <div class="outer-div" v-if="SudErrorsLoadingFlag"><img class="load-bar" src="/loading.gif"></div>
                </transition>
            </div>


            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />



        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import { RefreshCwIcon } from 'vue-feather-icons'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            VueCsvImport,
            RefreshCwIcon
        },
        data () {
            return {
                data:{

                },
                rec_id: 0,
                showFileListSudErrors: false,
                searchQuery: '',
                csv:[],
                // AgGrid
                gridApi: null,
                gridOptions: {

                },
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Название',
                        field: 'name',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'По умолчанию',
                        field: 'def',
                        filter: true,
                        width: 50,
                    },


                ],
            }
        },
        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalStrategys/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.sudErrorsLimit!='undefined') {
                                return this.User.pag.sudErrorsLimit
                            }
                            else return 100
                        }
                        else return 100
                    }
                    else return 100
                }
                else return 100
            },
            ...mapGetters([
                'StrategysArr','TotalStrategys','User','SudErrorsLoadingFlag','SudErrorsData','RecoverersArr'
            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setSudErrorsOffset(val-1);
                    this.getDataStrategys();
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },
        },
        methods: {
            add(){
                this.$router.push('/strategy/new')
            },
            setRecover(index){
                if(this.rec_id==null){
                    this.rec_id=0;
                }

                this.User.pag.StrategyRecover=this.rec_id
                for (let i=0;i<this.RecoverersArr.length;i++){

                    if(this.RecoverersArr[i].id==this.rec_id){

                        this.User.pag.sudErrorCession=this.RecoverersArr[i].cession
                    }

                }



                this.setDataUser().then((response) => {
                    this.getDataStrategys()
                })



            },


            onrowDoubleClicked(event){
                this.$router.push('/strategy/'+event.data.id)
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
            changeDate(){
                let Data = new Date();
                if(this.User.pag==null){
                    this.User.pag={
                        sudErrorsDate:'',
                    }
                }
                this.setDataUser().then((response) => {
                    this.getDataStrategys()
                })
            },
            changePag(pag) {
                this.SudErrorsData.pag.limit = pag;
                this.getDataStrategys()
                // this.setSudErrorsLimit(pag);
                this.gridApi.paginationSetPageSize(pag);
            },
            ...mapMutations([
                'setSudErrorsLimit','setSudErrorsOffset'
            ]),
            ...mapActions([
                'getDataRecoverersAndPravezCess'
            ]),
            ...mapActions([
                'getDataStrategys','setDataUser','getDataUser',
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
        },
        mounted () {
            this.getDataRecoverersAndPravezCess().then((response) => {
                for (let i=0;i<this.RecoverersArr.length;i++){

                    if(this.RecoverersArr[i].id==this.User.pag.StrategyRecover){

                        this.rec_id=this.RecoverersArr[i].name
                    }

                }
            })

            this.gridApi = this.gridOptions.api
            this.getDataUser();
            this.getDataStrategys();
        }
    }
</script>
<style>
    .router-view {
        padding: 1.2rem;
    }
    .ag-theme-material.w-100.my-4.ag-grid-table {
        /*height: 80vh;*/
    }
    .ag-theme-material .ag-ltr .ag-cell {
        border-right: 1px solid #bfbfbf!important;
    }
    .ag-theme-material .ag-row {
        border-color: #bfbfbf!important;
    }
</style>

<style lang="scss">
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

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.7s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .load-bar{
        display: inline-block;
        max-width: 100px;
    }

    .outer-div
    {
        padding: 20%;
        text-align: center;
        z-index : 10;
        position : absolute;
        top : 0;
        left : 0;
        width: 100%;
        height: 100%;
        background-color: hsla(200, 80%, 90%, 0.3);
    }

    .out-main{
        position : relative;
    }
</style>
