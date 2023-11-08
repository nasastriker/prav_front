<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium ml-1 mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchBankOtherReturnSas - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchBankOtherReturnSas }} of {{ TotalArchBankOtherReturnSas }}</span>
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
                    <vs-button type="border" class="pull-right" style="padding: 0.75rem !important;height: 38px;"   @click="$router.push('/bank/other_return_people')">Список на отправку</vs-button>

                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
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
                            </vs-dropdown-item>

                          </vs-dropdown-menu>
                        </vs-dropdown>
                      </div>

                    </template>

                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ArchBankOtherReturnSasArr"
                    rowSelection="multiple"
                    :enableBrowserTooltips="true"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :overlayNoRowsTemplate="'Нет записей'"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
            @rowDoubleClicked="onrowDoubleClicked"
            :enableRtl="$vs.rtl">
            </ag-grid-vue>
          <vs-pagination
              :total="totalPages"
              :max="10"
              v-model="currentPage" />
            <vs-popup classContent="popup-example" title="Запуск выгрузки" :active.sync="showReturn">
              <div style="min-height: 300px;">
                <v-select style="margin-top: 15px" class="w-full" :reduce="label => label.id" label="name" :options="allJobArr"
                          v-model="oneJob" ></v-select>
                <div style="text-align: center;margin-top: 15px">
                  <vs-button color="primary" @click="runJobReturnMonday">Запуск</vs-button>
                </div>
              </div>
            </vs-popup>


            <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="popTaskBank">
              <PopUpTaskJob name="bank_return" :dataArr="TaskData"></PopUpTaskJob>

            </vs-popup>

        </div>
    </div>

</template>

<script>
    import Open from './Render/OpenOther.vue'
    import Name from './Render/Name.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import OpenStatusQuest from './Render/OpenStatusQuest.vue'
    import moment from 'moment';
    import r from '../../route';
    import axios from '../../axios'
    import PopUpTaskJob from '../RenderComponent/PopUpTaskJob.vue'
    export default {
        components: {
            Open,
            Name,
            OpenStatus,
            OpenStatusQuest,
            PopUpTaskJob,
        },

        data () {
            return {
              oneJob: 0,
              TaskData:[],
              allJobArr:[
                {
                  id:0,
                  name:'Все'
                }
              ],
                showReturn:false,
                popTaskBank:false,
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
                        tooltipField: 'arch_name',
                        filter: true,
                        width: 500,
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
                ],

                components: {
                    Open,OpenStatus,OpenStatusQuest,Name
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalArchBankOtherReturnSas/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              return this.User.pag.bankArchReturn.limit
            },
            ...mapGetters([
                'ArchBankOtherReturnSasArr','TotalArchBankOtherReturnSas','User'

            ]),
          currentPage: {
            get () {
              if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
              else return 1
            },
            set (val) {
              this.setQueryBankArchReturnOffset(val-1)
              this.getDataArchBankOtherReturnSas(this.User.pag.bankArchReturn);
              this.gridApi.paginationGoToPage(val - 1)
            }
          },

        },
        methods: {
          refreshBankList(){
            this.getDataArchBankOtherReturnSas(this.User.pag.bankArchReturn);
          },
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
            changePag(pag){

              this.User.pag.bankArchReturn.limit=pag
              this.setDataUser()
              this.getDataArchBankOtherReturnSas(this.User.pag.bankArchReturn);
              this.setQueryBankArchReturnLimit(pag);
              this.gridApi.paginationSetPageSize(pag)
            },


            onrowDoubleClicked(event){
                axios.get(r("returnBank.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getArch',
                        param:event.data.id


                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.data.arch_name);
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchBankOtherReturnSas();

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
            ...mapActions([
                'getDataArchBankOtherReturnSas','setDataUser','getTaskJobStatusFromTaskJobsStatus'
            ]),
          ...mapMutations([
            'setQueryBankArchReturnLimit','setQueryBankArchReturnOffset'

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
            this.getData()
            this.getDataArchBankOtherReturnSas(this.User.pag.bankArchReturn);
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
