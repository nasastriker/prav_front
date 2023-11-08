<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex-wrap justify-between items-center">
              <div class="vx-row">
                <div class="vx-col mb-2">
                  <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="cursor-pointer flex items-center justify-between font-medium ml-1" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                      <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchBankReturnSas - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchBankReturnSas }} of {{ TotalArchBankReturnSas }}</span>
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
                <div class="vx-col mb-2">
                  <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="ArchBankReturnSasList"   v-model="bankStatusReturnSa" @input="showBank" ></v-select>
                </div>
                <div class="vx-col mb-2">
                  <vs-input type="date" v-model="bankStatusReturnDateSa" @blur="changeDate" @keyup.enter="$event.target.blur()" style="margin-left: 10px" ></vs-input>
                </div>

                <div class="vx-col mb-2" style="margin-left: auto">
                  <template v-if="User.accsess_upload==1">
                    <div class="dropdown-button-container">
                      <vs-button class="btnx" color="danger" type="gradient" @click="showReturn=!showReturn">Запустить выгрузку</vs-button>
                      <vs-dropdown>
                        <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                        <vs-dropdown-menu>
                          <vs-dropdown-item>
                            <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px"  @click="refreshBankList">Обновить</vs-button>
                          </vs-dropdown-item>
                          <vs-dropdown-item>
                            <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showTaskBank">История</vs-button>
                          </vs-dropdown-item>
                          <vs-dropdown-item>
                            <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="downloadArch">Скачать</vs-button>
                          </vs-dropdown-item>

                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </div>

                  </template>
                  <template v-else>
                    <vs-button color="success" class="pull-right" type="filled"  @click="downloadArch">Скачать</vs-button>
                  </template>

                </div>
              </div>

            </div>
            <div class="out-main">
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ArchBankReturnSasArr"
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
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableRtl="$vs.rtl"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="BankListReturnSaLoadingFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>
            <vs-popup classContent="popup-example" title="Запуск выгрузки" :active.sync="showReturn">
              <div style="min-height: 300px;">
                <v-select style="margin-top: 15px" class="w-full" :reduce="label => label.id" label="name" :options="allJobArr"
                          v-model="oneJob" ></v-select>
                <div style="text-align: center;margin-top: 15px">
                  <vs-button color="primary" @click="runJobReturnMonday">Запуск</vs-button>
                </div>
              </div>
            </vs-popup>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
            <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="popTaskBank">
              <PopUpTaskJob name="bank_return" :dataArr="TaskData"></PopUpTaskJob>

            </vs-popup>
            <vs-popup classContent="popup-example" title="Удаление реестра" :active.sync="showSob">
                <label class="text-sm">Вернуть на статус</label>
                <v-select   class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="statusOld"  ></v-select>

                <div  style="text-align: center;margin-top: 15px">
                    <vs-button   color="primary" type="filled"  @click="deleteRecord">Удалить</vs-button>
                </div>
                <DeleteArch :arrDelete="arrDelete" :arrDeleteTotal="arrDeleteTotal"></DeleteArch>

            </vs-popup>

        </div>
    </div>

</template>

<script>
    import OpenReturnEdo from './Render/OpenReturnEdo.vue'
    import Name from './Render/Name.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import OpenStatusQuest from './Render/OpenStatusQuest.vue'
    import DeleteArch from '../DeleteArch/DeleteArch.vue';
    import PopUpTaskJob from '../RenderComponent/PopUpTaskJob.vue'
    import r from '../../route';
    import axios from '../../axios'
    import moment from 'moment';
    export default {
        components: {
            DeleteArch,
            OpenReturnEdo,
            Name,
            OpenStatus,
            PopUpTaskJob,
            OpenStatusQuest,
        },
        data () {
            return {
                allJobArr:[
                  {
                    id:0,
                    name:'Все'
                  }
                ],
                oneJob: 0,
                popTaskBank:false,
                TaskData:[],
                showReturn:false,
                arrDelete:[],
                statusOld:0,
                bankStatusReturnDateSa:'',
                bankStatusReturnSa:0,
                idDelete:0,
                arrDeleteTotal:0,
                showSob:false,
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
                        field: 'arch_name',
                        filter: true,
                        width: 400,
                        tooltipField: 'arch_name',
                        cellRendererFramework: 'Name'
                    },
                    {
                      headerName: 'Дата создания',
                      field: 'created_at',
                      filter: true,
                      width: 120,
                      cellRenderer: params => moment(params.value).format('HH:MM DD.MM.YYYY')
                    },

                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenStatus'
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenReturnEdo',
                        cellRendererParams: {
                            deleteArch: this.deleteArch.bind(this)
                        }
                    },


                ],

                // Cell Renderer Components
                components: {
                  OpenReturnEdo,OpenStatus,OpenStatusQuest,Name
                }
            }
        },

        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalArchBankReturnSas/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.bankSberAlfaReturnSa.limit
            },
            ...mapGetters([
                'ArchBankReturnSasArr','TotalArchBankReturnSas','User','BankListReturnSaLoadingFlag','ArchBankReturnSasList','StatussArr'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryBankSberAlfaReturnSasOffset(val-1)
                    this.getDataArchBankReturnSas(this.User.pag.bankSberAlfaReturnSa);
                    this.gridApi.paginationGoToPage(val - 1)
                },

            },

        },
        methods: {
          showTaskBank(){
            //  this.getTaskFns()
            this.getTaskJobStatusFromTaskJobsStatus('bank_return').then((response)=>{
              if(response.result){
                this.TaskData=response.data
              }
              else this.TaskData=[]
            })

            this.popTaskBank=true
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
            deleteRecord(){
                axios.post(r("archBankReturnSa.update"), {
                    params: {
                        method: 'deleteArchBankReturnSa',
                        param: {
                            id:this.idDelete,
                            statusOld:this.statusOld,
                        }


                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.refreshBankList()
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
                axios.get(r("archBankReturnSa.index"), {
                    params: {
                        method: 'getArchBankReturnSaFiles',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.arrDelete= response.data.data
                        this.arrDeleteTotal= response.data.total
                        this.showSob=true;
                    }
                })
            },
            ...mapActions([
                'getDataArchBankReturnSas','setDataUser','getDataUser','getArchBankReturnSasList','getTaskJobStatusFromTaskJobsStatus'
            ]),
            ...mapMutations([
                'setQueryBankSberAlfaReturnSasOffset','setQueryBankSberAlfaReturnSasLimit',
            ]),
            runJobReturnMonday(){
                this.showReturn=false;
                axios.get(r("archBankReturnSa.index"), {
                  params: {
                    method: 'runJobReturnMonday',
                    param: {
                      oneJob: this.oneJob,
                    }
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
            refreshBankList(){
                this.getDataArchBankReturnSas(this.User.pag.bankSberAlfaReturnSa);
            },
            downloadArch(){
                axios.get(r("archBankReturnSa.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'downloadArch',
                        param:''
                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
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
            changeDate(){
                    this.User.pag.bankSberAlfaReturnSa.bankStatusReturnDateSa=this.bankStatusReturnDateSa
                this.setDataUser().then((response) => {
                    this.getDataArchBankReturnSas(this.User.pag.bankSberAlfaReturnSa)
                })
            },
            showBank(){
                if(this.bankStatusReturnSa==null)this.bankStatusReturnSa=0
                this.User.pag.bankSberAlfaReturnSa.bankStatusReturnSa=this.bankStatusReturnSa

                this.setDataUser().then((response) => {
                    this.getDataArchBankReturnSas(this.User.pag.bankSberAlfaReturnSa)
                })
            },
            getData(){
              axios.get(r("archBankReturnSa.index"), {
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
            changePag(pag){
                this.User.pag.bankSberAlfaReturnSa.limit=pag
                this.setQueryBankSberAlfaReturnSaLimit(pag);
                this.setDataUser()
                this.getDataArchBankReturnSas(this.User.pag.bankSberAlfaReturnSa);
                this.gridApi.paginationSetPageSize(pag)

            },

            onrowDoubleClicked(event){
                axios.get(r("archBankReturnSa.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getArchReturn',
                        param:event.data.id
                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.data.arch_name);
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchBankReturnSas();
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

            updateSearchQuery (val) {
                this.User.pag.bankSberAlfaReturnSa.find=val

                this.getDataArchBankReturnSas(this.User.pag.bankSberAlfaReturnSa);
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.getData();
            this.gridApi = this.gridOptions.api
            this.getArchBankReturnSasList().then(res=>{
                this.getDataUser().then((res)=>{
                    this.getDataArchBankReturnSas(this.User.pag.bankSberAlfaReturnSa);
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
