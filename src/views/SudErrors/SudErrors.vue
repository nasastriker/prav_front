<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col mb-3">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium ml-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalSudErrors - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalSudErrors }} of {{ TotalSudErrors }}</span>
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
                        <vs-input type="date" v-model="sudErrors.date" @change="changeDate" style="margin-left: 10px"></vs-input>
                        <div class="vx-col 2" style="    min-width: 250px;">
                            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="RecoverArrList"  v-model="sudErrors.num_recover" @input="setRecover" ></v-select>

                        </div>
                    </div>

                </div>

                <div class="vx-col mb-3" style="text-align: end;">
                    <!--   <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." /> -->

                    <vs-button color="primary" class="pull-right" type="filled"  @click="refreshSudErrors">Обновить</vs-button>
                    <vs-button style="margin-left: 10px;" color="success" class="pull-right" type="filled"
                               @click="genXls">Выгрузить в Excel</vs-button>
                    <vs-button style="margin-left: 10px;" color="primary" class="pull-left" type="filled"
                               @click="showFilesPopup">Просмотреть выгрузки
                    </vs-button>

                </div>


            </div>
            <div class="out-main">
            <ag-grid-vue
                ref="agGridTable"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="SudErrorsArr"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                :enableBrowserTooltips="true"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                @grid-size-changed="onGridSizeChanged"
                @rowDoubleClicked="onrowDoubleClicked"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :overlayNoRowsTemplate="'Нет записей'"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>
            
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="SudErrorsLoadingFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>


            <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />


            <vs-popup classContent="popup-example" title="Скачать файлы выгрузок" :active.sync="showFileListSudErrors">
                <div v-if="FilesSudErrorsArr.length == 0" style="display: flex">
                    <div>Нет выгруженных файлов</div>
                    <refresh-cw-icon size="1.5x" class="hover:text-primary cursor-pointer" style="margin-left: auto" @click="refreshFiles"></refresh-cw-icon>
                </div>
                <div v-else>
                    <div style="margin-bottom: 10px;display: flex">
                        <div>Всего файлов <b>{{ FilesSudErrorsArr.length }}</b></div>
                        <div class="hover:text-primary cursor-pointer" style="margin-left: auto;margin-right: 15px;color: red" @click="deleteFiles">Удалить все файлы выгрузок</div>
                        <refresh-cw-icon size="1.5x" class="hover:text-primary cursor-pointer" @click="refreshFiles"></refresh-cw-icon>
                    </div>
                    <template v-for="(item,index) in FilesSudErrorsArr">
                        <div style="margin-left: 10px;margin-right: 10px;color: red" @click="downloadDocument(item)" class="hover:text-primary cursor-pointer">
                            {{ item }}
                        </div>
                        <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                    </template>
                </div>
            </vs-popup>

        </div>
    </div>

</template>

<script>
import { VueCsvImport } from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import { RefreshCwIcon } from 'vue-feather-icons'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import r from '../../route';
import axios from '../../axios'
export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
        RefreshCwIcon
    },
    data () {
        return {
            rec_id: 0,
            showFileListSudErrors: false,
            searchQuery: '',
            csv:[],
            sudErrors:{
                id_recover:0,
                num_recover:0,
                cession:0,
                typeRecover:0,
                date:''
            },
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
                    headerName: 'ID кредита',
                    headerTooltip: 'ID кредита',
                    tooltipField: 'id_credit',
                    field: 'id_credit',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Заемщик',
                    field: 'debtor_fio',
                    headerTooltip: 'Заемщик',
                    tooltipField: 'debtor_fio',
                    filter: true,
                    width: 200,
                },

                {
                    headerName: 'Дата рождения',
                    headerTooltip: 'Дата рождения',
                    tooltipField: 'debtor_dr',
                    field: 'debtor_dr',
                    filter: true,
                    width: 100,
                },

                {
                    headerName: 'Номер договора',
                    field: 'number_dog',
                    headerTooltip: 'Номер договора',
                    tooltipField: 'number_dog',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Дата договора',
                    headerTooltip: 'Дата договора',
                    tooltipField: 'date_dog',
                    field: 'date_dog',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Текст ошибки',
                    field: 'text',
                    headerTooltip: 'Текст ошибки',
                    tooltipField: 'text',
                    filter: true,
                    width: 500,
                },
                {
                    headerName: 'Взыскатель',
                    field: 'recover',
                    headerTooltip: 'Взыскатель',
                    tooltipField: 'recover',
                    filter: true,
                    width: 200,
                },
                {
                    headerName: 'Пред Взыскатель',
                    headerTooltip: 'Предыдущий взыскатель',
                    tooltipField: 'recover1',
                    field: 'recover1',
                    filter: true,
                    width: 200,
                },
                {
                    headerName: 'Дата ошибки',
                    headerTooltip: 'Дата ошибки',
                    tooltipField: 'error_date',
                    field: 'error_date',
                    filter: true,
                    width: 100,
                },
            ],
        }
    },
    computed: {
        totalPages () {
            if (this.gridApi)
                return Math.ceil(this.TotalSudErrors/this.paginationPageSize)
            else return 0
        },
        paginationPageSize () {
            if(typeof this.User!='undefined'){
                if(this.User.pag!=null){
                    if(typeof this.User.pag!='undefined'){
                        if(typeof this.User.pag.sudErrorsLimit!='undefined') {
                            return this.User.pag.sudErrorsLimit
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
            'SudErrorsArr','TotalSudErrors','User','SudErrorsLoadingFlag','SudErrorsData','FilesSudErrorsArr','RecoverersArr','RecoverArrList'
        ]),
        currentPage: {
            get () {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set (val) {
                this.setSudErrorsOffset(val-1);
                this.getDataSudErrors();
                this.gridApi.paginationGoToPage(val - 1)
            }
        },
    },
    methods: {
        setRecover(index){
            if(this.sudErrors.num_recover==null){
                this.sudErrors.num_recover=0;
            }
            for (let i=0;i<this.RecoverArrList.length;i++){

                if(this.RecoverArrList[i].id==this.sudErrors.num_recover){
                    this.sudErrors.id_recover=this.RecoverArrList[i].num
                    this.sudErrors.cession=this.RecoverArrList[i].cession
                    this.sudErrors.typeRecover=this.RecoverArrList[i].typeRecover
                }

            }
            /*
            this.User.pag.sudErrorRecover=this.rec_id
            for (let i=0;i<this.RecoverersArr.length;i++){

                if(this.RecoverersArr[i].id==this.rec_id){

                    this.User.pag.sudErrorCession=this.RecoverersArr[i].cession
                }

            }
*/

            this.setSudErrors(this.sudErrors)
            this.setDataUser().then((response) => {
                this.getDataSudErrors()
            })



        },
        downloadDocument(val){
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("sudErrors.index"), {
                responseType: 'arraybuffer',
                params: {
                    method: 'getFileSudError',
                    param:val
                }
            }).then((response) => {
                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xlsx;charset=UTF-8;' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', val);
                document.body.appendChild(link);
                link.click();
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
        deleteFiles(){
            this.deleteFileListSudErrors().then((response) => {
                if (!response){
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка при удалении',
                        color: 'danger',
                        position: 'top-center'
                    })
                }
                this.refreshFiles();
            })
        },
        refreshFiles(){
            this.getFileListSudErrors();
        },
        showFilesPopup(){
            this.getFileListSudErrors();
            this.showFileListSudErrors = true;
        },
        genXls(){
            this.genSudErrorsXls().then((response_xls) => {
                if (response_xls.result){
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Выгрузка запущена',
                        color: 'success',
                        position: 'top-center'
                    })
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Не удалось запустить выгрузку',
                        color: 'danger',
                        position: 'top-center'
                    })
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
        onrowDoubleClicked(event){
            this.$router.push('/debtors/'+event.data.id_credit)
        },
        refreshSudErrors(){
            this.getDataSudErrors();
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
        changeDate(){
            if(this.User.pag==null){
                this.User.pag.sudErrors.date=''
            }
            this.setSudErrors(this.sudErrors)
            this.setDataUser().then((response) => {
                this.getDataSudErrors()
            })
        },
        changePag(pag) {
            this.SudErrorsData.pag.limit = pag;
            this.getDataSudErrors()
            // this.setSudErrorsLimit(pag);
            this.gridApi.paginationSetPageSize(pag);
        },
        ...mapMutations([
            'setSudErrorsLimit','setSudErrorsOffset','setSudErrors'
        ]),
        ...mapActions([
            'getDataSudErrors','setDataUser','getDataUser','genSudErrorsXls','getFileListSudErrors','deleteFileListSudErrors','getRecoverArrList',

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
        this.getRecoverArrList()

        this.gridApi = this.gridOptions.api
        this.getDataUser().then((response)=>{
            if(typeof this.User.pag.sudErrors!=='undefinded' || typeof this.User.pag.sudErrors.num_recover!=='undefinded')
                this.sudErrors.num_recover=this.User.pag.sudErrors.num_recover
            else this.rec_id=0
            if(typeof this.User.pag.sudErrors!=='undefinded' || typeof this.User.pag.sudErrors.date!=='undefinded')
                this.sudErrors.date=this.User.pag.sudErrors.date
            else this.sudErrors.date=''
            this.getDataSudErrors();
        });

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
