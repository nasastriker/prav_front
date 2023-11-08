<template>
    <div class="vx-row">

        <div class="vx-col sm:w-3/4 w-full mb-2">
        <LineRecoverOther :data="RecoverersOtherArr" :id_recover="$route.params.id"></LineRecoverOther>
        </div>
        <div class="vx-col sm:w-1/4 w-full mb-2">
            <vs-button class="flex flex-wrap items-center justify-between ag-grid-table-actions-right" style="float: right" @click="showPopupAddCess">Добавить цедента</vs-button>
        </div>
       <!-- <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="RecoverDocumentsArr"
                rowSelection="multiple"
                :rowDataChanged="onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
        </ag-grid-vue>


        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage"/>
-->



    </div>









</template>

<script>
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    import LineRecoverOther from './Render/LineRecoverOther.vue'
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import JsonViewer from 'vue-json-viewer'
    import {AgGridVue} from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/OpenRecoverDocument.vue'
    import OpenHref from './Render/OpenHref.vue'
    export default {
        props:['id'],
        components: { VueSuggestions,
            'v-select': vSelect,
            JsonViewer,Open,AgGridVue,OpenHref,LineRecoverOther
        },
        data () {
            return {
                Rarr:[],
                typeDoc:{
                    id:0,
                    type_document:'',
                    peremen_name:'',
                },
                popupActive2:false,
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
                        filter: true,
                        width: 100,
                    },

                    {
                        headerName: 'Имя файла',
                        field: 'filename',
                        filter: true,
                        width: 250,
                        cellRendererFramework: 'OpenHref'
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
                    Open,OpenHref
                }

            }
        },

        mounted(){
            this.gridApi = this.gridOptions.api
            this.getDataRecoverersOther(this.$route.params.id).then((res)=>{
            })

        },

        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalRecoverDocuments / this.paginationPageSize)
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
                'RecoverDocumentsArr','TotalRecoverDocuments','User','RecoverersOtherArr'

            ]),


        },
        methods: {
            showPopupAddCess(){
                this.$router.push('/cession/'+this.$route.params.id+'/new')
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
            findType(type){
                for (let  i = 0; i < this.TypesDcDocumentsRec.lenght; i++) {
                    if(this.TypesDcDocumentsRec[i].id==type){
                        return this.TypesDcDocumentsRec[i].type_document
                    }

                }
                return ''
            },
            saveDocument(evt,type){
                if(this.$route.params.id=='new'){
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Сначала сохраните цессию или взыскателя, потом добавляйте документы',
                        color: 'danger',
                        position: 'top-center'
                    })
                }else{
                    this.$vs.loading({color: '#ff8000'})
                    this.popupActive2=false
                    this.saveRecoverDocument({
                        file: evt.target.files,
                        id_recover: this.id,
                        type:type,
                    }).then((response) => {
                        this.getDataRecoverDocuments(this.id)
                        this.$vs.loading.close()
                        if (response) {

                            this.$vs.notify({
                                title: 'Успешно',
                                text: 'Сохранено!!!',
                                color: 'success',
                                position: 'top-center'
                            })
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
                }

            },
            showPopupAddDoc(){
                this.getTypesDcDocuments();
                this.popupActive2 = true;
            },
            chooseFiles1: function () {
                if (this.typeDoc.id > 0) {
                    document.getElementById("fileUpload1").click()
                } else {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Выберите тип документа',
                        color: 'primary',
                        position: 'top-center'
                    })
                }
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
            ...mapActions([
                'saveRecoverDocument','getDataRecoverersOther'
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
