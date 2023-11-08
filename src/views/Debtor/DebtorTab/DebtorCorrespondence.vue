<template>
    <div>
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="DebtorCorrespondence"
                rowSelection="multiple"
                :rowDataChanged="onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                @rowDoubleClicked="onrowDoubleClicked"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
        </ag-grid-vue>


        <vs-pagination
            :total="totalPages"
            :max="7"
            v-model="currentPage"/>
    </div>
</template>

<script>
    import r from '../../../route';
    import axios from '../../../axios'
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import {AgGridVue} from 'ag-grid-vue'
    import {mapActions, mapGetters} from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    Vue.use(AsyncComputed)
    import downloadFileCorrespondence from '../../Correspondence/Render/DownloadFileCorrespondence.vue'
    import operationCorrespondence from '../../Correspondence/Render/operationCorrespondence.vue'
    export default {
        components: {
            AgGridVue,
            VueSuggestions,
            downloadFileCorrespondence,
            operationCorrespondence
        },
        beforeMount() {

            this.defaultColDef = {resizable: true};
        },
        data(){
            return{
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Дата регистрации',
                        field: 'reg_date1',
                        width: 200,

                    },
                    {
                        headerName: 'Рег №',
                        field: 'reg_number',
                        width: 150,

                    },
                    {
                        headerName: 'Вид документа',
                        field: 'vid',
                        width: 200,


                    },
                    {
                        headerName: 'Группа документа',
                        field: 'group',
                        width: 200,

                    },
                    {
                        headerName: 'Отправитель',
                        field: 'sender',
                        width: 250,

                    },
                    {
                        headerName: 'Получатель',
                        field: 'recipient',
                        hide: false,
                        width: 250,

                    },
                    {
                        headerName: 'Адрес получателя',
                        field: 'address_recipient',
                        hide: false,
                        width: 250,

                    },
                    {
                        headerName: 'Наименование документа',
                        field: 'document_name',
                        width: 280,

                    },
                    {
                        headerName: 'ШПИ',
                        field: 'shpi',
                        width: 150,
                    },
                    {
                        headerName: 'Дата документа',
                        field: 'doc_date',
                        width: 200,

                    },
                    {
                        headerName: 'Файл документа',
                        field: 'filename',
                        width: 200,
                        cellRendererFramework: 'downloadFileCorrespondence'
                    },
                    {
                        headerName: 'операции',
                        field: 'id',
                        width: 150,
                        cellRendererFramework: 'operationCorrespondence',
                        cellRendererParams: {
                            editValue: this.editValue.bind(this),
                        },
                    }

                ],
                // Cell Renderer Components
                components: {
                    downloadFileCorrespondence,
                    operationCorrespondence
                }

            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api
            this.getDebtorCorrespondence(this.Deb.debtorCredit.id);
        },
        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalDebtorCorrespondence / this.paginationPageSize)
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
                'DebtorCorrespondence','TotalDebtorCorrespondence','Deb'
            ]),


        },
        methods: {
            ...mapActions([
                'getDebtorCorrespondence'
            ]),
            editValue(id){
                this.$router.push('/Correspondence-Journal/'+id)
            },
            onrowDoubleClicked(event){
                this.$router.push('/Correspondence-Journal/'+event.data.id)
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

        },

    }
</script>

<style>

</style>