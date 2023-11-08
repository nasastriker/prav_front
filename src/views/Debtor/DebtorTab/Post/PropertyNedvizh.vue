<template>
  <div style="height: 700px">
    <div v-if="vidType==0">
    <div style="display: flex;">
      <h5 v-if="IskData.result">
        <div class="vx-row">
          <div class="vx-col mb-2">
            <vs-checkbox disabled v-model="IskData.sum150" style="margin-bottom: 10px">
              Сумма долга >= 150 000
            </vs-checkbox>
            <vs-checkbox disabled v-model="IskData.nezhil">
              Нежилое здание/помещение
            </vs-checkbox>
          </div>
          <div class="vx-col mb-2">
            <vs-checkbox disabled v-model="IskData.zemuch" style="margin-bottom: 10px">
              Земельный участок
            </vs-checkbox>
            <vs-checkbox disabled v-model="IskData.secdom">
              Вторичное Жилое здание/помещение
            </vs-checkbox>
          </div>
          <div class="vx-col mb-2" style="width: 200px">
            <span v-if="IskData.isk"><b>Признак обращения взыскания:</b> Да</span>
            <span v-else><b>Признак обращения взыскания:</b> Нет</span>
          </div>
        </div>
      </h5>

      <vs-button style="margin-top: 10px;margin-bottom: 10px;margin-left: auto" color="success" type="filled" @click="addNedvStart"> + Новый объект недвижимости</vs-button>
    </div>
          <ag-grid-vue
              style="width: 1200px;height: 300px"
              ref="agGridTable"
              :components="components"
              :gridOptions="gridOptions"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="FsspPropertyNedvizhArr"
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
              :overlayNoRowsTemplate="'Нет недвижимости'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
      <div v-if="delNedv" style="margin-top: 15px;margin-bottom: 20px">
        <div class="vx-row">
          <div class="vx-col mb-2">
            <h4 style="margin-top: 10px">Вы действительно хотите удалить объект недвижимости кад.номер <b>{{ delNedvData.kadastr_number_norm }}</b>?</h4>
          </div>
          <div class="vx-col mb-2">
            <vs-button color="danger" type="filled" @click="deleteNedv">Удалить</vs-button>
          </div>
          <div class="vx-col mb-2">
            <vs-button color="success" type="filled" @click="cancelDeleteNedv">Отмена</vs-button>
          </div>
        </div>
      </div>

    <h5>
      <b>Наименование:</b> {{ nedvData.name_nedv }} / <b>Тип:</b> {{ nedvData.type_nedv }} <br>
      <b>Адрес:</b> {{ nedvData.adres }} <br>
      <b>Площадь:</b> {{ nedvData.s }} / <b>Кадастровый номер: </b> {{ nedvData.kad_nom }} <br>
      <b>Дата ареста: </b> {{ nedvData.date_start }} / <b>Дата снятия ареста: </b> {{ nedvData.date_end }} / <b>Источник: </b> {{ nedvData.data_from_norm }} <br>
      <b>Росреестр: </b> {{ nedvData.rosreestr_norm }} / <b>Ограничения: </b> {{ nedvData.rosreestr_ogr }}
      <span v-if="nedvData.rosreestr_ogr > 0 && !showOgrList" class="hover:text-primary cursor-pointer" @click="showOgr">[ показать ]</span>
      <span v-else-if="nedvData.rosreestr_ogr > 0 && showOgrList" class="hover:text-primary cursor-pointer" @click="hideOgr">[ скрыть ]</span>

      <div v-if="showOgrList" style="margin-top: 20px">
        <h5><b>Ограничения из Росреестра:</b></h5>
        <div v-for="(ogr_item, index) in nedvData.rosreestr_ogr_data">
          <h5>{{ index + 1 }}. {{ ogr_item.typeDesc }} от {{ ogr_item.startDateNorm }} (Номер: {{ ogr_item.encumbranceNumberNorm }})</h5>
        </div>
      </div>
    </h5>
    </div>
    <div v-if="vidType==1">
      <div>Наименование</div>
      <v-select class="w-50 " :options="DebPropNedvNaimTypes" v-model="data.name_nedv"></v-select>
      <div style="margin-top: 10px">Тип</div>
      <v-select class="w-50 " :options="DebPropNedvTypeTypes" v-model="data.type_nedv"></v-select>
      <div style="margin-top: 10px">Кадастровый номер</div>
      <vs-input class="w-full" v-model="data.kadastr_number"></vs-input>
      <div style="margin-top: 10px">Адрес</div>
      <vs-input class="w-full" v-model="data.address"></vs-input>
      <div style="margin-top: 10px">Площадь</div>
      <vs-input class="w-50" v-model="data.s_nedv" @keypress="validateNumberDecimal"></vs-input>
      <div style="margin-top: 10px">Дата ареста</div>
      <vs-input type="date" class="w-100" v-model="data.date_start"></vs-input>
      <div style="margin-top: 10px">Дата снятия ареста</div>
      <vs-input type="date" class="w-100" v-model="data.date_end"></vs-input>

      <div class="vx-row" style="margin-top: 20px">
        <div class="vx-col mb-2">
          <vs-button v-if="addFlag" color="success" type="filled" @click="addNedv">Добавить</vs-button>
          <vs-button v-else color="success" type="filled" @click="addNedv">Изменить</vs-button>
        </div>
        <div class="vx-col mb-2">
          <vs-button color="danger" type="filled" @click="cancelAddNedv">Отмена</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import { mapActions,mapGetters } from 'vuex';
    import vSelect from 'vue-select';
    import OperPropertyNedv from "./Render/OperPropertyNedv.vue";
    export default {
        components: {
            'v-select': vSelect,AgGridVue,OperPropertyNedv
        },
        data () {
            return {
              delNedv:false,
              delNedvData:{},
              data:{
                name_nedv:null,
                type_nedv:null,
                kadastr_number:null,
                address:null,
                s_nedv:null,
                date_start:null,
                date_end:null,
              },
              addFlag:false,
              vidType:0,
              nedvData:{
                type:'',
                adres:'',
                s:'',
                kad_nom:'',
                date_start:'',
                date_end:'',
                obr:'',
              },
              showIskData:false,
              showOgrList:false,
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
                  field: 'name_nedv',
                  filter: true,
                  width: 150,
                },
                {
                  headerName: 'Тип',
                  field: 'type_nedv',
                  filter: true,
                  width: 150,
                },
                {
                  headerName: 'Площадь',
                  field: 's_nedv',
                  filter: true,
                  width: 70,
                },
                {
                  headerName: 'Кадастровый номер',
                  field: 'kadastr_number_norm',
                  filter: true,
                  width: 100,
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
                  headerName: 'Росреестр',
                  field: 'rosreestr_norm',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Ограничения',
                  field: 'rosreestr_ogr',
                  filter: true,
                  width: 80,
                },
                {
                  headerName: '',
                  field: 'id',
                  filter: true,
                  width: 20,
                  cellRendererFramework: 'OperPropertyNedv',
                  cellRendererParams: {
                    questionDeleteNedv: this.questionDeleteNedv.bind(this)
                  }
                },

              ],
              components: {
                OperPropertyNedv
              }
            }
        },
      computed: {
        ...mapGetters([
          'FsspPropertyNedvizhArr','Deb','IskData','DebPropNedvNaimTypes','DebPropNedvTypeTypes'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api
        },
      methods: {
        cancelDeleteNedv(){
          this.delNedvData = {};
          this.delNedv = false;
        },
        questionDeleteNedv(data){
          this.delNedvData = data;
          this.delNedv = true;
        },
        deleteNedv(){
          this.deleteDebPropertyNedv(this.delNedvData.id).then((response) => {
            if (response.result) {
              this.$vs.notify({title: 'Успешно', text: 'Удалено!!!', color: 'success', position: 'top-center'})
              this.getFsspPropNedvizh(this.Deb.debtorCredit.id);
              this.cancelDeleteNedv();
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

        addNedv(){
          let flag = true;

          if (this.data.name_nedv == null){
            flag = false;
          }
          if (this.data.kadastr_number == null || this.data.kadastr_number.trim() == ''){
            flag = false;
          }
          if (this.data.address == null || this.data.address.trim() == ''){
            flag = false;
          }

          if (flag) {
            this.data.id_credit = this.Deb.debtorCredit.id;
            this.data.add_flag = this.addFlag;
            this.saveDebPropertyNedv(this.data).then((response) => {
              if (response.result) {
                this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                this.getFsspPropNedvizh(this.Deb.debtorCredit.id);
                this.cancelAddNedv();
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
        addNedvStart(){
          this.cancelDeleteNedv();
          this.getDebPropNedvNaimTypes();
          this.getDebPropNedvTypeTypes();
          this.addFlag = true;
          this.clearData();
          this.vidType = 1;
        },
        cancelAddNedv(){
          this.clearData();
          this.vidType = 0;
          this.gridApi = this.gridOptions.api
        },

        showOgr(){
          this.showOgrList = true;
        },
        hideOgr(){
          this.showOgrList = false;
        },
        clearData(){
          this.data.name_nedv = null;
          this.data.type_nedv = null;
          this.data.kadastr_number = null;
          this.data.address = null;
          this.data.s_nedv = null;
          this.data.date_start = null;
          this.data.date_end = null;
        },
        validateNumberDecimal: event => {
          const charCode = String.fromCharCode(event.keyCode);
          if (!/[0-9,.]/.test(charCode)) {
            event.preventDefault();
          }
        },
        onrowDoubleClicked(event){
          this.cancelDeleteNedv();
          this.addFlag = false;
          this.clearData();
          this.getDebPropertyNedvData(event.data.id).then((response) => {
            if (response.result) {
              this.getDebPropNedvNaimTypes();
              this.getDebPropNedvTypeTypes();
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
          this.hideOgr();
          this.nedvData.name_nedv = event.data.name_nedv;
          this.nedvData.type_nedv = event.data.type_nedv;
          this.nedvData.adres = event.data.address;
          this.nedvData.s = event.data.s_nedv;
          this.nedvData.kad_nom = event.data.kadastr_number_norm;
          this.nedvData.date_start = event.data.date_start_norm;
          this.nedvData.date_end = event.data.date_end_norm;
          this.nedvData.rosreestr_norm = event.data.rosreestr_norm;
          this.nedvData.rosreestr_ogr = event.data.rosreestr_ogr;
          this.nedvData.rosreestr_ogr_data = event.data.rosreestr_ogr_data;
          this.nedvData.data_from_norm = event.data.data_from_norm;
          this.nedvData.obr = event.data.priznak_ov;
        },

        ...mapActions([
          'getDebPropNedvNaimTypes','saveDebPropertyNedv','getFsspPropNedvizh','getDebPropertyNedvData',
            'deleteDebPropertyNedv','getDebPropNedvTypeTypes'
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
