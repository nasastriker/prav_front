<template>
    <div>
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalStatusControl - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalStatusControl }} of {{ TotalStatusControl }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <vs-dropdown-menu>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                <span>20</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                                <span>50</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                                <span>100</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                                <span>150</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
          <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
            <vs-button @click="showAddSc">Добавить Контроль статуса</vs-button>
          </div>
            </div>
            <ag-grid-vue
                style="height: 400px"
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="StatusControls"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
            @rowDoubleClicked="onrowDoubleClicked"
            @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible"
                @rowClicked = "onRowClicked"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />


          <hr style="margin-bottom: 20px; margin-top: 20px; border: 1px solid #ADD8E6;">

      <vs-popup classContent="popup-example" title="Контроль Статуса" :active.sync="popupActiveSc">
        <div>Наименование</div>
        <vs-input class="w-full mb-base" v-model="data.name"></vs-input>
        <div style="margin-top: 10px">Статус</div>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr" v-model="id_status" @input="setStatus"></v-select>

        <div>
          <div style="margin-top: 10px">Условия</div>
          <span v-if="status.newVar" style="color:blue"> Введите название переменной (например <span style="color:green"> ${dc_number_dog}</span>) и нажмите Enter</span>
          <span v-if="status.checkVar" style="color:green">Переменная распознана <span v-if="ConditionVar.description!==''">({{ConditionVar.description}})</span></span>
          <span v-if="status.errVar" style="color:red">{{ConditionVar.Var.error}}</span>
          <div v-if="editVarFlag">
            <vs-input disabled v-model="ConditionVar.var"  @keyup.enter="addVar" @input="inputVar"></vs-input>
          </div>
          <div v-else>
            <vs-input v-model="ConditionVar.var"  @keyup.enter="addVar" @input="inputVar"></vs-input>
          </div>
          <div v-if="status.conVar" style="margin-top: 10px;">
            <span  style="color:blue">Выберите условие</span>
            <v-select  v-if="ConditionVar.   type==='int'||ConditionVar.type==='decimal'||ConditionVar.type==='bigint'"  style="margin-bottom: 10px"  :options="Con.intAndDecimalValue"   v-model="ConditionVar.var_condition"  @input="changeCondition"></v-select>
            <v-select  v-if="ConditionVar.   type==='tinyint'"  style="margin-bottom: 10px"  :options="Con.tinyintValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
            <v-select  v-if="ConditionVar.   type==='varchar'||ConditionVar.type==='text'"  style="margin-bottom: 10px"  :options="Con.varcharAndNextValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
            <v-select  v-if="ConditionVar.   type==='date'"  style="margin-bottom: 10px"  :options="Con.dateValue"   v-model="ConditionVar.var_condition" @input="changeCondition" ></v-select>
          </div>
          <div v-if="status.valueVar" style="margin-top: 10px">
            <span  style="color:blue">Установите значение переменной</span>
            <vs-input v-if="ConditionVar.type==='int'||ConditionVar.type==='bigint'" v-model="ConditionVar.value" @keypress="validateNumberInt"></vs-input>
            <vs-input v-if="ConditionVar.type==='decimal'" v-model="ConditionVar.value" @keypress="validateNumberDecimal"></vs-input>
            <vs-input v-if="ConditionVar.type==='varchar'||ConditionVar.type==='text'" v-model="ConditionVar.value" ></vs-input>
            <vs-input v-if="ConditionVar.type==='date'" type="date" v-model="ConditionVar.value"></vs-input>
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
              style="height: 300px"
              ref="agGridTable"
              :gridOptions="gridOptionsCond"
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
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
        </div>


        <div style="margin-top: 10px">Функция</div>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="FuncScList" v-model="data.id_func"></v-select>
        <vs-checkbox style="margin-top: 10px" v-model="data.active">Активна</vs-checkbox>

        <vs-button color="success" class="pull-right" type="filled" style="margin-top: 20px"
                   @click="saveSc">Сохранить</vs-button>
      </vs-popup>
    </div>

</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import { mapActions,mapGetters,mapMutations } from 'vuex';
    import OpenStatusControl from "./Render/OpenStatusControl.vue";
    import ActiveStatusControl from "./Render/ActiveStatusControl.vue";
    import r from '../../route';
    import axios from '../../axios'
    import Vue from "vue";
    import OperCondVarsStatusControl from "./Render/OperCondVarsStatusControl.vue";
    import OpenCountConds from "./Render/OpenCountConds.vue";
    export default {
        components: {
            AgGridVue,
            vSelect,OpenStatusControl,ActiveStatusControl,OperCondVarsStatusControl,OpenCountConds
        },
        data () {
            return {
              Con:{
                intAndDecimalValue:['равно','больше','меньше','больше или равно','меньше или равно'],
                varcharAndNextValue:['равно','содержит','больше или равно','меньше или равно'],
                tinyintValue:['равно'],
                dateValue:['равно','больше','меньше','больше или равно','меньше или равно'],
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
                var:'',
                var_condition:'',
                value:'',
                type:'',
                description:'',
                user:'',
                user_id:0,
                date_add:'',
                date_edit:'',
              },
              editVarFlag:false,
              id_status:0,
              data:{},
              condArr:[],
              popupActiveSc:false,
              popupActiveConds:false,
                gridApi: null,
                gridApiCond: null,
                gridOptions: {},
                gridOptionsCond: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
              defaultColDefCond: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
                columnDefs: [
                    {
                        headerName: 'Наименование',
                        field: 'name',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'Статус',
                        field: 'status_name',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Условия',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: Vue.extend(OpenCountConds)
                    },
                    {
                        headerName: 'Функция',
                        field: 'func_name',
                        filter: true,
                        width: 350
                    },
                  {
                    headerName: 'Активность',
                    field: 'active',
                    filter: true,
                    width: 200,
                    cellRendererFramework: 'ActiveStatusControl',
                  },
                    {
                        headerName: '',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenStatusControl'
                    },
                ],
              columnDefsCond: [
                {
                  headerName: 'Переменная',
                  field: 'var',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Условие',
                  field: 'var_condition',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Значение',
                  field: 'value',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: '',
                  field: 'id',
                  filter: true,
                  width: 100,
                  cellRendererFramework: Vue.extend(OperCondVarsStatusControl),
                  cellRendererParams: {
                    edit_var: this.editVar.bind(this),
                    delete_var: this.deleteVar.bind(this),
                  }
                },
              ],

                // Cell Renderer Components
                components: {
                  OpenStatusControl,ActiveStatusControl,OperCondVarsStatusControl,OpenCountConds
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalStatusControl/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
          paginationPageSizeCond () {
            if (this.gridApiCond) return this.gridApiCond.paginationGetPageSize()
            else return 100
          },
            ...mapGetters([
                'FuncScList','StatusControls','TotalStatusControl','StatussArr','StatusControlTask','User'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
          clearCondVars(){
            this.condArr = [];
          },
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
            this.status.newVar=true
            this.status.errVar=false
            this.status.checkVar=false
            this.status.conVar=false
            this.status.valueVar= false
          },
          validateNumberInt: event => {
            const charCode = String.fromCharCode(event.keyCode);
            if (!/[0-9\-]/.test(charCode)) {
              event.preventDefault();
            }
          },
          validateNumberDecimal: event => {
            const charCode = String.fromCharCode(event.keyCode);
            if (!/[0-9,.\-]/.test(charCode)) {
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
                this.editVarFlag = false
                break
              }
            }
          },
          cancelEditCond(){
            this.inputVar();
            this.condVarClear();
            this.editVarFlag = false
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
          },
          changeCondition(){
            if(this.ConditionVar.var_condition!==null&&this.ConditionVar.var_condition!==''){
              this.status.valueVar=true
            }
            else {
              this.status.valueVar=false
            }
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
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Данная переменная уже есть!',
                color: 'danger',
                position: 'top-center'
              })
            }
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
          deleteVar(id){
            for (var i = 0; i < this.condArr.length; i++) {
              if (this.condArr[i].id === id) {
                this.condArr.splice(i, 1);
                return true;
              }
            }
            return false;
          },




          onRowClicked(event){
            this.StatusControlTask.id_status_control = event.data.id;
            this.StatusControlTask.name_otpr = event.data.name;
            this.getStatusControlTasks();
          },
          setStatus(){
            this.data.id_status = this.id_status;
          },
          saveSc() {
            let flag = true;

            if (typeof this.data.id_func == 'undefined' || this.data.id_func == null) {
              flag = false;
            }
            if (typeof this.data.name == 'undefined' || this.data.name == '' || this.data.name == ' ') {
              flag = false;
            }
            if (typeof this.data.id_status == 'undefined' || this.data.id_status == '' || this.data.id_status == ' ' || this.data.id_status == 0) {
              flag = false;
            }
            if (typeof this.condArr == 'undefined' || this.condArr.length == 0) {
              flag = false;
            }

            if (flag) {
              this.popupActiveSc = false;
              this.data.id_status = this.id_status;
              this.data.var_conditions = this.condArr;
              this.saveStatusControl(this.data).then((response) => {
                if (response) {
                  this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                } else {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Сохранить не удалось !!!',
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
          showAddSc(){
              this.data = {};
              this.condArr = [];
              this.id_status = 0;
              this.getFuncScList();
              this.getDataStatuss();
              this.popupActiveSc = true;
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
          onrowDoubleClickedCond(event){
            this.editVar(event.data.id)
          },
            onrowDoubleClicked(event){
                this.getFuncScList();
                this.getDataStatuss();
                this.getStatusControlDataInfo(event.data.id).then((response) => {
                  if (response.result) {
                    this.data = response.data;
                    if (typeof this.data.var_conditions == 'undefined'
                        || this.data.var_conditions == null) {
                      this.condArr = [];
                    } else {
                      this.condArr = this.data.var_conditions;
                    }
                    this.id_status = this.data.id_status;
                    this.popupActiveSc = true;
                  }
                })
            },
          onColumnResizedCond(params) {
            params.api.resetRowHeights();
          },
          onColumnVisibleCond(params) {
            params.api.resetRowHeights();
          },
            ...mapMutations([

            ]),
            ...mapActions([
                'getFuncScList','saveStatusControl','getDataStatuss','getStatusControls','getStatusControlDataInfo',
                'getStatusControlTasks'
            ]),
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
          onRowDataChangedCond () {
            Vue . nextTick (() => {
                  this.gridOptionsCond.api.sizeColumnsToFit();
                }
            );
          },

        },
        mounted () {
          this.gridApi = this.gridOptions.api;
          this.gridApiCond = this.gridOptionsCond.api;
          this.getStatusControls();
        }
    }


</script>

<style lang="scss">
    .dropdown-button-container {
        display: flex;
        align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
    }
    .con-vs-pagination{
        margin-right: 40px!important;
    }

</style>

