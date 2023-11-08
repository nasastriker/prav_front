<template>
    <div class="vx-card p-6" >
        <div>
            <div style="margin-bottom: 5px">Название расчета</div>
            <vs-input class="w-50" style="margin-bottom: 5px;min-width: 85%" v-model="formula.name" ></vs-input>
            <div style="text-align: center">
                <vs-button @click="save">Сохранить</vs-button>
                <vs-button @click="close">Отмена</vs-button>
            </div>
            <template v-if="$route.params.id!='new'">
            <div class="flex flex-wrap justify-between items-center">

                <!-- ITEMS PER PAGE -->
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ CalculateVarsInListTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : CalculateVarsInListTotal }} of {{ CalculateVarsInListTotal }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="newCalculateVar">Новая переменная</vs-button>
                </div>
            </div>
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="CalculateVarsInList"
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
                        :enableRtl="$vs.rtl">
                </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
            </template>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import r from '../../route'
import { mapActions, mapGetters } from 'vuex'
import axios from '../../axios'
import OpenCalculateVarsInList from './Render/OpenCalculateVarsInList.vue'
export default {
  components: {
    OpenCalculateVarsInList,
  },
  data () {
    return {

      searchQuery: '',
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },

      columnDefs: [
        {
          headerName: 'Порядковый номер',
          field: 'num',
          filter: true,
          width: 150
        },
        {
          headerName: 'Преременая',
          field: 'name',
          filter: true,
          width: 150
        },
        {
          headerName: 'Формула',
          field: 'formula',
          filter: true,
          width: 150
        },

        {
          headerName: 'Операции',
          field: 'id',
          filter: true,
          width: 150,
          // cellRendererFramework: Vue.extend(OpenCalculateVarsInList),
          cellRendererFramework: 'OpenCalculateVarsInList'
        }
      ],
      components: {
        OpenCalculateVarsInList
      },
      formula:{
        id:'new',
        name:''
      }
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    if (this.$route.params.id === 'new') {
      this.formula = {
        id:'new',
        name:''
      }
    } else {
      this.getCalculationsOnce(this.$route.params.id).then(res => {
        if (res.result) {
          this.formula = res.data
          this.getCalculateVarsInList(this.$route.params.id)
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        }
      }).catch(err => {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Ошибка !!!',
          color: 'danger',
          position: 'top-center'
        })
      })
    }
  },
  computed: {
    ...mapGetters(['CalculateVarsInList', 'CalculateVarsInListTotal']),
    totalPages () {
      if (this.gridApi) return Math.ceil(this.CalculateVarsInListTotal / this.paginationPageSize)
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
    ...mapActions(['getCalculations', 'getCalculateVarsInList', 'getCalculateVarsInListOnce', 'getCalculationsOnce']),

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
      this.$router.push(`/adm/calculation/${this.$route.params.id}/${event.data.id}`)
    },
    newCalculateVar () {
      this.$router.push(`/adm/calculation/${this.$route.params.id}/new`)
    },

    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged () {
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit()
      }
      )
    },
    close () {
      this.$router.back()
    },
    save () {
      if (this.formula.name === '') {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните название расчета',
          color: 'danger',
          position: 'top-center'
        })
        return
      }


      axios.post(r('calculateList.update'), {
        params: {
          method: 'save',
          param: this.formula
        }
      }).then(res => {
        if (res.data.result) {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Успешно!!!',
            color: 'success',
            position: 'top-center'
          })
          this.getCalculations(this.$route.params.id)
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        }
      }).catch(e => {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Ошибка !!!',
          color: 'danger',
          position: 'top-center'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
