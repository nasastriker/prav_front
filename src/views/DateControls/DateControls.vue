<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
          <div v-if="DateControl.pag.vis_type == 1">
          <div>
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDateControls - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDateControls }} of {{ TotalDateControls }}</span>
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
<!--                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">-->
<!--                    <vs-button class="mb-4 md:mb-0 mr-4" color="danger" type="filled"-->
<!--                             @click="runJobFsspMonday">Запустить выгрузку</vs-button>-->
<!--                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />-->
<!--                </div>-->
<!--              <vs-input type="date" v-model="FsspJournalData.pag.date_send_journal"-->
<!--                        @change="changeDate"></vs-input>-->
<!--              <v-select style="width: 280px;margin-right: auto;margin-left: 10px" :reduce="label => label.id" label="val" :options="TypesOperFsspAll" v-model="FsspJournalData.pag.type_oper" @input="changeDate"></v-select>-->
              <div>
                <vs-button color="success" @click="showAddDc"> + Новый Контроль</vs-button>
                <vs-button style="margin-left: 10px" @click="filterReset">Сбросить фильтры</vs-button>
              </div>

            </div>
          <div class="out-main-11">
            <ag-grid-vue
                style="height: 400px"
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="DateControlsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="true"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    @rowDoubleClicked="onrowDoubleClicked"
                    @rowClicked = "onRowClicked"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="outer-div-11" v-if="DateControlsLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
            </transition>
          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
          </div>

          <hr style="margin-bottom: 20px; margin-top: 20px; border: 1px solid #ADD8E6;">
          <h3><b>{{ DateControlTask.pag.date_control_name }}</b></h3>

          <div class="vx-row" style="margin-top: 20px">
            <div class="vx-col mb-2">
              <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                  <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">{{ currentPageTask * paginationPageSizeTask - (paginationPageSizeTask - 1) }} - {{ TotalDateControlsTasks - currentPageTask * paginationPageSizeTask > 0 ? currentPageTask * paginationPageSizeTask : TotalDateControlsTasks }} of {{ TotalDateControlsTasks }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <vs-dropdown-menu>
                    <vs-dropdown-item @click="changePagTask(20)">
                      <span>20</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="changePagTask(50)">
                      <span>50</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="changePagTask(100)">
                      <span>100</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="changePagTask(150)">
                      <span>150</span>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>
            <div class="vx-col mb-2" style="margin-left: 10px;margin-top: -5px" v-if="DateControlsTaskSendPlan.id_date_control != 0">
              <vs-button color="primary" style="width: 200px;" @click="showSendsPlan">Удовлетворяющие по условиям кредиты</vs-button>
            </div>
            <div class="vx-col mb-2" style="margin-top: 10px">
              <span style="max-width: 40px;"><img src="loading.gif" v-if="DateControlsTaskSendPlanLoadingFlag" style="max-width: 40px;"></span>
            </div>
            <div class="vx-col mb-2" style="margin-left: 10px;margin-top: 5px">
              <vs-button color="success" style="width: 200px;" @click="updateDateControlsTasks">Обновить</vs-button>
            </div>
            <div class="vx-col mb-2" style="margin-left: 10px;margin-top: 10px">
              <vs-checkbox v-model="DateControlTask.pag.only_not_empty" @input="updateDateControlsTasks">Показать только не пустые</vs-checkbox>
            </div>
          </div>

          <div class="out-main-11" style="margin-top: 20px">
            <ag-grid-vue
                ref="agGridTable"
                style="height: 400px"
                :gridOptions="gridOptionsTask"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefsTask"
                :defaultColDef="defaultColDefTask"
                :rowData="DateControlsTasks"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSizeTask"
                :suppressPaginationPanel="true"
                @grid-size-changed="onGridSizeChangedTask"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                @rowDoubleClicked="onrowDoubleClickedTask"
                :overlayNoRowsTemplate="'Нет отправок'"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="outer-div-11" v-if="DateControlsTasksLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
            </transition>
          </div>

          <vs-pagination
              :total="totalPagesTask"
              :max="7"
              v-model="currentPageTask" />


        </div>
          <div v-if="DateControl.pag.vis_type == 2">
            <div class="vx-row">
              <div class="vx-col mb-2" style="margin-top: 10px">
                <span class="text-primary cursor-pointer"><arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" @click="backToLists"></arrow-left-icon></span>
              </div>
              <div class="vx-col mb-2" style="margin-left: 10px;margin-top: 10px">
                <h4>Отправка "{{ DateControlTask.pag.date_control_name }}" от {{ (new Date(DateControlTask.pag.date_control_task_date)).toLocaleDateString() }}</h4>
              </div>
            </div>
            <div v-if="task_data.status == 5" style="margin-top: 20px">
              <h5><b>Ошибка: </b> {{ task_data.error }}</h5>
            </div>
            <DateControlTaskSends style="margin-top: 20px"></DateControlTaskSends>
          </div>
          <div v-if="DateControl.pag.vis_type == 3">
            <div class="vx-row">
              <div class="vx-col mb-2" style="margin-top: 10px">
                <span class="text-primary cursor-pointer"><arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" @click="backToLists"></arrow-left-icon></span>
              </div>
              <div class="vx-col mb-2" style="margin-left: 10px;margin-top: 10px">
                <h4>Удовлетворяющие по условиям кредиты: {{ DateControlsTaskSendPlan.date_control_name }}</h4>
                <div style="margin-top: 15px" v-if="DateControlsTaskSendPlan.date_control_conds.length > 0">
                  <h4><b>Условия:</b></h4>
                  <div v-for="cond in DateControlsTaskSendPlan.date_control_conds">
                    <h4>{{ cond.var }} {{ condOper(cond.var_condition) }} <span style="color: blue">{{ cond.value }}</span></h4>
                  </div>
                </div>
                <div style="margin-top: 15px" v-else>
                  <h4 >Условий нет</h4>
                </div>
              </div>
              <div class="vx-col mb-2" style="margin-left: 20px;margin-top: 10px">
                <h4>SQL</h4>
                <div style="padding: 15px; background: #EEDDFF;border-radius: 10px;width:700px">
                  {{ DateControlsTaskSendPlan.date_control_sql }}
                </div>
                <div style="margin-top: 5px">
                  <h4>ID Статуса = {{ DateControlsTaskSendPlan.date_control_id_status }}</h4>
                </div>
              </div>
            </div>
            <DateControlTaskSendsPlan style="margin-top: 20px"></DateControlTaskSendsPlan>
          </div>


      <vs-popup classContent="popup-example" title="Контроль Дат" :active.sync="popupActiveDc">
          <div>Стадия</div>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="DateControlStad" v-model="data.id_stad" ></v-select>

        <div>Отображать отправки на вкладке</div>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="RazdelDcList" v-model="data.perem" ></v-select>
        <div style="margin-top: 10px">Наименование</div>
        <vs-input class="w-full mb-base" v-model="data.name"></vs-input>
        <div style="margin-top: 10px">Статус</div>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArrAndAll" v-model="data.id_status" ></v-select>

        <div>
          <div style="margin-top: 10px">Условия</div>
          <span v-if="status.newVar" style="color:blue">Введите название переменной (например <span style="color:green"> ${dc_number_dog}</span>) и нажмите Enter</span>
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


<!--        <div style="margin-top: 10px">Переменная</div>-->
<!--        <v-select  class="w-50 " :reduce="label => label.id" label="text" :options="DCPeremList" v-model="data.perem"></v-select>-->
<!--&lt;!&ndash;        <div style="margin-top: 10px">Название</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <vs-input class="w-full mb-base" v-model="data.name"></vs-input>&ndash;&gt;-->
<!--        <div style="margin-top: 10px">Количество дней</div>        <vs-button size="small" @click="changeOperationItem">Тип условия {{data.operation_condition}}</vs-button>-->
<!--        <vs-input class="w-full mb-base" v-model="data.count_days" oninput="this.value = this.value.replace(/[^0-9]/g, '')"></vs-input>-->
        <vs-checkbox  v-model="data.change_status" @input="inpChangeStatus">Изменить статус</vs-checkbox>
        <template v-if="data.change_status">
          <div style="margin-top: 10px">Статус</div>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArrAndAll" v-model="data.id_status_new"></v-select>
        </template>
        <template v-else>
          <div style="margin-top: 10px">Шаблон</div>
          <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDcList" v-model="data.id_shab"></v-select>
          <div style="margin-top: 10px">Функция</div>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="FuncDcList" v-model="data.id_func" @input="setFunc"></v-select>
          <div v-if="peremFuncFlag">
            <div style="margin-top: 10px" @click="showMeArr">Переменные для функции:</div>
            <div style="padding: 15px; border: solid #32a1ce;border-radius: 10px;" v-if="funcPeremens.length > 0">
              <div style="margin-top: 10px" v-for="funcPerem in funcPeremens">
                <div v-if="funcPerem.type == 'array'">
                  <div>{{ funcPerem.description }}</div>
                  <span style="color:red;font-size:x-small">После ввода каждого значения нажмите Добавить</span>

                  <vx-input-group>
                    <vs-input v-model="funcPerem.oneVal"  />
                    <template slot="append">
                      <div class="append-text btn-addon">
                        <vs-button color="success" type="border" @click="addToArrayOne(funcPerem.id)">Добавить</vs-button>
                      </div>
                    </template>
                  </vx-input-group>

                  <div style="margin-top: 10px" v-for="oneValF in funcPerem.val">
                    <b>- {{ oneValF.val }}</b> <span @click="delFromArrayOne(oneValF.id, funcPerem.id)" class="hover:text-primary cursor-pointer">[ удалить ]</span>
                  </div>
                </div>
                <div v-else-if="funcPerem.type == 'boolean'">
                  <vs-checkbox v-model="funcPerem.val">{{ funcPerem.description }}</vs-checkbox>
                </div>
                <div v-else-if="funcPerem.type == 'string'">
                  <div>{{ funcPerem.description }}</div>
                  <vs-input class="w-full" v-model="funcPerem.val"></vs-input>
                </div>
                <div v-else-if="funcPerem.type == 'date'">
                  <div>{{ funcPerem.description }}</div>
                  <vs-input type="date" v-model="funcPerem.val"></vs-input>
                </div>
                <div v-else-if="funcPerem.type == 'text'">
                  <div>{{ funcPerem.description }}</div>
                  <vs-textarea height="200px" class="w-full" v-model="funcPerem.val"></vs-textarea>
                </div>
                <div v-else-if="funcPerem.type == 'integer'">
                  <div>{{ funcPerem.description }}</div>
                  <vs-input v-model="funcPerem.val" @keypress="validateNumberInt" @change="inputZero(funcPerem.id)"></vs-input>
                </div>
                <div v-else-if="funcPerem.type == 'decimal'">
                  <div>{{ funcPerem.description }}</div>
                  <vs-input v-model="funcPerem.val" @keypress="validateNumberDecimal" @change="inputZero(funcPerem.id)"></vs-input>
                </div>
              </div>
            </div>
          </div>
        </template>



        <vs-button color="success" class="pull-right" type="filled" style="margin-top: 20px"
                   @click="saveDc">Сохранить</vs-button>
      </vs-popup>
    </div>
    </div>


</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import OpenDateControlTaskStatus from "./Render/OpenDateControlTaskStatus.vue";
    import DateControlFilterRender from "./Render/DateControlFilterRender.vue";
    import OpenDc from "./Render/OpenDc.vue";
    import Open from "./Render/Open.vue";
    import Vue from "vue";
    import DateControlTaskSends from "./DateControlTaskSends.vue";
    import OperCondVarsStatusControl from "../StatusControl/Render/OperCondVarsStatusControl.vue";
    import OpenCountConds from "./Render/OpenCountConds.vue";
    import ActiveDateControl from "./Render/ActiveDateControl.vue";
    import OpenWarning from "./Render/OpenWarning.vue";
    import DateControlTaskSendsPlan from "./DateControlTaskSendsPlan.vue";
    export default {
        components: {
            VueCsvImport,
            DateControlFilterRender,
            OpenDc,
            Open,
            OpenDateControlTaskStatus,
            DateControlTaskSends,
            ArrowLeftIcon,
            OpenCountConds,
            ActiveDateControl,
            OpenWarning,
            DateControlTaskSendsPlan
        },
      beforeMount() {

        this.defaultColDef = { resizable: true };
        this.rowHeight = 50;
        this.components={DateControlFilterRender:DateControlFilterRender};
      },
        data () {
            return {
              Con:{
                  intAndDecimalValue:['равно','больше','меньше','больше или равно','меньше или равно','не равно'],
                  varcharAndNextValue:['равно','содержит','больше или равно','меньше или равно','не равно'],
                  tinyintValue:['равно','не равно'],
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
              peremFuncFlag:false,
              funcPeremens:[],
              editVarFlag:false,
              condArr:[],
                stadArr:[],
              task_data:{},
                operation:[{id:'=',name:'='},{id:'>',name:'>'},{id:'<',name:'<'}],

              popupTaskSend:false,
              name_otpr:'Выберите запись выше для отображения задач',

              data: {
                  id_status_new:0,
                  name:'',
                  perem:null,
                  change_status:0,
                  count_days:0,
                  id_status:0,
                  id_shab:null,
                  id_func:null,
                  operation_condition:'=',
              },
              popupActiveDc:false,
                searchQuery: '',
                csv:[],
                // AgGrid
                gridApi: null,
              gridApiCond: null,
              gridApiTask: null,
              gridOptionsCond: {},
              gridOptions: {
                alwaysShowVerticalScroll:true
              },
              gridOptionsTask: {
                alwaysShowVerticalScroll:true
              },
              defaultColDefCond: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
                defaultColDef: {
                  flex: 1,
                  wrapText: true,
                  autoHeight: true,
                  sortable: true,
                  resizable: true,
                },
              defaultColDefTask: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
                columnDefs: [
                  {
                    headerName: 'Наименование',
                    field: 'name',
                    filter: true,
                    floatingFilterComponentFramework: 'DateControlFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'string',
                      field: 'name',
                      emitFilter:'clear_filter_dc_filter',
                      // emitSet:'set_filter_debtor_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 150
                  },
                    // {
                    //     headerName: 'Дата',
                    //     field: 'name_perem',
                    //     filter: true,
                    //     floatingFilterComponentFramework: 'DateControlFilterRender',
                    //     floatingFilterComponentParams:{
                    //       type_f: 'list',
                    //       field: 'perem',
                    //       emitFilter:'clear_filter_dc_filter',
                    //       updateSearchField: this.updateSearchField.bind(this)
                    //     },
                    //     hide:false,
                    //     width: 200,
                    // },
                    // {
                    //     headerName: 'Количество дней',
                    //     field: 'count_days',
                    //     filter: false,
                    //     width: 50,
                    // },
                  {
                    headerName: '',
                    field: 'id',
                    filter: true,
                    width: 50,
                    cellRendererFramework: Vue.extend(OpenCountConds)
                  },
                  {
                    headerName: '',
                    field: 'error_flag',
                    filter: true,
                    width: 50,
                    cellRendererFramework: Vue.extend(OpenWarning)
                  },
                  {
                    headerName: 'Шаблон',
                    field: 'shab_name',
                    filter: false,
                    width: 150,
                  },
                  {
                    headerName: 'Функция',
                    field: 'func_name',
                    filter: false,
                    width: 150,
                  },
                  {
                    headerName: 'Статус',
                    field: 'status_name',
                    filter: false,
                    width: 100,
                  },
                  {
                    headerName: 'Активность',
                    field: 'active',
                    filter: true,
                    width: 100,
                    cellRendererFramework: 'ActiveDateControl',
                  },
                  {
                    headerName: '',
                    field: 'id',
                    filter: true,
                    width: 50,
                    cellRendererFramework: 'OpenDc'
                  },
                ],
              columnDefsTask: [
                {
                  headerName: 'Наименование',
                  field: 'task_name',
                  filter: false,
                  width: 150,
                },
                {
                  headerName: 'Дата',
                  field: 'task_date_norm',
                  filter: false,
                  width: 100,
                },
                {
                  headerName: 'Количество заемщиков',
                  field: 'count_sends',
                  filter: false,
                  width: 100,
                },

                {
                  headerName: 'Статус задачи',
                  field: 'status',
                  filter: false,
                  width: 100,
                  cellRendererFramework: Vue.extend(OpenDateControlTaskStatus),
                },
                {
                    headerName: 'Операции',
                    field: 'id',
                    filter: false,
                    width: 100,
                    cellRendererFramework: 'Open',
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
              components: {
                DateControlFilterRender,OpenDc,OpenDateControlTaskStatus,Open,OperCondVarsStatusControl,
                OpenCountConds,ActiveDateControl,OpenWarning
              }
            }
        },

        computed: {
          condOper() {
            return (value) => {
              if (value=='равно') return '='
              if (value=='содержит') return 'содержит'
              if (value=='больше или равно') return '>='
              if (value=='меньше или равно') return '<='
              if (value=='больше') return '>'
              if (value=='меньше') return '<'
            }
          },
            operation_item(){
                return (this.operation.find((el,index)=>{
                    return el.id===this.data.operation_condition
                })).name
            },
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalDateControls/this.paginationPageSize)
                else return 0
            },
          totalPagesTask () {
            if (this.gridApiTask)
              return Math.ceil(this.TotalDateControlsTasks/this.paginationPageSizeTask)
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
                'DateControlsArr','TotalDateControls','DateControlsLoadingFlag','DateControl','ShablonDcList','FuncDcList','DateControlStad',
                'DCPeremList','StatussArrAndAll','DateControlsTasks','TotalDateControlsTasks','DateControlsTasksLoadingFlag',
                'DateControlTask','DateControlTaskSend','User','DateControlsTaskSendPlan','DateControlsTaskSendPlanLoadingFlag',
                'RazdelDcList'

            ]),
          currentPage: {
            get () {
              this.gridApi = this.gridOptions.api
              if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
              else return 1
            },
            set (val) {
              this.gridApi = this.gridOptions.api
              this.gridApi.paginationGoToPage(val - 1)
            }
          },
          currentPageTask: {
            get() {
              this.gridApiTask = this.gridOptionsTask.api
              if (this.gridApiTask) return this.gridApiTask.paginationGetCurrentPage() + 1
              else return 1
            },
            set(val) {
              this.gridApiTask = this.gridOptionsTask.api
              this.setQueryDateControlsTaskOffset(val-1);
              this.getDateControlsTasks();
              this.gridApiTask.paginationGoToPage(val - 1);
            }
          },
          paginationPageSizeTask () {
            return this.DateControlTask.pag.limit
          },

        },
        methods: {
          inpChangeStatus(){
            if (this.data.change_status){
              this.peremFuncFlag = false;
              this.data.id_shab = null;
              this.data.id_func = null;
            }
          },
          showSendsPlan(){
            this.getDateControlsTaskSendsPlan().then(res => {
              if (res.result) {
                this.DateControlsTaskSendPlan.date_control_sql = res.sql;
                this.DateControl.pag.vis_type = 3;
              } else {
                this.$vs.dialog({
                  title: 'Ошибка',
                  text: res.error,
                  color: 'danger',
                  accept: this.acceptError,
                  acceptText: 'OK'
                })
              }
            });
          },
          acceptError() {},
          inputZero(id_perem){
            for (var i = 0; i < this.funcPeremens.length; i++) {
              if (this.funcPeremens[i].id === id_perem) {
                if (this.funcPeremens[i].val == null || this.funcPeremens[i].val == ''){
                  this.funcPeremens[i].val = 0;
                }
                break;
              }
            }
          },
          addToArrayOne(id_perem){
            for (var i = 0; i < this.funcPeremens.length; i++) {
              if (this.funcPeremens[i].id === id_perem) {
                if (this.funcPeremens[i].oneVal != null && this.funcPeremens[i].oneVal.trim() != '') {
                  let arr_var_copy = {};
                  arr_var_copy.id = Date.now();
                  arr_var_copy.val = this.funcPeremens[i].oneVal;
                  this.funcPeremens[i].val.push(arr_var_copy);
                  this.funcPeremens[i].oneVal = null;
                } else {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Введите '+this.funcPeremens[i].description,
                    color: 'danger',
                    position: 'top-center'
                  })
                }
                break;
              }
            }
          },
          delFromArrayOne(id_val, id_perem){
            for (var i = 0; i < this.funcPeremens.length; i++) {
              if (this.funcPeremens[i].id === id_perem) {
                for (var l = 0; l < this.funcPeremens[i].val.length; l++) {
                  if (this.funcPeremens[i].val[l].id === id_val) {
                    this.funcPeremens[i].val.splice(l, 1);
                    break;
                  }
                }
                break;
              }
            }
          },
          showMeArr(){
            console.log(this.funcPeremens)
          },
          setFunc(){
            if (this.data.id_func != null) {
              this.getFuncPeremens(this.data.id_func).then(res => {
                if (res.result) {
                    this.funcPeremens = res.data;
                    if (this.funcPeremens.length > 0) {
                      this.peremFuncFlag = true;
                    } else {
                      this.peremFuncFlag = false;
                      this.funcPeremens = null;
                    }
                } else {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: res.error,
                    color: 'danger',
                    position: 'top-center'
                  })
                }
                  // console.log(this.funcPeremens)
              });
            } else {
              this.peremFuncFlag = false;
              this.funcPeremens = null;
            }
          },


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
            this.ConditionVar.date_type = null
            this.ConditionVar.varWithoutPrefix = ''
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



          changeOperationItem(){
              let flag=false;
              for (let i = 0; i < this.operation.length; i++) {
                  if(flag){
                      this.data.operation_condition=this.operation[i].id;
                      flag=false;
                      break;
                  }
                  if (this.operation[i].id==this.data.operation_condition){
                      flag=true;
                  }

              }
              if(flag){
                  this.data.operation_condition=this.operation[0].id;
              }


          },
          backToLists(){
            this.DateControl.pag.vis_type = 1;
            this.gridApi = this.gridOptions.api
            this.gridApiTask = this.gridOptionsTask.api
          },
          updateDateControlsTasks(){
            this.getDateControlsTasks();
          },
          onrowDoubleClickedTask(event){
            this.DateControlTaskSend.pag.id_task = event.data.id;
            this.getDateControlsTaskSendStatuses();
            this.getOneDateControlTaskData(event.data.id).then((response) => {
              if (response.result){
                this.task_data = response.data;
                this.DateControlTask.pag.date_control_task_date = this.task_data.task_date;
                this.DateControl.pag.vis_type = 2;
              }
            });
          },
          onRowClicked(event){
            this.DateControlTask.pag.id_date_control = event.data.id;
            this.DateControlTask.pag.date_control_name = event.data.name;
            this.DateControlsTaskSendPlan.id_date_control = event.data.id;
            this.DateControlsTaskSendPlan.date_control_id_status = event.data.id_status;
            this.DateControlsTaskSendPlan.date_control_name = event.data.name;
            this.name_otpr = event.data.name;
            if (event.data.var_conditions == null){
              this.DateControlsTaskSendPlan.date_control_conds = [];
            } else {
              this.DateControlsTaskSendPlan.date_control_conds = event.data.var_conditions;
            }

            this.getDateControlsTasks();
          },
          changePagTask(pag) {
            this.DateControlTask.pag.limit = pag;
            this.getDateControlsTasks();
            this.setQueryDateControlsTaskLimit(pag);
            this.gridApiTask.paginationSetPageSize(pag);
          },

          saveDc(){
            let flag = true;
            let flagStatus = true;

            // if (this.data.perem == null){
            //   flag = false;
            // }
            // if (this.data.count_days == 0){
            //   flag = false;
            // }
            if ( this.data.change_status == 0 && this.data.id_shab == null){
                flag = false;

            }
            if ( this.data.change_status ==0 && this.data.id_func == null){
              flag = false;
            }
              if ( this.data.change_status ==1 && (this.data.id_status_new == 0 || this.data.id_status_new == null)){
                  flag = false;
                  flagStatus = false;
              }
            if (this.data.name.trim() == ''){
              flag = false;
            }
            if( this.data.id_status == 0){
                flag = false;
                flagStatus = false;
            }

            if (this.peremFuncFlag){
              for (var i = 0; i < this.funcPeremens.length; i++) {
                switch(this.funcPeremens[i].type) {
                  case 'date':
                    if(this.funcPeremens[i].val == null){
                      flag = false;
                    }
                    break;
                  case 'text':
                    if(this.funcPeremens[i].val.trim() == ''){
                      flag = false;
                    }
                    break;
                  case 'string':
                    if(this.funcPeremens[i].val.trim() == ''){
                      flag = false;
                    }
                    break;
                  case 'array':
                    if(this.funcPeremens[i].val.length == 0){
                      flag = false;
                    }
                    break;
                }
              }
            }


            if (flag) {
              this.popupActiveDc = false;
              if (typeof this.condArr == 'undefined' || this.condArr.length == 0) {
                this.data.var_conditions = null;
              } else {
                this.data.var_conditions = this.condArr;
              }
              if (this.data.change_status == 0){
                this.data.id_status_new = null;
              }
              if (this.peremFuncFlag){
                this.data.peremens_for_func = this.funcPeremens;
              }
              this.saveDateControl(this.data).then((response) => {
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
                if(!flagStatus){
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Статус не может быть ВСЕ',
                        color: 'danger',
                        position: 'top-center'
                    })
                }else{
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Заполните необходимые поля',
                        color: 'danger',
                        position: 'top-center'
                    })
                }

            }
          },
          showAddDc(){
            this.data = {
                id_status_new:0,
                name:'',
                perem:null,
                change_status:0,
                count_days:0,
                id_status:0,
                id_shab:null,
                id_func:null,
                operation_condition:'=',
            };
            this.condArr = [];
            this.funcPeremens = [];
            this.peremFuncFlag = false;
            this.getShablonDcList();
            this.getFuncDcList();
            this.getRazdelDcList();
            // this.getPeremList();
            this.getDataStatuss();
            this.popupActiveDc = true;
          },
          onrowDoubleClicked(event){
            this.peremFuncFlag = false;
            this.getShablonDcList();
            this.getFuncDcList();
            this.getRazdelDcList();
            // this.getPeremList();
            this.getDataStatuss();
            this.getDateControlDataInfo(event.data.id).then((response) => {
              if (response.result){
                this.data = response.data;
                if (typeof this.data.var_conditions == 'undefined'
                    || this.data.var_conditions == null) {
                  this.condArr = [];
                } else {
                  this.condArr = this.data.var_conditions;
                }

                if (this.data.id_func != null) {
                  this.getFuncPeremensDateControl(event.data.id).then(res => {
                    if (res.result) {
                      this.funcPeremens = res.data;
                      if (this.funcPeremens.length > 0) {
                        this.peremFuncFlag = true;
                      } else {
                        this.peremFuncFlag = false;
                        this.funcPeremens = null;
                      }
                    }
                    // console.log(this.funcPeremens)
                  });
                } else {
                  this.peremFuncFlag = false;
                  this.funcPeremens = null;
                }

                this.id_status = this.data.id_status;
                this.popupActiveDc = true;
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
                if (params.clientWidth > 500) {
                    this.gridApi.sizeColumnsToFit();
                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }
            },
          onGridSizeChangedTask(params) {
            if (params.clientWidth > 500) {
              this.gridApiTask.sizeColumnsToFit();
            } else {
              this.columnDefsTask.forEach(x => {
                x.width = 300;
              });
              this.gridApiTask.setColumnDefs(this.columnDefsTask);
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
          onColumnResizedCond(params) {
            params.api.resetRowHeights();
          },
          onColumnVisibleCond(params) {
            params.api.resetRowHeights();
          },
          ...mapMutations([
            'setQueryDateControlsTaskOffset','setQueryDateControlsTaskLimit'
          ]),
            ...mapActions([
                'getDateControlArr','getDateControlTypes','saveDateControl','getShablonDcList','getFuncDcList',
                'getDateControlDataInfo','getPeremList','getDataStatuss','getDateControlsTasks','getDateControlsTaskSendStatuses',
                'getOneDateControlTaskData','getFuncPeremens','getFuncPeremensDateControl','getDateControlsTaskSendsPlan',
                'getRazdelDcList'
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
          updateSearchField(findField, findFieldName, findType, not_update=false){
            // this.User.pag.credit.find=''
            this.DateControl.pag.fields[findFieldName]={
              find:findField,
              name:findFieldName,
              type: findType
            }
            this.getDateControlArr();
            // if(!not_update)this.getDataCredits(this.User.pag.credit);
          },
          setColumnFilter (column, val) {
            const filter = this.gridApi.getFilterInstance(column)
            let modelObj = null

            if (val !== 'all') {
              modelObj = { type: 'equals', filter: val }
            }

            filter.setModel(modelObj)
            this.gridApi.onFilterChanged()
          },
          filterReset(){
            this.$root.$emit('clear_filter_dc_filter')
          },
        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.gridApiTask = this.gridOptionsTask.api
            this.gridApiCond = this.gridOptionsCond.api;
            this.getDateControlArr();
            // this.getDateControlTypes();
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
    .load-bar-11{
      display: inline-block;
      max-width: 70px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 160px;
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
