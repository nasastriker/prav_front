<template>
  <div>
    <fieldset class="f">
      <legend class="l">Условия</legend>

      <div>
        <vs-radio vs-value="1" vs-name="is_peremen_flag" v-model="is_peremen" @change="clickRadioPerem">Переменная</vs-radio>
      </div>
      <div style="margin-top: 10px;margin-left: 20px" v-if="is_peremen === '1'">
        <span v-if="status.newVar" style="color:blue">Введите название переменной (например <span style="color:green">${dc_number_dog} или ${code_peremen}</span>) и нажмите Enter</span>
        <span v-if="status.checkVar" style="color:green">Переменная распознана <span
            v-if="ConditionVar.description!==''">({{ ConditionVar.description }})</span></span>
        <span v-if="status.errVar" style="color:red">{{ ConditionVar.Var.error }}</span>

        <vs-input v-if="editVarFlag" disabled v-model="ConditionVar.var"></vs-input>
        <vs-input v-else v-model="ConditionVar.var" @keyup.enter="addVar" @input="inputVar"></vs-input>

        <div v-if="status.conVar" style="margin-top: 10px;">
          <span style="color:blue">Выберите условие</span>
          <v-select
              v-if="ConditionVar.var_type==='int'||ConditionVar.var_type==='decimal'||ConditionVar.var_type==='bigint'"
              style="margin-bottom: 10px" :options="Con.intAndDecimalValue" v-model="ConditionVar.var_condition"
              @input="changeCondition"></v-select>
          <v-select v-if="ConditionVar.var_type==='tinyint'" style="margin-bottom: 10px" :options="Con.tinyintValue"
                    v-model="ConditionVar.var_condition" @input="changeCondition"></v-select>
          <v-select v-if="ConditionVar.var_type==='varchar'||ConditionVar.var_type==='text'" style="margin-bottom: 10px"
                    :options="Con.varcharAndNextValue" v-model="ConditionVar.var_condition"
                    @input="changeCondition"></v-select>
          <v-select v-if="ConditionVar.var_type==='date'" style="margin-bottom: 10px" :options="Con.dateValue"
                    v-model="ConditionVar.var_condition" @input="changeCondition"></v-select>
        </div>
      </div>

      <div style="margin-top: 20px">
        <vs-radio vs-value="2" vs-name="is_peremen_flag" v-model="is_peremen" @change="clickRadioFormula">Формула / Функция</vs-radio>
      </div>
      <div style="margin-top: 10px;margin-left: 20px" v-if="is_peremen === '2'">
        <span v-if="status.newVar" style="color:blue">Введите формулу (например <span style="color:green">=${date}-${dc_date_sa}</span>), функцию (например <span
            style="color:green">=НАЗВАНИЕФУНКЦИИ()</span>) и нажмите Enter
        </span>
        <vs-input v-if="editVarFlag" disabled class="w-full" v-model="ConditionVar.var_formula"></vs-input>
        <vs-input v-else class="w-full" v-model="ConditionVar.var_formula" @keyup.enter="addFormulaVar" @input="inputVar"></vs-input>
<!--        <vs-textarea height="100px" rows="3" v-model="ConditionVar.var_formula" @keyup.enter="addFormulaVar" @input="inputVar"></vs-textarea>-->

        <div v-if="status.conVar" style="margin-top: 10px;">
          <span style="color:blue">Выберите условие</span>
          <v-select style="margin-bottom: 10px"
                    :options="Con.formulaValue" v-model="ConditionVar.var_condition"
                    @input="changeCondition"></v-select>
        </div>
      </div>

      <div v-if="status.valueVar" style="margin-top: 10px;margin-left: 20px">
        <span style="color:blue">Установите значение переменной</span>
        <div v-if="ConditionVar.var_type==='int'||ConditionVar.var_type==='bigint'">
          <vs-radio vs-name="value_type_flag" color="success" vs-value="default" v-model="ConditionVar.value_type" @change="clickRadioVal">
            <span>Значение</span>
            <vs-input v-if="ConditionVar.value_type === 'default'" v-model="ConditionVar.value"
                      @keypress="validateNumberInt"></vs-input>
            <vs-input v-else disabled></vs-input>
          </vs-radio>
        </div>

        <div v-if="ConditionVar.var_type==='decimal'">
          <vs-radio vs-name="value_type_flag" color="success" vs-value="default" v-model="ConditionVar.value_type" @change="clickRadioVal">
            <span>Значение</span>
            <vs-input v-if="ConditionVar.value_type === 'default'" v-model="ConditionVar.value"
                      @keypress="validateNumberDecimal"></vs-input>
            <vs-input v-else disabled></vs-input>
          </vs-radio>
        </div>

        <div v-if="ConditionVar.var_type==='varchar'||ConditionVar.var_type==='text'">
          <vs-radio vs-name="value_type_flag" color="success" vs-value="default" v-model="ConditionVar.value_type" @change="clickRadioVal">
            <span>Значение</span>
            <vs-input v-if="ConditionVar.value_type === 'default'" v-model="ConditionVar.value"></vs-input>
            <vs-input v-else disabled></vs-input>
          </vs-radio>
        </div>

        <div style="margin-top: 10px" v-if="ConditionVar.var_type==='date'">
          <div>
            <vs-radio vs-name="value_type_flag" color="success" vs-value="default" v-model="ConditionVar.value_type" @change="clickRadioVal">Значение</vs-radio>
          </div>
          <div v-if="ConditionVar.value_type === 'default'" style="margin-left: 15px;margin-top: 10px;">
            <vs-radio vs-name="date_type_flag" color="warning" vs-value="norm" v-model="ConditionVar.date_type" @change="clickRadioVal">
              <span>Дата</span>
              <div>
                <vs-input v-if="ConditionVar.date_type === 'norm'" type="date" v-model="ConditionVar.value"></vs-input>
                <vs-input v-else disabled type="date"></vs-input>
              </div>
            </vs-radio>
            <vs-radio vs-name="date_type_flag" color="warning" style="margin-left: 10px" vs-value="days" v-model="ConditionVar.date_type" @change="clickRadioVal">
              <span>Количество дней от даты</span>
              <div>
                <vs-input v-if="ConditionVar.date_type === 'days'" v-model="ConditionVar.value"
                          @keypress="validateNumberInt"></vs-input>
                <vs-input v-else disabled></vs-input>
              </div>
            </vs-radio>
          </div>
          <div v-else style="margin-left: 15px;margin-top: 10px;">
            <vs-radio color="warning" vs-name="date_type_flag" disabled vs-value="norm" v-model="ConditionVar.date_type">
              <span>Дата</span>
              <vs-input disabled type="date"></vs-input>
            </vs-radio>
            <vs-radio color="warning" vs-name="date_type_flag" disabled style="margin-left: 10px" vs-value="days" v-model="ConditionVar.date_type">
              <span>Количество дней от даты</span>
              <vs-input disabled></vs-input>
            </vs-radio>
          </div>
        </div>

        <div v-if="ConditionVar.var_type==='tinyint'">
          <div>
            <vs-radio vs-name="value_type_flag" color="success" vs-value="default" v-model="ConditionVar.value_type" @change="clickRadioVal">Значение</vs-radio>
          </div>
          <div v-if="ConditionVar.value_type === 'default'" style="margin-left: 15px;margin-top: 10px;">
            <vs-radio color="warning" vs-name="tinyint_val_flag" vs-value="1" v-model="ConditionVar.value">Да</vs-radio>
            <vs-radio color="warning" vs-name="tinyint_val_flag" vs-value="0" v-model="ConditionVar.value">Нет</vs-radio>
          </div>
          <div v-else style="margin-left: 15px;margin-top: 10px;">
            <vs-radio color="warning" disabled>Да</vs-radio>
            <vs-radio color="warning" disabled>Нет</vs-radio>
          </div>
        </div>

        <div v-if="ConditionVar.var_type==='formula'">
          <vs-radio vs-name="value_type_flag" color="success" vs-value="default" v-model="ConditionVar.value_type" @change="clickRadioVal">
            <span>Значение</span>
            <vs-input v-if="ConditionVar.value_type === 'default'" v-model="ConditionVar.value"></vs-input>
            <vs-input v-else disabled></vs-input>
          </vs-radio>
          <vs-radio vs-name="value_type_flag" style="margin-left: 15px" color="success" vs-value="date" v-model="ConditionVar.value_type" @change="clickRadioVal">
            <span>Дата</span>
            <vs-input type="date" v-if="ConditionVar.value_type === 'date'" v-model="ConditionVar.value"></vs-input>
            <vs-input type="date" v-else disabled></vs-input>
          </vs-radio>
        </div>

        <div>
          <vs-radio color="success" vs-name="value_type_flag" style="margin-top: 10px" vs-value="formula" v-model="ConditionVar.value_type" @change="clickRadioVal">
          <span>Формула (например <span style="color:green">=${date}-${dc_date_sa}</span>) / Функция (например <span style="color:green">=НАЗВАНИЕФУНКЦИИ()</span>)</span>
            <vs-input class="w-full" v-if="ConditionVar.value_type === 'formula'" v-model="ConditionVar.value_formula"></vs-input>
            <vs-input v-else disabled></vs-input>
<!--            <vs-textarea v-if="ConditionVar.value_type === 'formula'" height="100px" rows="3" v-model="ConditionVar.value_formula"></vs-textarea>-->
<!--            <vs-textarea v-else disabled></vs-textarea>-->
          </vs-radio>
        </div>

        <div>
          <vs-radio color="success" vs-name="value_type_flag" style="margin-top: 10px" vs-value="field" v-model="ConditionVar.value_type" @change="clickRadioVal">
          <span>Переменная (например <span style="color:green">${dc_number_dog} или ${code_peremen}</span>)</span>
            <vs-input v-if="ConditionVar.value_type === 'field'" v-model="ConditionVar.value"></vs-input>
            <vs-input v-else disabled></vs-input>
          </vs-radio>
        </div>
      </div>

      <div v-if="editVarFlag" style="margin-top: 10px;text-align: center">
        <vs-button color="success" v-if="status.valueVar" size="normal" @click="editSaveCondCheck">Изменить</vs-button>
        <vs-button color="danger" v-if="status.valueVar" size="normal" @click="cancelEditCond">Отмена</vs-button>
      </div>
      <div v-else style="margin-top: 10px;text-align: center">
        <vs-button v-if="status.valueVar" size="normal" @click="saveCond">Добавить</vs-button>
      </div>
      <div style="margin-top: 20px">
        [ <span class="hover:text-primary cursor-pointer" @click="clearCondVars" title="Очистить список условий">очистить</span> ]
      </div>
      <ag-grid-vue
          style="height: 200px"
          ref="agGridTable"
          :gridOptions="gridOptionsCond"
          :components="components"
          class="ag-theme-material w-100 ag-grid-table"
          :columnDefs="columnDefsCond"
          :defaultColDef="defaultColDefCond"
          :rowData="condArr"
          rowSelection="multiple"
          :rowDataChanged="onRowDataChangedCond"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSizeCond"
          :suppressPaginationPanel="true"
          @grid-size-changed="onGridSizeChangedCond"
          @column-resized="onColumnResizedCond"
          @column-visible="onColumnVisibleCond"
          @rowDoubleClicked="onrowDoubleClickedCond"
          :overlayNoRowsTemplate="'Нет условий'"
          :enableRtl="$vs.rtl">
      </ag-grid-vue>
    </fieldset>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from "../../axios";
import r from "../../route";
import OperConditionVars from "./Render/OperConditionVars.vue";
import OpenTitle from "./Render/OpenTitle.vue";

export default {
  components: {
    OperConditionVars, OpenTitle
  },
  data() {
    return {
      is_peremen: '1',
      Con: {
        intAndDecimalValue: ['равно', 'больше', 'меньше', 'больше или равно', 'меньше или равно', 'не равно'],
        varcharAndNextValue: ['равно', 'содержит', 'больше или равно', 'меньше или равно', 'не равно'],
        tinyintValue: ['равно'],
        dateValue: ['равно', 'больше', 'меньше', 'больше или равно', 'меньше или равно', 'не равно'],
        formulaValue: ['равно', 'больше', 'меньше', 'больше или равно', 'меньше или равно', 'содержит', 'не равно'],
      },
      status: {
        newVar: true,
        checkVar: false,
        errVar: false,
        conVar: false,
        valueVar: false,
      },
      ConditionVar: {
        id: 'new',

        varWithoutPrefix: '',
        var: '',
        var_formula: '',
        var_type: '',

        var_condition: '',

        value: null,
        value_formula: null,
        value_type: 'default',
        date_type: 'norm',

        description: '',
        user: '',
        user_id: 0,
        date_add: '',
        date_edit: '',
      },
      editVarFlag: false,
      condArr: [],

      gridApiCond: null,
      gridOptionsCond: {},
      defaultColDefCond: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefsCond: [
        {
          headerName: 'Переменная',
          field: 'var',
          filter: true,
          width: 150,
          cellRendererFramework: 'OpenTitle',
        },
        {
          headerName: 'Формула',
          field: 'var_formula',
          filter: true,
          width: 150,
          cellRendererFramework: 'OpenTitle',
        },
        {
          headerName: 'Описание',
          field: 'description',
          filter: true,
          width: 200,
          cellRendererFramework: 'OpenTitle',
        },
        {
          headerName: 'Условие',
          field: 'var_condition',
          filter: true,
          width: 100,
          cellRendererFramework: 'OpenTitle',
        },
        {
          headerName: 'Значение',
          field: 'value',
          filter: true,
          width: 100,
          cellRendererFramework: 'OpenTitle',
        },
        {
          headerName: 'Значение (Формула)',
          field: 'value_formula',
          filter: true,
          width: 100,
          cellRendererFramework: 'OpenTitle',
        },
        {
          headerName: '',
          field: 'id',
          filter: true,
          width: 50,
          cellRendererFramework: 'OperConditionVars',
          cellRendererParams: {
            edit_var: this.editVar.bind(this),
            delete_var: this.deleteVar.bind(this),
          }
        },
      ],
      components: {
        OperConditionVars, OpenTitle
      }
    }
  },

  computed: {
    paginationPageSizeCond() {
      if (this.gridApiCond) return this.gridApiCond.paginationGetPageSize()
      else return 100
    },
    ...mapGetters([
      'User'
    ]),
  },
  methods: {
    clickRadioVal(){
      this.ConditionVar.value_formula = null;
      this.ConditionVar.value = null;
    },
    clickRadioPerem() {
      this.inputVar();
      this.condVarClear();
      this.editVarFlag = false;
    },
    clickRadioFormula() {
      this.clickRadioPerem();
      this.ConditionVar.var_type = "formula";
    },

    addFormulaVar() {
      if (this.ConditionVar.var_formula.trim() !== '') {
        this.status.newVar = false
        this.status.errVar = false
        this.status.checkVar = true
        this.status.conVar = true
      } else {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните поле!',
          color: 'danger',
          position: 'top-center'
        })
      }
    },

    addVar() {
      if (this.ConditionVar.var.trim() === '') {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните поле!',
          color: 'danger',
          position: 'top-center'
        })
        return;
      }

      axios.get(r('taskConditions.index'), {
        params: {
          method: 'checkVar',
          param: this.ConditionVar.var
        }
      }).then(res => {
        if (res.data.result) {
          this.ConditionVar.varWithoutPrefix = res.data.name
          this.ConditionVar.var_type = res.data.type
          this.ConditionVar.description = res.data.description
          // if (!this.containsInCondArr(this.ConditionVar)) {
            this.status.newVar = false
            this.status.errVar = false
            this.status.checkVar = true
            this.status.conVar = true
          // } else {
          //   this.$vs.notify({
          //     title: 'Ошибка',
          //     text: 'Данная переменная уже есть!',
          //     color: 'danger',
          //     position: 'top-center'
          //   })
          // }
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: res.data.error,
            color: 'danger',
            position: 'top-center'
          })
          this.ConditionVar.Var.error = res.data.error
          this.status.newVar = false
          this.status.errVar = true
          this.status.checkVar = false
          this.status.conVar = false
          this.status.valueVar = false
        }
      })
    },
    // containsInCondArr(elem) {
    //   for (var i = 0; i < this.condArr.length; i++) {
    //     if (this.condArr[i].varWithoutPrefix === elem.varWithoutPrefix) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },
    inputVar() {
      this.status.newVar = true;
      this.status.errVar = false;
      this.status.checkVar = false;
      this.status.conVar = false;
      this.status.valueVar = false;
    },
    changeCondition() {
      if (this.ConditionVar.var_condition !== null && this.ConditionVar.var_condition !== '') {
        this.status.valueVar = true;
      } else {
        this.status.valueVar = false;
      }
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
    saveEditCond() {
      for (var i = 0; i < this.condArr.length; i++) {
        if (this.condArr[i].id === this.ConditionVar.id) {
          this.ConditionVar.user = this.User.name_family + ' ' + this.User.name;
          this.ConditionVar.user_id = this.User.id;
          this.ConditionVar.date_edit = new Date();
          let cond_var_copy = {};
          Object.assign(cond_var_copy, this.ConditionVar);
          this.condArr.splice(i, 1, cond_var_copy);
          this.inputVar();
          this.condVarClear();
          this.is_peremen = '1';
          this.editVarFlag = false;
          this.getCondArr();
          break;
        }
      }
    },
    condVarClear() {
      this.ConditionVar.id = 'new'

      this.ConditionVar.varWithoutPrefix = ''
      this.ConditionVar.var = ''
      this.ConditionVar.var_formula = ''
      this.ConditionVar.var_type = ''

      this.ConditionVar.var_condition = ''

      this.ConditionVar.value = null
      this.ConditionVar.value_formula = null
      this.ConditionVar.value_type = 'default'
      this.ConditionVar.date_type = 'norm'

      this.ConditionVar.description = ''
      this.ConditionVar.user = ''
      this.ConditionVar.user_id = 0
      this.ConditionVar.date_add = ''
      this.ConditionVar.date_edit = ''
    },
    cancelEditCond() {
      this.inputVar();
      this.condVarClear();
      this.is_peremen = '1';
      this.editVarFlag = false;
    },
    saveCond() {
      if (this.ConditionVar.value_type === "formula"){
        if (this.ConditionVar.value_formula == null || this.ConditionVar.value_formula.trim() === '') {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Заполните поле Формула/Функция!',
            color: 'danger',
            position: 'top-center'
          })
        } else {
          this.saveMain();
        }
      } else {
        if (this.ConditionVar.value_type === "field") {
          if (this.ConditionVar.value == null || this.ConditionVar.value.trim() === '') {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Заполните поле Переменная!',
              color: 'danger',
              position: 'top-center'
            })
          } else {
            axios.get(r('taskConditions.index'), {
              params: {
                method: 'checkVar',
                param: this.ConditionVar.value
              }
            }).then(res => {
              if (res.data.result) {
                this.saveMain();
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: res.data.error,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            })
          }
        } else {
          this.saveMain();
        }
      }
    },
    editSaveCondCheck(){
      if (this.ConditionVar.value_type === "formula"){
        if (this.ConditionVar.value_formula == null || this.ConditionVar.value_formula.trim() === '') {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Заполните поле Формула/Функция!',
            color: 'danger',
            position: 'top-center'
          })
        } else {
          this.saveEditCond();
        }
      } else {
        if (this.ConditionVar.value_type === "field") {
          if (this.ConditionVar.value == null || this.ConditionVar.value.trim() === '') {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Заполните поле Переменная!',
              color: 'danger',
              position: 'top-center'
            })
          } else {
            axios.get(r('taskConditions.index'), {
              params: {
                method: 'checkVar',
                param: this.ConditionVar.value
              }
            }).then(res => {
              if (res.data.result) {
                this.saveEditCond();
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: res.data.error,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            })
          }
        } else {
          this.saveEditCond();
        }
      }
    },
    saveMain(){
      // if (!this.containsInCondArr(this.ConditionVar)) {
      this.ConditionVar.user = this.User.name_family + ' ' + this.User.name;
      this.ConditionVar.user_id = this.User.id;
      this.ConditionVar.date_add = new Date();
      let cond_var_copy = {};
      Object.assign(cond_var_copy, this.ConditionVar);
      cond_var_copy.id = Date.now();
      this.condArr.push(cond_var_copy);
      this.inputVar();
      this.condVarClear();
      this.is_peremen = '1';
      this.getCondArr();
      // } else {
      //   this.$vs.notify({
      //     title: 'Ошибка',
      //     text: 'Данная переменная уже есть!',
      //     color: 'danger',
      //     position: 'top-center'
      //   })
      // }
    },
    clearCondVars() {
      this.condArr = [];
      this.getCondArr();
    },
    editVar(id) {
      for (var i = 0; i < this.condArr.length; i++) {
        if (this.condArr[i].id === id) {
          this.setConVar(this.condArr[i]);
          this.setIsPeremen(this.ConditionVar.var_type);
          this.status.newVar = false
          this.status.errVar = false
          this.status.checkVar = true
          this.status.conVar = true
          this.status.valueVar = true
          this.editVarFlag = true
          break
        }
      }
      // console.log(this.ConditionVar, this.is_peremen)
    },
    setIsPeremen(var_type){
      if (var_type === 'formula'){
        this.is_peremen = '2';
      } else {
        this.is_peremen = '1';
      }
    },
    setConVar(elem) {
      this.ConditionVar.id = elem.id
      this.ConditionVar.var = elem.var
      this.ConditionVar.var_formula = elem.var_formula
      this.ConditionVar.var_type = elem.var_type
      this.ConditionVar.var_condition = elem.var_condition
      this.ConditionVar.value = elem.value
      this.ConditionVar.value_formula = elem.value_formula
      this.ConditionVar.value_type = elem.value_type
      this.ConditionVar.description = elem.description
      this.ConditionVar.user = elem.user
      this.ConditionVar.user_id = elem.user_id
      this.ConditionVar.date_add = elem.date_add
      this.ConditionVar.date_edit = elem.date_edit
      this.ConditionVar.date_type = elem.date_type
      this.ConditionVar.varWithoutPrefix = elem.varWithoutPrefix
    },
    deleteVar(id) {
      for (var i = 0; i < this.condArr.length; i++) {
        if (this.condArr[i].id === id) {
          this.condArr.splice(i, 1);
          this.getCondArr();
          return true;
        }
      }
      return false;
    },
    getCondArr() {
      this.$emit('getCondData', this.condArr);
    },
    setCondData(data) {
      this.condArr = data;
    },

    onRowDataChangedCond() {
      Vue.nextTick(() => {
            this.gridOptionsCond.api.sizeColumnsToFit();
          }
      );
    },
    onGridSizeChangedCond(params) {
      if (params.clientWidth > 500) {
        this.gridApiCond.sizeColumnsToFit();
      } else {
        this.columnDefsCond.forEach(x => {
          x.width = 300;
        });
        this.gridApiCond.setColumnDefs(this.columnDefsCond);
      }
    },
    onColumnResizedCond(params) {
      params.api.resetRowHeights();
    },
    onColumnVisibleCond(params) {
      params.api.resetRowHeights();
    },
    onrowDoubleClickedCond(event) {
      this.editVar(event.data.id);
    },
  },
  mounted() {
    this.gridApiCond = this.gridOptionsCond.api;
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

.f {
  border: 1px;
  border-style: double;
  border-color: #62626262;
  border-radius: 8px;
  padding: 15px;
}

.l {
  color: #a00;
  padding: 0 10px;
}
</style>
