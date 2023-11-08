<template>
  <div style="height: 700px">
    <div v-if="vidType==0">
    <div style="display: flex;">
      <vs-button style="margin-top: 10px;margin-bottom: 10px;margin-left: auto" color="success" type="filled" @click="addDohodStart"> + Новое место получения дохода</vs-button>
    </div>
          <ag-grid-vue
              style="width: 1200px;height: 300px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              :components="components"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="FsspPropertyDohodArr"
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
              :overlayNoRowsTemplate="'Нет мест получения дохода'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
      <div v-if="delDohod" style="margin-top: 15px;margin-bottom: 20px">
        <div class="vx-row">
          <div class="vx-col mb-2">
            <h4 style="margin-top: 10px">Вы действительно хотите удалить место получения дохода <b>{{ delDohodData.m_rab }}</b>?</h4>
          </div>
          <div class="vx-col mb-2">
            <vs-button color="danger" type="filled" @click="deleteDohod">Удалить</vs-button>
          </div>
          <div class="vx-col mb-2">
            <vs-button color="success" type="filled" @click="cancelDeleteDohod">Отмена</vs-button>
          </div>
        </div>
      </div>
    <h5>
      <b>Наименование:</b> {{ dohData.name }} <br>
      <b>Адрес:</b> {{ dohData.adres }} <br>
      <b>% удержания с дохода:</b> {{ dohData.proc }} / <b>Признак ПМ: </b>{{ dohData.pm }} / <b>Источник: </b>{{ dohData.data_from_norm }} <br>
      <b>Дата ареста: </b> {{ dohData.date_start }} / <b>Дата снятия ареста: </b> {{ dohData.date_end }}
    </h5>
    </div>
    <div v-if="vidType==1">
      <div>Наименование</div>
      <vs-input class="w-full" v-model="data.m_rab"></vs-input>
      <div style="margin-top: 10px">Адрес</div>
      <vs-input class="w-full" v-model="data.address"></vs-input>
      <div style="margin-top: 10px">% удержания с дохода</div>
      <vs-input class="w-full" v-model="data.procent" @keypress="validateNumberInt"></vs-input>
      <div style="margin-top: 10px">Дата ареста</div>
      <vs-input type="date" class="w-100" v-model="data.date_start"></vs-input>
      <div style="margin-top: 10px">Дата снятия ареста</div>
      <vs-input type="date" class="w-100" v-model="data.date_end"></vs-input>
      <vs-checkbox style="margin-top: 10px" v-model="data.priznak_pm">Признак ПМ</vs-checkbox>

      <div class="vx-row" style="margin-top: 20px">
        <div class="vx-col mb-2">
          <vs-button v-if="addFlag" color="success" type="filled" @click="addDohod">Добавить</vs-button>
          <vs-button v-else color="success" type="filled" @click="addDohod">Изменить</vs-button>
        </div>
        <div class="vx-col mb-2">
          <vs-button color="danger" type="filled" @click="cancelAddDohod">Отмена</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import { mapActions,mapGetters } from 'vuex';
    import OperPropertyDohod from "./Render/OperPropertyDohod.vue";
    export default {
        components: {
            AgGridVue,OperPropertyDohod
        },
        data () {
            return {
              delDohod:false,
              addFlag:false,
              delDohodData:{},
              data:{
                m_rab:null,
                address:null,
                procent:null,
                date_start:null,
                date_end:null,
                priznak_pm:0
              },
              vidType:0,
              dohData:{
                name:'',
                adres:'',
                proc:'',
                date_start:'',
                date_end:'',
                pm:'',
                adm:'',
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
                  headerName: 'Наименование',
                  field: 'm_rab',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Адрес',
                  field: 'address',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: '% удержания с дохода',
                  field: 'procent',
                  filter: true,
                  width: 70,
                },
                {
                  headerName: 'Дата ареста',
                  field: 'date_start_norm',
                  filter: true,
                  width: 70,
                },
                {
                  headerName: 'Дата снятия ареста',
                  field: 'date_end_norm',
                  filter: true,
                  width: 70,
                },
                {
                  headerName: 'Признак ПМ',
                  field: 'priznak_pm_norm',
                  filter: true,
                  width: 80,
                },
                {
                  headerName: 'Источник',
                  field: 'data_from_norm',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: '',
                  field: 'id',
                  filter: true,
                  width: 20,
                  cellRendererFramework: 'OperPropertyDohod',
                  cellRendererParams: {
                    questionDeleteDohod: this.questionDeleteDohod.bind(this)
                  }
                },
              ],
              components: {
                OperPropertyDohod
              }
            }
        },
      computed: {
        ...mapGetters([
          'FsspPropertyDohodArr','Deb'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api
        },
      methods: {
        deleteDohod(){
          this.deleteDebPropertyDohod(this.delDohodData.id).then((response) => {
            if (response.result) {
              this.$vs.notify({title: 'Успешно', text: 'Удалено!!!', color: 'success', position: 'top-center'})
              this.getFsspPropDohod(this.Deb.debtorCredit.id);
              this.cancelDeleteDohod();
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
        cancelDeleteDohod(){
          this.delDohodData = {};
          this.delDohod = false;
        },
        questionDeleteDohod(data){
          this.delDohodData = data;
          this.delDohod = true;
        },

        addDohod(){
          let flag = true;

          if (this.data.m_rab == null || this.data.m_rab.trim() == ''){
            flag = false;
          }

          if (flag) {
            this.data.id_credit = this.Deb.debtorCredit.id;
            this.data.add_flag = this.addFlag;
            this.saveDebPropertyDohod(this.data).then((response) => {
              if (response.result) {
                this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                this.getFsspPropDohod(this.Deb.debtorCredit.id);
                this.cancelAddDohod();
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
        cancelAddDohod(){
          this.clearData();
          this.vidType = 0;
          this.gridApi = this.gridOptions.api
        },
        addDohodStart(){
          this.delDohod = false;
          this.addFlag = true;
          this.delDohodData = {};
          this.clearData();
          this.vidType = 1;
        },
        clearData(){
          this.data.m_rab = null;
          this.data.address = null;
          this.data.procent = null;
          this.data.date_start = null;
          this.data.date_end = null;
          this.data.priznak_pm = 0;
        },
        validateNumberInt: event => {
          const charCode = String.fromCharCode(event.keyCode);
          if (!/[0-9]/.test(charCode)) {
            event.preventDefault();
          }
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
        paginationPageSize () {
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },
        onRowClicked(event){
          this.dohData.name = event.data.m_rab;
          this.dohData.adres = event.data.address;
          this.dohData.proc = event.data.procent;
          this.dohData.date_start = event.data.date_start_norm;
          this.dohData.date_end = event.data.date_end_norm;
          this.dohData.pm = event.data.priznak_pm_norm;
          this.dohData.data_from_norm = event.data.data_from_norm;
        },
        onrowDoubleClicked(event){
          this.delDohod = false;
          this.delDohodData = {};
          this.addFlag = false;
          this.clearData();
          this.getDebPropertyDohodData(event.data.id).then((response) => {
            if (response.result) {
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

        ...mapActions([
          'saveDebPropertyDohod','getFsspPropDohod','getDebPropertyDohodData','deleteDebPropertyDohod'
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
