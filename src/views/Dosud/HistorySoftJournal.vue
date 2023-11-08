<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalHistorySoftAll - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalHistorySoftAll }} of {{ TotalHistorySoftAll }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <vs-dropdown-menu>

                            <vs-dropdown-item @click="changePag(10)">
                                <span>10</span>
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
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-left">
                    <vs-input  style="margin-left: 20px;" type="date" label="Начало периода"  @blur="onChangeDate" v-model="beginFilter"></vs-input>
                    <vs-input  style="margin-left: 20px;" type="date" label="Конец периода"  @blur="onChangeDate" v-model="endFilter"></vs-input>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-button style="margin-left: 10px;" color="success" class="mb-4 md:mb-0 mr-4" type="filled"
                               @click="loadToXls">Выгрузить
                    </vs-button>
                    <vs-button style="margin-left: 10px;" color="primary" class="mb-4 md:mb-0 mr-4" type="filled"
                               @click="showFilesPopup">Просмотреть выгрузки
                    </vs-button>
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
                    :rowData="HistorySoftArrAll"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
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

        </div>

        <vs-popup style="min-width:700px;min-height: 600px;" classContent="popup-example" title="Подробнее:" :active.sync="pop">
            <div v-if="TypeEmailOrText==1">
                <label style="margin-bottom: 10px">Email: </label>
                <span v-html="bigText"></span>



            </div>
            <div v-if="(TypeEmailOrText==0)||(TypeEmailOrText==2)">
                <vs-textarea class="w-100"  height="500px" style=";margin-top:5px; margin-bottom: 5px;margin-left: 10px;margin-right: 10px;min-width:500px;min-height: 500px;" v-model="bigText"></vs-textarea>
            </div>

        </vs-popup>

        <vs-popup classContent="popup-example" title="Скачать файлы выгрузок" :active.sync="showFileList">

            <div  v-if="FileHistorySoftArr.length == 0" style="display: flex">
                <div>Нет выгруженных файлов</div>
                <refresh-cw-icon size="1.5x" class="hover:text-primary cursor-pointer" style="margin-left: auto" @click="refreshFiles"></refresh-cw-icon>
             </div>

            <div v-else>
                <div style="margin-bottom: 10px;display: flex">
                    <div>Всего файлов <b>{{ FileHistorySoftArr.length }}</b></div>
                    <div class="hover:text-primary cursor-pointer" style="margin-left: auto;margin-right: 15px;color: red" @click="deleteFiles">Удалить все файлы выгрузок</div>
                    <refresh-cw-icon size="1.5x" class="hover:text-primary cursor-pointer" @click="refreshFiles"></refresh-cw-icon>
                </div>
                <template v-for="(item,index) in FileHistorySoftArr">
                    <div style="margin-left: 10px;margin-right: 10px;color: red" @click="downloadDocument(item)" class="hover:text-primary cursor-pointer">
                        {{ item }}
                    </div>
                    <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                </template>
            </div>

        </vs-popup>

    </div>
</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import Type from '../Debtor/DebtorTab/ChildTab/Render/Type.vue'
    import { RefreshCwIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route'
    import axios from '../../axios'
    import moment from 'moment';
    export default {
        name: "historySoftJournal" ,
        components: {
            Type,
            VueCsvImport,
            RefreshCwIcon,
        },
        data () {
            return {

                // Filter Options
                beginFilter:'',
                endFilter:'',
                filter:{label:'Все',id:0},
                filterList:[{'label': 'Все', id:0},{'label': 'фильтр', id:1}],
                TypeEmailOrText:1,
                showFileList:false,
                pop:false,
                bigText:'',
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
                        headerName: 'ФИО',
                        field: 'fio',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Дата рождения',
                        field: 'birthdate',
                        filter: true,
                        width: 100,
                        cellRenderer: params => moment(params.value).format('DD.MM.YYYY')
                    },
                    {
                        headerName: 'Номер договора',
                        field: 'number_dog',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Дата',
                        field: 'created_at',
                        filter: true,
                        width: 150,
                        cellRenderer: params => moment(params.value).format('HH:MM DD.MM.YYYY')
                    },

                    {
                        headerName: 'Тип',
                        field: 'type',
                        filter: true,
                        width: 120,
                        cellRendererFramework: 'Type'
                    },

                    {
                        headerName: 'Текст',
                        field: 'text',
                        filter: true,
                        width: 600
                    },



                ],

                // Cell Renderer Components
                components: {
                    Type,
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalHistorySoftAll/this.paginationPageSize)
                else return 100
            },
            paginationPageSize () {
                return this.User.pag.historySoftJournal.limit
            },
            ...mapGetters([
                'HistorySoftArrAll','TotalHistorySoftAll','User','FileHistorySoftArr'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryHistorySoftJournalOffset(val-1)
                    this.getDataHistorySoftFilter({pag:this.User.pag.historySoftJournal,beginFilter: this.beginFilter, endFilter:this.endFilter})
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            ...mapMutations([
                'setQueryHistorySoftJournalOffset','setQueryHistorySoftJournalLimit'

            ]),
            ...mapActions([
                'getDataHistorySoftFilter','setDataUser','ExportToExcelHistorySoft','getFileListHistorySoft','deleteFileListHistorySoft'
            ]),

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


            downloadDocument(val){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("historySoft.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getFileHistorySoft',
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
            deleteFiles(){
                this.deleteFileListHistorySoft().then((response) => {
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
                this.getFileListHistorySoft()
            },
            showFilesPopup(){
                this.getFileListHistorySoft()
                this.showFileList = true;
            },
            loadToXls(){
              this.$vs.loading({color: '#ff8000'})
              axios.get(r("historySoft.index"), {
                responseType: 'arraybuffer',

                params: {
                  method: 'setExportToExcel',
                  param:{endDate:this.endFilter, beginDate: this.beginFilter},

                }
              }).then((response) => {
                this.$vs.loading.close()
                //console.log(response.data);
                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                //  console.log(url);
                const link = document.createElement('a');
                link.href = url;

                let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                //console.log(filename);
                filename= filename.replace('_', '');
                filename = filename.split('; filename*=utf')[0];

                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();


              }).catch(error => {

                this.$vs.loading.close()
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Ошибка!!!',
                  color: 'danger',
                  position: 'top-center'
                })

              });


            },
            changePag(pag){

                this.User.pag.historySoftJournal.limit=pag
                this.setDataUser()
                this.getDataHistorySoftFilter({pag:this.User.pag.historySoftJournal,beginFilter: this.beginFilter, endFilter:this.endFilter})
                this.setQueryHistorySoftJournalLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            updateSearchQuery (val) {
                this.User.pag.historySoftJournal.find=val
                this.setDataUser().then((response) => {
                    this.getDataHistorySoftFilter({pag:this.User.pag.historySoftJournal,beginFilter: this.beginFilter, endFilter:this.endFilter})

                })

            },

            onChangeDate(event){
                   this.getDataHistorySoftFilter({pag:this.User.pag.historySoftJournal,beginFilter: this.beginFilter, endFilter:this.endFilter})

            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit()
                    }
                )
            },
            onrowDoubleClicked(event){
                console.log(event.data.text)
                this.bigText=event.data.text
                this.TypeEmailOrText=event.data.type
                this.pop=true;
            },
        },
        mounted () {
            this.User.pag.historySoftJournal.find=''
            this.searchQuery=this.User.pag.historySoftJournal.find
            this.getDataHistorySoftFilter({pag:this.User.pag.historySoftJournal,beginFilter: this.beginFilter, endFilter:this.endFilter})
            this.gridApi = this.gridOptions.api
            this.gridApi.paginationSetPageSize(this.User.pag.historySoftJournal.limit)
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
