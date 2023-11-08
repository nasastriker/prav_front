<template>
    <div >
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row" style="z-index: 222; position: relative;">
                        <div class="mb-4" style="margin-left: 12px;">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 19px;border: 1px solid #ccc;border-radius: 4px;">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDevelopmentnArr - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDevelopmentnArr }} of {{ TotalDevelopmentnArr }}</span>
                                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                                </div>
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
                        <div style="margin-left: 10px; min-width: 200px;">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по типу заявки" position="top" >
                                    <h6 class="h6Blue mb-1">Тип</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="TypeDevelopmentArr"   v-model="filterType" @input="setFilterType" ></v-select>
                        </div>
                        <div style="margin-left: 10px; min-width: 200px;">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по статусу заявки" position="top" >
                                    <h6 class="h6Blue mb-1">Статус</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="StatusDevelopmentArr"   v-model="filterStatus" @input="setFilterStatus" ></v-select>
                        </div>
                        <div style="margin-left: 10px; min-width: 200px;">
                            <div class="centerx">
                                <vs-tooltip text="Срок выполнения" position="top" >
                                    <h6 class="h6Blue mb-1">Срок выполнения</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input  class="w-50 " type="date" style="margin-bottom: 10px"    v-model="filterPlanDate" @input="setFilterPlanDate" ></vs-input>
                        </div>
                        <div style="margin-left: 10px; min-width: 200px;">
                            <div class="centerx">
                                <vs-tooltip text="Поиск по ID" position="top" >
                                    <h6 class="h6Blue mb-1">Поиск по ID</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input  class="w-50 " type="number" style="margin-bottom: 10px"    v-model="id_dev" @keyup.enter="findIDDev" ></vs-input>
                        </div>
                        <div v-if="!crmAlls" style="margin-left: 10px; min-width: 200px;">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по исполнителю" position="top" >
                                    <h6 class="h6Blue mb-1">Исполнитель</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50 " style="margin-bottom: 10px;min-width: 200px" :reduce="label => label.id" label="f_i" :options="UserFilterDevelopmentArr"   v-model="filterId_contractor" @input="setFilterUser"></v-select>
                        </div>
                        <div class="vx-col mt-6">
                            <vs-checkbox v-model="newMessage" @change="setNewMessageFilter" style="margin-top: 5px;">С новыми сообщениями</vs-checkbox>
                        </div>

                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <!-- <span style="max-width: 40px;">
                            <img src="/loading.gif" v-if="DevelopmentFindFlag" style="max-width: 40px; margin-top: 5px;">
                            </span> -->
                    <vs-input class="mb-4 md:mb-0 mr-4" style="margin-top: 5px" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button class="mb-4 md:mb-0 mr-4" style="margin-top: 5px" @click="AddOrganisation"> Добавить</vs-button>

                </div>

            </div>

            <!-- AgGrid Table -->
            <div class="out-main">
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="DevelopmentArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        :floatingFilter="false"
                        :pagination="true"
                        :paginationPageSize="paginationPageSize"
                        @rowDoubleClicked="onrowDoubleClicked"
                        :suppressPaginationPanel="true"
                        @grid-size-changed="onGridSizeChanged"
                        @column-resized="onColumnResized"
                        @column-visible="onColumnVisible"
                        :rowClassRules="rowClassRules"
                        :enableRtl="$vs.rtl">
                </ag-grid-vue>
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="DevelopmentFindFlag">
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
import axios from '../../axios'
import r from '../../route'
import { ArrowLeftIcon } from 'vue-feather-icons'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import operationDevelopment from './Render/operationDevelopment.vue'
import DevelopmentFio from './Render/DevelopmentFio.vue'
export default {
  components: {
    ArrowLeftIcon,
    DevelopmentFio,
    operationDevelopment
  },

  data () {
    return {
      id_dev:'',
      prior_col:{
        headerName: 'Приоритет',
        field: 'prioritet',
        filter: true,
        width: 100
      },
      crmAlls:true,
      crm:false,
      filterPlanDate:'',
      filterType:-1,
      filterStatus:-1,
      filterId_contractor:0,
      idDevelopment:'new',
      newMessage:false,
      searchQuery: '',
      rowClassRules:null,
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
          filter: true,
          width: 20

        },
        {
          headerName: 'Тип заявки',
          field: 'type',
          filter: true,
          width: 80
        },
        {
          headerName: 'Наименование',
          field: 'name',
          filter: true,
          width: 150
        },
        {
          headerName: 'Статус',
          field: 'status',
          filter: true,
          width: 100
        },

        {
          headerName: 'Срок разработки',
          field: 'plan_date_v',
          filter: true,
          width: 100
        },
        {
          headerName: 'Пользователь',
          field: 'fio_user',
          filter: true,
          width: 150,
          cellRendererFramework: 'DevelopmentFio'
        },

        {
          headerName: 'Дата заявки',
          field: 'created_date',
          filter: true,
          width: 100,
          hide:false

        },

        {
          headerName: 'Операции',
          field: 'id',
          filter: true,
          width: 100,
          cellRendererFramework: 'operationDevelopment',
          cellRendererParams: {
            arcCheck:!this.crmAlls,
            editValue: this.editValue.bind(this)
          }
        }

      ],

      // Cell Renderer Components
      components: {
        operationDevelopment, DevelopmentFio
      }
    }
  },
  created () {
    this.rowClassRules = {
      'new_message_flag': (params) => {

        return (params.data.new_message_flag && !params.data.new_status_flag)
      },
      'new_status_flag': (params) => {
        return (!params.data.new_message_flag && params.data.new_status_flag)
      },
      'combo_flag': (params) => {
        return (params.data.new_message_flag && params.data.new_status_flag)

      }


    }
  },
  computed: {
    idOrgan () { return this.idOrganization },
    totalPages () {
      if (this.gridApi) return Math.ceil(this.TotalDevelopmentnArr / this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },

    ...mapGetters([
      'TotalDevelopmentnArr', 'DevelopmentArr', 'TypeDevelopmentArr', 'StatusDevelopmentArr', 'User', 'UserFilterDevelopmentArr', 'UsersArr',
      'DevelopmentFindFlag'
    ]),
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }

  },
  methods: {
    getCrm () {
      axios.get(r('development.index'), {
        params:{
          method:'getCrm',
          param:''
        }
      }).then((response) => {
        if (response.data.result) {
          this.crm = true
          this.columnDefs.splice(4, 0, this.prior_col)
          this.gridApi = this.gridOptions.api
          this.gridApi.setColumnDefs(this.columnDefs)
          this.gridOptions.columnApi.resetColumnState()
          this.gridApi.sizeColumnsToFit()
        } else {
          this.crm = false
        }
      }).catch(() => {

      })
    },
    findIDDev () {
      this.$router.push(`/adm/development/${this.id_dev}`)
    },
    setNewMessageFilter () {
      this.User.pag.development.new_msg = this.newMessage
      this.setDataUser().then((response) => {
        this.getDevelopmentArr(this.User.pag.development)
      })
    },
    setFilterType () {
      if (this.filterType == null) this.filterType = -1
      this.User.pag.development.filterType = this.filterType
      this.setDataUser().then((response) => {
        this.getDevelopmentArr(this.User.pag.development)
      })

    },
    setFilterStatus () {
      if (this.filterStatus == null) this.filterStatus = -1
      this.User.pag.development.filterStatus = this.filterStatus
      this.setDataUser().then((response) => {
        this.getDevelopmentArr(this.User.pag.development)
      })

    },

    setFilterPlanDate () {
      this.User.pag.development.filterPlanDate = this.filterPlanDate
      this.setDataUser().then((response) => {
        this.getDevelopmentArr(this.User.pag.development)
      })

    },
    setFilterUser () {
      if (this.filterId_contractor == null) this.filterId_contractor = 0
      this.User.pag.development.filterId_contractor = this.filterId_contractor
      this.setDataUser().then((response) => {
        this.getDevelopmentArr(this.User.pag.development)
      })
    },
    editValue (id) {
      this.idDevelopment = id
      this.$router.push(`/adm/development/${this.id}`)
    },
    AddOrganisation () {
      this.idDevelopment = 'new'
      this.getDevelopmentArr()
      this.$router.push('/adm/development/new')
    },
    backclick () {
      this.$router.push('/adm/development')
    },


    onColumnResized (params) {
      params.api.resetRowHeights()
    },
    onColumnVisible (params) {
      params.api.resetRowHeights()
    },
    onGridSizeChanged (params) {

      if (params.clientWidth > 400) {
        this.gridApi.sizeColumnsToFit()
      } else {
        this.columnDefs.forEach(x => {
          x.width = 300
        })
        this.gridApi.setColumnDefs(this.columnDefs)
      }
    },


    onrowDoubleClicked (event) {
      this.idDevelopment = event.data.id
      //this.editIDTab = false
      this.$router.push(`/adm/development/${event.data.id}`)

    },
    ...mapMutations([]),
    ...mapActions(['getDevelopmentArr', 'getTypeDevelopmentList', 'getStatusDevelopmentList', 'setDataUser', 'getDataUser', 'getDataUsers']),
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged () {
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit()
      }
      )
    }

  },
  mounted () {
    this.getCrm()
    axios.get(r('development.index'), {
      params: {
        method: 'sendToArchiveAuto',
        param: null
      }
    })
    this.gridApi = this.gridOptions.api
    this.getTypeDevelopmentList()
    this.getStatusDevelopmentList()
    this.getDataUsers()
    this.getDataUser().then((response) => {
      this.filterType = (typeof this.User.pag.development.filterType !== 'undefined') ? this.User.pag.development.filterType : -1
      this.filterStatus = (typeof this.User.pag.development.filterStatus !== 'undefined') ? this.User.pag.development.filterStatus : -1
      this.filterPlanDate = (typeof this.User.pag.development.filterPlanDate !== 'undefined') ? this.User.pag.development.filterPlanDate : null
      this.newMessage = (typeof this.User.pag.development.new_msg !== 'undefined') ? this.User.pag.development.new_msg : false
      this.filterId_contractor = (typeof this.User.pag.development.filterId_contractor !== 'undefined') ? this.User.pag.development.filterId_contractor : 0
      this.getDevelopmentArr(this.User.pag.development).then((response) => {
        if (response.ccc != 'undefined') this.crmAlls = response.ccc
        //   if(typeof response.ccc!='undefined')this.columnDefs[6].hide=response.ccc

      })

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
    .new_message_flag {
        background-color: #98FB98;
    }
    .new_status_flag {
        background-color: #fbf97e;
    }
    .combo_flag {
        background-color: #fb47d2;
    }
</style>
