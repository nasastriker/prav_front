<template>
    <div>
        <div class="vx-row">
            <div class="vx-col w-1/3">
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="cursor-pointer flex items-center justify-between font-medium " style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
                        <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPaymentArr - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPaymentArr }} of {{ TotalPaymentArr }}</span>
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
            <div class="vx-col w-1/3" style="padding-left: 0px;">
                <vs-input type="date" v-model="bankTaskSudDate" @blur="changeDate" @keyup.enter="$event.target.blur()" style="margin-left: 10px" ></vs-input>
            </div>
            <div class="vx-col w-1/3">
              <v-select  class="w-50 mb-4" style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="StatusCode"   v-model="status" @input="changeStatus" ></v-select>
            </div>
        </div>
        <ag-grid-vue
            style="height: 500px"
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="TaskPaymentArr"
            rowSelection="multiple"
            :enableBrowserTooltips="true"
            colResizeDefault="shift"
            :animateRows="true"
            @rowDoubleClicked="onrowDoubleClicked"
            :overlayNoRowsTemplate="'Нет записей'"
            @grid-size-changed="onGridSizeChanged"
            :floatingFilter="false"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl"
            :rowClassRules="rowClassRules">
        </ag-grid-vue>
        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />
        <vs-popup classContent="popup-example" title="Ошибка" :active.sync="popTaskSud">
            <vs-textarea class="w-100" height="600px" v-model="error" > </vs-textarea>
        </vs-popup>
    </div>
</template>

<script>
import {mapActions, mapGetters,mapMutations} from 'vuex'
import {} from 'vue-feather-icons'
import moment from 'moment';
export default {
    components: {
    },

    data() {
        return {
            status:0,

            data:[],
            StatusCode:[
              {
                id: 0,
                name: 'Все',

              },
              {
                id: 1,
                name: 'В очереди',

              },
              {
                id: 2,
                name: 'Формируется',

              },
              {
                id: 3,
                name: 'Выполнено',

              },
            {
              id: 4,
              name: 'Ошибка',

            },
            ],
            bankTaskSudDate:'',
            popTaskSud:false,
            error:'',
            gridApi: null,
            gridOptions: {},
            rowClassRules: null,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs: [
                {
                    headerName: 'Дата',
                    headerTooltip: 'Дата',
                    tooltipField: 'created_at',
                    field: 'created_at',
                    filter: true,
                    width: 70,
                    cellRenderer: params => moment(params.value).format('DD.MM.YYYY')
                },
                {
                    headerName: 'Имя',
                    headerTooltip: 'Имя',
                    field: 'name',
                    tooltipField: 'name',
                    filter: true,
                    width: 130
                },
                {
                    headerName: 'Кол',
                    headerTooltip: 'Количество',
                    tooltipField: 'count',
                    field: 'count',
                    filter: true,
                    width: 50
                },
                {
                    headerName: 'Статус',
                    headerTooltip: 'Статус',
                    field: 'status',
                    filter: true,
                    width: 70,
                    cellRenderer: (data) => {
                      for (let i = 0; i < this.StatusCode.length; i++) {
                        if (this.StatusCode[i].id==data.data.status) {
                          return this.StatusCode[i].name
                        }
                      }

                      return ''
                    }

                },
                {
                    headerName: 'Ошибка',
                    headerTooltip: 'Ошибка',
                    field: 'error',
                    tooltipField: 'error',
                    filter: true,
                    width: 50
                },
                {
                  headerName: 'Id пользователя',
                  headerTooltip: 'Id пользователя',
                  field: 'id_user',
                  tooltipField: 'id_user',
                  filter: true,
                  width: 50
                },

            ],
            components: {

            }
        }
    },
    props: ['taskShow'],
    created() {

    },

    computed: {
        ...mapGetters([
            'TaskPaymentArr','User','TotalPaymentArr'
        ]),
        totalPages () {
            if (this.gridApi)
                return Math.ceil(this.TotalPaymentArr/this.paginationPageSize)
            else return 0
        },
        paginationPageSize () {
            return this.User.pag.taskPaymentHistory.limit
        },

        currentPage: {
            get () {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set (val) {
                this.setQuerytaskPaymentHistoryOffset(val-1)
                this.getTaskPayments(this.User.pag.taskPaymentHistory);
                this.gridApi.paginationGoToPage(val - 1)
            },

        },
        channel(){
            return this.$echo.join("taskSud-channel");
        },

    },
    methods: {
        ...mapActions([
            'getTaskPayments','setDataUser','getDataUser'
        ]),
        ...mapMutations([
            'setQuerytaskPaymentHistoryLimit','setQuerytaskPaymentHistoryOffset',
        ]),
        reload(e){
          if(this.taskShow){
            this.getTaskPayments(this.User.pag.taskPaymentHistory);
          }

        },
        changeStatus(){
          this.User.pag.taskPaymentHistory.bankTaskSudStatus=this.status
          this.setDataUser().then((response) => {
            this.getTaskPayments(this.User.pag.taskPaymentHistory);
          })
        },
        changePag(pag){
            this.User.pag.taskPaymentHistory.limit=pag
            this.setQuerytaskPaymentHistoryLimit(pag);
            this.setDataUser()
            this.getTaskPayments(this.User.pag.taskPaymentHistory);
            this.gridApi.paginationSetPageSize(pag)

        },
        changeDate(){
            this.User.pag.taskPaymentHistory.bankTaskSudDate=this.bankTaskSudDate
            this.setDataUser().then((response) => {
                this.getTaskPayments(this.User.pag.taskPaymentHistory);
            })
        },
        onrowDoubleClicked(event){
            this.error=event.data.error;
            this.popTaskSud=true;
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

    },
    mounted() {
        this.channel.listen(".TaskSud", (e) => this.reload(e));
        this.gridApi = this.gridOptions.api;
        this.getDataUser().then(res=>{
            this.bankTaskSudDate=this.User.pag.taskPaymentHistory.bankTaskSudDate||''
            this.User.pag.taskPaymentHistory.offset=0
            this.getTaskPayments(this.User.pag.taskPaymentHistory);

        })
    }
}

</script>

<style lang="scss">
    .vs-popup--content{
        min-height: 500px!important;
    }
    .dropdown-button-container {
        display: flex;
        align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
    }

</style>
