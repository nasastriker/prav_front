<template>
  <div>
  <div class="out-main-prop">
  <ag-grid-vue
              style="height: 120px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              :components="components"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="FsspPropertyArr"
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
    <transition name="fade">
      <span>
      <div class="outer-div-prop" v-if="FsspPostanPropertyLoadingFlag">
            <img class="load-bar-prop" src="/loading.gif">
      </div>
      <div class="outer-div-prop" v-if="FsspPropertyLoadError"><refresh-cw-icon class="hover:text-primary cursor-pointer load-bar-prop" size="4x" @click="refreshProp">
            </refresh-cw-icon>
      </div>
      </span>

    </transition>
  </div>

    <vs-popup classContent="popup-example" title="Расчетные счета" :active.sync="popupActiveAccs" @close="closePop">
      <PropertyAccs></PropertyAccs>
    </vs-popup>
    <vs-popup classContent="popup-example" title="Недвижимое имущество" :active.sync="popupActiveNedvizh" @close="closePop">
      <PropertyNedvizh></PropertyNedvizh>
    </vs-popup>
    <vs-popup classContent="popup-example" title="Транспортные средства" :active.sync="popupActiveTransp" @close="closePop">
      <PropertyTransport></PropertyTransport>
    </vs-popup>
    <vs-popup classContent="popup-example" title="Место получения дохода" :active.sync="popupActiveDohod" @close="closePop">
      <PropertyDohod></PropertyDohod>
    </vs-popup>
  </div>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import { mapActions,mapGetters } from 'vuex';
    import { RefreshCwIcon } from 'vue-feather-icons';
    import OpenMore from "../Render/OpenMore.vue";
    import PropertyAccs from "./PropertyAccs.vue";
    import PropertyNedvizh from "./PropertyNedvizh.vue";
    import PropertyTransport from "./PropertyTransport.vue";
    import PropertyDohod from "./PropertyDohod.vue";
    export default {
        components: {
            AgGridVue,OpenMore,RefreshCwIcon,PropertyAccs,PropertyNedvizh,PropertyTransport,PropertyDohod
        },
        data () {
            return {
              popupActiveAccs: false,
              popupActiveNedvizh: false,
              popupActiveTransp: false,
              popupActiveDohod: false,
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [
                {
                  headerName: 'Имущество',
                  field: 'dbtrProperty',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Да/Нет',
                  field: 'yN',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: '',
                  field: 'more',
                  filter: true,
                  width: 100,
                  cellRendererFramework: 'OpenMore',
                  cellRendererParams: {
                    showInfo: this.showInfo.bind(this)
                  }
                },
              ],
              components: {
                OpenMore
              }
            }
        },
      computed: {
        ...mapGetters([
          'FsspPropertyArr','Deb','FsspPostanPropertyLoadingFlag','FsspPropertyLoadError'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api
        },
      methods: {
        closePop(){
          this.getFsspProperty(this.Deb.debtorCredit.id);
        },

        showInfo(dbtrProperty){
          if (dbtrProperty == "Расчетные счета"){
            this.getFsspPropAccs(this.Deb.debtorCredit.id);
            this.popupActiveAccs = true;
          }
          if (dbtrProperty == "Недвижимое имущество"){
            this.getFsspPropNedvizh(this.Deb.debtorCredit.id);
            this.popupActiveNedvizh = true;
          }
          if (dbtrProperty == "Транспортные средства"){
            this.getFsspPropTransp(this.Deb.debtorCredit.id);
            this.popupActiveTransp = true;
          }
          if (dbtrProperty == "Место получения дохода"){
            this.getFsspPropDohod(this.Deb.debtorCredit.id);
            this.popupActiveDohod = true;
          }
        },

        refreshProp(){
          this.getFsspProperty(this.Deb.debtorCredit.id);
          this.getFsspOtherIp(this.Deb.debtorCredit.id);
          this.getFsspOtdelName(this.Deb.debtorCredit.id);
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
        onRowDataChanged () {
          Vue . nextTick (() => {
                this.gridOptions.api.sizeColumnsToFit();
              }
          );
        },
        ...mapActions([
            'getFsspProperty','getFsspOtherIp','getFsspOtdelName','getFsspPropAccs','getFsspPropNedvizh',
          'getFsspPropTransp','getFsspPropDohod'
        ]),
        paginationPageSize () {
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },
      },
    }
</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.7s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
    .load-bar-prop{
      display: inline-block;
      max-width: 70px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 40px;
    }

    .load-bar-prop1{
      display: inline-block;
      max-width: 70px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 40px;
      color: red;
    }

    .outer-div-prop
    {
      text-align: center;
      z-index : 10;
      position : absolute;
      top : 0;
      left : 0;
      width: 100%;
      height: 100%;
      background-color: hsla(200, 80%, 90%, 0.3);
    }

    .out-main-prop{
      position : relative;
    }

</style>
