<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
          <div style="margin-top: 10px;margin-bottom: 30px;display: flex;">
            <span class="text-primary cursor-pointer"><arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" @click="backToLists"></arrow-left-icon></span>
            <h4 style="margin-left: 20px"><b>{{ name_record }}</b> / История</h4>
          </div>

            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFsspHodRecordHistory - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspHodRecordHistory }} of {{ TotalFsspHodRecordHistory }}</span>
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

              <div style="display: flex">
                <vs-button color="success" type="filled" @click="updateHistory">Обновить</vs-button>
              </div>

            </div>
          <div class="out-main-fssp-hod-record-history">
            <ag-grid-vue
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    :components="components"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FsspHodRecordHistory"
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
                    :overlayNoRowsTemplate="'Нет истории'"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="tablePreloader outer-div" v-if="FsspHodRecordHistoryLoadingFlag">
                  <img class="load-bar" src="/loading.gif" style="width: 70px;">
                  <span>Идёт загрузка</span>
              </div>
            </transition>
          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

          <vs-popup classContent="popup-example" title="Значение" :active.sync="showJsonFlag">
            <json-viewer
                :value="json_data"
                :expand-depth=5
                copyable
                sort>
            </json-viewer>
          </vs-popup>

          <vs-popup classContent="popup-example" title="Значение" :active.sync="showLongTextFlag">
            <vs-textarea class="w-100" rows="22" height="500px" v-model="long_text_data"></vs-textarea>
          </vs-popup>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import OpenTitle from "./Render/OpenTitle.vue";
    import { ArrowLeftIcon } from 'vue-feather-icons';
    import OpenHistoryVal from "./Render/OpenHistoryVal.vue";
    import JsonViewer from 'vue-json-viewer';
    export default {
      components: {
        OpenTitle,ArrowLeftIcon,OpenHistoryVal,JsonViewer
      },
      data() {
        return {
          long_text_data:'',
          showLongTextFlag:false,
          showJsonFlag:false,
          json_data:{},
          name_record:'',
          gridApi: null,
          gridOptions: {
            alwaysShowVerticalScroll: true
          },
          defaultColDef: {
            flex: 1,
            wrapText: true,
            autoHeight: true,
            sortable: true,
            resizable: true,
          },
          columnDefs: [
            {
              headerName: 'Пользователь',
              field: 'user_name',
              hide: false,
              width: 150,
              cellRendererFramework: 'OpenTitle',
            },
            {
              headerName: 'Дата/время',
              field: 'created_at_norm',
              hide: false,
              width: 150,
              cellRendererFramework: 'OpenTitle',
            },
            {
              headerName: 'Поле',
              field: 'field_name',
              hide: false,
              width: 150,
              cellRendererFramework: 'OpenTitle',
            },
            {
              headerName: 'Старое значение',
              field: 'old_val_norm',
              filter: true,
              width: 150,
              cellRendererFramework: 'OpenHistoryVal',
              cellRendererParams: {
                showJson: this.showJson.bind(this),
                showLongText: this.showLongText.bind(this),
              }
            },
            {
              headerName: 'Новое значение',
              field: 'new_val_norm',
              filter: true,
              width: 150,
              cellRendererFramework: 'OpenHistoryVal',
              cellRendererParams: {
                showJson: this.showJson.bind(this),
                routeToTask: this.routeToTask.bind(this),
                showLongText: this.showLongText.bind(this),
              }
            },
          ],
          components: {
            OpenTitle,OpenHistoryVal
          }
        }
      },

      computed: {
        totalPages() {
          if (this.gridApi)
            return Math.ceil(this.TotalFsspHodRecordHistory / this.paginationPageSize)
          else return 0
        },
        paginationPageSize() {
          return this.FsspHodRecordHistoryData.limit;
        },
        ...mapGetters([
            'FsspHodRecordHistory','TotalFsspHodRecordHistory','FsspHodRecordHistoryLoadingFlag','FsspHodRecordHistoryData'
        ]),
        currentPage: {
          get() {
            if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
            else return 1
          },
          set(val) {
            this.setQueryFsspHodHistoryOffset(val - 1);
            this.getFsspHodRecordHistory();
            this.gridApi.paginationGoToPage(val - 1);
          }
        },
      },
      methods: {
        showLongText(data){
          this.long_text_data = data;
          this.showLongTextFlag = true;
        },
        routeToTask(id_task){
          this.$router.push('/fssp_hod_credits/' + id_task);
        },
        showJson(data){
          this.json_data = data;
          this.showJsonFlag = true;
        },
        backToLists(){
          this.$router.back();
        },
        updateHistory() {
          this.getFsspHodRecordHistory();
        },
        changePag(pag) {
          this.FsspHodRecordHistoryData.limit = pag;
          this.getFsspHodRecordHistory();
          this.setQueryFsspHodHistoryLimit(pag);
          this.gridApi.paginationSetPageSize(pag);
        },
        onColumnResized(params) {
          params.api.resetRowHeights();
        },
        onColumnVisible(params) {
          params.api.resetRowHeights();
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
        ...mapMutations([
            'setQueryFsspHodHistoryOffset','setQueryFsspHodHistoryLimit'
        ]),
        ...mapActions([
            'getFsspHodRecordHistory','getFsspHodRecordName'
        ]),
        updateSearchQuery(val) {
          this.gridApi.setQuickFilter(val)
        },
        onRowDataChanged() {
          Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
              }
          );
        },
      },
      mounted() {
        this.gridApi = this.gridOptions.api;
        this.getFsspHodRecordName(this.$route.params.id).then((response) => {
          if (response.result) {
            this.name_record = response.data;
            this.FsspHodRecordHistoryData.id_record = this.$route.params.id;
            this.getFsspHodRecordHistory();
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: response.error,
              color: 'danger',
              position: 'top-center'
            })
          }
        })
      },
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
      max-width: 100px;
    }

    .outer-div-fssp-hod-record-history
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

    .out-main-fssp-hod-record-history{
      position : relative;
    }
</style>
