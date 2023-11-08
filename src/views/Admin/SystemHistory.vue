<template>
    <div >
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table vh40"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="SystemHistorysArr"
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
        :enableRtl="$vs.rtl">
        </ag-grid-vue>
        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />
    </div>

</template>

<script>
import { VueCsvImport } from 'vue-csv-import'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import r from '../../route'
import OpenSystemHistory from './Render/OpenSystemHistory.vue'
import axios from '../../axios'
export default {
  components: {
    VueCsvImport,
    OpenSystemHistory
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
          headerName: 'ID',
          field: 'id',
          filter: true,
          width: 40
        },

        {
          headerName: 'Имя',
          field: 'name',
          filter: true,
          width: 300
        },
        {
          headerName: 'Очередь',
          field: 'connect',
          filter: true,
          width: 150
        },

        {
          headerName: 'Операции',
          field: 'id',
          filter: true,
          width: 100,
          cellRendererFramework: 'OpenSystemHistory',
          cellRendererParams: {
            start_func: this.startFunc.bind(this)
          }
        },

        {
          headerName: 'Дата',
          field: 'created_at',
          filter: true,
          width: 150
        }


      ],
      // Cell Renderer Components
      components: {
        OpenSystemHistory
      }
    }
  },
  computed: {

    totalPages () {
      //   console.log(Math.ceil(this.TotalSystemHistorys/this.paginationPageSize))
      if (this.gridApi) return Math.ceil(this.TotalSystemHistorys / this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      return 1000
    },
    ...mapGetters(['SystemHistorysArr', 'TotalSystemHistorys']),
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
    startFunc (item) {

      if (item.connect != '' && item.connect != null) {
        axios.get(r('system.index'), {
          params: {
            method: 'startJob',
            param: {
              func:item.name,
              connect:item.connect
            }

          }
        }).then((response) => {
          if (response.data.result) {
            this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
          } else {
            this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
          }


        }).catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Ошибка',
            text: error.message,
            color: 'danger',
            position: 'top-center'
          })
        })
      } else {
        axios.get(r('system.index'), {
          params: {
            method: 'start',
            param: item.name

          }
        }).then((response) => {
          if (response.data.result) {
            this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
          } else {
            this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
          }


        }).catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Ошибка',
            text: error.message,
            color: 'danger',
            position: 'top-center'
          })
        })

      }


    },
    ...mapActions(['getDataSystemHistorys']),
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

    this.getDataSystemHistorys()
  }
}
</script>
<style>
    .vh40{
        height: 50vh!important;
    }

</style>
