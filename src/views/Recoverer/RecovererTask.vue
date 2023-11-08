<template>
        <div class="mt-5">

            <template v-if="!ShowEditTask">
                <vs-button class="mr-4 sm:mb-0 mb-2" @click="newTask">Новая задача</vs-button>

                <vs-button class="mr-4 sm:mb-0 mb-2" @click="showCopy=!showCopy">Скопировать из.</vs-button>

                <vs-checkbox style="margin-top: 10px" v-model="rec.taskAll" @input="changeRec">Задачи по умолчанию</vs-checkbox>

              <div class="vx-row" style="margin-top: 20px">
                <div class="vx-col mb-2">
                  <span>Стадии:</span>
                </div>
                <div class="vx-col mb-2">
                  <vs-checkbox v-model="rec.stadia_sud" @input="changeRec">Приказное производство</vs-checkbox>
                  <vs-checkbox v-model="rec.stadia_dublicat" @input="changeRec">Дубликат ИД</vs-checkbox>

                </div>
              </div>

                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="RecoverTasksArr"
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
                        :overlayNoRowsTemplate="'Нет записей'"
                        :enableBrowserTooltips="true"
                        :suppressPaginationPanel="true"
                        :enableRtl="$vs.rtl">
                </ag-grid-vue>


                <vs-pagination
                        :total="totalPages"
                        :max="7"
                        v-model="currentPage"/>

            </template>
            <template v-else>
                <RecoverTaskID></RecoverTaskID>
            </template>

            <vs-popup class="showCopy" title="Задачи:" :active.sync="showCopy">
                <template v-if="RecoverTaskArrAllFind">
                    <h6 class="h6Blue">Поиск:</h6>
                    <vs-input class="w-full" style="max-width: 350px"  v-model="findRec" @input="changeFindRec"></vs-input>
                    <div v-if="RecoverTaskArrAllFind.length == 0" style="display: flex">

                    </div>
                    <div v-else>

                        <template v-for="(item,index) in RecoverTaskArrAllFind">
                            <div style="margin-left: 10px;margin-right: 10px;color: red" @click="setData(item)" class="hover:text-primary cursor-pointer">
                                {{ item.name }}
                            </div>
                            <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                        </template>
                    </div>
                </template>


            </vs-popup>


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
        components: {
          VueSuggestions,
            draggable,
            Open,
            RecoverTaskID,OpenActive
        },
        beforeMount() {

            this.defaultColDef = { resizable: true };
            this.rowHeight = 24;
        },
        data () {
            return {
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
                        headerTooltip: 'ID',
                        tooltipField: 'id',
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
                        headerName: 'Активна',
                        headerTooltip: 'Активна',
                        tooltipField: 'active',
                        field: 'active',
                        filter: true,
                        width: 120,
                        cellRendererFramework: 'OpenActive'

                    },
                    {
                        headerTooltip: 'Комментарий',
                        tooltipField: 'comm',
                        headerName: 'Комментарий',
                        field: 'comm',
                        filter: true,
                        width: 150,


                    },

                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
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
            this.gridApi = this.gridOptions.api
          this.getDataRecoverTasks(this.$route.params.id)
            this.getData()

        },

        computed: {

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
                    if(typeof this.gridApi!='undefined'){
                        this.gridApi.paginationGoToPage(val - 1)
                    }

                }
            },
            ...mapGetters([
               'RecoverTasksArr','TotalRecoverTasks','User','ShowEditTask','RecoverTaskArrAllFind'

            ]),


        },
        methods: {

            changeRec(){
                this.saveRecoverer(this.rec).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
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

            getData(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("recoverer.index"), {
                    params: {
                        method: 'getRecoverer',
                        param: this.$route.params.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()

                    if (response.data.result){

                        this.rec=response.data.data;

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
                    if(typeof this.gridApi!='undefined'){
                        this.gridApi.sizeColumnsToFit();
                    }

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
                this.$router.push('/recoverer_task/new?recover='+this.$route.params.id)
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
                'setShowEditTask','setEditTaskRecover','setFindRecoverTaskAll'
            ]),
            ...mapActions([
                'getDataRecoverTasks','saveRecoverTask','saveRecoverer'
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
