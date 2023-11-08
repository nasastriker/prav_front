<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col w-2/3">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium ml-4" style="padding: 0.75rem !important;margin-top: 20px;border: 1px solid #ccc;border-radius: 4px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchSuds - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchSuds }} of {{ TotalArchSuds }}</span>
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
                        <div style="margin-left: 15px">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по дате" position="top" >
                                    <h6 class="h6Blue mb-1">Дата</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input type="date" v-model="User.pag.bankSudDate" @blur="changeDate"></vs-input>
                        </div>
                        <div style="margin-left: 15px">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по статусу" position="top" >
                                    <h6 class="h6Blue mb-1">Статус</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50 " style="min-width:200px" :reduce="label => label.id" label="name" :options="PrintFilterArr" v-model="User.pag.printFilterId" @input="changePrintFilter"></v-select>
                        </div>
                        <div style="margin-left: 15px">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по реестру" position="top" >
                                    <h6 class="h6Blue mb-1">Реестр</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input type="text" placeholder="Реестр" v-model="User.pag.sud.find" @change="changeFind" ></vs-input>
                        </div>
                    </div>
                </div>

                <div class="vx-col w-1/3  mb-2 mt-5" style="justify-content: end; display: flex;">
                    <template v-if="User.accsess_upload==1">
                        <div class="dropdown-button-container">
                        <vs-button class="btnx" color="danger" type="gradient" @click="runUved">Запустить выгрузку</vs-button>
                        <vs-dropdown>
                            <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                            <vs-dropdown-menu>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="donwload">Скачать архив</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showTaskSud">История</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="jobOpiska">Выгрузить описка</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="jobDublicat">Выгрузить Дубликат</vs-button>
                                </vs-dropdown-item>

                            </vs-dropdown-menu>
                        </vs-dropdown>
                        </div>


                    </template>
                  <template v-else>
                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="donwload">Скачать архив</vs-button>
                  </template>

                </div>


            </div>
            <!-- AgGrid Table -->
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ArchSudsArr"
                    :enableBrowserTooltips="true"
                    rowSelection="multiple"
                    @grid-size-changed="onGridSizeChanged"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    @selection-changed="onSelectionChanged"
                    :paginationPageSize="paginationPageSize"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :suppressPaginationPanel="true"
                     @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="popTaskSud">
                <TaskSud :taskShow="popTaskSud"></TaskSud>
            </vs-popup>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import Open from './Render/OpenSud.vue'
    import { mapActions,mapGetters,mapMutations  } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import OpenCheck from './Render/OpenCheck.vue'
    import OpenHref from './Render/OpenHref.vue'
    import Name from './Render/Name.vue'
    import TaskSud from './Render/TaskSud.vue'
    import OpenReestr from './Render/OpenReestr.vue'
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        components: {
            TaskSud,
            OpenCheck,
            OpenHref,
            Name,
            Open,
            OpenStatus,
            OpenReestr,
        },
        watch: {
          popTaskSud(newVal, oldVal) {
            if (newVal&&!oldVal) {
              this.getTaskSuds(this.User.pag.taskSudHistory);
            }
          },
          SudFindFlag(newQuestion) {
            if (newQuestion) {
              this.gridApi.showLoadingOverlay();
            }else{
              this.gridApi.hideOverlay();
            }
          },

        },
        data () {
            return {

                // Filter Options
                popTaskSud:false,
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
                        field: 'arch_name',
                        tooltipField: 'arch_name',
                        filter: true,
                        width: 550,
                        cellRendererFramework: 'OpenHref'
                    },
                    {
                        headerName: 'Кол.',
                        headerTooltip: 'Количество',
                        field: 'count',
                        filter: true,
                        width: 70,
                    },
                    {
                        headerName: 'Распечатан',
                        headerTooltip: 'Распечатан',
                        field: 'check_rasp',
                        filter: true,
                        width: 180,
                        cellRendererFramework: 'OpenCheck'
                    },
                    {
                        headerName: 'Реестр',
                        headerTooltip: 'Почтовый реестр',
                        field: 'pochta',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenReestr'
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 170,
                        cellRendererFramework: 'OpenStatus'
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        field: 'date',
                        tooltipField: 'date',
                        filter: true,
                        width: 190,
                    },
                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 130,
                        cellRendererFramework: 'Open'
                    },
                ],
                components: {
                    Open,OpenStatus,OpenCheck,OpenHref,OpenReestr,Name
                }
            }
        },
        computed: {
            channel(){
                return this.$echo.join("updateArchSud-channel");
            },
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalArchSuds/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.sud.limit
            },

            ...mapGetters([
                'ArchSudsArr','TotalArchSuds','User','PrintFilterArr','OtpravFilterArr','SudFindFlag'

            ]),
            currentPage: {
                get () {
                //  console.log(this.User.pag.sud.curPage)
                  if (typeof this.User.pag.sud.curPage !== 'undefined') {
                    return this.User.pag.sud.curPage
                  }
                  else{

                    return 1
                  }

                },
                set (val) {

                  this.setQuerySudOffset(val-1)
                  this.getDataArchSuds(this.User.pag.sud).then((response)=>{
                    this.User.pag.sud.curPage=val;
                    this.onGridReady()
                  })



                }

            },


        },
        methods: {
            onSelectionChanged() {
              this.User.pag.sud.selectId=this.gridApi.getSelectedRows()[0].id
              this.setDataUser()
            },
            onGridReady() {
              this.gridOptions.api.forEachNode(node=>
                  node.data.id == this.User.pag.sud.selectId ? node.setSelected (true) : node.setSelected(false));
            },
            donwload(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'downLoadArch',
                        param: this.User.pag.bankSudDate
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        window.open('/arch_sud_link/'+response.data.data, '_blank');
                    }
                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                });


            },

            jobDublicat(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'startDublicat',
                        param: ''

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Выгрузка запущенна', text: response.data.mess , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            jobOpiska(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'startOpiska',
                        param: ''

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Выгрузка запущенна', text: response.data.mess , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            showTaskSud(){
                // this.getTaskSuds()
                this.popTaskSud=true
            },
            runUved(){
              this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Сообщение',
                text: `Вы действительно хотите запустить все активные базовые задачи? `,
                accept: this.runJobSudMonday,
                acceptText: 'Да',
                cancelText: 'Отмена'
              })
            },
            runJobSudMonday(){
              axios.get(r('archSud.index'), {
                params: {
                  method: 'startJobSudMonday',
                  param: ''
                }
              }).then((response) => {
                if (response.data.result){
                  this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Выгрузка запущена',
                    color: 'success',
                    position: 'top-center'
                  })
                }
                else{
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Ошибка',
                    color: 'danger',
                    position: 'top-center'
                  })
                }
              }).catch(error => {
                this.getDataArchSuds(this.User.pag.sud);
                this.$vs.loading.close()
                this.$vs.notify({
                  title: 'Ошибка',
                  text: error.message,
                  color: 'danger',
                  position: 'top-center'
                })
              })


            },
            ...mapMutations([
                'setQuerySudLimit','setQuerySudOffset'

            ]),
            changeFind(){
                this.setDataUser()
                this.getDataArchSuds(this.User.pag.sud);
            },
            changePag(pag){

                this.User.pag.sud.limit=pag
                this.setDataUser()
                this.getDataArchSuds(this.User.pag.sud);
                this.setQuerySudLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            changePrintFilter(){
                if(this.User.pag==null){
                    this.User.pag={
                        printFilterId:'all',
                    }
                }

                this.setDataUser().then((response) => {
                    this.getDataArchSuds(this.User.pag.sud);
                })
            },
            reload(e){
               this.getDataArchSuds(this.User.pag.sud).then((response)=>{
                this.onGridReady()
              });
            },
            refresh(){
                this.getDataArchSuds(this.User.pag.sud);
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
                if(this.User.pag==null){
                    this.User.pag={
                        bankSudDate:'',
                    }
                }



                this.setDataUser().then((response) => {
                    this.getDataArchSuds(this.User.pag.sud);
                })
            },
            generate(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'generateArchSud',
                        param: ''

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                        this.getDataArchSuds(this.User.pag.sud);
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                        this.getDataArchSuds(this.User.pag.sud);
                    }



                }).catch(error => {
                    this.getDataArchSuds(this.User.pag.sud);
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            onrowDoubleClicked(event){
            },
            ...mapActions([
                'getDataArchSuds','setDataUser','startJobSudMonday','getTaskSuds'
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

            this.gridApi = this.gridOptions.api
            this.channel.listen(".UpdateArchSud", (e) => this.reload(e));
            this.gridApi.paginationGoToPage(this.User.pag.sud.curPage - 1)


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
