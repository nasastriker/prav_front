<template>

    <div id="page-user-list">
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col mb-2">
                <Back></Back>
            </div>
            <div class="vx-col sm:w-3/5 w-full mb-2">
                <h3 style="margin-bottom: 15px; position: relative; top: -5px;">{{ReestrDosud.name}}</h3>
            </div>
        </div>


        <div class="vx-card p-6">

            <vs-tabs>
                <vs-tab label="Реестр" @click="active=1">
                </vs-tab>
                <vs-tab label="Настройки" @click="active=2">
                </vs-tab>
                <vs-tab label="История" @click="active=3">
                </vs-tab>
            </vs-tabs>

            <template v-if="active=='1'">
                <div class="flex flex-wrap justify-between items-center">

                    <!-- ITEMS PER PAGE -->
                    <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 15px;border: 1px solid #ccc;border-radius: 4px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDebtorDosuds - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDebtorDosuds }} of {{ TotalDebtorDosuds }}</span>
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



                    <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                        <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    </div>
                    <div class="settingsBtnWrapper" style="margin-left: 10px;margin-top: 16px;">
                      <div class="centerx">
                        <vs-tooltip text="Настройки таблицы" position="top" >
                          <vs-button class="btn-drop settingsBtn includeIconOnly"  @click="tableControl=true">
                            <feather-icon icon="SettingsIcon" class="cursor-pointer" style="width: 18px;"></feather-icon>
                          </vs-button>
                        </vs-tooltip>
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
                        :rowData="DebtorDosudsArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        :floatingFilter="false"
                        :pagination="true"
                        :paginationPageSize="paginationPageSize"
                        :suppressPaginationPanel="true"
                        @grid-size-changed="onGridSizeChanged"
                        @column-resized="onColumnResized"
                        @column-visible="onColumnVisible"
                        @selection-changed="onSelectionChanged"
                        :overlayLoadingTemplate="'Идёт загрузка'"
                        :overlayNoRowsTemplate="'Нет записей'"
                        :enableBrowserTooltips="true"
                @rowDoubleClicked="onrowDoubleClicked"
                :enableRtl="$vs.rtl">
                </ag-grid-vue>

                <vs-pagination
                        :total="totalPages"
                        :max="7"
                        v-model="currentPage" />

            </template>

            <template v-if="active=='2'">
                <Sett :id_reestr="ReestrDosud.id"></Sett>
            </template>
            <template v-if="active=='3'">
                <History :id="ReestrDosud.id"></History>
            </template>

        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import Status  from '../../components/StatusDogovor.vue'
    import Back from '../../components/Back.vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import  Sett from './Soft/SettingDosud.vue'
    import  History from './Render/History.vue'
    export default {
        components: {
            Sett,
            History,
            Back,
            Status,
            VueCsvImport,
        },
        data () {
            return {
                tableControl:false,
                popupActive2:false,
                active:1,
                count:0,
                shablon:'',
                action:0,
                status:0,
                type:0,
                searchQuery: '',
                csv:[],
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
                        hide:false,
                        headerTooltip: 'Статус',
                        tooltipField: 'id_status',
                        filter: true,
                        width: 250,
                        cellRendererFramework: 'Status'
                    },
                    {
                        headerName: 'Договор',
                        headerTooltip: 'Договор',
                        hide:false,
                        tooltipField: 'number_dog',
                        field: 'number_dog',
                        filter: true,
                        width: 200,

                    },
                    {
                        headerName: 'Фамилия',
                        headerTooltip: 'Фамилия',
                        hide:false,
                        tooltipField: 'name_family',
                        field: 'name_family',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        hide:false,
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 150,
                    },

                    {
                        headerName: 'Телефон',
                        headerTooltip: 'Телефон',
                        tooltipField: 'phone',
                        hide:false,
                        field: 'phone',
                        filter: true,
                        width: 150,
                    },

                    {
                        headerName: 'Создан',
                        headerTooltip: 'Создан',
                        hide:false,
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },




                ],
                components: {
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
                    return Math.ceil(this.TotalDebtorDosuds/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.debtorReestr!='undefined') {
                                return this.User.pag.debtorReestr
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
                'DebtorDosudsArr','TotalDebtorDosuds','ReestrDosud','TypeArr','SmsArr','VoiceArr','EmailArr','ActionArr','User'
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


            onGridReady() {
              this.gridOptions.api.forEachNode(node=>
                  node.data.id == this.User.pag.debtorReestrSelectIdCredit ? node.setSelected (true) : node.setSelected(false));

            },
            onSelectionChanged() {
              this.User.pag.debtorReestrSelectIdCredit=this.gridApi.getSelectedRows()[0].id
              this.setDataUser()

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
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        debtorReestr:10
                    }
                }
                this.User.pag.debtorReestr=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },
            send(){
                axios.post(r("reestrFunc.index"), {
                    params: {
                        method: 'send',
                        param: {
                            id:this.ReestrDosud.id,
                            type:this.type,
                            shablon:this.shablon,
                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.data.mess,
                            color: 'danger',
                            position: 'top-center'
                        })
                    }



                })
            },
            openFunc(){
                this.popupActive2=true;
            },
            onrowDoubleClicked(event){
                this.$router.push('/credit/'+event.data.id)
            },

            ...mapActions([
                'getDataDebtorDosuds','getDataStatuss', 'getDataTemplSoftsEmail','getTemplSoftsSms','getDataTemplSoftsVoice'
                ,'getTemplSoftsEmail','getTemplSoftsVoice','getTemplSoftsSms','setDataUser'
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
            reload(e){
                if(e.data=='reestr'){
                    this.getDataDebtorDosuds(this.$route.params.id).then((response)=>{
                      this.onGridReady()
                    })
                }
            }

        },
        mounted () {
          if (localStorage.getItem('columnDefsReestrID')) {
            this.columnDefsReestrID = JSON.parse(localStorage.getItem("columnDefsReestrID"));
          }
            this.getTemplSoftsEmail();
            this.getTemplSoftsVoice();
            this.getTemplSoftsSms();

            this.getDataStatuss();
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            this.getDataDebtorDosuds(this.$route.params.id).then((response)=>{
              this.onGridReady()
            })
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
</style>
