<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ total - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : total }} of {{ total }}</span>
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
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <label class="mb-4 md:mb-0 mr-4" style="right: 100px; color: red">Время сервера {{ServerDateShedule}}</label>
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="showAdd">Добавить</vs-button>
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="data"
                    :enableBrowserTooltips="true"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :suppressPaginationPanel="true"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
          <vs-popup class="holamundo" title="Инфо" :active.sync="editDataShow">
            <label class="text-sm">Цессия:</label>

            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="optArr"   v-model="editData.id_recover"  ></v-select>

            <label class="text-sm" style="margin-top: 10px">Статус:</label>
            <vs-checkbox style="margin-bottom: 15px" v-model="editData.status">Активна</vs-checkbox>
            <h6 class="h6" style="margin-top: 10px">Первая дата запуска функции:</h6>

            <vs-input type="date" class="w-100"  v-model="editData.date_p"></vs-input>

            <h6 class="h6" style="margin-top: 10px;margin-bottom: 10px">Периодичность:</h6>
            <v-select  class="w-50 " :reduce="label => label.id" label="label" :options="PeriodList"    v-model="editData.period"  ></v-select>

            <template v-if="(editData.period==3)||(editData.period==5)">
              <v-select  class="w-50 " style="margin-top: 10px" :reduce="label => label.id" label="label" :options="WeekList"    v-model="editData.week"  ></v-select>

            </template>
            <template v-if="editData.period==4">
              <v-select  class="w-50 " style="margin-top: 10px" :reduce="label => label.id" label="label" :options="MounthList"    v-model="editData.mounth"  ></v-select>
            </template>
            <vs-input type="time" class="w-100" style="margin-top: 10px"  v-model="editData.time"></vs-input>




            <div style="margin-top: 10px;text-align: center">
              <vs-row>
                <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
              </vs-row>
            </div>
          </vs-popup>

        </div>
    </div>

</template>

<script>
    import r from '@/route';
    import axios from '@/axios'
    import Status from './Render/StatusSheduler.vue'
    import Open from './Render/OpenSheduler.vue'
    import OpenLink from './Render/OpenFuncShedule.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {
            Status,
            Open,
            OpenLink
        },
        props: {
          id:0,
        },
        data () {
            return {
                deleteId:0,
                editData:{
                  date_p:0,
                  period:0,
                  week:0,
                  mounth:0,
                  time:0,
                },
                editDataShow:false,
                data:[],
                total:0,
                searchQuery: '',
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
                        headerTooltip: 'ID',
                        tooltipField: 'id',
                        filter: true,
                        width: 60
                    },
                    {
                        headerName: 'Цессия',
                        field: 'id_recover',
                        headerTooltip: 'Цессия',
                        filter: true,
                        width: 500,
                        cellRenderer: params =>{
                          for (let i = 0; i < this.optArr.length; i++) {
                            if (this.optArr[i].id==params.data.id_recover){return this.optArr[i].name}
                          }
                          return ''
                        }
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Status',
                        cellRendererParams: {
                          go_refresh_shed: this.refreshRecordsSheduler.bind(this)
                        }

                    },
                    {
                        headerName: 'Время запуска',
                        headerTooltip: 'Время запуска',
                        tooltipField: 'time',
                        field: 'time',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Периодичность',
                        headerTooltip: 'Периодичность',
                        tooltipField: 'PeriodText',
                        field: 'PeriodText',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Дата следующего запуска',
                        headerTooltip: 'Дата следующего запуска',
                        tooltipField: 'RunDate',
                        field: 'RunDate',
                        filter: true,
                        width: 200,

                    },
                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
                        tooltipField: 'id',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenLink',
                        cellRendererParams: {
                          delete_var: this.confirmDeleteRecord.bind(this),
                          start: this.startOne.bind(this),
                        }
                    },


                ],

                // Cell Renderer Components
                components: {
                    Status,Open
                }
            }
        },

        computed: {
          optArr(){
            let arr=[];
            arr.push({
              name:'Все',
              id:0
            })
            for (let index = 0; index < this.RecoverersArr.length; ++index) {
              if(this.RecoverersArr[index].cession){
                arr.push({
                  name:'Договор цессии №'+this.RecoverersArr[index].number+' от '+this.RecoverersArr[index].date+' Взыскатель '+this.RecoverersArr[index].name,
                  id:this.RecoverersArr[index].id,
                });
              }
              else{
                arr.push({
                  name:'Взыскатель '+this.RecoverersArr[index].name,
                  id:this.RecoverersArr[index].id,
                })

              }
            }
            for (let index = 0; index < this.OrganizationArr.length; ++index) {
              arr.push({
                name:'Организация '+this.OrganizationArr[index].name,
                id:-this.OrganizationArr[index].id,
              })
            }
            return arr
          },
            totalPages () {
                //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.total/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },

            ...mapGetters([
              'PeriodList','WeekList','MounthList','CessionsArr', 'ServerDateShedule','RecoverersArr','OrganizationArr'
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
          confirmDeleteRecord (id) {
            this.deleteId=id
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: 'Удаление',
              text: 'Вы действительно хотите функцию из расписания?',
              accept: this.deleteRecord,
              acceptText: 'Удалить',
              cancelText: 'Отмена'
            })
          },
          deleteRecord () {
            axios.post(r('shedStad.update'), {
              params: {
                method: 'DeleteShedStad',
                param:this.deleteId
              }
            }).then((response) => {
              if(response.data.result){
                this.$vs.notify({
                  color: 'success',
                  title: 'Расписание функций',
                  text: 'Запись из расписания удалена!!!',
                  position: 'top-center'
                })
                this.getData()
              }
              else{
                this.$vs.notify({
                  color: 'danger',
                  title: 'Расписание функций',
                  text: 'Функцию из расписания удалить не удалось!!!',
                  position: 'top-center'
                })
                this.getData()

              }

            })



          },

          startOne(id){
            this.$vs.dialog({
              type: 'confirm',
              color: 'green',
              title: 'Запуск функции',
              text: 'Вы действительно хотите запустить функцию из расписания?',
              accept: ()=>{
                axios.post(r('shedStad.update'), {
                  params: {
                    method: 'startOne',
                    param:id
                  }
                }).then((response) => {
                  if(response.data.result){
                    this.$vs.notify({
                      color: 'success',
                      title: 'Запуск функции',
                      text: 'Успешно!!!',
                      position: 'top-center'
                    })
                  }
                  else{
                    this.$vs.notify({
                      color: 'danger',
                      title: 'Запуск функции',
                      text: 'Функцию запустить НЕ получилось!!!',
                      position: 'top-center'
                    })

                  }

                }).catch(()=>{
                  this.$vs.notify({
                    color: 'error',
                    title: 'Запуск функции',
                    text: 'ОШИБКА!!!',
                    position: 'top-center'
                  })
                })

              },
              acceptText: 'Запуск',
              cancelText: 'Отмена'
            })
          },
          save(){
            this.editDataShow=false;
            this.editData.id_stad=this.id
            axios.post(r("shedStad.index"), {
              params: {
                method: 'saveShedStad',
                param: this.editData

              }
            }).then((response) => {
                if (response.data.result){
                    this.getData()
                }
            })
          },
          close(){
            this.editData={}
            this.editDataShow=false;
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
          updateSearchQuery (val) {
            this.gridApi.setQuickFilter(val)
          },
          onRowDataChanged () {
            Vue . nextTick (() => {
                  this.gridOptions.api.sizeColumnsToFit();
                }
            );
          },
          onrowDoubleClicked(event){
              this.editData=event.data
              this.editDataShow=true;
          },
          ...mapMutations([
          ]),
          ...mapActions([
              'getfuncshedule'
          ]),
          showAdd(){
            this.editData={
              date_p:0,
              period:0,
              week:0,
              mounth:0,
              time:0,
            }
            this.editDataShow=true;
          },
          getData(){
            axios.get(r("shedStad.index"), {
              params: {
                method: 'getShedStad',
                param: this.id

              }
            }).then((response) => {
              if (response.data.result){
                this.data=response.data.data;
                this.total=response.data.total;
              }



            })
          },
        refreshRecordsSheduler(){
          this.getData();
          },

        },
        mounted () {
          this.getfuncshedule();
            this.gridApi = this.gridOptions.api
            this.getData()
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
