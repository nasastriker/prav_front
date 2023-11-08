<template>
  <div>
  <div class="out-main-11">
  <ag-grid-vue
              style="height: 200px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="ChangeIdHistoryList"
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
              @rowDoubleClicked="onrowDoubleClicked"
              :overlayNoRowsTemplate="'Нет истории'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
    <transition name="fade">
      <div class="outer-div-11" v-if="ChangeIdHistoryLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
    </transition>

  </div>
    <div style="display: flex;">
      <div>
        <h6 class="h6">Срок ИД:<span style="cursor: pointer;color: red;" @click="showShemaSrokId=!showShemaSrokId"> Схема расчета</span><VarToClipboard name="dcs_srok_id"/></h6>
        <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.srok_id"></vs-input>
      </div>
      <div style="margin-left: auto;margin-top:15px">
        <vs-button color="primary" @click="showAddPeriodFunc">Добавить период</vs-button>
      </div>
    </div>


    <vs-popup class="holamundo" :title="label_show" :active.sync="showAddPeriod">
      <h6 class="h6">Место нахождения ИД:</h6>
      <v-select  class="w-full" :reduce="label => label.id" label="name" :options="MestoIdItems"  v-model="id_mesto_id" @input="setMestoId" ></v-select>
      <h6 class="h6" style="margin-top: 15px">Номер ИП:</h6>
      <vs-input class="w-100"  v-model="period_data.number_ip"></vs-input>
      <h6 class="h6" style="margin-top: 15px">Дата начала периода:</h6>
      <vs-input type="date" class="w-100" v-model="period_data.date_send"></vs-input>
      <h6 class="h6" style="margin-top: 15px">Дата окончания периода:</h6>
      <vs-input type="date" class="w-100" v-model="period_data.date_return"></vs-input>
      <vs-button color="primary" style="margin-top: 25px" @click="addPeriod">{{ label_show }}</vs-button>
    </vs-popup>

    <vs-popup class="holamundo" title="Схема расчета Срока ИД" :active.sync="showShemaSrokId">
      <div v-if="Deb.debtorCreditSud.srok_id_shema != null && Deb.debtorCreditSud.srok_id_shema.length > 0">
        <h4 style="margin-top: 10px" v-for="item in Deb.debtorCreditSud.srok_id_shema">
          {{ item.date_start }} + {{ item.count_days }} = {{ item.date_end }}
        </h4>
      </div>
      <div v-else>
        <h4>Расчета не было</h4>
      </div>
    </vs-popup>
  </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import VarToClipboard from "../../../VarToClipboard.vue";
    import OpenChangeIdHistory from "./OpenChangeIdHistory.vue";
    export default {
        components: {
          VarToClipboard,OpenChangeIdHistory
        },
        data () {
            return {
              showShemaSrokId:false,
              label_show:'',
              showAddPeriod:false,
              id_mesto_id:-1,
              period_data:{},
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [
                {
                  headerName: 'Наименование',
                  field: 'bank_name',
                  filter: true,
                  width: 150,
                },
                {
                  headerName: 'Номер ИП',
                  field: 'number_ip',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Дата направления',
                  field: 'date_start',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Дата возврата',
                  field: 'date_end',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: '',
                  field: 'id',
                  filter: true,
                  width: 50,
                  cellRendererFramework: 'OpenChangeIdHistory'
                },
              ],
              components: {
                OpenChangeIdHistory
              }
            }
        },
      computed: {
        ...mapGetters([
          'Deb','ChangeIdHistoryList','ChangeIdHistoryLoadingFlag','MestoIdItems'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api
          this.getChangeIdHistoryList(this.Deb.debtorCredit.id);
        },
      methods: {
        onrowDoubleClicked(event){
          this.getHistoryPeriodData(event.data.id).then((response) => {
            if (response.result){
              this.period_data = response.data;
              this.id_mesto_id = this.period_data.id_mesto_id;
              this.getMestoIdItems().then((response_mesto) => {
                if (response_mesto.result) {
                  this.label_show = 'Изменить период';
                  this.showAddPeriod = true;
                }
              });
            }
          })
        },

        addPeriod(){
          let flag = true;

          if (typeof this.period_data.date_send == 'undefined' || this.period_data.date_send == null){
            flag = false;
          }

          if (flag){
            this.period_data.id_mesto_id = this.id_mesto_id;
            this.period_data.id_credit = this.Deb.debtorCredit.id;
            this.addSrokIdPeriod(this.period_data).then((response) => {
              if (response.result) {
                this.showAddPeriod = false;
                this.gridApi = this.gridOptions.api
                this.getChangeIdHistoryList(this.Deb.debtorCredit.id);
                this.getDataDebtorsById(this.Deb.debtorCredit.id);
                this.$vs.notify({
                  title: 'Сообщение',
                  text: 'Успешно добавлено',
                  color: 'success',
                  position: 'top-center'
                })
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Ошибка при добавлении: '+response.error,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            });
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Заполните необходимые поля',
              color: 'danger',
              position: 'top-center'
            })
          }
        },
        showAddPeriodFunc(){
          this.getMestoIdItems().then((response) => {
            if (response.result) {
              this.label_show = 'Добавить период';
              this.period_data = {};
              this.id_mesto_id=-1;
              this.showAddPeriod = true;
            }
          });
        },
        setMestoId(){
          if(this.id_mesto_id==null){
            this.id_mesto_id=-1;
          }
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
          'getChangeIdHistoryList','getMestoIdItems','addSrokIdPeriod','getDataDebtorsById','getHistoryPeriodData'
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
    .load-bar-11{
      display: inline-block;
      max-width: 70px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 60px;
    }

    .load-bar-12{
      display: inline-block;
      max-width: 70px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 40px;
      color: red;
    }

    .outer-div-11
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

    .out-main-11{
      position : relative;
    }

</style>
