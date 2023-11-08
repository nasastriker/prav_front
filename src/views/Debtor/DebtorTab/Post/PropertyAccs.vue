<template>
  <div style="height: 700px">
    <div v-if="vidType==0">
    <div style="display: flex;">
      <vs-button style="margin-top: 10px;margin-bottom: 10px;margin-left: auto" color="success" type="filled" @click="addAccStart"> + Новый счет</vs-button>
    </div>
  <ag-grid-vue
              style="width: 1200px;height: 500px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              :components="components"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="FsspPropertyAccsArr"
              rowSelection="multiple"
              :rowDataChanged = "onRowDataChanged"
              @rowClicked = "onRowClicked"
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
              :overlayNoRowsTemplate="'Нет счетов'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
      <div v-if="delAcc" style="margin-top: 15px;margin-bottom: 20px">
        <div class="vx-row">
          <div class="vx-col mb-2">
            <h4 style="margin-top: 10px">Вы действительно хотите удалить счет <b>{{ delAccData.acc }}</b>?</h4>
          </div>
          <div class="vx-col mb-2">
            <vs-button color="danger" type="filled" @click="deleteAcc">Удалить</vs-button>
          </div>
          <div class="vx-col mb-2">
            <vs-button color="success" type="filled" @click="cancelDeleteAcc">Отмена</vs-button>
          </div>
        </div>
      </div>
    <h5>
      <b>Банк:</b> {{ accData.bank }} <br>
      <b>БИК:</b> {{ accData.bic }} / <b>Счет:</b> {{ accData.acc }} / <b>Валюта: </b> {{ accData.val }} / <b>Сумма: </b> {{ accData.summa }} <br>
      <b>Дата ареста: </b> {{ accData.date_start }} / <b>Дата снятия ареста: </b> {{ accData.date_end }} / <b>Признак ПМ: </b>{{ accData.pm }} / <b>Источник: </b>{{ accData.data_from_norm }}
    </h5>
    </div>
    <div v-if="vidType==1">
      <div>Номер счета</div>
      <vs-input class="w-full" v-model="data.acc" @keypress="validateNumberInt"></vs-input>
      <div style="margin-top: 10px">Банк</div>
      <v-select  class="w-50 " :reduce="label => label.id" label="name_plus_bic" :options="BanksListBicDebProperty" v-model="data.id_bank"></v-select>
      <div style="margin-top: 10px">Дата ареста</div>
      <vs-input type="date" class="w-100" v-model="data.date_start"></vs-input>
      <div style="margin-top: 10px">Дата снятия ареста</div>
      <vs-input type="date" class="w-100" v-model="data.date_end"></vs-input>
      <div style="margin-top: 10px">Сумма</div>
      <vs-input class="w-50" v-model="data.summa" @keypress="validateNumberDecimal"></vs-input>
      <vs-checkbox style="margin-top: 10px" v-model="data.priznak_pm">Признак ПМ</vs-checkbox>

      <div class="vx-row" style="margin-top: 20px">
        <div class="vx-col mb-2">
          <vs-button v-if="addFlag" color="success" type="filled" @click="addAcc">Добавить</vs-button>
          <vs-button v-else color="success" type="filled" @click="addAcc">Изменить</vs-button>
        </div>
        <div class="vx-col mb-2">
          <vs-button color="danger" type="filled" @click="cancelAddAcc">Отмена</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import { mapActions,mapGetters } from 'vuex'
    import vSelect from 'vue-select'
    import OperPropertyAcc from "./Render/OperPropertyAcc.vue";
    export default {
        components: {
            'v-select': vSelect,AgGridVue,OperPropertyAcc
        },
        data () {
            return {
              vidType:0,
              delAcc:false,
              delAccData:{},
              addFlag:false,
              data:{
                acc:null,
                id_bank:null,
                date_start:null,
                date_end:null,
                priznak_pm:0,
                summa:null
              },
              accData:{
                bank:'',
                bic:'',
                acc:'',
                val:'',
                date_start:'',
                date_end:'',
                pm:'',
              },
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [
                {
                  headerName: 'Банк',
                  field: 'bank_name_norm',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Номер счета',
                  field: 'acc',
                  filter: true,
                  width: 150,
                },
                {
                  headerName: 'Валюта',
                  field: 'valut',
                  filter: true,
                  width: 50,
                },
                {
                  headerName: 'Дата ареста',
                  field: 'date_start_norm',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Дата снятия ареста',
                  field: 'date_end_norm',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Признак ПМ',
                  field: 'priznak_pm_norm',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Источник',
                  field: 'data_from_norm',
                  filter: true,
                  width: 150,
                },
                {
                  headerName: '',
                  field: 'id',
                  filter: true,
                  width: 20,
                  cellRendererFramework: 'OperPropertyAcc',
                  cellRendererParams: {
                    questionDelete: this.questionDelete.bind(this)
                  }
                },
              ],
              components: {
                OperPropertyAcc
              }
            }
        },
      computed: {
        ...mapGetters([
          'FsspPropertyAccsArr','Deb','BanksListBicDebProperty'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api;
        },
      methods: {
        cancelDeleteAcc(){
          this.delAccData = {};
          this.delAcc = false;
        },
        deleteAcc(){
          this.deleteDebPropertyAcc(this.delAccData.id).then((response) => {
            if (response.result) {
              this.$vs.notify({title: 'Успешно', text: 'Удалено!!!', color: 'success', position: 'top-center'})
              this.getFsspPropAccs(this.Deb.debtorCredit.id);
              this.cancelDeleteAcc();
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
        questionDelete(data){
          this.delAccData = data;
          this.delAcc = true;
        },
        addAcc(){
          let flag = true;

          if (this.data.acc == null || this.data.acc.trim() == ''){
            flag = false;
          }
          if (this.data.id_bank == null){
            flag = false;
          }

          if (flag) {
            this.data.id_credit = this.Deb.debtorCredit.id;
            this.data.add_flag = this.addFlag;
            this.saveDebPropertyAcc(this.data).then((response) => {
              if (response.result) {
                this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                this.getFsspPropAccs(this.Deb.debtorCredit.id);
                this.cancelAddAcc();
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: response.error,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            })
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Заполните необходимые поля',
              color: 'danger',
              position: 'top-center'
            })
          }


        },
        addAccStart(){
          this.delAcc = false;
          this.addFlag = true;
          this.delAccData = {};
          this.getBanksListBicDebProp();
          this.clearData();
          this.vidType = 1;
        },
        cancelAddAcc(){
          this.clearData();
          this.vidType = 0;
          this.gridApi = this.gridOptions.api
        },
        validateNumberInt: event => {
          const charCode = String.fromCharCode(event.keyCode);
          if (!/[0-9]/.test(charCode)) {
            event.preventDefault();
          }
        },
        validateNumberDecimal: event => {
          const charCode = String.fromCharCode(event.keyCode);
          if (!/[0-9,.]/.test(charCode)) {
            event.preventDefault();
          }
        },
        clearData(){
          this.data.acc = null;
          this.data.id_bank = null;
          this.data.date_start = null;
          this.data.date_end = null;
          this.data.priznak_pm = 0;
          this.data.summa = null;
        },
        onrowDoubleClicked(event){
          this.delAcc = false;
          this.delAccData = {};
          this.addFlag = false;
          this.clearData();
          this.getDebPropertyAccData(event.data.id).then((response) => {
            if (response.result) {
              this.getBanksListBicDebProp();
              this.data = response.data;
              this.vidType = 1;
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


        onColumnResized(params) {
          params.api.resetRowHeights();
        },
        onColumnVisible(params) {
          params.api.resetRowHeights();
        },
        onGridSizeChanged(params) {
          this.gridApi = this.gridOptions.api;
          this.gridApi.sizeColumnsToFit();
        },
        onRowDataChanged () {
          Vue . nextTick (() => {
                this.gridOptions.api.sizeColumnsToFit();
              }
          );
        },
        onRowClicked(event){
          this.accData.bank = event.data.bank_name_norm;
          this.accData.bic = event.data.bic;
          this.accData.acc = event.data.acc;
          this.accData.val = event.data.valut;
          this.accData.date_start = event.data.date_start_norm;
          this.accData.date_end = event.data.date_end_norm;
          this.accData.pm = event.data.priznak_pm_norm;
          this.accData.summa = event.data.summa;
          this.accData.data_from_norm = event.data.data_from_norm;
        },
        paginationPageSize () {
          this.gridApi = this.gridOptions.api
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },

        ...mapActions([
          'getBanksListBicDebProp','saveDebPropertyAcc','getFsspPropAccs','getDebPropertyAccData','deleteDebPropertyAcc'
        ]),
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

</style>
