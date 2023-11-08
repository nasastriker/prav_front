<template>
    <div>
      <fieldset class="f">
        <legend class="l">Условия</legend>
        <span v-if="status.newVar" style="color:blue">Введите название переменной (например <span style="color:green"> ${dc_number_dog}</span>) и нажмите Enter</span>
        <span v-if="status.checkVar" style="color:green">Переменная распознана <span v-if="ConditionVar.description!==''">({{ConditionVar.description}})</span></span>
        <span v-if="status.errVar" style="color:red">{{ConditionVar.Var.error}}</span>
        <div v-if="editVarFlag">
          <vs-input disabled v-model="ConditionVar.var"></vs-input>
        </div>
        <div v-else>
          <vs-input v-model="ConditionVar.var" @keyup.enter="addVar" @input="inputVar"></vs-input>
        </div>
        <div v-if="status.conVar" style="margin-top: 10px;">
          <span style="color:blue">Выберите условие</span>
          <v-select v-if="ConditionVar.type==='int'||ConditionVar.type==='decimal'||ConditionVar.type==='bigint'" style="margin-bottom: 10px" :options="Con.intAndDecimalValue" v-model="ConditionVar.var_condition" @input="changeCondition"></v-select>
          <v-select v-if="ConditionVar.type==='tinyint'" style="margin-bottom: 10px" :options="Con.tinyintValue" v-model="ConditionVar.var_condition" @input="changeCondition"></v-select>
          <v-select v-if="ConditionVar.type==='varchar'||ConditionVar.type==='text'" style="margin-bottom: 10px" :options="Con.varcharAndNextValue" v-model="ConditionVar.var_condition" @input="changeCondition"></v-select>
          <v-select v-if="ConditionVar.type==='date'" style="margin-bottom: 10px" :options="Con.dateValue" v-model="ConditionVar.var_condition" @input="changeCondition"></v-select>
        </div>
        <div v-if="status.valueVar" style="margin-top: 10px">
          <span style="color:blue">Установите значение переменной</span>
          <vs-input v-if="ConditionVar.type==='int'||ConditionVar.type==='bigint'" v-model="ConditionVar.value" @keypress="validateNumberInt"></vs-input>
          <vs-input v-if="ConditionVar.type==='decimal'" v-model="ConditionVar.value" @keypress="validateNumberDecimal"></vs-input>
          <vs-input v-if="ConditionVar.type==='varchar'||ConditionVar.type==='text'" v-model="ConditionVar.value"></vs-input>
          <div style="margin-top: 10px" v-if="ConditionVar.type==='date'">
            <vs-radio vs-value="norm" v-model="ConditionVar.date_type">
              <span>Значение</span>
              <vs-input v-if="ConditionVar.date_type == 'norm'" type="date" v-model="ConditionVar.value"></vs-input>
              <vs-input v-else disabled type="date"></vs-input>
            </vs-radio>
            <vs-radio style="margin-left: 10px" vs-value="days" v-model="ConditionVar.date_type">
              <span>Количество дней от даты</span>
              <vs-input v-if="ConditionVar.date_type == 'days'" v-model="ConditionVar.value" @keypress="validateNumberInt"></vs-input>
              <vs-input v-else disabled></vs-input>
            </vs-radio>
          </div>
          <div v-if="ConditionVar.type==='tinyint'">
            <vs-radio vs-value="1" v-model="ConditionVar.value">Да</vs-radio>
            <vs-radio vs-value="0" v-model="ConditionVar.value">Нет</vs-radio>
          </div>
        </div>
        <div v-if="editVarFlag" style="margin-top: 10px;text-align: center">
          <vs-button color="success" v-if="status.valueVar" size="normal" @click="saveEditCond">Изменить</vs-button>
          <vs-button color="danger" v-if="status.valueVar" size="normal" @click="cancelEditCond">Отмена</vs-button>
        </div>
        <div v-else style="margin-top: 10px;text-align: center">
          <vs-button v-if="status.valueVar" size="normal" @click="saveCond">Добавить</vs-button>
        </div>
        <div>
          [ <span class="hover:text-primary cursor-pointer" @click="clearCondVars">очистить</span> ]
        </div>
        <ag-grid-vue
            style="height: 200px"
            ref="agGridTable"
            :gridOptions="gridOptionsCond"
            :components="components"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefsCond"
            :defaultColDef="defaultColDefCond"
            :rowData="condArr"
            rowSelection="multiple"
            :rowDataChanged = "onRowDataChangedCond"
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
    import {mapActions, mapGetters} from 'vuex';
    import axios from "../../../../axios";
    import r from "../../../../route";
    import Vue from "vue";
    import OperConditionVars from "./OperConditionVars.vue";
    import OpenTitle from "./OpenTitle.vue";
    export default {
      components: {
        OperConditionVars,OpenTitle
      },
      data() {
        return {
          Con:{
            intAndDecimalValue:['равно','больше','меньше','больше или равно','меньше или равно','не равно'],
            varcharAndNextValue:['равно','содержит','больше или равно','меньше или равно','не равно'],
            tinyintValue:['равно'],
            dateValue:['равно','больше','меньше','больше или равно','меньше или равно','не равно'],
          },
          status: {
            newVar: true,
            checkVar: false,
            errVar: false,
            conVar: false,
            valueVar: false,
          },
          ConditionVar:{
            id:'new',
            idtask:0,
            id_stad:0,
            var:'',
            var_condition:'',
            value:'',
            type:'',
            description:'',
            user:'',
            user_id:0,
            date_add:'',
            date_edit:'',
            date_type:null,
          },
          editVarFlag:false,
          condArr:[],

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
              headerName: '',
              field: 'id',
              filter: true,
              width: 100,
              cellRendererFramework: 'OperConditionVars',
              cellRendererParams: {
                edit_var: this.editVar.bind(this),
                delete_var: this.deleteVar.bind(this),
              }
            },
          ],
          components: {
            OperConditionVars,OpenTitle
          }
        }
      },

      computed: {
        paginationPageSizeCond () {
          if (this.gridApiCond) return this.gridApiCond.paginationGetPageSize()
          else return 100
        },
        ...mapGetters([
            'User'
        ]),
      },
      methods: {
        addVar() {
          axios.get(r('taskConditions.index'), {
            params: {
              method: 'checkVar',
              param: this.ConditionVar.var
            }
          }).then(res => {
            if (res.data.result) {
              this.ConditionVar.varWithoutPrefix = res.data.name
              this.ConditionVar.type = res.data.type
              this.ConditionVar.description = res.data.description
              if (!this.containsInCondArr(this.ConditionVar)) {
                this.status.newVar = false
                this.status.errVar = false
                this.status.checkVar = true
                this.status.conVar = true
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Данная переменная уже есть!',
                  color: 'danger',
                  position: 'top-center'
                })
              }
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
        containsInCondArr(elem) {
          for (var i = 0; i < this.condArr.length; i++) {
            if (this.condArr[i].varWithoutPrefix === elem.varWithoutPrefix) {
              return true;
            }
          }
          return false;
        },
        inputVar(){
          this.status.newVar = true;
          this.status.errVar = false;
          this.status.checkVar = false;
          this.status.conVar = false;
          this.status.valueVar = false;
        },
        changeCondition(){
          if (this.ConditionVar.var_condition!==null && this.ConditionVar.var_condition!==''){
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
        saveEditCond(){
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
              this.editVarFlag = false;
              this.getCondArr();
              break;
            }
          }
        },
        condVarClear(){
          this.ConditionVar.id = 'new'
          this.ConditionVar.idtask = 0
          this.ConditionVar.var = ''
          this.ConditionVar.var_condition = ''
          this.ConditionVar.value = ''
          this.ConditionVar.type = ''
          this.ConditionVar.description = ''
          this.ConditionVar.user = ''
          this.ConditionVar.user_id = 0
          this.ConditionVar.date_add = ''
          this.ConditionVar.date_edit = ''
          this.ConditionVar.date_type = null
          this.ConditionVar.varWithoutPrefix = ''
        },
        cancelEditCond(){
          this.inputVar();
          this.condVarClear();
          this.editVarFlag = false;
        },
        saveCond(){
          if (!this.containsInCondArr(this.ConditionVar)) {
            this.ConditionVar.user = this.User.name_family + ' ' + this.User.name;
            this.ConditionVar.user_id = this.User.id;
            this.ConditionVar.date_add = new Date();
            let cond_var_copy = {};
            Object.assign(cond_var_copy, this.ConditionVar);
            cond_var_copy.id = Date.now();
            this.condArr.push(cond_var_copy);
            this.inputVar();
            this.condVarClear();
            this.getCondArr();
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Данная переменная уже есть!',
              color: 'danger',
              position: 'top-center'
            })
          }
        },
        clearCondVars(){
          this.condArr = [];
          this.getCondArr();
        },
        editVar(id){
          for (var i = 0; i < this.condArr.length; i++) {
            if (this.condArr[i].id === id) {
              this.setConVar(this.condArr[i]);
              this.status.newVar=false
              this.status.errVar=false
              this.status.checkVar=true
              this.status.conVar=true
              this.status.valueVar=true
              this.editVarFlag = true
              break
            }
          }
        },
        setConVar(elem){
          this.ConditionVar.id = elem.id
          this.ConditionVar.idtask = elem.idtask
          this.ConditionVar.var = elem.var
          this.ConditionVar.var_condition = elem.var_condition
          this.ConditionVar.value = elem.value
          this.ConditionVar.type = elem.type
          this.ConditionVar.description = elem.description
          this.ConditionVar.user = elem.user
          this.ConditionVar.user_id = elem.user_id
          this.ConditionVar.date_add = elem.date_add
          this.ConditionVar.date_edit = elem.date_edit
          this.ConditionVar.date_type = elem.date_type
          this.ConditionVar.varWithoutPrefix = elem.varWithoutPrefix
        },
        deleteVar(id){
          for (var i = 0; i < this.condArr.length; i++) {
            if (this.condArr[i].id === id) {
              this.condArr.splice(i, 1);
              this.getCondArr();
              return true;
            }
          }
          return false;
        },
        getCondArr(){
          this.$emit('getCondData', this.condArr);
        },
        setCondData(data){
          this.condArr = data;
        },

        onRowDataChangedCond() {
          Vue.nextTick (() => {
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
        onrowDoubleClickedCond(event){
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
