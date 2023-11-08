<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col w-2/3">
                    <div class="vx-row">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalStatussHistory - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalStatussHistory }} of {{ TotalStatussHistory }}</span>
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
                    <vs-input type="date" v-model="User.pag.statHist.date" @change="changeDate" style="margin-left: 10px"></vs-input>
                        <v-select style="padding-left: 10px"
                                :reduce="label => label.id" label="fio"
                                   :options="UsersArrAllMenu" v-model="User.pag.statHist.id_user"
                                   @input="changeUser"></v-select>
                        <vs-button color="danger" style="margin-left: 10px" class="pull-left" type="filled"  @click="delSelected">Удалить выделенные</vs-button>
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
                    :rowData="StatussHistoryArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import ImportExcel from './ImportExcelStatus.vue'
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/Open.vue'
    import OpenCreditStatus from './Render/OpenCreditStatus.vue'
    import OpenUser from './Render/OpenUser.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import JsonViewer from 'vue-json-viewer'
    export default {
        components: {
            AgGridVue,
            JsonViewer,
            vSelect,
            Open,
            OpenUser,
            OpenCreditStatus,
            VueCsvImport,
            ImportExcel,
        },
        data () {
            return {

                // Filter Options
                data:[],
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
                        headerName: '',
                        field: 'id',
                        filter: true,
                        width: 40,
                        headerCheckboxSelection: true,
                        checkboxSelection: true,
                    },

                    {
                        headerName: 'id_credit',
                        field: 'id_credit',
                        filter: true,
                        width: 150,

                    },
                    {
                        headerName: 'Статус',
                        field: 'id_status',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenCreditStatus'

                    },
                    {
                        headerName: 'Пользователь',
                        field: 'id_user',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenUser'

                    },
                    {
                        headerName: 'Комментарий',
                        field: 'comment',
                        filter: true,
                        width: 150,

                    },



                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open'
                    },
                    {
                        headerName: 'Создан',
                        field: 'created_at',
                        filter: true,
                        width: 250,

                    },



                ],

                // Cell Renderer Components
                components: {
                    Open,OpenCreditStatus,OpenUser
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalStatussHistory/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.statHist!='undefined') {
                                return this.User.pag.statHist.limit
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
                'StatussHistoryArr','TotalStatussHistory','User','UsersArrAllMenu'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.User.pag.statHist.offset = (val-1)*this.User.pag.statHist.limit

                    this.getDataStatussHistory(this.User.pag.statHist);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },


        },
        methods: {
            changeUser(){
                this.setDataUser().then((response) => {
                    this.getDataStatussHistory(this.User.pag.statHist);
                })
            },
            changeDate(){
                this.setDataUser().then((response) => {
                    this.getDataStatussHistory(this.User.pag.statHist);
                })
            },
            changePag(pag){

                this.User.pag.statHist.limit=pag
                this.setDataUser().then((response) => {
                    this.getDataStatussHistory(this.User.pag.statHist);
                })
                this.gridApi.paginationSetPageSize(pag)
            },
            showDeleteSuccess() {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger() {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Ошибка при удалении!!!',
                    position: 'top-center'
                })
            },
            onrowDoubleClicked(event){
                this.$router.push('/debtors/'+event.data.id_credit)
            },
            deleteSelRecords(parameters){
                this.$vs.loading({color: '#ff8000'})
                this.changeCheckToDelStatus(parameters[0]).then((response) => {
                    this.getDataStatussHistory(this.User.pag.statHist);
                    this.$vs.loading.close()
                    if (response){
                        this.showDeleteSuccess();

                    } else {
                        this.showDeleteDanger();
                    }
                });
            },
            delSelected(){
                let selectedNodes = this.gridApi.getSelectedNodes();
                let selectedData = selectedNodes.map(node => node.data);
                if(selectedData.length > 0){
                    this.$vs.dialog({
                        type: 'confirm',
                        color: 'danger',
                        title: 'Удаление',
                        text: 'Вы действительно хотите удалить '+selectedData.length+' записи(ей)?',
                        accept: this.deleteSelRecords,
                        acceptText: 'Удалить',
                        cancelText: 'Отмена',
                        parameters: [selectedData]
                    })
                    // console.log(selectedData);
                } else {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Выберите записи для удаления',
                        color: 'primary',
                        position: 'top-center'
                    })
                }

            },
            ...mapActions([
                'getDataStatussHistory','setDataUser','getUsersAllMenu','changeCheckToDelStatus'
            ]),
            ...mapMutations([
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

            this.getUsersAllMenu();
            this.gridApi = this.gridOptions.api
            this.getDataStatussHistory(this.User.pag.statHist);
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
