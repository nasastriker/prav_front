<template>
        <div class="mt-5">
            
                <vs-button class="mr-4 sm:mb-0 mb-2" @click="showPopupAddDoc">Загрузить документ</vs-button>
                <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                          v-on:change="saveDocument($event,typeDoc.id)" style="display: none"/>
                <vs-popup classContent="popup-example" title="Тип документа" :active.sync="popupActive2">

                    <div class="mt-8 mb-base">
                        <label class="text-sm">Тип документа</label>
                        <div class="mt-2">
                            <v-select  class="w-50 " :reduce="label => label" label="name" :options="TypesDcDocumentsRec"  v-model="typeDoc"  ></v-select>

                           <p style="margin-top: 20px"> Документ должен быть <span style="color: red">{{typeDoc.type_document}}</span></p>

                            <p style="margin-top: 20px"> Название переменной <span style="color: red">{{typeDoc.peremen_name}}</span></p>


                            <!--                                <vs-radio v-model="type_dog" vs-value="0" class="mr-3">Договор</vs-radio>-->
                            <!--                                <vs-radio v-model="type_dog" vs-value="1" class="mr-3">Другое</vs-radio>-->

                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <vs-button class="w-1/3 ml-auto" @click="chooseFiles1()" color="primary" type="filled">Выбрать</vs-button>
                    </div>


                </vs-popup>


                <ag-grid-vue
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




        </div>



       





</template>

<script>
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import Open from './Render/OpenRecoverDocument.vue'
    import OpenHref from './Render/OpenHref.vue'
    export default {
        props:['id'],
        components: { VueSuggestions,
          Open,
          OpenHref
        },
        data () {
            return {
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
          this.getDataRecoverDocuments(this.id)

        },

        computed: {

            totalPages () {
                //   console.log(Math.ceil(this.TotalPayments/this.paginationPageSize))
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
               'RecoverDocumentsArr','TotalRecoverDocuments','User','TypesDcDocumentsRec'

            ]),


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
                'getDataRecoverDocuments','getTypesDcDocuments','saveRecoverDocument'
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
