<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col 2">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium ml-4 mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrsDelete - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrsDelete }} of {{ TotalReestrsDelete }}</span>
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
                        <vs-input type="text" placeholder="Название" v-model="User.pag.controlStatus.find" @change="changeFind" style="margin-left: 10px"></vs-input>
                        <div>
                            <svg style="    margin-top: 10px;    cursor: pointer;    max-height: 20px;    padding-right: 80px;" @click="clearFilter" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.88px" height="110.668px" viewBox="0 0 122.88 110.668" enable-background="new 0 0 122.88 110.668" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M91.124,15.645c12.928,0,23.406,10.479,23.406,23.406 c0,12.927-10.479,23.406-23.406,23.406c-12.927,0-23.406-10.479-23.406-23.406C67.718,26.125,78.197,15.645,91.124,15.645 L91.124,15.645z M2.756,0h117.322c1.548,0,2.802,1.254,2.802,2.802c0,0.848-0.368,1.622-0.996,2.139l-10.667,13.556 c-1.405-1.375-2.95-2.607-4.614-3.672l6.628-9.22H9.43l37.975,46.171c0.59,0.516,0.958,1.254,0.958,2.102v49.148l21.056-9.623 V57.896c1.651,1.9,3.548,3.582,5.642,4.996v32.133c0,1.105-0.627,2.064-1.586,2.506l-26.476,12.758 c-1.327,0.773-3.023,0.332-3.798-1.033c-0.258-0.441-0.368-0.92-0.368-1.4V55.02L0.803,4.756c-1.07-1.106-1.07-2.839,0-3.945 C1.355,0.258,2.056,0,2.756,0L2.756,0z M96.93,28.282c1.328-1.349,3.489-1.355,4.825-0.013c1.335,1.342,1.341,3.524,0.013,4.872 l-5.829,5.914l5.836,5.919c1.317,1.338,1.299,3.506-0.04,4.843c-1.34,1.336-3.493,1.333-4.81-0.006l-5.797-5.878l-5.807,5.889 c-1.329,1.349-3.489,1.355-4.826,0.013c-1.335-1.342-1.341-3.523-0.013-4.872l5.83-5.913l-5.836-5.919 c-1.317-1.338-1.3-3.507,0.04-4.843c1.339-1.336,3.492-1.333,4.81,0.006l5.796,5.878L96.93,28.282L96.93,28.282z"/></g></svg>
                        </div>


                    </div>
                </div>

                <div>

                <div class="vx-col 2" style="    text-align: end;">
                    <div class="excel-import" style="margin-left: 20px">
                        <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                                  v-on:change="saveDocument($event)" style="display: none"/>
                        <div class="dropdown-button-container">
                            <vs-button class="btnx" color="success" type="gradient" @click="goImport">Импорт</vs-button>
                            <vs-dropdown>
                                <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>
                                <vs-dropdown-menu>

                                    <vs-dropdown-item>
                                        <a v-auth-href  href="/example_file/?filename=type_reestr_delete" >Образец </a>
                                    </vs-dropdown-item>


                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </div>


                    </div>

                </div>

                <div class="vx-col 1" style="    text-align: end;">
                    <img src="loading.gif" v-if="ReestrDeleteFlag" style="max-width: 40px; margin-top: 5px;">

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
                    :rowData="ReestrsDeleteArrShow"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    @grid-size-changed="onGridSizeChanged"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/Open.vue'
    import OpenReestrRec from './Render/OpenReestrRec.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            Open,
            OpenReestrRec,
            VueCsvImport,
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
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 350,

                    },
                    {
                        headerName: 'Количество',
                        field: 'count',
                        filter: true,
                        width: 150,

                    },
                    {
                        headerName: 'Статус',
                        field: 'name_status',
                        filter: true,
                        width: 150,

                    },
                    {
                        headerName: 'Пользователь',
                        headerTooltip: 'Пользователь',
                        tooltipField: 'name_users',
                        field: 'name_users',
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
                        headerTooltip: 'Создан',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 250,

                    },



                ],

                // Cell Renderer Components
                components: {
                    Open,OpenReestrRec
                }
            }
        },

        computed: {
            channel(){
                return this.$echo.join("reload-channel");
            },
            ...mapGetters([
                'User','ReestrDeleteFlag'
            ]),
            totalPages() {
                if (this.gridApi)
                    return Math.ceil(this.TotalReestrsDelete / this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User.pag.reestr_delete=='undefined'){
                    return this.User.pag.reestr_delete={
                        offset:0,
                        find:null,
                        status:null,
                        limit:100
                    }
                }
                if(typeof this.User.pag.reestr_delete.limit=='undefined'){
                    this.User.pag.reestr_delete.limit=100
                }
                return this.User.pag.reestr_delete.limit

            },

            currentPage: {
                get() {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set(val) {
                    if(typeof this.User.pag.reestr_delete=='undefined'){
                        return this.User.pag.reestr_delete={
                            offset:0,
                            find:null,
                            status:null,
                            limit:100
                        }
                    }
                    if(typeof this.User.pag.reestr_delete.offset=='undefined'){
                        this.User.pag.reestr_delete.offset=0
                    }
                    this.User.pag.reestr_delete.offset=val-1
                    this.getDataReestrsDelete(this.User.pag.reestr_delete);
                    this.gridApi.paginationGoToPage(val - 1);
                }
            },

            ...mapGetters([
                'ReestrsDeleteArr','TotalReestrsDelete','ReestrsDeleteArrName','ReestrsDeleteArrShow','User'

            ]),


        },
        methods: {
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
            saveDocument(evt){
                this.$vs.loading({color: '#ff8000'})
                this.saveReestrsDelete({
                    file: evt.target.files,
                }).then((response) => {
                    this.getDataReestrsDelete(this.User.pag.reestr_delete);
                    if (response.result) {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сохранено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.message,
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
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
            goImport(){
                document.getElementById("fileUpload1").click()
            },
            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
            },
            clearFilter(){
                if(typeof this.User.pag.reestr_delete=='undefined'){
                    this.User.pag.reestr_delete={
                        offset:0,
                        find:null,
                        filter:null,
                        status:null,
                        limit:100
                    }
                }
                this.User.pag.reestr_delete.find=null
                this.User.pag.reestr_delete.filter=null
                this.setDataUser().then((response) => {
                    this.getDataReestrsDelete(this.User.pag.reestr_delete);

                })
            },

            changeFind(){
                if(typeof this.User.pag.reestr_delete=='undefined'){
                    this.User.pag.reestr_delete={
                        offset:0,
                        find:null,
                        filter:null,
                        status:null,
                        limit:100
                    }
                }

                this.setDataUser().then((response) => {
                    this.getDataReestrsDelete(this.User.pag.reestr_delete);

                })
            },
            changePag(pag){
                if(typeof this.User.pag.reestr_delete=='undefined'){
                    this.User.pag.reestr_delete={
                        offset:0,
                        find:null,
                        filter:null,
                        status:null,
                        limit:100
                    }
                }
                this.User.pag.reestr_delete.limit=pag

                this.setDataUser().then((response) => {
                    this.getDataReestrsDelete(this.User.pag.reestr_delete);

                })


                this.gridApi.paginationSetPageSize(pag)
            },
            updateSearchQuery (val) {
                this.User.pag.reestr_delete.find=val

                this.getDataReestrsDelete(this.User.pag.reestr_delete);

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

            onrowDoubleClicked(event){
                this.$router.push('/reestr_delete/'+event.data.id)
            },
            exportData(data,name,id_recover,status,type){
                this.$vs.loading({color: '#ff8000'})
                let method='exportData'
                axios.post(r("reestrImport.index"), {
                    params: {
                        method: method,
                        param: {
                            data:data,
                            name:name,
                            id_recover:id_recover,
                            status:status,
                            type:type,
                        }

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                            this.getDataReestrsDelete()
                            this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })

                    }else {
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

                });
            },
            loadDataInTable (data) {
                this.$vs.loading({color: '#ff8000'})
                this.header = data.header

                this.tableData = data.results
                this.sheetName = data.meta.sheetName
                this.exportData(data.results,data.name,data.id_recover,data.id_status,data.type)
                this.$vs.loading.close()

            },
            ...mapActions([
                'getDataReestrsDelete','setDataUser','saveReestrsDelete'
            ]),
            ...mapMutations([
            ]),


            reload(e){
                if(e.data=='reestrDelete'){
                    this.getDataReestrsDelete()
                }
            }

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            this.getDataReestrsDelete(this.User.pag.reestr_delete);
        }
    }

</script>

<style lang="scss">
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
