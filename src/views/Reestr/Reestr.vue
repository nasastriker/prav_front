<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="vx-row" >
                <div class="vx-col 1">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium ml-1 mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrs }} of {{ TotalReestrs }}</span>
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

                <div class="vx-col 3" style="    min-width: 250px;">
                    <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="optArr"  v-model="rec_id" @input="setRecover" ></v-select>
                </div>
                <div class="vx-col 2" >
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                </div>
                <div class="vx-col 1" >
                    <div class="vx-row" >
                        <ImportFile @onsuc="setRecover"/>
                        <span style="max-width: 40px;">
                            <img src="loading.gif" v-if="CreditsFindFlag" style="max-width: 40px; margin-top: 5px;">
                        </span>
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
                    :rowData="ReestrsArrShow"
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
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
            <vs-popup style="min-height: 500px;" classContent="popup-example" title="Банки " :active.sync="popupActive2">


                <json-viewer :value="data"></json-viewer>
            </vs-popup>

        </div>
    </div>

</template>

<script>
    import ImportExcel from './ImportExcel.vue'
    import ImportFile from './ImportFile.vue'
    import Open from './Render/OpenReestr.vue'
    import OpenReestrRec from './Render/OpenReestrRec.vue'
    import OpenReestrRecPer from './Render/OpenReestrRecPer.vue'
    import OpenReestrRecName from './Render/OpenReestrRecName.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import moment from 'moment';
    export default {
        components: {
            OpenReestrRecName,
            Open,
            OpenReestrRecPer,
            OpenReestrRec,
            ImportExcel,
            ImportFile,
        },
        data () {
            return {

                // Filter Options
                data:[],
                CreditsFindFlag:false,
                popupActive2:false,
                searchQuery: '',
                csv:[],
                rec_id:0,
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

//                    {
//                        headerName: 'ID',
//                        field: 'id',
//                        filter: true,
//                        width: 100
//                    },
                    {
                        headerName: 'Взыскатель',
                        field: 'cession',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenReestrRec'
                    },
                    {
                        headerName: 'Цедент',
                        field: 'cession',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenReestrRecPer'
                    },
                    {
                        headerName: 'Договор',
                        field: 'cession',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenReestrRecName'
                    },
                    {
                        headerName: 'Имя',
                        field: 'name',
                        filter: true,
                      tooltipField: 'name',
                        width: 250,
                    },
                    {
                        headerName: 'Количество',
                        field: 'count',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Статус',
                        field: 'name_status',
                        filter: true,
                      tooltipField: 'name_status',
                        width: 150,
                    },
                    {
                        headerName: 'Пользователь',
                        field: 'name_users',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Создан',
                        field: 'created_at',
                        filter: true,
                        width: 100,
                        cellRenderer: params => moment(params.value).format('DD.MM.YYYY')
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open'
                    },
                ],
                components: {
                    Open,OpenReestrRec,OpenReestrRecPer,OpenReestrRecName
                }
            }
        },
        watch: {
            CreditsFindFlag(newQuestion) {
              if (newQuestion) {
                this.gridApi.showLoadingOverlay();
              }else{
                this.gridApi.hideOverlay();
              }
            },

            statusFilter (obj) {
                this.setColumnFilter('status', obj.value)
            },

        },
        computed: {
          optArr(){
            let arr=[];
            arr.push({
              name:'Все',
              id:0
            })
            for (let index = 0; index < this.RecoverersArr.length; ++index) {
              if(this.RecoverersArr[index].cession){
                arr.push({
                  name:'Договор цессии №'+this.RecoverersArr[index].number+' от '+this.RecoverersArr[index].date+' Взыскатель '+this.RecoverersArr[index].name,
                  id:this.RecoverersArr[index].id,
                });
              }
              else{
                arr.push({
                  name:'Взыскатель '+this.RecoverersArr[index].name,
                  id:this.RecoverersArr[index].id,
                })

              }
            }
            for (let index = 0; index < this.OrganizationArr.length; ++index) {
              arr.push({
                name:'Организация '+this.OrganizationArr[index].name,
                id:-this.OrganizationArr[index].id,
              })
            }
            return arr
          },
            channel(){
                return this.$echo.join("reload-channel");
            },
            totalPages () {
             //   console.log(Math.ceil(this.TotalReestrs/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalReestrs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.rabReestr!='undefined') {
                                return this.User.pag.rabReestr
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
                'ReestrsArr','TotalReestrs','ReestrsArrName',
                'ReestrsArrShow','User','RecoverersArr','AtrDebtorCredits','AtrDebtorCreditsTotal','OrganizationArr'

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
            setRecover(){
                if(this.rec_id==null){
                  this.rec_id=0
                }

              this.User.pag.rabReestrId_recover=this.rec_id
                this.setDataUser().then((response) => {
                    this.getDataReestrs({
                        id_recover:this.User.pag.rabReestrId_recover
                    })
                })

            },
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        rabReestr:100
                    }
                }
                this.User.pag.rabReestr=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },
            hideCol(index){

                this.columnDefs[index].hide=!this.columnDefs[index].hide;
                let a=this.columnDefs

                this.columnDefs=JSON.parse(JSON.stringify(a))
                this.saveColumn();
            },
            onrowDoubleClicked(event){
                this.$router.push('/reestr/'+event.data.id)
            },
            exportData(data){

                    this.$vs.loading({color: '#ff8000'})
                    let method='exportData'
                    if(data.status==7||data.status==999){
                        method='exportDataLocal'
                    }

                    axios.post(r("reestr.index"), {
                        params: {
                            method: method,
                            param: data

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.result){
                            if(method=='exportData'){
                                this.getDataReestrs()
                                this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })
                            }
                            else{
                                this.data=response.data.result
                                this.popupActive2=true;
                            }

                            //  this.debtor=response.data.data
                        }else {
                            if(typeof response.data.mess!='undefined'){
                                this.$vs.notify({  title:'Сообщение', text: response.data.mess, color: 'danger', position: 'top-center' })
                            }else{
                                this.$vs.notify({  title:'Сообщение', text: 'Импорт не выполнен !!!', color: 'danger', position: 'top-center' })
                            }

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


            },
            loadDataInTable (data)

    {
                this.$vs.loading({color: '#ff8000'})
                this.header = data.header

                    //   console.log(this.header);
                this.tableData = data.results
                this.sheetName = data.meta.sheetName
                //console.log(this.sheetName);

                this.exportData(data)


                this.$vs.loading.close()

            },
            ...mapActions([
                'getDataReestrs','setDataUser','getDataAtrDebtorCredits','getDataUser','getCalculationList','getDataOrganizationArr'
            ]),
            ...mapMutations([
                'hideReestr',
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
                    this.getDataReestrs()
                }
            }

        },
        mounted () {
            this.getDataOrganizationArr()
            this.getCalculationList()
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));

            this.getDataUser().then(res=>{
                if(typeof this.User.pag.rabReestrId_recover!=='undefined'){
                    this.rec_id=this.User.pag.rabReestrId_recover
                    this.getDataReestrs({
                        id_recover:this.User.pag.rabReestrId_recover
                    })
                }
                else{
                    this.getDataReestrs();
                }
            })

            this.getDataAtrDebtorCredits();
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
