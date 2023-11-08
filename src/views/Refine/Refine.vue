<template>
    <div>
            <div class="flex flex-wrap justify-between items-end">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                   <div class="vx-row">
                    <div class="vx-col 1">
                       <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium " style="padding: 0.75rem !important;margin-top: 18px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDebtorRefines - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDebtorRefines }} of {{ TotalDebtorRefines }}</span>
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
                    <div class="vx col 2">
                        <div class="centerx">
                            <vs-tooltip text="Фильтр по cтатусу" position="top" >
                                <h6 class="h6Blue mb-1">Статус</h6>
                            </vs-tooltip>
                        </div>
                      <v-select  class="w-50" style="min-width: 200px" :reduce="label => label.id_status" label="name" :options="StatussDebtorArrAndAll"  v-model="id_status" @input="setStatus" ></v-select>
                    </div>

                       <template v-if="id_status==17">
                       <div class="vx-col 3">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по региону" position="top" >
                                    <h6 class="h6Blue mb-1">Регион</h6>
                                </vs-tooltip>
                            </div>
                           <v-select  class="w-50" style="min-width: 200px" :reduce="label => label.id" label="name" :options="RegionArr"  v-model="region" @input="setRegion" ></v-select>
                       </div>
                       </template>
                       <div class="vx-col 4">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по взыскателю" position="top" >
                                    <h6 class="h6Blue mb-1">Взыскатель</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50" style="min-width: 200px" :reduce="label => label.id" label="name" :options="RecoverArrList"  v-model="recov" @input="setRecover" ></v-select>
                       </div>
                       <template v-if="id_status==1">
                       <div class="vx-col">
                           <vs-button  style="margin-left: 10px; margin-top: 18px;" @click="showException=true">Исключения</vs-button>
                       </div>
                       </template>
                       <template v-if="id_status==17">
                         <div class="dropdown-button-container" style="    margin-top: 20px;">
                           <vs-button class="btnx" color="danger" type="gradient"
                                      @click="loadToXls">Выгрузить</vs-button>
                           <vs-dropdown>
                             <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                             <vs-dropdown-menu>
                               <vs-dropdown-item>
                                 <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showFilesPopup">Просмотреть выгрузки</vs-button>
                               </vs-dropdown-item>
                               <vs-dropdown-item>
                                 <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showRefineHis">История</vs-button>
                               </vs-dropdown-item>

                             </vs-dropdown-menu>
                           </vs-dropdown>
                         </div>

                       </template>

                       </div>


                   </div>



                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                <!--
                 <vs-input class="mb-4 md:mb-0 mr-4"  v-model="User.pag.refine.find" @input="updateSearchQuery" placeholder="Поиск..." />
                !-->
                    <vs-button color="success" type="filled"  @click="">Скачать</vs-button>





                </div>
            </div>
            <div class="flex flex-wrap justify-between items-center" style="margin-top: 0px">


            </div>
            <vs-popup classContent="popup-example" title="Добавить исключения в адресе" :active.sync="showException">
            <refineException></refineException>
            </vs-popup>
            <vs-popup classContent="popup-example" title="Скачать файлы выгрузок" :active.sync="showFileList">
                    <div v-if="FilesRefineArr.length == 0" style="display: flex">
                        <div>Нет выгруженных файлов</div>
                        <refresh-cw-icon size="1.5x" class="hover:text-primary cursor-pointer" style="margin-left: auto" @click="refreshFiles"></refresh-cw-icon>
                    </div>
                    <div v-else>
                        <div style="margin-bottom: 10px;display: flex">
                            <div>Всего файлов <b>{{ FilesRefineArr.length }}</b></div>
                            <div class="hover:text-primary cursor-pointer" style="margin-left: auto;margin-right: 15px;color: red" @click="deleteFiles">Удалить все файлы выгрузок</div>
                            <refresh-cw-icon size="1.5x" class="hover:text-primary cursor-pointer" @click="refreshFiles"></refresh-cw-icon>
                        </div>
                        <template v-for="(item,index) in FilesRefineArr">
                            <div style="margin-left: 10px;margin-right: 10px;color: red" @click="downloadDocument(item)" class="hover:text-primary cursor-pointer">
                                {{ item }}
                            </div>
                            <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                        </template>
                    </div>
            </vs-popup>

            <!-- AgGrid Table -->
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="DebtorRefinesArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="true"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>
          <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="popTaskRefine">
            <TaskRefine></TaskRefine>
          </vs-popup>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />


    </div>

</template>

<script>
    import Status from './Render/OpenStatus.vue'
    import { RefreshCwIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import refineException from './RefineException.vue'
    import TaskRefine from './Render/TaskRefine.vue'
    export default {
        components: {
            Status,
            RefreshCwIcon,
            TaskRefine,
            refineException
        },
        data () {
            return {
                popTaskRefine:false,
                showRefineRegionsCheck:false,
                showException:false,
                recov:0,
                regionName:0,
                showFileList:false,
                chang:true,
                id_status:0,
                cessPrav:[
                    { name: 'Все', id: -1 },
                    { name: 'Правеж', id: 1 },
                    { name: 'Остальные', id: 0 },

                ],
                statusFilter: { label: 'Все', value: 'all' },
                statusOptions: [
                    { label: 'Все', value: 'all' },
                    { label: 'Ошибки', value: 'Ошибки' },

                ],
                region:'Все',
                recover:'Все',
                results: null,
                help: 'Necessary columns are: login, firstname and lastname',
                tableData: [],
                header: [],
                sheetName: '',
                searchQuery: '',
                status:'',
                // AgGrid
                gridApi: null,
                gridOptions: {

                    alwaysShowVerticalScroll:true
                },
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: 'recover',
                        field: 'recover',
                        filter: true,
                        hide:false,
                        width: 200
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'id_status',
                        field: 'id_status',
                        hide: false,
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Status'
                    },
                    {
                        headerName: 'Регион',
                        headerTooltip: 'Регион',
                        tooltipField: 'data_reg.region',
                        field: 'data_reg.region',
                        filter: true,
                        hide:false,
                        width: 250
                    },
                    {
                        headerName: 'Адрес рег',
                        headerTooltip: 'Адрес регистрации',
                        tooltipField: 'address_reg',
                        field: 'address_reg',
                        filter: true,
                        hide:false,
                        width: 350
                    },

                    {
                        headerName: 'Фамилия',
                        headerTooltip: 'Фамилия',
                        tooltipField: 'name_family',
                        field: 'name_family',
                        filter: true,
                        hide:false,
                        width: 120
                    },
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        hide:false,
                        width: 120
                    },

                    {
                        headerName: 'Отчество',
                        headerTooltip: 'Отчество',
                        tooltipField: 'name_patronymic',
                        field: 'name_patronymic',
                        filter: true,
                        hide:false,
                        width: 120
                    },
                    {
                        headerName: 'Email',
                        headerTooltip: 'Email',
                        tooltipField: 'email',
                        field: 'email',
                        filter: true,
                        hide:false,
                        width: 200
                    },
                    {
                        headerName: 'Телефон',
                        headerTooltip: 'Телефон',
                        tooltipField: 'phone',
                        field: 'phone',
                        filter: true,
                        hide:false,
                        width: 150
                    },

                ],

                // Cell Renderer Components
                components: {
                    Status,
                }
            }
        },
        watch: {

            statusFilter (obj) {

                this.setColumnFilter('status', obj.value)
            },

        },
        computed: {
            recovName(){
                for (let i=0;i<this.cessPrav.length;i++){
                    if(this.cessPrav[i].id==this.User.pag.refine.recov){
                        return this.cessPrav[i].name
                    }

                }
            },

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalDebtorRefines/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.refine.limit
            },

            ...mapGetters([
                'DebtorRefinesArr','TotalDebtorRefines','User','StatussDebtorArrAndAll','RegionArr',
                'FilesRefineArr','RecoverArrList'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryRefineOffset(val-1)
                    this.getDebtorRefinesFilter(this.User.pag.refine);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },


        },
        methods: {
            showRefineHis(){
              this.getTasRefine()
              this.popTaskRefine=true
            },
            deleteFiles(){
                this.deleteFileListRefine().then((response) => {
                    if (!response){
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка при удалении',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
                    this.refreshFiles();
                })
            },
            refreshFiles(){
                this.getFileListRefine();
            },
            downloadDocument(val){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("debtorRefines.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getFileRefine',
                        param:val
                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xlsx;charset=UTF-8;' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', val);
                    document.body.appendChild(link);
                    link.click();
                    this.$vs.loading.close()
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
            showFilesPopup(){
                this.getFileListRefine();
                this.showFileList = true;
            },
            loadToXls(){
                this.loadDebtors17ToXls(this.User.pag.refine.region);
            },

            setStatus(index){
                this.User.pag.refine.status=this.id_status

                this.setDataUser().then((response) => {
                    this.$vs.loading({color: '#ff8000'})
                    this.getDebtorRefinesFilter(this.User.pag.refine).then((response) => {
                        this.$vs.loading.close()
                    }).catch(error => {
                        this.$vs.loading.close()

                    });

                })

            },
            setRegion(){
                if(this.region==null)this.region=-1
                this.$vs.loading({color: '#ff8000'})
                this.User.pag.refine.region=this.region
                this.setDataUser().then((response) => {
                    this.$vs.loading({color: '#ff8000'})
                    this.getDebtorRefinesFilter(this.User.pag.refine).then((response) => {
                        this.$vs.loading.close()
                    }).catch(error => {
                        this.$vs.loading.close()

                    });

                })

            },
            changePag(pag){

                this.User.pag.refine.limit=pag
                this.setDataUser().then((response) => {
                    this.$vs.loading({color: '#ff8000'})
                    this.getDebtorRefinesFilter(this.User.pag.refine).then((response) => {
                        this.$vs.loading.close()
                    }).catch(error => {
                        this.$vs.loading.close()

                    });
                })

                this.setQueryRefineLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){
              //  console.log(this.DebtorRefinesArr)
               // console.log(this.RecoverArrList)
               if(event.data.id_status==17)this.$router.push('/refine_ut/'+event.data.id_debtor)
               if(event.data.id_status==1)this.$router.push('/refine/'+event.data.id)
               if(event.data.id_status==74)this.$router.push('/refine_address/'+event.data.id_debtor)

              if(event.data.id_status==7)this.$router.push('/refine_address/'+event.data.id)
                // if(event.data.id_status==17||event.data.id_status==74){
                //         this.$router.push('/refine_ut/'+event.data.id_debtor)
                //     }
                //     else{
                //     this.$router.push('/refine/'+event.data.id)
                //     }

            },
            setColumnFilter (column, val) {
                //console.log(column);
                const filter = this.gridApi.getFilterInstance(column)
                let modelObj = null

                if (val !== 'all') {
                    modelObj = { type: 'equals', filter: val }
                }

                filter.setModel(modelObj)
                this.gridApi.onFilterChanged()
            },
            resetColFilters () {
                // Reset Grid Filter
                this.gridApi.setFilterModel(null)
                this.gridApi.onFilterChanged()

                // Reset Filter Options
                this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

                this.$refs.filterCard.removeRefreshAnimation()
            },


            hideCol(index){

                this.columnDefs[index].hide=!this.columnDefs[index].hide;
                let a=this.columnDefs

                this.columnDefs=JSON.parse(JSON.stringify(a))
                this.saveColumn();
            },

            onValidate(results) {
                this.results = results;
            },
            ...mapMutations([
                'setQueryRefineLimit','setQueryRefineOffset'

            ]),
            ...mapActions([
                'getRecoverArrList','getDataDebtorRefines','getDataStatuss','setDataUser','getRegion','getDataReestrsAndPravDogovor',
                'loadDebtors17ToXls', 'getFileListRefine', 'deleteFileListRefine','getDebtorRefinesFilter',
                'getStatussDebtorArrAndAll','getDataUser','getTasRefine'
            ]),
            updateSearchQuery (val) {
                this.User.pag.refine.find=val
                this.$vs.loading({color: '#ff8000'})
                this.getDebtorRefinesFilter(this.User.pag.refine).then((response) => {
                    this.$vs.loading.close()
                }).catch(error => {
                    this.$vs.loading.close()

                });

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
            setRecover(){


                if(this.recov==null)this.recov=0

                this.User.pag.reports.recov=this.recov
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.recov){
                        this.User.pag.refine.id_recover=this.RecoverArrList[i].num
                        this.User.pag.refine.num_recover=this.RecoverArrList[i].id
                        this.User.pag.refine.cession=this.RecoverArrList[i].cession
                        this.User.pag.refine.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                this.setDataUser().then((response)=>{
                    this.$vs.loading({color: '#ff8000'})
                    this.getDebtorRefinesFilter(this.User.pag.refine).then((response) => {
                        this.$vs.loading.close()
                    }).catch(error => {
                        this.$vs.loading.close()

                    });
                })

            },
        },
        mounted () {
            this.gridApi = this.gridOptions.api

          this.getStatussDebtorArrAndAll()
            this.getRecoverArrList()

            this.getDataReestrsAndPravDogovor()
            this.getRegion()
            this.getDataUser().then((response)=>{
                if(typeof this.User.pag.refine.num_recover != 'undefined')this.recov=this.User.pag.refine.num_recover
                else this.recov=0
                if(typeof this.User.pag.refine.status!='undefined' )
                  this.id_status=this.User.pag.refine.status

                else {
                    this.status=1
                    this.SetDataUser()
                }
                if(typeof this.User.pag.refine.region != 'undefined')this.region=this.User.pag.refine.region
                else this.User.pag.refine.region=-1
            })
            this.getDebtorRefinesFilter(this.User.pag.refine)



        }

    }


</script>
<style>
    .scroll ul.vs-component.vs-dropdown--menu {
        height: 85vh;
        overflow-y: scroll;
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
    .ag-row{
        height: 23px!important;

        padding: 0px!important; margin: 0px!important;
    }
    .ag-cell{

        padding: 0px!important; margin: 0px!important;

    }
    .ag-header-row{
        height: 26px!important;
    }
    .ag-theme-material .ag-cell {
        line-height:15px!important;
    }

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
