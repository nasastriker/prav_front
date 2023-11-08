<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="vx-row" >
                <div class="vx-col 1">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrs }} of {{ TotalReestrs }}</span>
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
                </div>
                <div class="vx-col 2" style="    min-width: 250px;">
                </div>
                <div class="vx-col 1" >

                </div>
                <div class="vx-col 2" >
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
             <!--       <div class="vx-row" >
                        <import-excel :onSuccess="loadDataInTable" url="реестр.xlsx"/>
                        <span style="max-width: 40px;">
                            <img src="loading.gif" v-if="CreditsFindFlag" style="max-width: 40px; margin-top: 5px;">
                            </span>
                    </div> -->
                </div>
            </div>
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
            :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
            <vs-popup style="min-height: 500px;" classContent="popup-example" title="Стратегии: " :active.sync="popupActive2">
                <b>Реестр: </b> <span>{{ActReestrName}}</span>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StrategysArr"  v-model="ActReestrIdStrategy" @input="setStrategyServer" ></v-select>
                <div style="text-align: end"><vs-button color="primary" class="pull-right" type="filled" style="margin-top: 20px;"  @click="setStrategyServer">Сохранить</vs-button></div>
            </vs-popup>

        </div>
    </div>

</template>

<script>
    import ImportExcel from '../Reestr/ImportExcel.vue'
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/OpenReestr.vue'
    import OpenReestrRec from '../Reestr/Render/OpenReestrRec.vue'
    import OpenReestrRecPer from '../Reestr/Render/OpenReestrRecPer.vue'
    import OpenReestrRecName from '../Reestr/Render/OpenReestrRecName.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import JsonViewer from 'vue-json-viewer'
    export default {
        components: {
            AgGridVue,
            JsonViewer,
            vSelect,
            OpenReestrRecName,
            Open,
            OpenReestrRecPer,
            OpenReestrRec,
            VueCsvImport,
            ImportExcel,
        },
        props:['id'],
        data () {
            return {

                // Filter Options
                data:[],
                ActReestrName:'',
                ActReestr:0,
                ActReestrIdStrategy:0,
                CreditsFindFlag:false,
                popupActive2:false,
                searchQuery: '',
                csv:[],
                rec_id:'Все',
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open',
                        cellRendererParams: {
                            addStrategy: this.setStrategy.bind(this)
                        }
                    },
                   {
                        headerName: 'Имя',
                        field: 'name',
                        filter: true,
                        width: 300,
                    },
                    {
                        headerName: 'Кол.',
                        field: 'count',
                        filter: true,
                        width: 50,
                    },
                    {
                        headerName: 'id_strategy',
                        field: 'id_strategy',
                        filter: true,
                        width: 120,
                    },
                    {
                        headerName: 'Статус',
                        field: 'name_status',
                        filter: true,
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
                        width: 250,
                    },

                ],
                components: {
                    Open,OpenReestrRec,OpenReestrRecPer,OpenReestrRecName
                }
            }
        },

        computed: {
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
                'ReestrsArr','TotalReestrs','ReestrsArrName','ReestrsArrShow','User','RecoverersArr','StrategysArr'

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
            setStrategyServer(){
                this.popupActive2=false
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reestr.index"), {
                    params: {
                        method: 'setStrategy',
                        param: {
                            id:this.ActReestr,
                            id_strategy:this.ActReestrIdStrategy,

                        }

                    }
                }).then((response) => {
                    this.getDataReestrsById(this.id)
                    this.ActReest=0;
                    this.ActReestrName=''
                    this.ActReestrIdStrategy=0
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.$vs.notify({ title:'Успешно', text: 'Сохранено !!!', color: 'success', position: 'top-center' })
                    }else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.ActReest=0;
                    this.ActReestrName=''
                    this.ActReestrIdStrategy=0
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
            setStrategy(param){
                this.ActReestr=param
                for (let i=0;i<this.ReestrsArrShow.length;i++){
                    if(param==this.ReestrsArrShow[i].id){
                        this.ActReestrName=this.ReestrsArrShow[i].name
                        this.ActReestrIdStrategy=this.ReestrsArrShow[i].id_strategy

                    }

                }


                this.popupActive2=true;


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

            onrowDoubleClicked(event){
                this.$router.push('/reestr/'+event.data.id)
            },


            ...mapActions([
                'getDataReestrsById','setDataUser','getDataStrategys'
            ]),
            ...mapMutations([
                'hideReestr'
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
                    this.getDataReestrsById(this.id)
                }
            }

        },
        mounted () {
            this.getDataStrategys()
            this.gridApi = this.gridOptions.api
            this.getDataReestrsById(this.id)
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
