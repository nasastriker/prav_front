<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-width: 95vh;">
            <div class="flex flex-wrap justify-between" style="gap: 10px;">
                <div class="flex flex-wrap">
<!--            <div class="flex flex-wrap justify-between items-center">-->
<!--                <div class="mb-6 md:mb-0 mr-6 ag-grid-table-acables-left">-->
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.7rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFnss - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFnss }} of {{ TotalFnss }}</span>
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
                    <vs-dropdown vs-trigger-click class="cursor-pointer" style="margin-left: 10px">
                        <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.7rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">Статус</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <vs-dropdown-menu>
                            <vs-dropdown-item @click="hideFnsWork('send')">
                                <vs-checkbox  v-model="statusReestr.send" >Отправлен</vs-checkbox>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="hideFnsWork('notSend')">
                                <vs-checkbox  v-model="statusReestr.notSend" >Не отправлен</vs-checkbox>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="hideFnsWork('claim')">
                                <vs-checkbox  v-model="statusReestr.claim" >Жалоба</vs-checkbox>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="hideFnsWork('answer')">
                                <vs-checkbox  v-model="statusReestr.answer" >Получен ответ</vs-checkbox>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                    <vs-input type="date" v-model="User.pag.bankFnsDate" @change="changeDate" style="margin-left: 10px;display: inline-block"></vs-input>
                    <v-select style="min-width: 400px;margin-left: 10px;" :reduce="label => label.id" label="name" :options="IfnsList" v-model="ifns_id" @input="changeIfns" ></v-select>
<!--                    <div class="pull-right" style="margin-left: 10px">-->
<!--                        <img src="/loading.gif" v-if="FnsWorkLoadingFlag" style="max-width: 40px; margin-top: 5px;">-->
<!--                    </div>-->
                    <!--<div class="flex">

                    </div>-->
                </div>
                <div class="flex">
<!--                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">-->
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="primary" @click="plan">План</vs-button>

                </div>
            </div>

                <div class="out-main">
                <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table vh75"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FnssArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableBrowserTooltips="true"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    @rowDoubleClicked="onrowDoubleClicked"

                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="FnsWorkLoadingFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
                
                    <!-- <transition name="fade">
                    <div class="outer-div" v-if="FnsWorkLoadingFlag">
                        <img class="load-bar" src="/loading.gif">
                    </div>
                    </transition> -->
                </div>

            <vs-popup classContent="popup-example" title="План поездки" :active.sync="showPlan">


                <div class="vx-row" style="margin-left: 2px;margin-right: 15px">
                    <div class="vx-col md:w-1/2 w-full mt-5">
                        <h6>Дата поездки:</h6>
                        <vs-input type="date" class="w-100 mb-base"  v-model="date_plan" />
                    </div>

                </div>

                <vs-row vs-type="flex" vs-justify="center">

                    <vs-button color="success" type="filled"  @click="savePlan">Скачать</vs-button>

                </vs-row>



            </vs-popup>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/Open.vue'
    import Name from './Render/Name.vue'
    import Answer from './Render/Answer.vue'
    import OpenRec from './Render/OpenRec.vue'
    import StatusIfns from './Render/StatusIfns.vue'

    import CodeIfns from './Render/CodeIfns.vue'
    import { mapActions,mapGetters } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import r from '../../route';
    import axios from '../../axios'
    import moment from 'moment';
    export default {
        components: {
            CodeIfns,
            StatusIfns,
            Answer,
            Open,
            Name,
            OpenRec,
            OpenStatus,
            VueCsvImport,
        },
        data () {
            return {
                ifns_id: '',
                showPlan:false,
                date_plan:'',
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

//                    {
//                        headerName: 'ID',
//                        field: 'id',
//                        filter: true,
//                        width: 100
//                    },

                    {
                        headerName: 'ИФНС',
                        headerTooltip: 'ИФНС',
                        tooltipField: 'id_ifns',
                        field: 'id_ifns',
                        filter: true,
                        width: 70,
                        cellRendererFramework: 'CodeIfns'
                    },
                    {
                        headerName: 'Файл',
                        headerTooltip: 'Файл',
                        tooltipField: 'arch_name',
                        field: 'arch_name',
                        filter: true,
                        width: 500,
                        // cellRendererFramework: 'Name'
                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: 'rec_name',
                        field: 'rec_name',
                        filter: true,
                        width: 200,
                        //cellRendererFramework: 'OpenRec'
                    },
                    {
                        headerName: 'Дата Отпр.',
                        headerTooltip: 'Дата отправки',
                        tooltipField: 'date_ifns',
                        field: 'date_ifns',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Дата Ответа',
                        headerTooltip: 'Дата Ответа',
                        tooltipField: 'date_return_ifns',
                        field: 'date_return_ifns',
                        filter: true,
                        width: 150,
                      //  cellRendererFramework: 'Answer'
                    },

                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status_ifns',
                        field: 'status_ifns',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'StatusIfns'
                    },
                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
                        tooltipField: 'id',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open',
                        cellRendererParams: {
                            go_refresh: this.refreshRecords.bind(this)
                        }
                    },
//
//                    {
//                        headerName: 'Дата',
//                        field: 'created_at',
//                        filter: true,
//                        width: 250,
//                        //cellRendererFramework: 'OpenJudicialName'
//                    },


                ],

                // Cell Renderer Components
                components: {
                    Open,OpenStatus,CodeIfns,OpenRec,StatusIfns,Name,Answer
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalFnss/this.paginationPageSize)
                else return 0
            },
            statusReestr () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.fnsWorkStatusSend!='undefined') {
                                return this.User.pag.fnsWorkStatusSend
                            }
                            else return {send:true,notSend:true,claim:true,answer:true}
                        }
                        else return {send:true,notSend:true,claim:true,answer:true}
                    }
                    else return {send:true,notSend:true,claim:true,answer:true}
                }
                else return {send:true,notSend:true,claim:true,answer:true}

            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.fnsWork!='undefined') {
                                return this.User.pag.fnsWork
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
                'FnssArr','TotalFnss','User','IfnssArr','RecoverersArr','IfnsList','FnsWorkLoadingFlag'

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
            changeIfns(){
                this.User.pag.ifnsId = this.ifns_id;
                this.setDataUser().then((response) => {
                    this.getDataFnsWorks()
                })
            },
            changeDate(){
                let Data = new Date();
                if(this.User.pag==null){
                    this.User.pag={
                        bankFnsDate:'',
                    }
                }



                this.setDataUser().then((response) => {
                    this.getDataFnsWorks()
                })
            },
            savePlan(){
                this.showPlan=false
                axios.get(r("fns.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getPlan',
                        param:this.date_plan


                    }
                }).then((response) => {

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download','план поездки.pdf');
                    document.body.appendChild(link);
                    link.click();




                }).catch(error => {
                    this.$vs.loadArhing.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            plan(){


                let date =  moment().startOf('week').toDate();

                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate()+1;

                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = '0' + month;
                }

                this.date_plan = year + '-' + month + '-' + day

                this.showPlan=true
            },
            hideFnsWork(data){
                if(this.User.pag==null){
                    this.User.pag={
                        fnsWorkStatusSend:{send:true,notSend:true,claim:true,answer:true}
                    }
                }
                if(this.User.pag.fnsWorkStatusSend==null){
                    this.User.pag={
                        fnsWorkStatusSend:{send:true,notSend:true,claim:true,answer:true}
                    }
                }
                if(data=='notSend'){
                    this.User.pag.fnsWorkStatusSend.notSend=!this.User.pag.fnsWorkStatusSend.notSend
                }
                if(data=='claim'){
                    this.User.pag.fnsWorkStatusSend.claim=!this.User.pag.fnsWorkStatusSend.claim
                }
                if(data=='answer'){
                    this.User.pag.fnsWorkStatusSend.answer=!this.User.pag.fnsWorkStatusSend.answer
                }
                if(data=='send'){
                    this.User.pag.fnsWorkStatusSend.send=!this.User.pag.fnsWorkStatusSend.send
                }

                this.setDataUser().then((response) => {

                    this.getDataFnsWorks()
                })
            },
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        fnsWork:100
                    }
                }
                this.User.pag.fnsWork=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){
                this.$router.push('/fns/answerfiles/' + event.data.id)
            },
            ...mapActions([
                'getDataFnsWorks','setDataUser','getDataRecoverers','getDataCessions','getDataIfnssWeek','getDataIfnss',
                'getIfnsList'
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
            refreshRecords(){
                this.gridApi = this.gridOptions.api
                this.getDataIfnss();
                this.getDataRecoverers();
                this.getDataIfnssWeek();
                this.getDataCessions();
                this.getDataFnsWorks();
            }

        },
        mounted () {
            this.refreshRecords();
            this.getIfnsList().then((response) => {
                for (let i=0;i<this.IfnsList.length;i++){
                    if(this.IfnsList[i].id == this.User.pag.ifnsId){
                        this.ifns_id = this.User.pag.ifnsId
                    }

                        // this.ifns_id = 'all';
                }
                // if ()
            })

        }
    }

</script>

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
    .vh75{
        min-height: 75vh;
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
