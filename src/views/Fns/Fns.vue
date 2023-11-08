<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row" style="z-index: 222; position: relative;">
                    <div class="vx-col">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.7rem !important;margin-top: 20px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
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
                    </div>
                    <div style="margin-left: 10px; min-width: 250px;">
                        <div class="centerx">
                            <vs-tooltip text="Фильтр по статусам" position="top" >
                                <h6 class="h6Blue mb-1">Статус</h6>
                            </vs-tooltip>
                        </div>
                        <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="statusArr"   v-model="statusArch" @input="StatusArch" ></v-select>
                    </div>
                    <div style="margin-left: 10px;" >
                        <div class="centerx">
                            <vs-tooltip text="Дата" position="top" >
                                <h6 class="h6Blue mb-1">Дата</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input type="date" v-model="User.pag.bankFnsDate" @blur="changeDate" @keyup.enter="$event.target.blur()"></vs-input>
                    </div>
                    <div style="margin-left: 10px;">
                        <div class="centerx">
                            <vs-tooltip text="Поиск" position="top" >
                                <h6 class="h6Blue mb-1">Поиск</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />

                    </div>
                    <div style="margin-left: 10px;margin-top: 15px">
                         <!-- <div v-if="LoadFns" >
                        <img src="/loading.gif" style="max-width: 40px; margin-top: 5px;margin-right: 10px; ">
                        </div> -->
                        <div class="centerx" style="cursor: pointer;margin-right: 10px;    margin-top: 10px;">
                            <vs-tooltip text="Обновить таблицу" position="top" >
                                <refresh-cw-icon size="1.5x"  @click="refesh"></refresh-cw-icon>
                            </vs-tooltip>
                        </div>
                    </div>
                    <div class="vx-col" style="margin-top: 15px" v-if="User.accsess_upload==1">
                        <div class="dropdown-button-container">
                            <vs-button  class="btnx" color="danger" type="filled"
                                       @click="showRunJob=!showRunJob">Запустить выгрузку</vs-button>
                            <vs-dropdown>
                                <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                                <vs-dropdown-menu>
                                    <vs-dropdown-item>
                                        <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showTaskFns">История</vs-button>
                                    </vs-dropdown-item>
                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </div>
                   </div>


                </div>
                </div>
            </div>
            <vs-popup classContent="popup-example" title="Запуск выгрузки" :active.sync="showRunJob">


              <v-select v-if="JobFnssArr.length>0" style="margin-top: 15px" class="w-full" :reduce="label => label.id" label="name" :options="JobFnssArr"
                        v-model="oneJob" ></v-select>

              <div style="text-align: center;margin-top: 20px">
                <vs-button color="primary" @click="runJobFnsMonday()">Запуск</vs-button>
              </div>
            </vs-popup>
            <div class="out-main">
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
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
                        @grid-size-changed="onGridSizeChanged"
                        @column-resized="onColumnResized"
                        @column-visible="onColumnVisible"
                        @rowDoubleClicked="onrowDoubleClicked"
                        :enableRtl="$vs.rtl"
                        :enableBrowserTooltips="true"
                        :overlayNoRowsTemplate="'Нет записей'"
                        :overlayLoadingTemplate="'Идёт загрузка'">
                </ag-grid-vue>
                <!--  -->
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="LoadFns">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
        <vs-popup classContent="popup-example" title="Удаление:" :active.sync="showDelete">
          <DeleteFile @close="closePop" :AnswerFileName="AnswerFileName" :AnsCreditsArr="AnsCreditsArr" :statusOld="statusOld" :TotalRecordsAns="TotalRecordsAns"></DeleteFile>

        </vs-popup>
        <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="popTaskFns">
            <PopUpTaskJob name="FnsArc" :dataArr="TaskData"></PopUpTaskJob>

        </vs-popup>
    </div>

</template>

<script>
    import Open from './Render/Open.vue'
    import Name from './Render/OpenHref.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import DeleteFile from '../DeleteFile/DeleteFile'
    import r from '../../route';
    import axios from '../../axios'
    import { RefreshCwIcon } from 'vue-feather-icons'
    import PopUpTaskJob from '../RenderComponent/PopUpTaskJob.vue'
    import moment from 'moment';
    export default {
        components: {
            Open,
            DeleteFile,
            Name,
            RefreshCwIcon,
            OpenStatus,
            PopUpTaskJob,
        },
        data () {
            return {
                oneJob:0,
                TaskData:[],
                AnswerFileName:'',
                AnsCreditsArr: '',
                TotalRecordsAns:0,
                statusOld:0,
                showDelete:false,
                statusArch:-1,
                showRunJob:false,
                popTaskFns:false,
                searchQuery: '',
                csv:[],
                statusArr:[{id:-1, name: 'Все'},{id:0, name: 'Не скачан'},{id:1,name:'Скачан'}],
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
                        field: 'arch_name',
                        tooltipField: 'arch_name',
                        filter: true,
                        width: 500,
                        cellRendererFramework: 'Name'
                    },
                    {
                        headerName: 'Кол.',
                        headerTooltip: 'Количество',
                        field: 'count_credit',
                        filter: true,
                        tooltipField: 'count_credit',
                        width: 80,
                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        field: 'rec_name',
                        filter: true,
                        tooltipField: 'rec_name',
                        width: 250,
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        field: 'created_at',
                        filter: true,
                        width: 120,
                        cellRenderer: params => moment(params.value).format('HH:MM DD.MM.YYYY')
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenStatus'
                    },
                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open',
                        cellRendererParams: {
                          delete_func: this.deleteNew.bind(this)
                        }
                    },
                ],
                components: {
                    Open,OpenStatus,Name
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
                            if(typeof this.User.pag.fnsArhStatus!='undefined') {
                                return this.User.pag.fnsArhStatus
                            }
                            else return {loadArh:true,noLoad:true}
                        }
                        else return {loadArh:true,noLoad:true}
                    }
                    else return {loadArh:true,noLoad:true}
                }
                else return {loadArh:true,noLoad:true}

            },
            paginationPageSize () {
                return this.User.pag.fnsArhStatus.limit
            },
            ...mapGetters([
                'FnssArr','TotalFnss','User','LoadFns','JobFnssArr'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryFnsArhStatusOffset(val-1)
                    this.getDataFnss(this.User.pag.fnsArhStatus);
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
          closePop(){
            this.getDataFnss(this.User.pag.fnsArhStatus);
            this.showDelete=false
          },
          deleteNew(e){

            axios.get(r("fns.index"), {
              params: {
                method: 'getFnsCreditsInFile',
                param:e.value

              }
            }).then((response) => {
              if(response.data.result){
                this.showDelete=true
                this.AnswerFileName=response.data.file
                this.AnsCreditsArr=response.data.data
                this.TotalRecordsAns=response.data.total
                this.statusOld=response.data.statusOld
              }
            })
          },
            StatusArch(){
                if(this.statusArch==null)this.statusArch = -1
                //this.User.pag.fnsArhStatus.status=this.statusArch
                switch (this.statusArch){
                    case -1:{
                        this.User.pag.fnsArhStatus.notLoad=true
                        this.User.pag.fnsArhStatus.loadArh=true
                        break
                    }
                    case 0:{
                        this.User.pag.fnsArhStatus.notLoad=true
                        this.User.pag.fnsArhStatus.loadArh=false
                        break
                    }
                    case 1:{
                        this.User.pag.fnsArhStatus.notLoad=false
                        this.User.pag.fnsArhStatus.loadArh=true
                        break
                    }
                }
                this.setDataUser().then((response) => {
                    this.getDataFnss()
                })
            },

            refesh(){
                this.getDataFnss();
            },
            showTaskFns(){
              //  this.getTaskFns()
                this.getTaskJobStatusFromTaskJobsStatus('FnsArc').then((response)=>{
                    if(response.result){
                        this.TaskData=response.data
                    }
                 else this.TaskData=[]
                })

                this.popTaskFns=true
            },
            runJobFnsMonday(){
                this.showRunJob=false
                axios.get(r("fns.update"), {
                    params: {
                        method: 'startJobFnsMonday',
                        param: this.oneJob

                    }
                }).then((response) => {
                    if(response.data.result){
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Выгрузка запущена',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
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
                    this.getDataFnss()
                })
            },
            hideFnsArhiv(data){
                if(this.User.pag==null){
                    this.User.pag={
                        fnsArhStatus:{loadArh:true,notLoad:true}
                    }
                }
                if(this.User.pag.fnsArhStatus==null){
                    this.User.pag={
                        fnsArhStatus:{loadArh:true,notLoad:true}
                    }
                }
                if(data=='notLoad'){
                    this.User.pag.fnsArhStatus.notLoad=!this.User.pag.fnsArhStatus.notLoad
                }
                if(data=='loadArh'){
                    this.User.pag.fnsArhStatus.loadArh=!this.User.pag.fnsArhStatus.loadArh
                }

                this.setDataUser().then((response) => {
                    this.getDataFnss()
                })
            },
            changePag(pag){
                this.User.pag.fnsArhStatus.limit=pag
                this.setDataUser().then((response)=>{
                    this.getDataFnss(this.User.pag.fnsArhStatus)
                })
                this.setQueryFnsArhStatusLimit(pag);
                this.gridApi.paginationSetPageSize(pag)


                if(this.User.pag==null){
                    this.User.pag={
                        fnsArh:100
                    }
                }
                this.User.pag.fnsArh=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){


            },
            ...mapActions([
                'getDataFnss','setDataUser','getTaskJobStatusFromTaskJobsStatus','getDataUser'
            ]),
            ...mapMutations([
                'setQueryFnsArhStatusLimit','setQueryFnsArhStatusOffset','setFnsArhStatusToUserPag'

            ]),
            updateSearchQuery (val) {
                this.User.pag.fnsArhStatus.find=this.searchQuery
                this.setDataUser().then((response)=>{
                    this.getDataFnss(this.User.pag.fnsArhStatus)
                })

              //  this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.getDataUser().then(response=>{
                if(typeof this.User.pag.fnsArhStatus==='undefined'){
                    this.User.pag.fnsArhStatus={find:'',
                                                offset:0,
                                                limit:0,
                                                loadArh:1,
                                                 notLoad:1,
                                                }
                }
                if(typeof this.User.pag.fnsArhStatus.loadArh==='undefined')this.User.pag.fnsArhStatus.loadArh=1
                if(typeof this.User.pag.fnsArhStatus.notLoad==='undefined')this.User.pag.fnsArhStatus.notLoad=1
                if((this.User.pag.fnsArhStatus.loadArh)===(this.User.pag.fnsArhStatus.notLoad)){
                    this.statusArch=-1
                }
                else{
                    this.statusArch=this.User.pag.fnsArhStatus.loadArh?1:0
                }
                if(typeof this.User.pag.fnsArhStatus.offset==='undefined')this.User.pag.fnsArhStatus.offset=0
                if(typeof this.User.pag.fnsArhStatus.limit==='undefined')this.User.pag.fnsArhStatus.limit=100
                this.setDataUser().then(res=>{
                    this.getDataFnss()
                })
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
</style>
