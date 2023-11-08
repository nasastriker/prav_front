<template>
    <div class="vx-card p-6">
        <div class="flex flex-wrap justify-between items-center">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDebtorCreditComments - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDebtorCreditComments }} of {{ TotalDebtorCreditComments }}</span>
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
                <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                <vs-button color="success" class="pull-right" type="filled"  @click="addField">Добавить</vs-button>
            </div>
        </div>
        <vs-popup classContent="popup-example" title="Добавить комментарий" :active.sync="commentEdit">
         <h6 class="h6"> Текст: <VarToClipboard name="dcc_text"/> <VarToClipboard name="Фио fio_user"/> </h6>
        <vs-textarea rows="10" v-model="commentText"></vs-textarea>
        <div class="vx-row">
            <vs-button v-if="!commentView" style="margin-left: 20px" @click="addComment('new')" >Добавить</vs-button>
            <vs-button style="margin-left: 20px" @click="save()"><span v-if="!commentView">Отмена</span><span v-if="commentView">OK</span></vs-button>
        </div>
        </vs-popup>
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="DebtorCreditCommentsArr"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                @rowDoubleClicked="onrowDoubleClicked"
                @grid-ready="onGridReady"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
        </ag-grid-vue>

        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />

    </div>
</template>

<script>
    import DebtorCreditCommentsOpenLink from './Render/DebtorCreditCommentsOpenLink.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
            DebtorCreditCommentsOpenLink,
        },
        props:['id_credit'],
        data() {
            return {
                commentEdit:false,
                comment:{},
                commentText:'',
                commentView:false,
                searchQuery: '',
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true,
                },
                columnDefs: [
                    {
                        headerName: 'Дата',
                        field: 'date',
                        filter: true,
                        width: 80
                    },
                    {
                        headerName: 'Комментарий',
                        field: 'text',
                        filter: true,
                        floatCell:false,
                        width: 400
                    },
                    {
                        headerName: 'Автор',
                        field: 'fio_user',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 50,
                        cellRendererFramework: 'DebtorCreditCommentsOpenLink'
                    },
                ],
                components: {
                    DebtorCreditCommentsOpenLink,
                }
            }
        },

        computed: {
            totalPages() {
                //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalDebtorCreditComments / this.paginationPageSize)
                else return 0
            },
            paginationPageSize() {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'DebtorCreditCommentsArr', 'TotalDebtorCreditComments'

            ]),
            currentPage: {
                get() {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set(val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            ...mapActions([
                'getDataDebtorCreditComments','saveDebtorCreditComments',
            ]),
            addComment(id){
                // this.onGridReady()
                this.saveDebtorCreditComments({ id: id,
                                                text:this.commentText,
                                                id_credit: this.id_credit }).
                then(result=>{
                    if(result) {
                         this.$vs.notify({
                                                         title: 'Успешно',
                                                         text: 'Успешно!!!',
                                                         color: 'success',
                                                         position: 'top-center'
                                                     })
                        this.getDataDebtorCreditComments({id_credit:this.id_credit})
                        this.commentEdit=false
                    }
                    else {
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка !!!',
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })
                    }
                }).catch(e=>{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Ошибка !!!',
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                })
            },
            save(){
              this.comment.text=this.commentText
              this.commentEdit=false
              this.addComment(this.comment.id)
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
                params.api.resetRowHeights();
            },

            onGridReady(params){
                this.gridApi = params.api;
                this.gridColumnApi = params.columnApi;
                setTimeout(() =>{
                    params.api.setRowData(this.DebtorCreditCommentsArr);
                }, 500);

                },
            onrowDoubleClicked(event) {
                this.comment=event.data
                this.commentText=event.data.text
                this.commentEdit=true
                this.commentView=true
            },
            addField() {
                this.commentText=''
                this.commentEdit=true
                this.commentView=false
            },
            ...mapActions([
                'getDataDebtorCreditComments','saveDebtorCreditComments','getDebtorCreditCommentsOnce',
            ]),
            updateSearchQuery(val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged() {
                Vue.nextTick(() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        beforeMount(){
            this.getDataDebtorCreditComments({id_credit:this.id_credit});
        },
        mounted() {
            this.gridApi = this.gridOptions.api

        }
    }
</script>

<style >
    .h6{
        font-size: 12px;
        color: cadetblue;
    }


</style>
