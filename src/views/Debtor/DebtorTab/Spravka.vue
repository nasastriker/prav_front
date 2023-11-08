<template>

                <div >
                    <vs-button class="mr-4 sm:mb-0 mb-2" @click="showPopupAddDoc">Загрузить документ</vs-button>
                    <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                              v-on:change="saveDocument($event,typeDoc,many)" style="display: none"/>
                    <vs-popup classContent="popup-example" title="Тип документа" :active.sync="popupActive2">

                        <div class="mt-8 mb-base">
                            <label class="text-sm">Тип документа</label>
                            <div class="mt-2">
                                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="TypesDcDocumentsDebtor"  v-model="typeDoc"  ></v-select>


                            </div>
                        </div>
                        <div class="flex flex-wrap">
                            <vs-button class="w-1/3 ml-auto" @click="chooseFiles1()" color="primary" type="filled">Выбрать</vs-button>
                        </div>


                    </vs-popup>
                    <vs-popup class="holamundo"  title="Вопрос:" :active.sync="popupActivo">
                        <div style="text-align: center">
                            <p style="    font-size: 3.0vh;">
                                Вы хотите удалить старый файл, если он есть или сохранить новый ?

                            </p>
                            <div class="vx-row" style="margin-top: 15px">
                                <div class="vx-col sm:w-1/2 mb-2">
                                    <vs-button class="w-1/2 ml-auto" @click="showRec(0)" color="primary" type="filled">Удалить</vs-button>
                                </div>
                                <div class="vx-col sm:w-1/2 mb-2">
                                    <vs-button class="w-1/2 ml-auto" @click="showRec(1)" color="primary" type="filled">Сохранить новый</vs-button>
                                </div>


                            </div>
                        </div>

                    </vs-popup>

                    <ag-grid-vue
                            ref="agGridTable"
                            :components="components"
                            :gridOptions="gridOptions"
                            class="ag-theme-material w-100 my-4 ag-grid-table"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="DebtorCreditDocumentsArr"
                            rowSelection="multiple"
                            :rowDataChanged="onRowDataChanged"
                            colResizeDefault="shift"
                            :animateRows="true"
                            :floatingFilter="false"
                            :pagination="true"
                            :overlayLoadingTemplate="'Идёт загрузка'"
                            :overlayNoRowsTemplate="'Нет записей'"
                            :enableBrowserTooltips="true"
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
    import {mapActions, mapGetters} from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import Status from '../../../components/Status.vue'
    import Open from './Render/OpenDocument.vue'
    import OpenHref from './Render/OpenHref.vue'
    import History from './ChildTab/History.vue'
    import HistoryBot from './ChildTab/HistoryBot.vue'
    import Pdf from '../../../components/Pdf.vue'
    Vue.use(AsyncComputed)
    export default {
        components: {
            Pdf,
            VueSuggestions,
            Status,
            Open,
            OpenHref,
            History,
            HistoryBot,
        },
        beforeMount() {

            this.defaultColDef = {resizable: true};
        },
        data () {
            return {
                event:null,
                popupActive2:false,
                many:0,
                // AgGrid
                gridApi: null,
                gridOptions: {},
                typeDoc: null,
                type_dog:0,
                popupActivo:false,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Имя файла',
                        field: 'filename',
                        headerTooltip: 'Имя файла',
                        tooltipField: 'filename',
                        filter: true,
                        width: 400,
                        cellRendererFramework: 'OpenHref'
                    },
                  {
                    headerName: 'Тип',
                    headerTooltip: 'Тип',
                    tooltipField: 'type',
                    field: 'type',
                    filter: true,
                    width: 300,
                  },

                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open'
                    },
                  {
                    headerName: 'Дата загрузки',
                    field: 'norm_date',
                    headerTooltip: 'Дата загрузки',
                    tooltipField: 'norm_date',
                    filter: true,
                    width: 180,
                  },


                ],

                // Cell Renderer Components
                components: {
                    Open, OpenHref
                }

            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api
            this.getDataDebtorCreditDocuments(this.Deb.debtorCredit.id);
        },
        asyncComputed: {},
        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalPayments/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalDebtorCreditDocuments / this.paginationPageSize)
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
                'StatussDebtorArr', 'Deb', 'DebtorCreditDocumentsArr', 'TotalDebtorCreditDocuments','ShablonDocumentsArr',
                'TypesDcDocumentsDebtor'
            ]),


        },
        methods: {
//            onrowDoubleClicked(event){
//                this.href='/document/credit/?token='+localStorage.getItem('accessToken')+'&filename='+event.data.filename+'&id_credit='+event.data.id_credit;
//                console.log(this.href);
//                this.pdfView=true
//            },

            showPopupAddDoc(){
                this.getTypesDcDocuments();
                this.popupActive2 = true;
            },
            getDoc(id){
                this.popShab=false;
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDoc',
                        param:{
                            id_shab:id,
                            id_credit:this.Deb.debtorCredit.id
                        }


                    }
                }).then((response) => {
                    console.log(window);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');

                    filename = filename.split('; filename*=utf')[0];

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();

                    this.$vs.loading.close()


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
            showRec(type){

                if(!type){
                    this.many=0
                    document.getElementById("fileUpload1").click()
                }else{
                    this.many=1
                    document.getElementById("fileUpload1").click()
                }
            },
            saveDocument(evt,type,many){

                this.popupActivo=false
                this.$vs.loading({color: '#ff8000'})
                this.saveDebtorCreditDocument({
                    file: evt.target.files[0],
                    name: evt.target.files[0].name,
                    id: this.Deb.debtorCredit.id,
                    type:type,
                    many:many,
                }).then((response) => {
                    if (response.result) {
                        this.popupActive2=false
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
                    this.popupActive2=false
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                });
            },

            chooseFiles1 () {
                let flag=false;
                for(let a=0; a<this.TypesDcDocumentsDebtor.length; a++){
                    if(this.TypesDcDocumentsDebtor[a].id==this.typeDoc){
                        if(this.TypesDcDocumentsDebtor[a].many==1){
                            flag=true;
                        }
                    }

                }
                if(!flag){
                    this.many=0

                    document.getElementById("fileUpload1").click()
                }else{
                    this.popupActive2=false
                    this.popupActivo=true;
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


            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor', 'getDataStatuss', 'getDataDebtorsById', 'getDataDebtorCreditDocuments', 'saveDebtorCreditDocument',
                'getTypesDcDocuments'
            ]),


        },
    }
</script>

<style lang="scss">
    .h6 {
        font-size: 12px;
        color: cadetblue;
    }
</style>
