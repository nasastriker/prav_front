<template>
    <div id="page-user-list">
        <back :backstatus="backstatus"></back>
        <div v-if="backstatus">gggggggggggggggggg</div>
        <div class="vx-card p-6" style="min-height: 95vh;">
            <div class="vx-row" style="padding-top: 5px">
                <div class="vx-col sm:w-1/6 w-full mb-2">
                    <h6 class="h6Blue">ФИО: </h6>
                    <vs-input class="w-full" style="max-width: 350px"  v-model="fio"  @keyup.enter="findFio" ></vs-input>
                </div>
                <div class="vx-col sm:w-1/6 w-full mb-2">
                    <template v-if="RecoverArrList.length>0">
                        <h6 class="h6Blue">Выберите взыскателя:</h6>
                        <v-select  class="w-200" style="max-width: 350px" :reduce="label => label.id" label="name"  :options="RecoverArrList"  v-model="id_recover"  @input="setCess"  ></v-select>
                    </template>
                </div>
                <div class="vx-col sm:w-1/6 w-full mb-2">
                    <h6 class="h6Blue">Номер договора:</h6>
                    <vs-input class="w-full" style="max-width: 350px"  v-model="number"  @keyup.enter="findNumber" ></vs-input>
                </div>
                <div class="vx-col sm:w-1/6 w-full mb-2">
                    <h6 class="h6Blue">Номер СА:</h6>
                    <vs-input class="w-full" style="max-width: 350px"  v-model="number_sa"  @keyup.enter="findNumberSa" ></vs-input>
                </div>
                <div v-if="$route.name=='bank_answer'||$route.name=='fssp_answer'" class="vx-col sm:w-1/6 w-full mb-2">
                    <h6 class="h6Blue">ID:</h6>
                    <vs-input class="w-full" style="max-width: 350px"  v-model="id_c" v-debounce:3000ms="findId"  ></vs-input>
                </div>
                <div v-else class="vx-col sm:w-1/6 w-full mb-2">
                    <h6 class="h6Blue">ID:</h6>
                    <vs-input class="w-full" style="max-width: 350px"  v-model="id_c" v-debounce:3000ms="findIdAll"  ></vs-input>
                </div>
                <div class="vx-col sm:w-1/6 w-full mb-2">
                    <div class="vx-row" >
                        <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="clearFind">Очистить</vs-button>
                        <vs-checkbox   v-model="User.pag.shab.fast" @input="updateSearchFast" style="    margin-top: 10px;"></vs-checkbox>
                    </div>
                </div>
            </div>


            <!--<template v-if="findFlag">-->

                <!--<Regmail v-if="$route.name=='regmail'"></Regmail>-->
                <!--<BankAnswer v-if="$route.name=='bank_answer'" :p_changes="p_changes" :showChangeStatus="showChangeStatus"></BankAnswer>-->
                <!--<FnsAnswer v-if="$route.name=='fns_answer'"></FnsAnswer>-->
                <!--<FsspAnswer v-if="$route.name=='fssp_answer'" :p_changes="p_changes" :showChangeStatus="showChangeStatus"></FsspAnswer>-->
                <!--<DebtorID v-if="$route.name=='bankrot_answer'" back="false"    tabIndex='8'></DebtorID>-->

            <!--</template>-->
            <template v-if="findFlagMany">
                <div id="page-user-list">
                    <div class="vx-card p-6">
                        <div class="flex flex-wrap justify-between items-center">
                            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                                <vs-dropdown vs-trigger-click class="cursor-pointer">
                                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                        <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ total - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : total }} of {{ total }}</span>
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
                                <!--  <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." /> -->

                            </div>
                        </div>

                        <!-- AgGrid Table -->
                        <ag-grid-vue
                                ref="agGridTable"
                                :components="components"
                                :gridOptions="gridOptions"
                                class="ag-theme-material w-100 my-4 ag-grid-table vh65"
                                :columnDefs="columnDefs"
                                :defaultColDef="defaultColDef"
                                :rowData="data"
                                rowSelection="multiple"
                                :rowDataChanged = "onRowDataChanged"
                                colResizeDefault="shift"
                                @grid-size-changed="onGridSizeChanged"
                                :animateRows="true"
                                :floatingFilter="false"
                                @rowDoubleClicked="onrowDoubleClicked"
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
                </div>

            </template>
            <template v-if="findFlagNotFound">
                <fieldset class="f" style="margin-top: 15px" >
                    <legend class="l">Не найден:</legend>
                    <h1 style="text-align: center; color: #a00;
                    padding-top: 20px ;
                    padding-bottom: 20px;
                    ">Договор не найден!!!</h1>
                </fieldset>


            </template>
            <template  v-if="findFlagStart">
                <div>
                    <div style="margin-top: calc(70vh/2);
    text-align: center;">
                        <SpinnerLoader :color="'red'" />
                    </div>
                </div>
            </template>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../route';
    import back from './Render/BackArrow'
   // import Regmail from './Regmail.vue';
    import BankAnswer from '../Bank/BankAnswer.vue';
    import FnsAnswer from '../Fns/FnsAnswer.vue';
    import DebtorID from '../Debtor/DebtorID.vue';
    import OpenCreditStatus from '../Debtor/Render/OpenCreditStatus.vue';
    import FsspAnswer from '../Fssp/FsspAnswer.vue';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../axios'
    import vSelect from 'vue-select'
    import Status from '../../components/Status.vue'
    import { AgGridVue } from 'ag-grid-vue'
    import { SpinnerLoader }  from 'vue-spinners-css';
    import vueDebounce from 'vue-debounce'

    Vue.use(vueDebounce)
    export default {
        components: {
            'v-select': vSelect,Status,AgGridVue,SpinnerLoader,/*Regmail,*/BankAnswer,FnsAnswer,FsspAnswer,DebtorID,OpenCreditStatus,back
        },
        data () {
            return {
                backstatus:true,
                inputField:0,
                showChangeStatus: false,
                p_changes: {},
                id_c:'',
                from_id: false,
                isk:0,
                sud:0,
                fio:'',
                number_sa:'',
                cession:[],
                searchQuery:'',
                findFlagNotFound:false,
                findFlagStart:false,
                fail_rachod:0,
                sud_rashod:0,
                id_recover:0,
                number:'',
                findFlag:false,
                findFlagMany:false,
                gridApi: null,
                gridOptions: {

                    alwaysShowVerticalScroll:true
                },
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Статус',
                        field: 'id_status',
                        hide: false,
                        filter: true,
                        width: 200,

                        cellRendererFramework: 'OpenCreditStatus'
                    },
                    {
                        headerName: 'Фамилия',
                        field: 'name_family',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Имя',
                        field: 'name',
                        filter: true,
                        hide:false,
                        width: 150
                    },

                    {
                        headerName: 'Отчество',
                        field: 'name_patronymic',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Дата рождения',
                        field: 'birthdate',
                        filter: true,
                        hide:false,
                        width: 200
                    },
                    {
                        headerName: '№ Договора',
                        field: 'number_dog',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Номер СА',
                        field: 'number_sa',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Взыскатель',
                        field: 'recover',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Перв.Взыскатель',
                        field: 'recover1',
                        filter: true,
                        hide:false,
                        width: 180
                    },




                ],
                components: {
                    OpenCreditStatus
                }
                // Deb:{}
            }
        },
        mounted(){
            this.getDataStatuss();
            this.getDataRecoverersAndPravezCess();
            this.getBanksNameAndId();
            this.gridApi = this.gridOptions.api
            if(typeof this.User.pag.shab=='undefined'){
                this.User.pag.shab={}
                this.User.pag.shab.fast=true
            }
            if(typeof this.User.pag.credit.num_recover=='undefined')this.User.pag.credit.num_recover=0
            this.getRecoverArrList().then((response)=>{

                //       this.rec_id=this.User.pag.credit.id_recover
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.User.pag.credit.num_recover){

                        this.rec_id=this.RecoverArrList[i].name
                    }

                }
            })

        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.total/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.total/this.paginationPageSize)
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
                    if(typeof this.gridApi=='undefined'){
                        this.gridApi = this.gridOptions.api
                    }
                    if(this.gridApi){
                        this.gridApi.paginationGoToPage(val - 1)
                    }

                }
            },
            ...mapGetters([
               'Deb','BanksArr','User','RecoverArrList'

            ]),


        },
        methods: {
            letsNoCollect(id_credit){
                this.showChangeStatus = false;
                this.setNoCollect(id_credit).then((set_arr) => {
                    if (set_arr.result) {
                        this.findFlag = true;
                        this.findFlagMany = false;
                        this.getDataDebtorsById(id_credit);
                        this.findFlagNotFound = false;
                        this.p_changes = set_arr;
                        this.showChangeStatus = true;
                        this.findFlagStart=false;
                    }
                }).catch(error => {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                });
            },
            updateSearchFast (val) {
                if(typeof this.User.pag.shab=='undefined'){
                    this.User.pag.shab={}
                }
                this.User.pag.shab.fast=val
                this.setDataUser()
                //       this.getDataCredits(this.User.pag.credit);

            },
            onGridSizeChanged(params) {
                if (params.clientWidth > 500) {
                    if(this.gridApi!=null){
                        this.gridApi.sizeColumnsToFit();
                    }

                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }
            },
            clearFind(){
                this.from_id = false;
                this.id_c = '';
                this.id_recover=0
                this.fio=''
                this.number=''
                this.findFlag=false;
                this.findFlagMany=false;
                this.findFlagNotFound=false;
                this.findFlagStart=false
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        if(this.gridOptions.api!=null){
                            this.gridOptions.api.sizeColumnsToFit();
                        }

                    }
                );
            },
            onrowDoubleClicked(event){
                if (this.from_id) {
                    this.letsNoCollect(event.data.id);
                } else {
                    this.findFlag = true;
                    this.findFlagMany = false;
                    this.getDataDebtorsById(event.data.id)
                    this.findFlagNotFound = false;
                }
            },
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            changeStatusSud(){
                if(this.sud){
                    this.$refs.status.setStatus(3);
                }
            },
            changeStatusIsk(){
                if(this.isk){
                    this.$refs.status.setStatus(4);
                }
            },
            setCess(){
                if(this.id_recover==null){
                    this.id_recover=0
                }


                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.id_recover){
                        this.User.pag.credit.id_recover=this.RecoverArrList[i].num
                        // this.User.pag.credit.num_recover=this.RecoverArrList[i].id //это правильно
                        this.User.pag.credit.cession=this.RecoverArrList[i].cession
                        this.User.pag.credit.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                switch (this.inputField){
                    case 1: {
                        this.findFio()
                        break;
                    }
                    case 2: {
                        this.findNumber()
                        break;
                    }
                    case 3: {
                        this.findNumberSa()
                        break;
                    }
                    //     case 4: {
                    //         this.findId()
                    //         break;
                    //     }
                    //     case 5: {
                    //         this.findIdAll()
                    //         break;
                    //     }
                }

            },
            findIdAll(){
                this.inputField=5
                this.findFlagStart=true
                this.isk=0
                this.sud=0
                this.findFlag=false;
                this.findFlagMany=false;
                this.findFlagNotFound=false;
                this.number='';
                this.fio='';
                this.number_sa='';

                /*
                 axios.get(r("find.index"), {
                     params: {
                         method: 'findId',
                         param: this.id_c
                     }
                 */
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.id_recover){
                        this.User.pag.credit.id_recover=this.RecoverArrList[i].num
                        // this.User.pag.credit.num_recover=this.RecoverArrList[i].id //это правильно
                        this.User.pag.credit.cession=this.RecoverArrList[i].cession
                        this.User.pag.credit.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCredits',
                        param: {
                            id_recover:this.User.pag.credit.id_recover,
                            cession:this.User.pag.credit.cession,
                            typeRecover:this.User.pag.credit.typeRecover,
                            find:'',
                            fast:this.User.pag.shab.fast,
                            fields:[{
                                find:this.id_c,
                                type: 'string',
                                name:'id'
                            }],
                        }
                    }
                }).then((response) => {
                    if (response.data.result){
                        this.id_c='';
                        if(response.data.total>1){
                            this.from_id = true;
                            this.gridApi = this.gridOptions.api
                            this.findFlagMany=true;
                            this.total=response.data.total;
                            this.data=response.data.data;
                            this.findFlagStart=false
                        }
                        else{
                            if(response.data.total==1){
                                this.findFlag=true;
                                this.findFlagMany=false;
                                this.getDataDebtorsById(response.data.data[0].id)
                                this.findFlagNotFound=false;
                            }
                            else{

                                this.findFlagNotFound=true;
                                this.findFlagStart=false
                            }
                        }
                    }
                    else{
                        this.findFlagNotFound=true;
                        this.findFlagStart=false
                    }
                }).catch(error => {
                    this.findFlagStart=false

                });
            },
            findId(){
                this.inputField=4
                this.showChangeStatus = false;
                this.findFlagStart=true
                this.isk=0
                this.sud=0
                this.findFlag=false;
                this.findFlagMany=false;
                this.findFlagNotFound=false;
                this.number='';
                this.fio='';
                this.number_sa='';
                /*
                axios.get(r("find.index"), {
                    params: {
                        method: 'findId',
                        param: this.id_c
                    }
                    */
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.id_recover){
                        this.User.pag.credit.id_recover=this.RecoverArrList[i].num
                        // this.User.pag.credit.num_recover=this.RecoverArrList[i].id //это правильно
                        this.User.pag.credit.cession=this.RecoverArrList[i].cession
                        this.User.pag.credit.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCredits',
                        param: {
                            id_recover:this.User.pag.credit.id_recover,
                            cession:this.User.pag.credit.cession,
                            typeRecover:this.User.pag.credit.typeRecover,
                            find:'',
                            fast:this.User.pag.shab.fast,
                            fields:[{
                                find:this.id_c,
                                type: 'string',
                                name:'id'
                            }],

                        }

                    }
                }).then((response) => {
                    //   console.log(response.data.data);
                    if (response.data.result){
                        this.id_c='';
                        if(response.data.total>1){
                            this.from_id = true;
                            this.gridApi = this.gridOptions.api
                            this.findFlagMany=true;
                            this.total=response.data.total;
                            this.data=response.data.data;
                            this.findFlagStart=false
                        }
                        else{
                            if(response.data.total==1){
                                this.letsNoCollect(response.data.data[0].id);
                            }
                            else{

                                this.findFlagNotFound=true;
                                this.findFlagStart=false
                            }
                        }
                    }
                    else{
                        this.findFlagNotFound=true;
                        this.findFlagStart=false
                    }
                }).catch(error => {
                    this.findFlagStart=false

                });
            },
            findFio(){
                this.inputField=1
                this.showChangeStatus = false;
                this.from_id = false;
                this.findFlagStart=true
                this.isk=0
                this.sud=0
                this.findFlag=false;
                this.findFlagMany=false;
                this.findFlagNotFound=false;
                //   this.number_sa='';
                this.number='';
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.id_recover){
                        this.User.pag.credit.id_recover=this.RecoverArrList[i].num
                        // this.User.pag.credit.num_recover=this.RecoverArrList[i].id //это правильно
                        this.User.pag.credit.cession=this.RecoverArrList[i].cession
                        this.User.pag.credit.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }

                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCredits',
                        param: {
                            id_recover:this.User.pag.credit.id_recover,
                            cession:this.User.pag.credit.cession,
                            typeRecover:this.User.pag.credit.typeRecover,
                            find:this.fio,
                            fast:this.User.pag.shab.fast,

                        }

                    }
                }).then((response) => {
                    this.findFlagStart=false
                    if (response.data.result){
                        if(response.data.total>1){
                            this.gridApi = this.gridOptions.api
                            this.findFlagMany=true;
                            this.total=response.data.total;
                            this.data=response.data.data;
                        }
                        else{
                            if(response.data.total==1){
                                this.findFlag=true;
                                this.findFlagMany=false;
                                this.getDataDebtorsById(response.data.data[0].id)
                                this.getDataDebtorsById(response.data.data[0].id)
                                this.findFlagNotFound=false;                            }
                            else{

                                this.findFlagNotFound=true;
                            }



                        }



                    }
                    else{
                        this.findFlagNotFound=true;
                    }



                }).catch(error => {
                    this.findFlagStart=false

                });

            },
            findNumberSa(){
                this.inputField=3
                this.showChangeStatus = false;
                this.from_id = false;
                this.findFlagStart=true
                this.isk=0
                this.sud=0
                this.findFlag=false;
                this.findFlagMany=false;
                this.findFlagNotFound=false;
                this.number='';
                this.fio='';
                /*
                axios.get(r("find.index"), {
                    params: {
                        method: 'findNumberSa',
                        param: {
                            id_recover:this.id_recover,
                            cession:this.cession,
                            find:this.number_sa,
                            fast:this.User.pag.shab.fast,

                        }

                    }
                  */
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.id_recover){
                        this.User.pag.credit.id_recover=this.RecoverArrList[i].num
                        // this.User.pag.credit.num_recover=this.RecoverArrList[i].id //это правильно
                        this.User.pag.credit.cession=this.RecoverArrList[i].cession
                        this.User.pag.credit.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCredits',
                        param: {
                            id_recover:this.User.pag.credit.id_recover,
                            cession:this.User.pag.credit.cession,
                            typeRecover:this.User.pag.credit.typeRecover,
                            find:'',
                            fast:this.User.pag.shab.fast,
                            fields:[{
                                find:this.number_sa,
                                type: 'string',
                                name:'number_sa'
                            }],

                        }

                    }
                }).then((response) => {
                    this.findFlagStart=false
                    if (response.data.result){
                        if(response.data.total>1){
                            this.gridApi = this.gridOptions.api
                            this.findFlagMany=true;
                            this.total=response.data.total;
                            this.data=response.data.data;
                        }
                        else{
                            if(response.data.total==1){
                                this.findFlag=true;
                                this.findFlagMany=false;
                                this.getDataDebtorsById(response.data.data[0].id)
                                this.findFlagNotFound=false;
                            }
                            else{

                                this.findFlagNotFound=true;
                            }


                        }



                    }
                    else{
                        this.findFlagNotFound=true;
                    }


                }).catch(error => {
                    this.findFlagStart=false

                });
            },
            findNumber(){
                this.inputField=2
                this.showChangeStatus = false;
                this.from_id = false;
                this.findFlagStart=true
                this.isk=0
                this.sud=0
                this.findFlag=false;
                this.findFlagMany=false;
                this.findFlagNotFound=false;
                this.number_sa='';
                this.fio='';
                /*

                 axios.get(r("find.index"), {
                     params: {
                         method: 'findNumber',
                         param: {
                             id_recover:this.id_recover,
                             find:this.number,
                             fast:this.User.pag.shab.fast,

                         }

                     }
                 */

                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.id_recover){
                        this.User.pag.credit.id_recover=this.RecoverArrList[i].num
                        // this.User.pag.credit.num_recover=this.RecoverArrList[i].id //это правильно
                        this.User.pag.credit.cession=this.RecoverArrList[i].cession
                        this.User.pag.credit.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCredits',
                        param: {
                            id_recover:this.User.pag.credit.id_recover,
                            cession:this.User.pag.credit.cession,
                            typeRecover:this.User.pag.credit.typeRecover,
                            find:'',
                            fast:this.User.pag.shab.fast,
                            fields:[{
                                find:this.number,
                                type: 'string',
                                name:'number_dog'
                            }],

                        }

                    }
                }).then((response) => {
                    this.findFlagStart=false
                    if (response.data.result){
                        if(response.data.total>1){
                            this.gridApi = this.gridOptions.api
                            this.findFlagMany=true;
                            this.total=response.data.total;
                            this.data=response.data.data;
                        }
                        else{
                            if(response.data.total==1){
                                this.findFlag=true;
                                this.findFlagMany=false;
                                this.getDataDebtorsById(response.data.data[0].id)
                                this.findFlagNotFound=false;
                            }
                            else{

                                this.findFlagNotFound=true;
                            }


                        }



                    }
                    else{
                        this.findFlagNotFound=true;
                    }



                }).catch(error => {
                    this.findFlagStart=false

                });
            },



            parseFilesFromFolder(){

            },
            ...mapActions([
                'getDataRecoverersAndPravezCess','getDataDebtorsById','getBanksNameAndId',
                'changeDeb','changeAndCheckStatusDeb','setDataUser','setNoCollect','getDataStatuss','getRecoverArrList'

            ]),


        },
    }
</script>
<style>
    .ag-theme-material.w-100.my-4.ag-grid-table {
        /*height: calc(100vh - 300px);*/
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .vh65{
        max-height: 65vh;
    }

</style>
