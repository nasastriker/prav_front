<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col w-2/3">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium ml-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchBanks - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchBanks }} of {{ TotalArchBanks }}</span>
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
                      <v-select  class="w-50 " style="margin-bottom: 0px;margin-left: 10px;" :reduce="label => label.alias" label="name" :options="ArchBankReturnSasList"   v-model="User.pag.bankStatus" @input="showBank" ></v-select>
                        <vs-input type="date" v-model="User.pag.bankArch.bankStatusDate" @blur="changeDate" style="margin-left: 10px"></vs-input>
                    </div>
                </div>

                <div class="vx-col w-1/3  mb-2 " style="    text-align: end;">
                    <vs-button color="primary" class="pull-right mr-4" type="filled"  @click="refreshBankList">Обновить</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="downloadArch">Скачать</vs-button>

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
                :rowData="ArchBanksArr"
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
                :overlayNoRowsTemplate="'Нет записей'"
                :enableBrowserTooltips="true">
            </ag-grid-vue>
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="BankListLoadingFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>
            <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />

        </div>
    </div>

</template>

<script>
import Open from './Render/Open.vue'
import Name from './Render/Name.vue'
import { mapActions,mapGetters,mapMutations } from 'vuex'
import OpenStatus from './Render/OpenStatus.vue'
import OpenStatusQuest from './Render/OpenStatusQuest.vue'
import r from '../../route';
import axios from '../../axios'
export default {
    components: {
        Name,
        Open,
        OpenStatus,
        OpenStatusQuest,
    },
    data () {
        return {
            searchQuery: '',
            csv:[],
            // AgGrid
            gridApi: null,
            gridOptions: {

            },
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
                    width: 150,
                    cellRendererFramework: 'Open'
                },
                {
                    headerName: 'Имя',
                    headerTooltip: 'Имя',
                    tooltipField: 'arch_name',
                    field: 'arch_name',
                    filter: true,
                    width: 450,
                    cellRendererFramework: 'Name'
                },
                {
                    headerName: 'Взыскатель',
                    headerTooltip: 'Взыскатель',
                    tooltipField: 'rec_vs',
                    field: 'rec_vs',
                    filter: true,
                    width: 200,
                },
                {
                    headerName: 'Цедент',
                    headerTooltip: 'Цедент',
                    tooltipField: 'rec_name',
                    field: 'rec_name',
                    filter: true,
                    width: 200,
                },
                {
                    headerName: 'Дата',
                    headerTooltip: 'Дата',
                    tooltipField: 'date',
                    field: 'date',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Дата ответа',
                    field: 'date_return',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Статус',
                    field: 'status',
                    filter: true,
                    width: 150,
                    cellRendererFramework: 'OpenStatus'
                },
                {
                    headerName: 'Статус Ответа',
                    field: 'status_send',
                    filter: true,
                    width: 150,
                    cellRendererFramework: 'OpenStatusQuest'
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
                        if(typeof this.User.pag.bankStatus!='undefined') {
                            return this.User.pag.bankStatus
                        }
                        else return 'Все'
                    }
                    else return 'Все'
                }
                else return 'Все'
            }
            else return 'Все'
        },
        totalPages () {
            if (this.gridApi)
                return Math.ceil(this.TotalJudicials/this.paginationPageSize)
            else return 100
        },
        paginationPageSize () {
            return this.User.pag.bankArch.limit
        },

        ...mapGetters([
            'ArchBanksArr','TotalArchBanks','User','BankListLoadingFlag','ArchBankReturnSasList'
        ]),
        currentPage: {
            get () {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set (val) {
                this.setQueryBankArchOffset(val-1)
                this.getDataArchBanks(this.User.pag.bankArch);
                this.gridApi.paginationGoToPage(val - 1)
            }
        },

    },
    methods: {
        refreshBankList(){
            this.getDataArchBanks(this.User.pag.bankArch);
        },
        changeDate(){

            this.setDataUser().then((response) => {
                this.getDataArchBanks(this.User.pag.bankArch)
            })
        },
        showBank(data){
            if(this.User.pag.bankArch==null){
                this.User.pag.bankArch={
                    bankStatus:'Все',
                    bankStatusDate:'',
                    limit:100
                }
            }
            this.User.pag.bankArch.bankStatus=data;
            this.setDataUser().then((response) => {
                this.getDataArchBanks(this.User.pag.bankArch)
            })
        },
        changePag(pag){

            this.User.pag.bankArch.limit=pag
            this.setDataUser()
            this.getDataArchBanks(this.User.pag.bankArch);
            this.gridApi.paginationSetPageSize(pag)
        },

        downloadArch(){
            axios.get(r("archBank.index"), {
                responseType: 'arraybuffer',
                params: {
                    method: 'downloadArch',
                    param:this.User.pag.bankArch
                }
            }).then((response) => {
                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                //   console.log(response.headers);
                let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                //  console.log(filename);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
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
        generate(){
            axios.get(r("archBank.index"), {
                params: {
                    method: 'generateArchBank',
                    param: ''
                }
            }).then((response) => {
                if (response.data.result){
                    this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                    this.getDataArchBanks();
                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    this.getDataArchBanks();
                }
            }).catch(error => {
                this.getDataArchBanks();
                this.$vs.loading.close()
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            })
        },
        onrowDoubleClicked(event){
            let url='download/sber_alfa/'+event.data.arch_name
            axios.get(url, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/xls' })
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = event.data.arch_name
                    link.click()
                    URL.revokeObjectURL(link.href)
                }).catch(console.error)
        },
        ...mapMutations([
            'setQueryBankArchOffset'
        ]),
        ...mapActions([
            'getDataArchBanks','setDataUser','getDataUser','getArchBankReturnSasList'
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
        this.getArchBankReturnSasList()
        this.getDataArchBanks(this.User.pag.bankArch);
    }
}
</script>
<style>
.router-view {
    padding: 1.2rem;
}
.ag-theme-material.w-100.my-4.ag-grid-table {
    /*height: 80vh;*/
}
.ag-theme-material .ag-ltr .ag-cell {
    border-right: 1px solid #bfbfbf!important;
}
.ag-theme-material .ag-row {
    border-color: #bfbfbf!important;
}
</style>

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
