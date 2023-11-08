<template>
  <div style="height: 700px">
    <div v-if="vidType==0">
    <div style="display: flex;">
      <vs-button style="margin-top: 10px;margin-bottom: 10px;margin-left: auto" color="success" type="filled" @click="addTranStart"> + Новое транспортное средство</vs-button>
    </div>
          <ag-grid-vue
              style="width: 1200px;height: 300px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              :components="components"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="FsspPropertyTranspArr"
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
              :overlayNoRowsTemplate="'Нет транспортных средств'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
      <div v-if="delTran" style="margin-top: 15px;margin-bottom: 20px">
        <div class="vx-row">
          <div class="vx-col mb-2">
            <h4 style="margin-top: 10px">Вы действительно хотите удалить транспортное средство госномер <b>{{ delTranData.gosnumber }}</b>?</h4>
          </div>
          <div class="vx-col mb-2">
            <vs-button color="danger" type="filled" @click="deleteTran">Удалить</vs-button>
          </div>
          <div class="vx-col mb-2">
            <vs-button color="success" type="filled" @click="cancelDeleteTran">Отмена</vs-button>
          </div>
        </div>
      </div>
  <h5>
    <b>Тип:</b> {{ tranData.type }} / <b>Модель:</b> {{ tranData.model }} / <b>№двигателя:</b> {{ tranData.dvig }} <br>
    <b>Госномер: </b> {{ tranData.gos_nom }} / <b>VIN: </b> {{ tranData.vin }} / <b>Год выпуска:</b> {{ tranData.year_vip }} <br>
    <b>Дата ареста: </b> {{ tranData.date_start }} / <b>Дата снятия ареста: </b> {{ tranData.date_end }} / <b>Источник: </b>{{ tranData.data_from_norm }} <br>
    <b>Ограничения (сайт ГИБДД): </b> {{ tranData.gibdd_ogr }}
    <span v-if="tranData.gibdd_ogr > 0 && !showOgrList" class="hover:text-primary cursor-pointer" @click="showOgr">[ показать ]</span>
    <span v-else-if="tranData.gibdd_ogr > 0 && showOgrList" class="hover:text-primary cursor-pointer" @click="hideAll">[ скрыть ]</span>
    / <b>Розыск (сайт ГИБДД): </b> {{ tranData.gibdd_wanted }}
    <span v-if="tranData.gibdd_wanted > 0 && !showWantedList" class="hover:text-primary cursor-pointer" @click="showWanted">[ показать ]</span>
    <span v-else-if="tranData.gibdd_wanted > 0 && showWantedList" class="hover:text-primary cursor-pointer" @click="hideAll">[ скрыть ]</span>

    <div v-if="showOgrList" style="margin-top: 20px">
      <h5><b>Ограничения (сайт ГИБДД):</b></h5>
      <div v-for="(ogr_item, index) in tranData.arest_data">
        <h5>{{ index + 1 }}. {{ ogr_item.osnOgr }} от {{ ogr_item.dateogr }}</h5>
      </div>
    </div>

    <div v-if="showWantedList" style="margin-top: 20px">
      <h5><b>Розыск (сайт ГИБДД):</b></h5>
      <div v-for="(wanted_item, index) in tranData.wanted_data">
        <h5>{{ index + 1 }}. {{ wanted_item.osnOgr }} от {{ wanted_item.dateogr }}</h5>
      </div>
    </div>
  </h5>
    </div>
    <div v-if="vidType==1">
      <div>Тип</div>
      <v-select class="w-50 " :options="DebPropTranTypes" v-model="data.type_auto"></v-select>
      <div style="margin-top: 10px">Модель</div>
      <vs-input class="w-full" v-model="data.model"></vs-input>
      <div style="margin-top: 10px">Номер двигателя</div>
      <vs-input class="w-full" v-model="data.number_engine"></vs-input>
      <div style="margin-top: 10px">Госномер</div>
      <vs-input class="w-full" v-model="data.gosnumber"></vs-input>
      <div style="margin-top: 10px">VIN</div>
      <vs-input class="w-full" v-model="data.vin"></vs-input>
      <div style="margin-top: 10px">Год выпуска</div>
      <vs-input class="w-50" v-model="data.made_year" @keypress="validateNumberInt"></vs-input>
      <div style="margin-top: 10px">Дата ареста</div>
      <vs-input type="date" class="w-100" v-model="data.date_start"></vs-input>
      <div style="margin-top: 10px">Дата снятия ареста</div>
      <vs-input type="date" class="w-100" v-model="data.date_end"></vs-input>

      <div class="vx-row" style="margin-top: 20px">
        <div class="vx-col mb-2">
          <vs-button v-if="addFlag" color="success" type="filled" @click="addTran">Добавить</vs-button>
          <vs-button v-else color="success" type="filled" @click="addTran">Изменить</vs-button>
        </div>
        <div class="vx-col mb-2">
          <vs-button color="danger" type="filled" @click="cancelAddTran">Отмена</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import { mapActions,mapGetters } from 'vuex';
    import vSelect from 'vue-select';
    import OperPropertyTran from "./Render/OperPropertyTran.vue";
    export default {
        components: {
            'v-select': vSelect,AgGridVue,OperPropertyTran
        },
        data () {
            return {
              showOgrList:false,
              showWantedList:false,
              data:{
                type_auto:null,
                model:null,
                number_engine:null,
                gosnumber:null,
                vin:null,
                made_year:null,
                date_start:null,
                date_end:null,
              },
              addFlag:false,
              delTranData:{},
              delTran:false,
              vidType:0,
              tranData:{
                type:'',
                model:'',
                dvig:'',
                gos_nom:'',
                vin:'',
                year_vip:'',
                date_start:'',
                date_end:'',
                roz:'',
                obr:'',
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
                  headerName: 'Тип',
                  field: 'type_auto',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Модель',
                  field: 'model',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Госномер',
                  field: 'gosnumber',
                  filter: true,
                  width: 80,
                },
                {
                  headerName: 'VIN',
                  field: 'vin',
                  filter: true,
                  width: 120,
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
                  headerName: 'Ограничения',
                  field: 'gibdd_ogr',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Розыск',
                  field: 'gibdd_wanted',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: '',
                  field: 'id',
                  filter: true,
                  width: 20,
                  cellRendererFramework: 'OperPropertyTran',
                  cellRendererParams: {
                    questionDeleteTran: this.questionDeleteTran.bind(this)
                  }
                },
              ],
              components: {
                OperPropertyTran
              }
            }
        },
      computed: {
        ...mapGetters([
          'FsspPropertyTranspArr','Deb','DebPropTranTypes'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api
        },
      methods: {
        hideAll(){
          this.showOgrList = false;
          this.showWantedList = false;
        },
        showOgr(){
          this.hideAll();
          this.showOgrList = true;
        },
        showWanted(){
          this.hideAll();
          this.showWantedList = true;
        },

        cancelDeleteTran(){
          this.delTranData = {};
          this.delTran = false;
        },
        questionDeleteTran(data){
          this.delTranData = data;
          this.delTran = true;
        },
        deleteTran(){
          this.deleteDebPropertyTran(this.delTranData.id).then((response) => {
            if (response.result) {
              this.$vs.notify({title: 'Успешно', text: 'Удалено!!!', color: 'success', position: 'top-center'})
              this.getFsspPropTransp(this.Deb.debtorCredit.id);
              this.cancelDeleteTran();
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

        cancelAddTran(){
          this.clearData();
          this.vidType = 0;
          this.gridApi = this.gridOptions.api
        },
        addTran(){
          let flag = true;

          if (this.data.model == null || this.data.model.trim() == ''){
            flag = false;
          }
          if (this.data.gosnumber == null || this.data.gosnumber.trim() == ''){
            flag = false;
          }

          if (flag) {
            this.data.id_credit = this.Deb.debtorCredit.id;
            this.data.add_flag = this.addFlag;
            this.saveDebPropertyTran(this.data).then((response) => {
              if (response.result) {
                this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                this.getFsspPropTransp(this.Deb.debtorCredit.id);
                this.cancelAddTran();
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

        addTranStart(){
          this.hideAll();
          this.cancelDeleteTran();
          this.getDebPropTranTypes();
          this.addFlag = true;
          this.clearData();
          this.vidType = 1;
        },
        clearData(){
          this.data.type_auto = null;
          this.data.model = null;
          this.data.number_engine = null;
          this.data.gosnumber = null;
          this.data.vin = null;
          this.data.made_year = null;
          this.data.date_start = null;
          this.data.date_end = null;
        },
        validateNumberInt: event => {
          const charCode = String.fromCharCode(event.keyCode);
          if (!/[0-9]/.test(charCode)) {
            event.preventDefault();
          }
        },
        onrowDoubleClicked(event){
          this.cancelDeleteTran();
          this.addFlag = false;
          this.clearData();
          this.getDebPropertyTranData(event.data.id).then((response) => {
            if (response.result) {
              this.getDebPropTranTypes();
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
        paginationPageSize () {
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },
        onRowClicked(event){
          this.hideAll();
          this.tranData.type = event.data.type_auto;
          this.tranData.model = event.data.model;
          this.tranData.dvig = event.data.number_engine;
          this.tranData.gos_nom = event.data.gosnumber;
          this.tranData.vin = event.data.vin;
          this.tranData.year_vip = event.data.made_year;
          this.tranData.date_start = event.data.date_start_norm;
          this.tranData.date_end = event.data.date_end_norm;
          this.tranData.gibdd_ogr = event.data.gibdd_ogr;
          this.tranData.gibdd_wanted = event.data.gibdd_wanted;
          this.tranData.arest_data = event.data.arest_data;
          this.tranData.wanted_data = event.data.wanted_data;
          this.tranData.data_from_norm = event.data.data_from_norm;
        },
        ...mapActions([
          'getDebPropTranTypes','saveDebPropertyTran','getFsspPropTransp','getDebPropertyTranData','deleteDebPropertyTran'
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
