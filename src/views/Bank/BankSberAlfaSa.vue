<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col mb-2">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium ml-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchBankSas - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchBankSas }} of {{ TotalArchBankSas }}</span>
                                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>
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
                        <vs-dropdown vs-trigger-click class="cursor-pointer" style="width: 200px;">
                            <div class="cursor-pointer flex items-center justify-between font-medium ml-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">
                                 <template v-if="User.pag.bankStatusSa=='Все'">Все</template>
                                <template v-if="User.pag.bankStatusSa=='sber'">Сбер</template>
                                <template v-if="User.pag.bankStatusSa=='alfa'">Альфа</template>
                                <template v-if="User.pag.bankStatusSa=='sovcom'">Совкомбанк</template>
                                <template v-if="User.pag.bankStatusSa=='vtb'">Втб</template>
                                <template v-if="User.pag.bankStatusSa=='bfko'">БФКО</template>
                                <template v-if="User.pag.bankStatusSa=='pochta_bank'">ПочтаБанк</template>
                                <template v-if="User.pag.bankStatusSa=='uralsib'">УралСиб</template>
                                <template v-if="User.pag.bankStatusSa=='yoomoney'">ЮМани</template>
                                 <template v-if="User.pag.bankStatusSa=='qiwi'">Qiwi</template>
                                <template v-if="User.pag.bankStatusSa=='rshb'">Россельхозбанк</template>
                            </span>
                                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>

                            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                            <vs-dropdown-menu>
                                <vs-dropdown-item @click="showBank('Все')">
                                    <span>Все</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('sber')">
                                    <span>Сбер</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('alfa')">
                                    <span>Альфа</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('sovcom')">
                                    <span>Совкомбанк</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('vtb')">
                                    <span>Втб</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('bfko')">
                                    <span>БФКО</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('pochta_bank')">
                                    <span>ПочтаБанк</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('uralsib')">
                                    <span>УралСиб</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('yoomoney')">
                                    <span>ЮМани</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('qiwi')">
                                    <span>Qiwi</span>

                                </vs-dropdown-item>
                                <vs-dropdown-item @click="showBank('rshb')">
                                    <span>Россельхозбанк</span>

                                </vs-dropdown-item>

                            </vs-dropdown-menu>
                        </vs-dropdown>
                        <vs-input type="date" v-model="User.pag.bankStatusDateSa" @change="changeDate" style="margin-left: 10px"></vs-input>
                    </div>
                </div>

                <div class="vx-col  mb-2 " style="    text-align: end;">
                    <div class="dropdown-button-container">
                        <vs-button class="btnx" color="danger" type="gradient" @click="showRunJobSoprMonday=!showRunJobSoprMonday">Запустить выгрузку</vs-button>
                        <vs-dropdown>
                            <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                            <vs-dropdown-menu>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px"  @click="refreshBankListSa">Обновить</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                  <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showTaskBank">История</vs-button>
                                </vs-dropdown-item>


                            </vs-dropdown-menu>
                        </vs-dropdown>
                    </div>
                    <!--   <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." /> -->


                </div>


            </div>
            <div class="out-main">
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ArchBankSasArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableRtl="$vs.rtl"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="BankListSaLoadingFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>
          <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="popTaskBank">
            <PopUpTaskJob name="bank" :dataArr="TaskData"></PopUpTaskJob>

          </vs-popup>
          <vs-popup classContent="popup-example" title="Запуск выгрузки" :active.sync="showRunJobSoprMonday">


            <v-select style="margin-top: 15px" class="w-full" :reduce="label => label.id" label="name" :options="allJobArr"
                      v-model="oneJob" ></v-select>
            <vs-checkbox style="margin-top: 15px" v-model="checkAnswer" >Запустить проверку ответов перед выгрузкой</vs-checkbox>
            <div style="text-align: center">
              <vs-button color="primary" @click="runJobSoprMonday()">Запуск</vs-button>
            </div>
          </vs-popup>
          <vs-popup classContent="popup-example" title="Удаление:" :active.sync="showDelete">
              <DeleteFile @close="closePop" :AnswerFileName="AnswerFileName" :AnsCreditsArr="AnsCreditsArr" :statusOld="statusOld" :TotalRecordsAns="TotalRecordsAns"></DeleteFile>

          </vs-popup>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/OpenSa.vue'
    import DeleteFile from '../DeleteFile/DeleteFile'
    import Name from './Render/Name.vue'
    import { mapActions,mapGetters } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import OpenStatusQuest from './Render/OpenStatusQuest.vue'

    import r from '../../route';
    import axios from '../../axios'
    import PopUpTaskJob from '../RenderComponent/PopUpTaskJob.vue'
    export default {
        components: {
            Open,
          PopUpTaskJob,
            Name,
          DeleteFile,
            OpenStatus,
            OpenStatusQuest,
            VueCsvImport,
        },
        data () {
            return {
                searchQuery: '',
                showRunJobSoprMonday:false,
                csv:[],
                AnswerFileName:'',
                AnsCreditsArr: '',
                TotalRecordsAns:0,
                statusOld:0,
                showDelete:false,
                allJobArr:[
                  {
                    id:0,
                    name:'Все'
                  }
                ],
                popTaskBank:false,
                oneJob: 0,
                TaskData:[],
                checkAnswer:false,
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
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'arch_name',
                        field: 'arch_name',
                        filter: true,
                        width: 400,
                        cellRendererFramework: 'Name'
                    },
                    {
                        headerName: 'Количество',
                        headerTooltip: 'Количество',
                        tooltipField: 'count_credit',
                        field: 'count_credit',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'date',
                        field: 'date',
                        filter: true,
                        width: 150,
                    },

                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenStatus'
                    },


                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open',
                        cellRendererParams: {
                          delete_func: this.deleteNew.bind(this)
                        }
                    },

                    {
                        headerName: 'Дата создания',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },


                ],

                // Cell Renderer Components
                components: {
                    Open,OpenStatus,OpenStatusQuest,Name
                }
            }
        },

        computed: {
            bankFilter () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.bankStatusSa!='undefined') {
                                return this.User.pag.bankStatusSa
                            }
                            else return {sber:true,alfa:true}
                        }
                        else return {sber:true,alfa:true}
                    }
                    else return {sber:true,alfa:true}
                }
                else return {sber:true,alfa:true}

            },
            totalPages () {
                //   console.log(Math.ceil(this.TotalArchBankSas/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalArchBankSas/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.bankArchSa!='undefined') {
                                return this.User.pag.bankArchSa
                            }
                            else return 100
                        }
                        else return 100
                    }
                    else return 100
                }
                else return 100

            },
            ...mapGetters([
                'ArchBankSasArr','TotalArchBankSas','User','BankListSaLoadingFlag'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
          closePop(){
            this.showDelete=false
            this.getDataArchBankSas();
          },
          deleteNew(e){

            axios.get(r("bank.index"), {
              params: {
                method: 'getSaCredits',
                param:e.value

              }
            }).then((response) => {
              if(response.data.result){
                this.showDelete=true
                this.AnswerFileName=response.data.file
                this.AnsCreditsArr=response.data.data
                this.TotalRecordsAns=response.data.total
                this.statusOld=response.data.statusOld
              }
            })
          },
          showTaskBank(){
            //  this.getTaskFns()
            this.getTaskJobStatusFromTaskJobsStatus('bank').then((response)=>{
              if(response.result){
                this.TaskData=response.data
              }
              else this.TaskData=[]
            })

            this.popTaskBank=true
          },
            runJobSoprMonday(){
              this.showRunJobSoprMonday=false;
                axios.get(r("archBankSa.index"), {
                    params: {
                        method: 'startJobSoprMonday',
                        param: {
                          oneJob: this.oneJob,
                          checkAnswer: this.checkAnswer,
                        }
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Выгрузка запущена',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                })


            },
            refreshBankListSa(){
                this.getDataArchBankSas();
            },
            changeDate(){
                let Data = new Date();
                if(this.User.pag==null){
                    this.User.pag={
                        bankStatusSa:'Все',
                        bankStatusDateSa:'',
                    }
                }



                this.setDataUser().then((response) => {
                    this.getDataArchBankSas()
                })
            },
            downloadArch(){

            },
            showBank(data){
                let Data = new Date();
                if(this.User.pag==null){
                    this.User.pag={
                        bankStatusSa:'Все',
                        bankStatusDateSa:'',
                    }
                }



                this.User.pag.bankStatusSa=data;
                this.setDataUser().then((response) => {
                    this.getDataArchBankSas()
                })
            },


            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        bankArchSa:10
                    }
                }
                this.User.pag.bankArchSa=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },
            getData(){
              axios.get(r("archBankSa.index"), {
                params: {
                  method: 'getJobs',
                  param: ''

                }
              }).then((response) => {
                if (response.data.result){
                    this.allJobArr=response.data.data
                }

              })
            },
            onrowDoubleClicked(event){

                axios.get(r("archBankSa.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:event.data.id


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.data.arch_name);
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchBankSas();


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
            ...mapActions([
                'getDataArchBankSas','setDataUser','getTaskJobStatusFromTaskJobsStatus'
            ]),
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.getData();
            this.getDataArchBankSas();
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

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.7s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .load-bar{
        display: inline-block;
        max-width: 100px;
    }

    .outer-div
    {
        padding: 20%;
        text-align: center;
        z-index : 10;
        position : absolute;
        top : 0;
        left : 0;
        width: 100%;
        height: 100%;
        background-color: hsla(200, 80%, 90%, 0.3);
    }

    .out-main{
        position : relative;
    }
</style>
