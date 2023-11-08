<template>
    <vx-card no-shadow>
        <div class="vx-row" style="padding-top: 5px">
            <div class="vx-col sm:w-1/3 w-full mb-2">
                <h6 class="h6Blue">ФИО: Березина Анастасия Владимировна </h6>
                <vs-input class="w-full" style="max-width: 350px"  v-model="fio"  @keyup.enter="findFio" ></vs-input>
            </div>
            <div class="vx-col sm:w-1/3 w-full mb-2">
                <template v-if="RecoverersArr.length>0">
                    <h6 class="h6Blue">Выберите взыскателя:</h6>
                    <v-select  class="w-200" style="max-width: 350px" :reduce="label => label.id" label="name"  :options="RecoverersArr"  v-model="id_rec"   ></v-select>
                </template>
            </div>
            <div class="vx-col sm:w-1/3 w-full mb-2">
                <h6 class="h6Blue">Номер договора: 8578-5566-002 </h6>
                <vs-input class="w-full" style="max-width: 350px"  v-model="number"  @keyup.enter="findNumber" ></vs-input>
            </div>
        </div>

        <template v-if="findFlag">
            <fieldset class="f" style="margin-top: 15px" >
                <legend class="l">{{Deb.debtor.name_family}} {{Deb.debtor.name}} {{Deb.debtor.name_patronymic}}:</legend>
                <div class="vx-row" style="padding-top: 20px;padding-left: 10px; padding-right: 10px">
                    <div class="vx-col sm:w-1/3 w-full mb-2">
                        <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                            <Status :id_credit="Deb.debtorCredit.id" class="h6" ref="status"></Status>
                        </template>
                        <h6 class="h6">Взыскатель:</h6>
                        <vs-input class="w-100" readonly v-model="Deb.recover.name"></vs-input>
                        <h6 class="h6">Цедент:</h6>
                        <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
                        <h6 class="h6" style="margin-top: 25px">Фамилия:</h6>
                        <vs-input class="w-100 " readonly v-model="Deb.debtor.name_family"></vs-input>
                        <h6 class="h6">Имя:</h6>
                        <vs-input class="w-100 " readonly v-model="Deb.debtor.name"></vs-input>
                        <h6 class="h6">Отчетсво:</h6>
                        <vs-input class="w-100 " readonly  v-model="Deb.debtor.name_patronymic"></vs-input>
                        <h6 class="h6">Дата рождения:</h6>
                        <vs-input type="date" class="w-100 " readonly v-model="Deb.debtor.birthdate"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Номер договора:</h6>
                        <vs-input class="w-100"  readonly v-model="Deb.debtorCredit.number_dog"></vs-input>
                        <h6 class="h6">Дата договора:</h6>
                        <vs-input type="date" class="w-100" readonly v-model="Deb.debtorCredit.date_dog"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Статус гражданина:</h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                        </div>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full mb-2">
                        <fieldset class="f" >
                            <legend class="l">Соглашение:</legend>
                            <div style="padding-left: 15px">
                                <div class="vx-row" style="padding-top: 20px; padding-left: 15px">
                                    <h6 class="h6" style="margin-top: 15px">Статус:</h6>

                                </div>
                                <div class="vx-row" style="padding-left: 15px">
                                    <div class="mt-2">
                                        <vs-radio v-model="Deb.soglashenie.status" vs-value="0" vs-name="soglashenie" class="mr-4" > Не Заключено</vs-radio>
                                        <vs-radio v-model="Deb.soglashenie.status" vs-value="1" vs-name="soglashenie" class="mr-4" >Заключено</vs-radio>
                                    </div>
                                </div>

                            </div>

                            <div class="vx-row" style="padding-top: 20px; padding-left: 15px">

                                <div class="vx-col w-full mb-2">
                                    <h6 class="h6">Дата заключения соглашения:</h6>
                                    <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date" ></vs-input>

                                </div>
                                <div class="vx-col sm:w-1/2 w-full mb-2">
                                    <h6 class="h6">Дата первого платежа:</h6>
                                    <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date1" ></vs-input>
                                    <h6 class="h6">Дата второго платежа:</h6>
                                    <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date2" ></vs-input>
                                </div>
                                <div class="vx-col sm:w-1/2 w-full mb-2">
                                    <h6 class="h6">Сумма первого платежа:</h6>
                                    <vs-input type="number" class="w-100" v-model="Deb.soglashenie.sum1" ></vs-input>
                                    <h6 class="h6">Сумма второго платежа:</h6>
                                    <vs-input type="number" class="w-100" v-model="Deb.soglashenie.sum2" ></vs-input>
                                </div>
                            </div>

                            <div class="vx-row" style="padding-top: 20px; padding-left: 15px">
                                <div class="vx-col sm:w-1/2 w-full mb-2">
                                    <h6 class="h6">Код:</h6>
                                    <vs-input  class="w-100" v-model="Deb.soglashenie.code" ></vs-input>
                                </div>

                                <div class="vx-col sm:w-1/2 w-full mb-2">
                                    <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                                </div>




                            </div>


                        </fieldset>
                    </div>

                </div>
            </fieldset>


        </template>
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
                            :rowData="data"
                            rowSelection="multiple"
                            :rowDataChanged = "onRowDataChanged"
                            colResizeDefault="shift"
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

    </vx-card>
</template>

<script>
    import r from '../../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../../axios'
    import Status from '../../../components/Status.vue'
    export default {
        components: {
           Status
        },
        data () {
            return {
                isk:0,
                judi:{},
                sud:0,
                years:['2020','2019','2018'],
                fio:'',
                searchQuery:'',
                findFlagNotFound:false,
                fail_rachod:0,
                sud_rashod:0,
                id_rec:0,
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
                        headerName: '№ Договора',
                        field: 'number_dog',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Взыскатель',
                        field: 'recover',
                        filter: true,
                        hide:false,
                        width: 180
                    },

                    {
                        headerName: 'Фамилия',
                        field: 'name_family',
                        filter: true,
                        hide:false,
                        width: 180
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
                        headerName: 'Телефон',
                        field: 'phone',
                        filter: true,
                        hide:false,
                        width: 150
                    },

                ],
                components: {

                }
                // Deb:{}
            }
        },
        mounted(){
            this.getDataRecoverersAndPravez();
            this.getBanksNameAndId();

            this.gridApi = this.gridOptions.api
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
                else return 10
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
                'RecoverersArr','Deb','BanksArr'

            ]),


        },
        methods: {
            save(){
                this.Deb.soglashenie.id_debtorcredit=this.Deb.debtorCredit.id
                axios.post(r("sogl.update"), {
                    params: {
                        method: 'save',
                        param: this.Deb.soglashenie

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/buh/sogl/')
                    }
                    else {
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }



                })
            },
            getJud(){
                if(this.Deb.debtor.jud_number!=null ){
                    axios.get(r("judicial.index"), {
                        params: {
                            method: 'getJudicialByNumber',
                            param: this.Deb.debtor.jud_number

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.result) {
                            this.judi = response.data.data;


                        }
                        else{
                            this.judi = {};
                        }


                    })}


            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
            onrowDoubleClicked(event){
                this.findFlag=true;
                this.findFlagMany=false;
                this.getDataDebtorsById(event.data.id).then((response) => {
                    this.judi={}
                    this.getJud()

                })

                this.findFlagNotFound=false;


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
            findFio(){
                let flag=false;
                this.isk=0
                this.sud=0
                this.findFlag=false;
//                if (this.id_rec==0){
//                    flag=true;
//                    this.$vs.notify({  title:'Ошибка', text: 'Для поиска по фамилии выберите взыскателя!!!', color: 'danger', position: 'top-center' })
//                }
                if(!flag){
                    axios.get(r("find.index"), {
                        params: {
                            method: 'findFio',
                            param: {
                                id_rec:this.id_rec,
                                fio:this.fio,

                            }

                        }
                    }).then((response) => {
                        if (response.data.result){
                            if(response.data.total>1){
                                this.gridApi = this.gridOptions.api
                                this.findFlagMany=true;
                                this.total=response.data.total;
                                this.data=response.data.data;
                            }
                            else{
                                this.findFlag=true;
                                this.findFlagMany=false;
                                this.getDataDebtorsById(response.data.data[0].id).then((response) => {
                                    this.judi={}
                                    this.getJud()

                                })

                                this.findFlagNotFound=false;

                            }



                        }
                        else{
                            this.findFlagNotFound=true;
                        }



                    })
                }

            },
            findNumber(){
                this.isk=0
                this.sud=0
                this.findFlag=false;
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("find.index"), {
                    params: {
                        method: 'findNumber',
                        param: {
                            id_rec:this.id_rec,
                            number:this.number,

                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.findFlag=true;
                        this.getDataDebtorsById(response.data.id).then((response) => {
                            this.judi={}
                            this.getJud()

                        })

                        this.findFlagNotFound=false;
                        this.$vs.loading.close()
                    }
                    else{
                        this.findFlagNotFound=true;
                    }this.$vs.loading.close()



                })
            },
            changeAndCheckStatusDebLocal(){
                this.changeAndCheckStatusDeb().then((response) => {
                    this.$refs.status.getData();
                })
            },
            ...mapActions([
                'getDataRecoverersAndPravez','getDataDebtorsById','getBanksNameAndId','changeDeb','changeAndCheckStatusDeb'
            ]),


        },
    }
</script>
<style>
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
</style>
