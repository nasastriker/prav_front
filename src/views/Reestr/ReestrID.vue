<template>

    <div id="page-user-list">


        <div class="vx-card p-6">

            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/5 w-full mb-2">
                        <Back></Back>

                    </div>


                </div>
                <!-- ITEMS PER PAGE -->
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDebtorReestrs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDebtorReestrs }} of {{ TotalDebtorReestrs }}</span>
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
                </div>

                <div class="vx-col sm:w-1/3 w-full mb-2">
                    <h3 style="margin-bottom: 15px">{{DebtorReestrsArrName}}</h3>
                </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <div class="dropdown-button-container">
                        <vs-dropdown>
                            <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz">Операции</vs-button>
                            <vs-dropdown-menu>

                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="changefieldNow">Изменить поле</vs-button>
                                </vs-dropdown-item>

                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="downloadReestrDocuments">Выгрузить документы</vs-button>
                                </vs-dropdown-item>

                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="uploadReestrDocuments">Загрузить документы</vs-button>
                                </vs-dropdown-item>

                          <!--      <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="setCalculation">Расчет</vs-button>
                                </vs-dropdown-item> -->

                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="setStratgy">Стратегии</vs-button>
                                </vs-dropdown-item>

                            </vs-dropdown-menu>
                        </vs-dropdown>
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
                    :rowData="DebtorReestrsArr"
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
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>

        <vs-popup style="min-height: 500px;" classContent="popup-example" title="Изменение поля" :active.sync="pop">


           <template v-if="AtrDebtorCreditsTotal!=0">


            <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Название поля:</h6>
            <v-select  class="w-50 " :reduce="label => label" label="atr_comment" :options="AtrDebtorCredits"  v-model="fieldNow"  @input="checkChange" ></v-select>
            <template v-if="typeFieldInput==='boolean'">
                <vs-checkbox style="margin-bottom: 15px" v-model="fieldInput">Активно</vs-checkbox>
            </template>
            <template v-if="typeFieldInput==='integer'">
               <vs-input class="w-100" type="Number" style="margin-top : 7px;margin-bottom: 7px"  v-model="fieldInput" @keypress="validateNumberInt"></vs-input>
            </template>
            <template v-if="typeFieldInput==='date'">
               <vs-input class="w-100" type="date" style="margin-top: 7px;margin-bottom: 7px"  v-model="fieldInput" ></vs-input>
            </template>
            <template v-if="typeFieldInput==='string'">
                <vs-input class="w-100"  style="margin-top: 7px;margin-bottom: 7px;min-width: 400px"  v-model="fieldInput" ></vs-input>
            </template>
            <template v-if="typeFieldInput==='text'">
                <vs-input class="w-100" type="text" style="margin-top: 7px;margin-bottom: 7px;min-width: 600px"  v-model="fieldInput" ></vs-input>
            </template>
            <template v-if="typeFieldInput==='decimal'">
                <vs-input class="w-100" type="Number" style="margin-top : 7px;margin-bottom: 7px"  v-model="fieldInput" @keypress="validateNumberDecimal"></vs-input>
            </template>



            <div class="flex flex-wrap">
                <vs-button class="w-1/3 ml-auto"  style="margin-top: 15px" color="primary" type="filled" @click="updateField">Обновить</vs-button>
            </div>
           </template>
            <template v-else>
                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px; font-size: 16px">Загрузка полей, пожалуйста подождите</h6>
            </template>
        </vs-popup>
        <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                  v-on:change="saveDocument($event,typeDoc)" style="display: none"/>
        <vs-popup classContent="popup-example" title="Тип документа" :active.sync="showUploadReestrDocuments">

            <div class="mt-8 mb-base">
                <label class="text-sm">Тип документа</label>
                <div class="mt-2">
                    <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="TypesDcDocumentsDebtor"  v-model="typeDoc"  ></v-select>
                    <!--                                <vs-radio v-model="type_dog" vs-value="0" class="mr-3">Договор</vs-radio>-->
                    <!--                                <vs-radio v-model="type_dog" vs-value="1" class="mr-3">Другое</vs-radio>-->

                </div>
            </div>
            <div class="flex flex-wrap">
                <vs-button class="w-1/3 ml-auto" @click="chooseFiles1()" color="primary" type="filled">Выбрать</vs-button>
            </div>


        </vs-popup>
        <vs-popup class="holamundo" title="Расчеты:" :active.sync="showCalc">
            <template v-for="(item,index) in calc">
                <div style="margin-left: 10px;margin-right: 10px;color: red"  class="hover:text-primary cursor-pointer">
                    <vs-checkbox v-model="item.active" @input="changeCalc(item)">Активно</vs-checkbox> {{item.text}}
                </div>
                <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
            </template>

            <h3 style="margin-top: 15px">Внимание на расчет требуется время в зависимости от количества заёмщиков!!!</h3>

        </vs-popup>
        <vs-popup class="holamundo" title="Стратегии:" :active.sync="showStratgy">
            <template v-for="(item,index) in Strategy">
                <div style="margin-left: 10px;margin-right: 10px;color: red"  class="hover:text-primary cursor-pointer">

                    <vs-checkbox v-model="item.active" @input="changeStrategy(item)">Активно {{item.name}}</vs-checkbox>
                </div>
                <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
            </template>



        </vs-popup>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/OpenDebtor.vue'
    import Status  from '../../components/StatusDogovor.vue'
    import Back from '../../components/Back.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            Open,
            Back,
            Status,
            VueCsvImport,
        },
        data () {
            return {
                typeDoc: 0,
                showStratgy:false,
                calc:[],
                Strategy:[],
                showUploadReestrDocuments:false,
                showCalc:false,
                // Replace Fields
                pop:false,
                fieldList:[],
                typeFieldStore:'1',
                fieldInput:'',
                typeFieldInput:'1',
             //   fieldKeyList:[],
                fieldNow:0,
                //typeField:'asd',
                // Filter Options
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
                        headerName: 'Статус',
                        field: 'id_status',
                        filter: true,
                        width: 250,
                        cellRendererFramework: 'Status'
                    },
                    {
                        headerName: 'Договор',
                        headerTooltip: 'Договор',
                        tooltipField: 'number_dog',
                        field: 'number_dog',
                        filter: true,
                        width: 250,

                    },
                    {
                        headerName: 'Фамилия',
                        headerTooltip: 'Фамилия',
                        tooltipField: 'name_family',
                        field: 'name_family',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'Создан',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open'
                    },



                ],

                // Cell Renderer Components
                components: {
                    Open,
                    Status
                }
            }
        },

        computed: {


            channel(){
                return this.$echo.join("reload-channel");
            },
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalDebtorReestrs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.debtor_reestr.limit
            },

            ...mapGetters([
                'DebtorReestrsArr','TotalDebtorReestrs','User','DebtorReestrsArrName','AtrDebtorCredits','AtrDebtorCreditsTotal','TypesDcDocumentsDebtor'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryDebtorsReestrOffset(val-1)
                    this.getDataDebtorReestrs({
                        debtor_reestr:this.User.pag.debtor_reestr,
                        id:this.$route.params.id,

                    });
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },



        },

        methods: {
            onGridSizeChanged(params) {
                if (params.clientWidth > 500) {
                    if(this.gridApi.visible)this.gridApi.sizeColumnsToFit();
                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
            
            ...mapMutations([
                'setQueryDebtorsReestrLimit','setQueryDebtorsReestrOffset','updateFieldDebtorCredit'

            ]),
            chooseFiles1: function () {
                if (this.typeDoc > 0) {
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
            saveDocument(evt,type){
                this.$vs.loading({color: '#ff8000'})
                this.saveDebtorCreditDocumentReestr({
                    file: evt.target.files,
                    id: this.$route.params.id,
                    type:type,
                }).then((response) => {
                    if (response.result) {
                        this.showUploadReestrDocuments=false
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
            changeStrategy(item){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtorCredit.index"), {
                    params: {
                        method: 'saveStrategyByReestr',
                        param: item
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    this.getStrategy();



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
            changeCalc(item){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtorCredit.index"), {
                    params: {
                        method: 'saveCalculationByReestr',
                        param: item
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    this.getCalc();



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
            getStrategy(){

                axios.get(r("debtorCredit.index"), {
                    params: {
                        method: 'getStrategyReestr',
                        param: this.$route.params.id
                    }
                }).then((response) => {

                    if (response.data.result) {
                        this.Strategy = response.data.data;
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
            getCalc(){

                axios.get(r("debtorCredit.index"), {
                    params: {
                        method: 'getCalculationReestr',
                        param: this.$route.params.id
                    }
                }).then((response) => {

                    if (response.data.result) {
                        this.calc = response.data.data;
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
            checkChange(){
                if((this.fieldNow.type==='integer')||(this.fieldNow.type==='bigint')){
                    this.typeFieldInput='integer'
                    return 'integer'
                }
                if(this.fieldNow.type==='string'){
                    this.typeFieldInput='string'
                    return 'string'
                }
                if(this.fieldNow.type==='date'){
                    this.typeFieldInput='date'
                    return 'date'
                }
                if(this.fieldNow.type==='decimal'){
                    this.typeFieldInput='decimal'
                    return 'decimal'
                }
                if(this.fieldNow.type==='text'){
                    this.typeFieldInput='text'
                    return 'text'
                }
                if(this.fieldNow.type==='boolean'){
                    this.typeFieldInput='boolean'
                    return 'boolean'
                }
            },
            setStratgy(){
                this.showStratgy=true;
            },

            setCalculation(){
                this.showCalc=true;
            },
            updateField() {
                {
                    this.$vs.loading({color: '#ff8000'})
                    axios.post(r("debtorCredit.update"), {
                        params: {
                            method: 'updateFieldDebtorCredit',
                                param: {id: this.$route.params.id, field: this.fieldNow.atr, value:this.fieldInput}

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.result) {
                            this.$vs.notify({
                                title: 'Успешно',
                                text: 'Сохранено!!!',
                                color: 'success',
                                position: 'top-center'
                            })
                        }
                        else {
                              this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Сохранить не удалось !!!',
                            color: 'danger',
                            position: 'top-center'
                        })}
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

            validateNumberInt: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateNumberDecimal: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,.]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            uploadReestrDocuments(){
                this.showUploadReestrDocuments=true;
            },
            downloadReestrDocuments(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("reestrImport.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'downloadCreditDocumentFromReestr',
                        param:  this.$route.params.id//id: this.$route.params.id, field: this.fieldNow.atr, value:this.fieldInput}

                    }
                }).then((response) => {
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
                })
            },
            changefieldNow(){
                this.pop=true;
            },
            changePag(pag){

                this.User.pag.debtor_reestr.limit=pag
                this.setDataUser()
                this.getDataDebtorReestrs({
                    debtor_reestr:this.User.pag.debtor_reestr,
                    id:this.$route.params.id,

                });
                this.setQueryDebtorsReestrLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },


            onrowDoubleClicked(event){
                this.$router.push('/credit/'+event.data.id)
            },

            ...mapActions([
                'getDataDebtorReestrs','getDataStatuss','setDataUser','saveDebtorCreditDocumentReestr','getTypesDcDocuments','getDataAtrDebtorCredits'
            ]),
            updateSearchQuery (val) {
                this.User.pag.debtor_reestr.find=val

                this.getDataDebtorReestrs({
                    debtor_reestr:this.User.pag.debtor_reestr,
                    id:this.$route.params.id,

                });

            },

            
            reload(e){
                if(e.data=='reestr'){
                   // this.getDataDebtorReestrs(this.User.pag.debtor_reestr,this.$route.params.id);
                }
            }

        },
        mounted () {
            this.getTypesDcDocuments();
            this.getDataStatuss();
            this.getCalc();
            this.getStrategy();
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            //this.getDataDebtorReestrs(this.$route.params.id);
            this.getDataAtrDebtorCredits();
            this.getDataDebtorReestrs({
                debtor_reestr:this.User.pag.debtor_reestr,
                id:this.$route.params.id,

            });
        }
    }

</script>

<style lang="scss">
    .con-vs-pagination{
        margin-right: 40px!important;
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
