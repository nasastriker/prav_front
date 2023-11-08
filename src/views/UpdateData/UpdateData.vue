<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium ml-1 mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalUpdateData - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalUpdateData }} of {{ TotalUpdateData }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <div class="excel-import" style="margin-left: 20px">
                      <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">
                      <div class="dropdown-button-container">
                        <vs-button class="btnx" color="success" type="gradient" @click="open">Импорт</vs-button>
                        <vs-dropdown>
                          <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>
                          <vs-dropdown-menu>
                            <vs-dropdown-item>
                              <a v-auth-href  href="/example_file/?filename=type_update" >Образец </a>
                            </vs-dropdown-item>
                          </vs-dropdown-menu>
                        </vs-dropdown>
                      </div>


                    </div>
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
                    :rowData="UpdateDataArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :paginationPageSize="paginationPageSize"
                    :enableBrowserTooltips="true"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>
            <vs-popup classContent="popup-example" title="Ошибка" :active.sync="pop">
                <vs-textarea class="w-100" height="600px" v-model="error" > </vs-textarea>
            </vs-popup>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import Status from './Render/StatusUpdateData.vue'
    import { VueCsvImport } from 'vue-csv-import';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import moment from 'moment';
    import axios from '../../axios'
    export default {
        components: {
            Status,
            VueCsvImport,
        },
        data () {
            return {

                // Filter Options
                data:[],
                pop:false,
                error:'',
                popupActive2:false,
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
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        width: 80,
                        headerTooltip: 'ID',
                        tooltipField: 'id',
                    },
                    {
                        headerName: 'Имя',
                        field: 'name',
                        filter: true,
                        width: 350,
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                    },

                    {
                        headerName: 'Количество',
                        field: 'count',
                        filter: true,
                        width: 80,
                        headerTooltip: 'Количество',
                        tooltipField: 'count',
                    },
                    {
                        headerName: 'Статус',
                        field: 'status',
                        headerTooltip: 'Статус',
                        tooltipField: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Status',
                        cellRendererParams: {
                            showPop: this.showPop.bind(this)
                        }
                    },

                    {
                        headerName: 'Пользователь',
                        field: 'name_user',
                        headerTooltip: 'Пользователь',
                        tooltipField: 'name_user',
                        filter: true,
                        width: 150,

                    },


                    {
                        headerName: 'Создан',
                        field: 'created_at',
                        headerTooltip: 'Создан',
                        tooltipField: 'created_at',
                        filter: true,
                        width: 250,
                      cellRenderer: params => moment(params.value).format('HH:MM DD.MM.YYYY')

                    },



                ],

                // Cell Renderer Components
                components: {
                    Status
                }
            }
        },

        computed: {
            channel(){
                return this.$echo.join("updateRun-channel");
            },
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalUpdateData/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.reestrImport!='undefined') {
                                return this.User.pag.reestrImport
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
               'TotalUpdateData','UpdateDataArr','User'

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
            open(){
              this.$refs.fileInput.click()
            },
            showPop(data){

                this.error=data
                if(this.User.email='amitx@list.ru'){
                    this.pop=true;

                }
            },
            reload(e){
                this.getDataUpdateData();
            },
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        reestrImport:100
                    }
                }
                this.User.pag.reestrImport=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },
            hideCol(index){

                this.columnDefs[index].hide=!this.columnDefs[index].hide;
                let a=this.columnDefs

                this.columnDefs=JSON.parse(JSON.stringify(a))
                this.saveColumn();
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
                this.$router.push('/update_data/'+event.data.id)
            },
            handleClick (evt) {
              this.$vs.loading({color: '#ff8000'})
              const formData = new FormData()
              formData.append('document', evt.target.files[0])
              axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
              axios.post('/update_data/document',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  }
              ).then((response) => {
                this.$vs.loading.close()
                if (response.data.result) {
                  this.getDataUpdateData()
                  this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })

                }else{
                  this.$vs.notify({  title:'Сообщение', text: 'Импорт не выполнен !!!', color: 'danger', position: 'top-center' })
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
              this.$refs.fileInput.value = '';

            },
            ...mapActions([
                'getDataUpdateData','setDataUser'
            ]),
            ...mapMutations([
                'hideReestr'
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
            this.channel.listen(".UpdateRun", (e) => this.reload(e));
            this.gridApi = this.gridOptions.api
            this.getDataUpdateData();
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
    .vs-popup--content{
      min-height: 500px!important;
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
