<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <!-- ITEMS PER PAGE -->
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalHistorySoft - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalHistorySoft }} of {{ TotalHistorySoft }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                    <vs-button style="margin-right: 10px" color="primary" type="filled" @click="addMessage">Добавить сообщение</vs-button>
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
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
                    :rowData="HistorySoftArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
        <vs-popup classContent="popup-example" title="Отправить сообщение" :active.sync="popupMenu">
            <label style="margin-top: 15px" >Вид отправки :</label>
            <div class="mt-2">
                <v-select style="max-width: 250px;" class="w-50 " :reduce="label => label.id" label="name" :options="TypeArr"  v-model="typeMessage" ></v-select>
                <vs-textarea width="600px" height="400px" style="margin-top: 10px; margin-bottom: 10px" v-model="textMessage"></vs-textarea>
            </div>
            <div style="margin-top: 15px; text-align: center">
                <vs-button  color="primary" type="border"  @click="sendMessage">Отправить</vs-button>
            </div>
        </vs-popup>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Type from './Render/Type.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        props:['id_debtorcredit','id','id_debtor'],
        components: {
            AgGridVue,
            vSelect,
         ///   Open,
            Type,
            VueCsvImport,
        },
        data () {
            return {

                typeMessage:'',
                textMessage:'',
                popupMenu:false,
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
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Тип',
                        headerTooltip: 'Тип',
                        field: 'type',
                        filter: true,
                        width: 150,
                         cellRendererFramework: 'Type'
                    },
                    {
                        headerName: 'Текст',
                        headerTooltip: 'Текст',
                        tooltipField: 'text',
                        field: 'text',
                        filter: true,
                        width: 600
                    },
                ],

                // Cell Renderer Components
                components: {
                    Type,
                  //  Open,
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalHistorySoft/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalHistorySoft/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'HistorySoftArr','TotalHistorySoft','TypeArr'

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
            addMessage(){
                this.textMessage=''
                this.typeMessage=''
                this.popupMenu=true;

            },
            sendMessage(){
                this.sendMessageHistorySoftOnce({
                    text: this.textMessage,
                    type:this.typeMessage,
                    id_credit: this.id
                }).then((response)=>{
                    if(response){
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сообщение отправлено',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.$vs.notify({
                            title: 'Не получилось',
                            text: 'Сообщение НЕ отправлено',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
                    this.getDataHistorySoft(this.id_credit)
                }).catch(error => {
                    this.getDataHistorySoft(this.id_credit)
                    this.popupMenu=false
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                })
                this.popupMenu=false

            },
            onrowDoubleClicked(event){
             //   this.$router.push('/handbook/fssp/'+event.data.id)
            },
            ...mapActions([
                'getDataHistorySoft','sendMessageHistorySoftOnce'
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

            this.getDataHistorySoft(this.id_debtorcredit);
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
