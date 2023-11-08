<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalUserAccsessRecover - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalUserAccsessRecover }} of {{ TotalUserAccsessRecover }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                                <span>10</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                <span>20</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                                <span>50</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                                <span>150</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="newUserAccsessRecover">Добавить доступ к взыскателю</vs-button>
                </div>
            </div>
            <vs-popup   title="Ошибка" :active.sync="popAdd">
                <label>Взыскатель или договор цессии:</label>
                <v-select   :reduce="label => label.id" label="name" :options="RecoverersArr"  v-model="id_recover" style="margin-bottom: 40px;min-width: 500px;" ></v-select>
                <div style="margin-top: 10px;text-align: center">
                <vs-button @click="addRecover">Добавить</vs-button>
                </div>
            </vs-popup>
            <!-- AgGrid Table -->
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="UserAccsessRecoverArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    @rowDoubleClicked="onrowDoubleClicked"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
import OpenUserAccsessRecover from './Render/OpenUserAccsessRecover.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    OpenUserAccsessRecover
  },
  data () {
    return {

      // Filter Options
      id_recover:null,
      popAdd:false,
      searchQuery: '',
      userAccsessRecoverSave:0,

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
          headerName: 'Взыскатель',
          headerTooltip: 'Взыскатель',
          tooltipField: 'name',
          field: 'name',
          filter: true,
          width: 200
        },

        {
          headerName: 'Телефон',
          headerTooltip: 'Телефон',
          tooltipField: 'phone',
          field: 'phone',
          filter: true,
          width: 150
        },
        {
          headerName: 'Email',
          headerTooltip: 'Email',
          tooltipField: 'email',
          field: 'email',
          filter: true,
          width: 150
        },
        {
          headerName: 'Адрес',
          headerTooltip: 'Адрес',
          tooltipField: 'address',
          field: 'address',
          filter: true,
          width: 300
        },

        {
          headerName: 'Операции',
          field: 'id',
          filter: true,
          width: 200,
          cellRendererFramework: 'OpenUserAccsessRecover'
        }


      ],

      // Cell Renderer Components
      components: {
        OpenUserAccsessRecover
      }
    }
  },

  computed: {

    ...mapGetters(['UserAccsessRecoverArr', 'TotalUserAccsessRecover', 'RecoverersArr']),
    totalPages () {
      //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
      if (this.gridApi) return Math.ceil(this.TotalUserAccsessRecover / this.paginationPageSize)
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
        this.gridApi.paginationGoToPage(val - 1)
      }
    }

  },
  methods: {
    ...mapActions(['getDataUserAccsessRecover', 'getAllRecovers', 'saveUserAccsessRecover']),
    addRecover () {
      if (this.id_recover !== null) {
        this.saveUserAccsessRecover({
          id_user: this.$route.params.id,
          id_recover: this.id_recover
        }).then(result => {
          if (result) {
            this.getDataUserAccsessRecover({id_user: this.$route.params.id})
            this.popAdd = false
          }
        })
      } else {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Выберите взыскателя!',
          color: 'danger',
          position: 'top-center'
        })
      }
    },
    onColumnResized (params) {
      params.api.resetRowHeights()
    },
    onColumnVisible (params) {
      params.api.resetRowHeights()
    },
    onGridSizeChanged (params) {
      if (params.clientWidth > 500) {
        this.gridApi.sizeColumnsToFit()
      } else {
        this.columnDefs.forEach(x => {
          x.width = 300
        })
        this.gridApi.setColumnDefs(this.columnDefs)
      }
    },
    onrowDoubleClicked (event) {
      // this.$router.push('/adm/users/'+event.data.id)
    },
    newUserAccsessRecover () {
      this.popAdd = true
    },

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
    this.gridApi = this.gridOptions.api
    this.getAllRecovers()
    this.getDataUserAccsessRecover({id_user:this.$route.params.id})

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
