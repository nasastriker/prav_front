<template>
    <vx-card no-shadow>
        <div class="mt-5">
            <div class="vx-row" >
                <div class="vx-col sm:w-1/3 w-full mb-2">
                    <div class="centerx">
                        <vs-tooltip text="Дата регистрации:" position="top" >
                            <h6 class="h6Blue mb-1">Дата регистрации:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-full"  style="margin-bottom: 10px" type="date" v-model="correspondence.reg_date"></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Регистрационный №:" position="top" >
                            <h6 class="h6Blue mb-1">Регистрационный №:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-full"   style="margin-bottom: 10px" v-model="correspondence.reg_number"></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Вид документа" position="top" >
                            <h6 class="h6Blue mb-1">Вид документа</h6>
                        </vs-tooltip>
                    </div>
                    <v-select  class="w-full " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="DocumentsVidList"   v-model="correspondence.id_vid" @input="SetVid" ></v-select>

                    <div class="centerx">
                        <vs-tooltip text="Группа документа" position="top" >
                            <h6 class="h6Blue mb-1">Группа документа</h6>
                        </vs-tooltip>
                    </div>
                    <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="DocumentsGroupList"   v-model="correspondence.id_group" @input="SetGroup" :disabled="disableCor.id_group"></v-select>

                    <div class="centerx">
                        <vs-tooltip text="Наименование документа" position="top" >
                            <h6 class="h6Blue mb-1">Наименование документа</h6>
                        </vs-tooltip>
                    </div>
                    <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="DocumentsTypeList"   v-model="correspondence.id_type" :disabled="disableCor.id_type"></v-select>
                </div>
                <div class="vx-col sm:w-1/3 w-full mb-2">
                    <div class="centerx">
                        <vs-tooltip text="Дата документа:" position="top" >
                            <h6 class="h6Blue mb-1">Дата документа:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-full"  style="margin-bottom: 10px" type="date" v-model="correspondence.doc_date"></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Отправитель" position="top" >
                            <h6 class="h6Blue mb-1">Отправитель</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-full"  style="margin-bottom: 10px"  v-model="correspondence.sender"></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Получатель" position="top" >
                            <h6 class="h6Blue mb-1">Получатель</h6>
                        </vs-tooltip>
                    </div>
                    <vue-simple-suggest
                        v-model="correspondence.recipient"
                        :list="OrganizationArrName"
                        :filter-by-query="true">
                      <!-- Filter by input text to only show the matching results -->
                    </vue-simple-suggest>

                    <div class="centerx">
                        <vs-tooltip text="Адрес получателя" position="top" >
                            <h6 class="h6Blue mb-1">Адрес получателя</h6>
                        </vs-tooltip>

                    </div>
                    <vue-simple-suggest
                        v-model="correspondence.address_recipient"
                        :list="OrganizationArrAddress"
                        :filter-by-query="true">
                      <!-- Filter by input text to only show the matching results -->
                    </vue-simple-suggest>

                    <div class="centerx">
                        <vs-tooltip text="Штриховой почтовый идентификатор" position="top" >
                            <h6 class="h6Blue mb-1">ШПИ</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-full"  style="margin-bottom: 10px"  v-model="correspondence.shpi"></vs-input>

                </div>
                <div class="vx-col sm:w-1/3 w-full mb-2">
                    <div class="centerx">
                        <vs-tooltip text="ID почтового отправления" position="top" >
                            <h6 class="h6Blue mb-1">ID почтового отправления</h6>
                        </vs-tooltip>
                    </div>
                    <vs-textarea class="w-full"  style="margin-bottom: 10px"  v-model="correspondence.pochta_id" disabled></vs-textarea>

                    <div class="centerx">
                        <vs-tooltip text="Статус почтового отправления" position="top" >
                            <h6 class="h6Blue mb-1">Статус почтового отправления</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-full"  style="margin-bottom: 10px"  v-model="correspondence.pochta_status" disabled></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Mail ID" position="top" >
                            <h6 class="h6Blue mb-1">Mail ID</h6>
                        </vs-tooltip>
                    </div>
                    <vs-textarea class="w-full"  style="margin-bottom: 10px"  v-model="correspondence.pochta_mailId" disabled></vs-textarea>
                </div>
            </div>
            <fieldset class="f mb-4">
                <legend class="l">  Поиск должника</legend>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/6 w-full mb-2" >
                        <div class="centerx">
                            <vs-tooltip text="ФИО должника" position="top" >
                                <h6 class="h6Blue mb-1">ФИО</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px;" v-model="dc.fio" @keyup.enter="FindFIO"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full mb-2">
                        <div class="centerx">
                            <vs-tooltip text="Номер договора" position="top" >
                                <h6 class="h6Blue mb-1">Номер договора</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px" v-model="dc.number_dog" @keyup.enter="FindNumberDog"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full mb-2">
                        <div class="centerx">
                            <vs-tooltip text="ID кредита" position="top" >
                                <h6 class="h6Blue mb-1">ID кредита</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px" v-model="dc.id" @keyup.enter="FindID"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full mb-2" >
                        <div class="centerx">
                            <vs-tooltip text="Номер ИП" position="top" >
                                <h6 class="h6Blue mb-1">Номер ИП</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px;" v-model="dc.number_ip" @keyup.enter="FindNumberIP"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full mb-2" >
                        <div class="centerx">
                            <vs-tooltip text="Выберите взыскателя" position="top" >
                                <h6 class="h6Blue mb-1">Взыскатель</h6>
                            </vs-tooltip>
                        </div>
                        <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="RecoverArrList"   v-model="dc.rec"  ></v-select>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full mb-2">
                        <span style="max-width: 50px;margin-top: 30px">
                            <img src="/loading.gif" v-if="CorrespondenceFindFlag" style="max-width: 40px; margin-top: 5px;">
                        </span>
                    </div>
                </div>

                <ag-grid-vue v-if="debtorTableVisible"
                        ref="agGridTable"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="CorrespondenceDebtorFind"
                        rowSelection="multiple"
                        colResizeDefault="shift"
                        :animateRows="true"
                        :floatingFilter="true"
                        :suppressPaginationPanel="true"
                        @rowDoubleClicked="onrowDoubleClicked"
                        @grid-size-changed="onGridSizeChanged"
                        @column-resized="onColumnResized"
                        :enableRtl="$vs.rtl"
                        :enableBrowserTooltips="true"
                        :overlayNoRowsTemplate="'Нет записей'">
                </ag-grid-vue>

            </fieldset>
            <template v-if="debtorVisible">
            <fieldset class="f">
                <legend class="l">  Должник</legend>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/6 w-full mb-2">
                        <div class="centerx">
                            <vs-tooltip text="ФИО должника" position="top" >
                                <h6 class="h6Blue mb-1">ФИО</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px;" v-model="correspondence.fio" disabled></vs-input>
                    </div>

                    <div class="vx-col sm:w-1/6 w-full mb-2">
                        <div class="centerx">
                            <vs-tooltip text="Номер договора" position="top" >
                                <h6 class="h6Blue mb-1">Номер договора</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px"  v-model="correspondence.number_dog" disabled></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full mb-2">
                        <div class="centerx">
                            <vs-tooltip text="ID кредита" position="top" >
                                <h6 class="h6Blue mb-1">ID кредита</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px"  v-model="correspondence.id_credit" disabled></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full mb-2">
                        <div class="centerx">
                            <vs-tooltip text="Статус" position="top" >
                                <h6 class="h6Blue mb-1">Статус</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px"  v-model="correspondence.status" disabled></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full mb-2">
                        <div class="centerx">
                            <vs-tooltip text="Выберите взыскателя" position="top" >
                                <h6 class="h6Blue mb-1">Взыскатель</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full" style="margin-bottom: 10px"  v-model="correspondence.recover" disabled></vs-input>
                    </div>
                    
                </div>
            </fieldset>
            </template>

            <div class="vx-row" style="margin-top: 20px;align-items: right">
                <vs-button color="primary"  class="pull-right mr-4 ml-4" type="filled"  @click="close">Закрыть</vs-button>
                <vs-button color="success" class="pull-right mr-4" type="filled" @click="save">Сохранить</vs-button>
                <div>
                    <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить документ и сохранить</vs-button>
                    <vs-input id="fileUpload1" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,correspondence)" style="display: none"/>
                </div>

            </div>

        </div>
    </vx-card>
</template>

<script>
    import VueSimpleSuggest from 'vue-simple-suggest'
    import { AgGridVue } from 'ag-grid-vue'
    import 'vue-simple-suggest/dist/styles.css' // Optional CSS
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    export default {
        components: {
          VueSimpleSuggest,AgGridVue
        },
        data () {
            return {
                debtorVisible:false,
                debtorTableVisible:false,
                correspondence:{
                  id:'new',
                  reg_date:'',
                  doc_date:'',
                  reg_number:'',
                  id_vid:0,
                  id_group:0,
                  id_type:0,
                  sender:'',
                  recipient:'',
                  address_recipient:'',
                  fio:'',
                  birthday:'',
                  number_dog:'',
                  id_credit:0,
                  status:'',
                  recover:'',
                  recover1:'',
                  filename:'',
                  shpi:''
                },
                dc:{
                  fio:'',
                  rec:0,
                  number_ip:'',
                  number_dog:'',
                  id:'',
                    recover:{
                        id:0,
                        num:0,
                        name:'',
                        cession:0,
                        typeRecover:0
                    },

                },
                disableCor:{
                    id_group:true,
                    id_type:true
                },
                gridApi: null,
                gridOptions: {

                    alwaysShowVerticalScroll:true
                },
                defaultColDef: {
                    /* flex: 1,
                     wrapText: true,
                     autoHeight: true,
                     sortable: true,
                     resizable: true,*/

                    sortable: true,
                    resizable: true,
                    suppressMenu: true

                },

                columnDefs: [
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status',
                        field: 'status',
                        filter: true,
                        width: 200,

                    },
                    {
                        headerName: 'ID кредита',
                        field: 'id',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'ФИО',
                        field: 'fio',
                        filter: true,
                        width: 250,

                    },
                    {
                        headerName: 'Дата рождения',
                        field: 'birthdate',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'Номер договора',
                        field: 'number_dog',
                        filter: true,
                        width: 150,

                    },
                    {
                        headerName: 'Взыскатель',
                        field: 'recover',
                        filter: true,
                        width: 150,

                    },
                    {
                        headerName: 'Цедент',
                        field: 'recover1',
                        filter: true,
                        width: 150,

                    },
                ],

            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api
            this.getRecoverArrList()
            this.getData();
            this.getDataOrganizationArr()




        },

        computed: {
            ...mapGetters([
                'PaymentsTypeArr','DocumentsVidList','DocumentsGroupList','DocumentsTypeList','DocumentsGroupList','CorrespondenceDebtorFind',
                'CorrespondenceFindFlag','RecoverArrList', 'OrganizationArrName', 'OrganizationArrAddress'
            ]),
            fio(){
                return this.data.name_family+' '+this.data.name+' '+this.data.name_patronymic
            }
        },
        methods: {
            chooseFiles1: function() {
                document.getElementById("fileUpload1").click()
            },

            saveDocument(evt,data){
                const formData = new FormData()
                formData.append('document', evt.target.files[0])
                formData.append('filename',evt.target.files[0].name)
                formData.append('id', this.$route.params.id)
                formData.append('correspondence',JSON.stringify(this.correspondence))
                formData.append('data', JSON.stringify(data))
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.post('/correspondence/post-document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    if (response.data.result) {
                        this.correspondence.filename=evt.target.files[0].name
                        if(response.data.id!=this.$route.params.id){
                            this.correspondence.id=response.data.id

                        }
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/Correspondence-Journal/')

                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.data.error,
                            color: 'danger',
                            position: 'top-center'
                        })
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
            SetDebtor(id){
                for(let i=0;i<this.CorrespondenceDebtorFind.length;i++){
                    if(this.CorrespondenceDebtorFind[i].id===id){
                        this.correspondence.fio=this.CorrespondenceDebtorFind[i].fio
                        this.correspondence.number_dog=this.CorrespondenceDebtorFind[i].number_dog
                        this.correspondence.id_credit=this.CorrespondenceDebtorFind[i].id
                        this.correspondence.status=this.CorrespondenceDebtorFind[i].status
                        this.correspondence.recover=this.CorrespondenceDebtorFind[i].recover
                        this.correspondence.recover1=this.CorrespondenceDebtorFind[i].recover1

                    }
                }
            },

            FindNumberIP(){
                this.dc.id=''
                this.dc.fio=''
                this.dc.number_dog=''
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id===this.dc.rec){
                        this.dc.recover.id_recover=this.RecoverArrList[i].num
                        this.dc.recover.cession=this.RecoverArrList[i].cession
                        this.dc.recover.typeRecover=this.RecoverArrList[i].typeRecover
                        this.findDebtorCreditForCorrespondence({number_ip:this.dc.number_ip,recover:this.dc.recover}).then((res)=>{
                            if(res.result){
                                if(res.count===1){
                                    this.SetDebtor(res.data[0].id)
                                    this.debtorVisible=true
                                }
                                if(res.count===0)this.$vs.notify({
                                    title: 'Ошибка',
                                    text: 'Должник не найден',
                                    color: 'danger',
                                    position: 'top-center'
                                })
                                if (res.count>1)this.debtorTableVisible=true
                            }
                        })
                        break
                    }

                }
            },

            FindID(){
                this.dc.fio=''
                this.dc.number_ip=''
                this.dc.number_dog=''
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id===this.dc.rec){
                        this.dc.recover.id_recover=this.RecoverArrList[i].num
                        this.dc.recover.cession=this.RecoverArrList[i].cession
                        this.dc.recover.typeRecover=this.RecoverArrList[i].typeRecover
                        this.findDebtorCreditForCorrespondence({id:this.dc.id,recover:this.dc.recover}).then((res)=>{
                            if(res.result){
                                if(res.count===1){
                                    this.SetDebtor(res.data[0].id)
                                    this.debtorVisible=true
                                }
                                if(res.count===0)this.$vs.notify({
                                    title: 'Ошибка',
                                    text: 'Должник не найден',
                                    color: 'danger',
                                    position: 'top-center'
                                })
                                if (res.count>1)this.debtorTableVisible=true
                            }
                        })
                        break
                    }

                }
            },

            FindNumberDog(){
                this.dc.id=''
                this.dc.fio=''
                this.dc.number_ip=''
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id===this.dc.rec){
                        this.dc.recover.id_recover=this.RecoverArrList[i].num
                        this.dc.recover.cession=this.RecoverArrList[i].cession
                        this.dc.recover.typeRecover=this.RecoverArrList[i].typeRecover
                        this.findDebtorCreditForCorrespondence({number_dog:this.dc.number_dog,recover:this.dc.recover}).then((res)=>{
                            if(res.result){
                                if(res.count===1){
                                    this.SetDebtor(res.data[0].id)
                                    this.debtorVisible=true
                                }
                                if(res.count===0)this.$vs.notify({
                                    title: 'Ошибка',
                                    text: 'Должник не найден',
                                    color: 'danger',
                                    position: 'top-center'
                                })
                                if (res.count>1)this.debtorTableVisible=true
                            }
                        })
                        break
                    }

                }
            },

            FindFIO(){
                this.dc.id=''
                this.dc.number_ip=''
                this.dc.number_dog=''
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id===this.dc.rec){
                        this.dc.recover.id_recover=this.RecoverArrList[i].num
                        this.dc.recover.cession=this.RecoverArrList[i].cession
                        this.dc.recover.typeRecover=this.RecoverArrList[i].typeRecover
                        this.findDebtorCreditForCorrespondence({fio:this.dc.fio,recover:this.dc.recover}).then((res)=>{
                            if(res.result){
                                if(res.count===1){
                                    this.SetDebtor(res.data[0].id)
                                    this.debtorVisible=true
                                }
                                if(res.count===0)this.$vs.notify({
                                    title: 'Ошибка',
                                    text: 'Должник не найден',
                                    color: 'danger',
                                    position: 'top-center'
                                })
                                if (res.count>1)this.debtorTableVisible=true
                            }
                        })
                        break
                    }

                }


            },
            getData(){
                this.correspondence.id=this.$route.params.id
                if(this.$route.params.id!=='new')
                    this.getCorrespondenceOnce(this.$route.params.id).then((response)=>{
                        if(response.result)this.correspondence=response.data
                        this.getDocumentsVidList()
                        this.getDocumentsGroupList(this.correspondence.id_vid)
                        this.getDocumentsTypeList({id_vid:this.correspondence.id_vid,id_group:this.correspondence.id_group})
                        this.findDebtorCreditForCorrespondence({id:this.correspondence.id,recover:this.dc.recover}).then((res)=>{
                            if(res.result){
                                if(res.count===1){
                                    this.SetDebtor(res.data[0].id)
                                    this.debtorVisible=true
                                }
                                if(res.count===0)this.$vs.notify({
                                    title: 'Ошибка',
                                    text: 'Должник не найден',
                                    color: 'danger',
                                    position: 'top-center'
                                })
                                if (res.count>1)this.debtorTableVisible=true
                            }
                        })
                    })
                else{
                    this.getDocumentsVidList()
                    this.getDocumentsGroupList(this.correspondence.id_vid)
                    this.getDocumentsTypeList({id_vid:this.correspondence.id_vid,id_group:this.correspondence.id_group})
                    let today=new Date()
                    this.correspondence.reg_date=today.getFullYear()+'-'+String(today.getMonth() + 1).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0')
                }

            },

            SetVid(){
                if(this.correspondence.id_vid==null)this.correspondence.id_vid=0
                if(this.correspondence.id_vid==0){
                    this.correspondence.id_group=0
                    this.correspondence.id_type=0
                    this.disableCor.id_group=true
                    this.disableCor.id_type=true
                }
                this.getDocumentsGroupList(this.correspondence.id_vid).then((res)=>{
                    this.disableCor.id_group=!(res&&this.correspondence.id_vid!==0)
              });

            },
            SetGroup(){
                if(this.correspondence.id_group==null)this.correspondence.id_group=0
                if(this.correspondence.id_group==0){
                    this.correspondence.id_type=0
                    this.disableCor.id_type=true
                }
                this.getDocumentsTypeList({id_vid:this.correspondence.id_vid,id_group:this.correspondence.id_group}).then((res)=>{
                    this.disableCor.id_type=!(res&&this.correspondence.id_group!==0)
                });

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
            onrowDoubleClicked(event){
                this.SetDebtor(event.data.id)

               this.debtorTableVisible=false
               this.debtorVisible=true
                // this.$router.push('/Correspondence/'+event.data.id)
            },
            close(){
                this.$router.back()
            },
            ...mapActions([
                'saveRecoverer','saveRecovererDocument','getDocumentsTypeList','getDocumentsVidList','getDocumentsGroupList','getCorrespondenceOnce',
                'findDebtorCreditForCorrespondence','getRecoverArrList','saveCorrespondence','getDataOrganizationArr'
            ]),
            
            save(){
               this.saveCorrespondence(this.correspondence).then((res)=>{
                   if(res.result)  this.$vs.notify({
                                                   title: 'Успешно',
                                                   text: 'Успешно!!!',
                                                   color: 'success',
                                                   position: 'top-center'
                                               })
                   else {
                       this.$vs.notify({
                                                   title: 'Ошибка',
                                                   text: res.error,
                                                   color: 'danger',
                                                   position: 'top-center'
                                               })}
               }).catch(()=>{this.$vs.notify({
                                               title: 'Ошибка',
                                               text: 'Ошибка !!!',
                                               color: 'danger',
                                               position: 'top-center'
                                           })})


            },


        },
    }
</script>
