<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row">
                        <div class="vx-col">
                            <vs-dropdown vs-trigger-click class="cursor-pointer" style="margin-top: 15px">
                                <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 7px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalTaskArrAll - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalTaskArrAll }} of {{ TotalTaskArrAll }}</span>
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
                        <div class="vx-col 3"  style="    min-width: 300px;">
                            <span style="color: blue">Взыскатель/Цессия</span>
                            <v-select  class="w-full" :reduce="label => label.id" label="name" :options="optArr"
                                       v-model="id_recover"  @input="filterByCession" ></v-select>
                        </div>
                      <div class="vx-col 3"  style="    min-width: 300px;">
                        <span style="color: blue">Стадия</span>
                        <v-select  class="w-full" :reduce="label => label.id" label="name" :options="Stad"
                                   v-model="id_stad"  @input="filterByCession" ></v-select>
                      </div>


                    </div>



                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right" style="margin-top: 15px">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button class="btnx" color="danger" type="gradient" @click="$router.push('/recoverer_task/new')">Новая задача</vs-button>
                </div>
            </div>



                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="RecoverTaskArrAllFindLocal"
                        rowSelection="multiple"
                        :rowDataChanged="onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        @rowDoubleClicked="onrowDoubleClicked"
                        :floatingFilter="false"
                        :pagination="true"
                        @grid-size-changed="onGridSizeChanged"
                        @column-resized="onColumnResized"
                        @column-visible="onColumnVisible"
                        :paginationPageSize="paginationPageSize"
                        :suppressPaginationPanel="true"
                        :enableRtl="$vs.rtl"
                        :overlayLoadingTemplate="'Идёт загрузка'"
                        :overlayNoRowsTemplate="'Нет записей'"
                        :enableBrowserTooltips="true">
                </ag-grid-vue>


                <vs-pagination
                        :total="totalPages"
                        :max="7"
                        v-model="currentPage"/>



        </div>
    </div>


</template>

<script>
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'

    import Open from './Render/OpenRecoverTask.vue'
    import OpenActive from './Render/OpenActive.vue'
    import RecoverTaskID from './RecoverTaskID.vue'
    import draggable from 'vuedraggable'
    export default {
        props:['id'],
        components: { VueSuggestions,

          draggable,

          Open,

          RecoverTaskID,
          OpenActive
        },
        beforeMount() {

            this.defaultColDef = { resizable: true };
            this.rowHeight = 24;
        },
        data () {
            return {
                id_recover:null,
                id_stad:null,
                searchQuery:'',
                findRec:'',
                showCopy:false,
                typeDoc:{
                    id:0,
                    type_document:'',
                    peremen_name:'',
                },
                popupActive2:false,
                gridApi: null,
                rec:{
                    taskAll:0,
                },
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
                        width: 50,
                    },

                    {
                        headerName: 'Название',
                        headerTooltip: 'Название',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 300,

                    },
                    {
                        headerName: 'Стадия',
                        headerTooltip: 'Стадия',
                        tooltipField: 'stadia',
                        field: 'stadia',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'Активна',
                        field: 'active',
                        filter: true,
                        width: 120,
                        cellRendererFramework: 'OpenActive'

                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open'
                    },

                ],
                components: {
                    Open,OpenActive
                }

            }
        },

        mounted(){
            if(typeof  this.User.pag!='undefined'){
                if(typeof  this.User.pag.recTaskAll!='undefined'){
                    this.id_recover=this.User.pag.recTaskAll
                }
              if(typeof  this.User.pag.stadTaskAll!='undefined'){
                this.id_stad=this.User.pag.stadTaskAll
              }
            }

            this.getDataOrganizationArr()
            this.gridApi = this.gridOptions.api
            this.getDataRecoverTasks(1)
            this.getDataReestrsAndCession();
            this.getDataShablonDocumentsStad();


        },

        computed: {
          optArr(){
            let arr=[];
            arr.push({
              name:'Общий',
              id:0,
            });

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
                id:-1*this.OrganizationArr[index].id,
              })
            }
            return arr
          },
            RecoverTaskArrAllFindLocal(){
              if(this.id_recover==null){
                if(this.id_stad==null) {
                  return this.RecoverTaskArrAllFind
                } else {
                  let arr=[];
                  let index;
                  for (index = 0; index < this.RecoverTaskArrAllFind.length; ++index) {
                    if(this.RecoverTaskArrAllFind[index].id_stad==this.id_stad){
                      arr.push(this.RecoverTaskArrAllFind[index]);
                    }

                  }

                  return arr
                }
              }else{
                  let arr=[];
                  let index;
                  for (index = 0; index < this.RecoverTaskArrAllFind.length; ++index) {
                      if(this.RecoverTaskArrAllFind[index].id_recover==this.id_recover){
                          arr.push(this.RecoverTaskArrAllFind[index]);
                      }

                  }

                if(this.id_stad!=null) {
                  let narr=[];
                  let nindex;
                  for (nindex = 0; nindex < arr.length; ++nindex) {
                    if(arr[nindex].id_stad==this.id_stad){
                      narr.push(arr[nindex]);
                    }

                  }

                  return narr
                }

                  return arr
              }
            },
            totalPages () {
                //   console.log(Math.ceil(this.TotalPayments/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalRecoverTasks / this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },

            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },
            ...mapGetters([
               'RecoverTasksArr','TotalRecoverTasks','User','ShowEditTask','RecoverTaskArrAllFind','TotalTaskArrAll',
              'RecoverersArrOpt','Stad','OrganizationArr','RecoverersArr'

            ]),


        },
        methods: {
            filterByCession(){

                this.User.pag.recTaskAll=this.id_recover;
                this.User.pag.stadTaskAll=this.id_stad;



            },

            changeFindRec(){
                this.setFindRecoverTaskAll(this.findRec)
            },
            setData(item){
                item.id_recover=this.$route.params.id
                item.id=0
                this.showCopy=false
                this.$vs.loading({color: '#ff8000'})
                this.saveRecoverTask(item).then((response) => {
                    this.$vs.loading.close()
                    if(response){
                        this.$vs.notify({ time:8000, title:'Успешно', text: 'Не забудьте поменять шаблон !!!', color: 'success', position: 'top-center' })
                        // this.$router.push('/handbook/jurisdiction/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


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

                this.$router.push('/recoverer_task/'+event.data.id)

            },
            newTask(){
                this.$router.push('/recoverer_task/new')
            },



            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged () {
                Vue.nextTick(() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
            ...mapMutations([
                'setShowEditTask','setEditTaskRecover','setFindRecoverTaskAll',''
            ]),
            ...mapActions([
                'getDataRecoverTasks','saveRecoverTask','saveRecoverer','getDataReestrsAndCession','setDataUser',
                'getDataShablonDocumentsStad','getDataOrganizationArr'
            ]),





        },
    }
</script>
<style>
    .h6Blue{
        font-size: 12px;
        color: #7367F0;
    }
</style>
