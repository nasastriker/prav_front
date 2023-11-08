<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col w-2/3">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium mr-4 ml-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchPfrs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchPfrs }} of {{ TotalArchPfrs }}</span>
                                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>
                            <vs-dropdown-menu>
                                <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                    <span>20</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                                    <span>50</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                                    <span>100</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                                    <span>150</span>
                                </vs-dropdown-item>
                            </vs-dropdown-menu>
                        </vs-dropdown>
                        <vs-input type="date"  v-model="User.pag.pfrDate" @change="changeDate" style="margin-left: 10px"></vs-input>
                        <div class="vx-col" v-if="User.accsess_upload==1">
                            <div class="dropdown-button-container">
                                <vs-button  class="btnx" color="danger" type="filled"
                                            @click="showRunJobSoprMonday=!showRunJobSoprMonday">Запустить выгрузку</vs-button>
                                <vs-dropdown>
                                    <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                                    <vs-dropdown-menu>
                                        <vs-dropdown-item>
                                            <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showTaskPfr">История</vs-button>
                                        </vs-dropdown-item>
                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="vx-col w-1/3  mb-2 " style="    text-align: end;">
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ArchPfrsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

            <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="popTaskPfr">
                <PopUpTaskJob name="GeneratePfr" :dataArr="TaskData"></PopUpTaskJob>

            </vs-popup>
          <vs-popup classContent="popup-example" title="Удаление:" :active.sync="showSob">
            <DeletePfrFile @close="closePop" :AnswerFileName="AnswerFileName" :AnsCreditsArr="arrDelete" :statusOld="statusOld" :TotalRecordsAns="arrDeleteTotal"></DeletePfrFile>

          </vs-popup>
          <vs-popup classContent="popup-example" title="Запуск выгрузки" :active.sync="showRunJobSoprMonday">
            <v-select style="margin-top: 15px" class="w-full" :reduce="label => label.id" label="name" :options="allJobArr"
                      v-model="oneJob" ></v-select>
            <div style="text-align: center;margin-top: 15px">
              <vs-button color="primary" @click="runJobPfrMonday">Запуск</vs-button>
            </div>
          </vs-popup>

        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/Open.vue'
    import Name from './Render/Name.vue'
    import DeletePfrFile from './DeletePfrFile.vue'
    import { mapActions,mapGetters } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import ReestrPochta from './Render/ReestrPochta.vue'
    import r from '../../route';
    import PopUpTaskJob from '../RenderComponent/PopUpTaskJob.vue'
    import DeleteArch from '../DeleteArch/DeleteArch.vue';
    import axios from '../../axios'
    export default {
        components: {
            DeleteArch,
            Open,
          DeletePfrFile,
            Name,
            OpenStatus,
            ReestrPochta,
            PopUpTaskJob,
            VueCsvImport,
        },

        data () {
            return {
                oneJob: 0,
                showDelete:false,
                TaskData:[],
                showRunJobSoprMonday:false,
                AnswerFileName:'',
                arrDelete:[],
                idDelete:0,
                popTaskPfr:false,
                arrDeleteTotal:0,
                statusOld:60,
                showSob:false,
                searchQuery: '',
                csv:[],
                allJobArr:[
                  {
                    id:0,
                    name:'Выгрузка в ПФР'
                  }
                ],
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
                        tooltipField: 'arch_name',
                        field: 'arch_name',
                        filter: true,
                        width: 400,
                        cellRendererFramework: 'Name'
                    },
                    {
                        headerName: 'Количество',
                        field: 'count_credit',
                        headerTooltip: 'Количество',
                        tooltipField: 'count_credit',
                        filter: true,
                        width: 50,

                    },
                    {
                        headerName: 'Дата',
                        field: 'date',
                        headerTooltip: 'Дата',
                        tooltipField: 'date',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Реестр',
                        headerTooltip: 'Реестр',
                        tooltipField: 'id_pochta',
                        field: 'id_pochta',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'ReestrPochta'
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status',
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
                            deleteArch: this.deleteArch.bind(this)
                        }
                    },



                ],

                // Cell Renderer Components
                components: {
                    Open,OpenStatus,Name,ReestrPochta
                }
            }
        },

        computed: {
            totalPages () {
             //   console.log(Math.ceil(this.TotalArchPfrs/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalArchPfrs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'ArchPfrsArr','TotalArchPfrs','User','StatussArr'

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
          closePop(){
            this.showSob=false
            this.getDataArchPfrs()
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
            showTaskPfr(){
                //  this.getTaskFns()
                this.getTaskJobStatusFromTaskJobsStatus('GeneratePfr').then((response)=>{
                    if(response.result){
                        this.TaskData=response.data
                    }
                    else this.TaskData=[]
                })

                this.popTaskPfr=true
            },
            deleteRecord(){
                if(this.statusOld==0){
                    this.$vs.notify({  title:'Сообщение', text: 'Не выбран статус !!!', color: 'danger', position: 'top-center' })
                    return
                }
                axios.post(r("archPfr.update"), {
                    params: {
                        method: 'deleteArchPfr',
                        param: {
                            id:this.idDelete,
                            statusOld:this.statusOld,
                        }


                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchPfrs()
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        this.idDelete=0;
                        this.showSob=false
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление не выполнено !!!', color: 'danger', position: 'top-center' })
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
            deleteArch(param){
                this.idDelete=param
                axios.get(r("archPfr.index"), {
                    params: {
                        method: 'getArchPfrFiles',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                       this.arrDelete= response.data.data
                        this.arrDeleteTotal= response.data.total
                      this.AnswerFileName=response.data.file
                       this.showSob=true;
                    }




                })
            },
            getData(){
              axios.get(r("archPfr.index"), {
                params: {
                  method: 'getJobs',
                  param: ''

                }
              }).then((response) => {
                if (response.data.result){
                  this.allJobArr=response.data.data
                }

              })
            },
            changeDate(){
                if(this.User.pag==null){
                    this.User.pag={
                        pfrDate:'',
                    }
                }

                this.setDataUser().then((response) => {
                    this.getDataArchPfrs();
                })
            },
            onrowDoubleClicked(event){

                axios.get(r("archPfr.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:event.data.id


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.data.arch_name);
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchPfrs();


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            ...mapActions([
                'getDataArchPfrs','setDataUser','startJobPfrMonday','getTaskJobStatusFromTaskJobsStatus'
            ]),

            runJobPfrMonday(){
                this.startJobPfrMonday(this.oneJob).then((response) =>{
                    if (response) {
                        this.showRunJobSoprMonday=false
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Выгрузка запущена',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                });
            },

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
            this.gridApi = this.gridOptions.api
            this.getData();
            this.getDataArchPfrs();
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
