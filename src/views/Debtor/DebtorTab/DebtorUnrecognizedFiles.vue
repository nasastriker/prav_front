<template>
    <div>
      <div class="out-main-debtor-uf">
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="DebtorUnrecognizedFilesList"
                rowSelection="multiple"
                :rowDataChanged="onRowDataChanged"
                @grid-size-changed="onGridSizeChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                @rowDoubleClicked="onrowDoubleClicked"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :overlayNoRowsTemplate="'Нет записей'"
                :enableRtl="$vs.rtl">
        </ag-grid-vue>
        <transition name="fade">
          <div class="outer-div-debtor-uf" v-if="DebtorUnrecognizedFilesListLoadingFlag"><img class="load-bar" src="/loading.gif"></div>
        </transition>
      </div>

        <vs-pagination
            :total="totalPages"
            :max="7"
            v-model="currentPage"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import OpenStatus from "../../UnrecognizedFiles/Render/OpenStatus.vue";
    import OpenCountFiles from "../../UnrecognizedFiles/Render/OpenCountFiles.vue";
    export default {
      components: {
        OpenStatus,OpenCountFiles
      },
      data() {
        return {
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
              width: 50,
            },
            {
              headerName: '',
              field: 'count_files',
              width: 50,
              cellRendererFramework: 'OpenCountFiles',
            },
            {
              headerName: 'Источник',
              field: 'from_type_norm',
              width: 250,
            },
            {
              headerName: 'Дата поступления',
              field: 'date_receive_norm',
              width: 50,
            },
            {
              headerName: 'Статус',
              field: 'record_status',
              width: 70,
              cellRendererFramework: 'OpenStatus',
            },
          ],
          components: {
            OpenStatus,OpenCountFiles
          }
        }
      },
      mounted() {
        this.gridApi = this.gridOptions.api;
        this.getDebtorUnrecognizedFiles(this.Deb.debtorCredit.id);
      },
      computed: {
        totalPages() {
          if (this.gridApi)
            return Math.ceil(this.DebtorUnrecognizedFilesTotal / this.paginationPageSize)
          else return 0
        },
        paginationPageSize() {
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },
        currentPage: {
          get() {
            if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
            else return 1
          },
          set(val) {
            this.gridApi.paginationGoToPage(val - 1)
          }
        },
        ...mapGetters([
          'Deb', 'DebtorUnrecognizedFilesList', 'DebtorUnrecognizedFilesTotal', 'DebtorUnrecognizedFilesListLoadingFlag'
        ]),
      },
      methods: {
        ...mapActions([
          'getDebtorUnrecognizedFiles'
        ]),
        onrowDoubleClicked(event) {
          this.$router.push('/unrecognized_files/' + event.data.id)
        },
        updateSearchQuery(val) {
          this.gridApi.setQuickFilter(val)
        },
        onRowDataChanged() {
          Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
              }
          );
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
    }
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.vh75{
  min-height: 75vh;
}
.load-bar{
  display: inline-block;
  margin: auto;
  max-width: 100px;
}

.outer-div-debtor-uf
{
  display: flex;
  text-align: center;
  z-index : 10;
  position : absolute;
  top : 0;
  left : 0;
  width: 100%;
  height: 100%;
  background-color: hsla(200, 80%, 90%, 0.3);
}

.out-main-debtor-uf{
  position : relative;
}
</style>