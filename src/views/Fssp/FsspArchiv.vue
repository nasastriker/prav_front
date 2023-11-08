<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">

                    <div class="vx-col w-2/4">
                        <div class="vx-row">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="cursor-pointer flex items-center justify-between font-medium ml-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchFssps - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchFssps }} of {{ TotalArchFssps }}</span>
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
                            <vs-input type="date" v-model="User.pag.bankFsspDate" @change="changeDate" style="margin-left: 10px"></vs-input>

                        </div>
                    </div>

                    <div class="vx-col w-2/4 mb-2" >
                        <div class="vx-row">
                            <div class="vx-col flex">
                           <span style="max-width: 40px;">
                            <img src="/loading.gif" v-if="ArchFsspFindFlag" style="max-width: 40px; margin-top: 5px;">
                            </span>

                        <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                        <template v-if="User.accsess_upload==1">
                            <div class="dropdown-button-container">
                                <vs-button class="btnx" color="danger" type="gradient"
                                           @click="runJobFsspMonday">Запустить выгрузку</vs-button>
                                <vs-dropdown>
                                    <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                                    <vs-dropdown-menu>
                                        <vs-dropdown-item>
                                            <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showFsspHis">История</vs-button>
                                        </vs-dropdown-item>

                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </div>
                        </template>
                            </div>
                            </div>
                    </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ArchFsspsArr"
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
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
            <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="popTaskFssp">
                <TaskFssp></TaskFssp>
            </vs-popup>

        </div>
    </div>

</template>

<script>
    import Open from './Render/Open.vue'
    import { mapActions,mapGetters } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import TaskFssp from './Render/TaskFssp.vue'
    import OpenReestr from './Render/OpenReestr.vue'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            Open,
            OpenStatus,
            TaskFssp,
            OpenReestr,
        },
        data () {
            return {
                popTaskFssp:false,
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
                      headerTooltip: 'Имя архива',
                      tooltipField: 'arch_name',
                        field: 'arch_name',
                        filter: true,
                        width: 300,
                    },
                    {
                        headerName: 'Кол.',
                      headerTooltip: 'Количество',
                      tooltipField: 'count_credit',
                        field: 'count_credit',
                        filter: true,
                        width: 80,
                    },
                    {
                        headerName: 'Реестр',
                      headerTooltip: 'Реестр',
                      tooltipField: 'id_pochta',
                        field: 'id_pochta',
                        filter: true,
                        width: 250,
                        cellRendererFramework: 'OpenReestr'
                    },
                    {
                        headerName: 'Дата',
                      headerTooltip: 'Дата',
                      tooltipField: 'date',
                        field: 'date',
                        filter: true,
                        width: 200,
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
                      tooltipField: 'id',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open'
                    },

                    {
                        headerName: 'Дата',
                      headerTooltip: 'Дата',
                      tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },


                ],

                // Cell Renderer Components
                components: {
                    Open,OpenStatus
                }
            }
        },

        computed: {
            channel(){
                return this.$echo.join("reload-channel");
            },
            totalPages () {
             //   console.log(Math.ceil(this.TotalArchFssps/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalArchFssps/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'ArchFsspsArr','TotalArchFssps','User','ArchFsspFindFlag','TaskFsspsArr'

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
            showFsspHis(){
                this.getTasFssps()
                this.popTaskFssp=true
            },
            changeDate(){
                if(this.User.pag==null){
                    this.User.pag={
                        bankFsspDate:'',
                    }
                }



                this.setDataUser().then((response) => {
                    this.getDataArchFssps(this.User.pag.bankFsspDate);
                })
            },
          runJobFsspMonday(){
              this.startJobFsspMonday().then((response) =>{
                if (response) {
                  this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Выгрузка запущена',
                    color: 'success',
                    position: 'top-center'
                  })
                }
              });
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

            onrowDoubleClicked(event){

                axios.get(r("archFssp.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:event.data.id


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.data.arch_name+'.zip');
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchFssps(this.User.pag.bankFsspDate);


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
                'getDataArchFssps','startJobFsspMonday','setDataUser','getTasFssps'
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
            reload(e){
                if(e.data=='fsspArch'){
                    this.getDataArchFssps(this.User.pag.bankFsspDate)
                }
            }


        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            this.getDataArchFssps(this.User.pag.bankFsspDate);
        }
    }

</script>

<style lang="scss">

    .dropdown-button-container {
        display: flex;
        align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
    }
</style>
