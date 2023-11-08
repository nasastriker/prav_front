<template>
  <div id="page-user-list">
    <div class="vx-card p-6 no-shadow">
      <div style="display: flex">
        <div style="width: 1000px">
          <v-select class="w-full" :reduce="label => label.id" label="text" :options="FsspClaimPostSetTypes"
                    v-model="post_code_id" @input="setPostCode"></v-select>
        </div>

        <div style="display: flex;margin-left: auto">
          <vs-button color="success" type="filled" @click="newItem"> + Новый элемент</vs-button>
          <vs-button style="margin-left: 15px" color="primary" type="filled" @click="updateRecords">Обновить</vs-button>
        </div>
      </div>

      <ag-grid-vue
          ref="agGridTable"
          :gridOptions="gridOptions"
          :components="components"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :rowData="FsspPostClaimSetItems"
          rowSelection="multiple"
          :rowDataChanged="onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          @grid-size-changed="onGridSizeChanged"
          @rowDoubleClicked="onrowDoubleClicked"
          :overlayNoRowsTemplate="'Нет записей'"
          :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-popup fullscreen classContent="popup-example" title="Элемент" :active.sync="showAddItem">
        <h6 class="h6">Код постановления:</h6>
        <span>{{ itemData.post_code }}</span>

        <h6 class="h6" style="margin-top: 15px">Вид постановления:</h6>
        <v-select class="w-full" :reduce="label => label.id" label="text" :options="FsspClaimPostSetTypesWoAll"
                  v-model="itemData.post_code" @input="setPostCodeAdd"></v-select>

        <h6 class="h6" style="margin-top: 15px">Наименование:</h6>
        <vs-input type="text" class="w-auto" v-model="itemData.name"></vs-input>

        <div class="fssp-post-claim-settings-banner">
          <div style="display:flex;">
            <div style="margin-left: 5px">
              <feather-icon icon="AlertCircleIcon" svgClasses="h-7 w-7"/>
            </div>
            <div style="margin-left: 20px">
              <span style="margin-top: 10px">Укажите условия, при которых необходимо подать жалобу</span>
            </div>
          </div>
        </div>

        <ConditionVars style="margin-top: 20px" :ref="'condition_vars'" @getCondData="getCondData"></ConditionVars>

        <h6 class="h6" style="margin-top: 15px">Текст жалобы:</h6>
        <vs-textarea height="200px" rows="8" v-model="itemData.claim_text"></vs-textarea>

        <vs-button color="success" style="margin-top: 25px" type="filled" @click="saveItem">Сохранить</vs-button>
      </vs-popup>

      <vs-popup classContent="popup-example" title="Условия" :active.sync="showCondsFlag">
        <div v-for="(cond,index) in recordConds">
          <h4>{{ index+1 }}. <b>{{ cond.var_type==="formula"?cond.var_formula:cond.var }} </b>
            <span v-if="cond.description != null">({{ cond.description }})</span>
            <span style="color: green">{{ condOper(cond.var_condition) }}</span>
            <span style="color: blue"><b>{{ cond.value_type==="formula"?cond.value_formula:cond.value }}</b></span>
          </h4>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ActiveFsspClClaimSet from "./Render/ActiveFsspClClaimSet.vue";
import OpenColorText from "./Render/OpenColorText.vue";
import OperFsspClClaimSet from "./Render/OperFsspClClaimSet.vue";
import OpenCountConds from "./Render/OpenCountConds.vue";
import ConditionVars from "../../ConditionVars/ConditionVars.vue";

export default {
  components: {
    ActiveFsspClClaimSet,OpenColorText,ConditionVars,OperFsspClClaimSet,OpenCountConds
  },
  data() {
    return {
      recordConds:[],
      showCondsFlag:false,
      itemData:{
        name:'',
        conds:[],
        claim_text:'',
        post_code:'common',
      },
      showAddItem: false,
      post_code_id:'all',
      gridApi: null,
      gridOptions: {
        alwaysShowVerticalScroll: true
      },
      columnDefs: [
        {
          headerName: '',
          headerTooltip: 'Активность',
          field: 'active',
          tooltipField: 'opis',
          filter: true,
          width: 30,
          cellRendererFramework: 'ActiveFsspClClaimSet',
          cellRendererParams: {
            setActive: this.setActive.bind(this)
          }
        },
        {
          headerName: 'Код постановления',
          headerTooltip: 'Код постановления',
          field: 'post_code',
          tooltipField: 'post_code',
          hide: false,
          width: 150,
          cellRendererFramework: 'OpenColorText',
        },
        {
          headerName: 'Наименование постановления',
          headerTooltip: 'Наименование постановления',
          field: 'post_name',
          tooltipField: 'post_name',
          hide: false,
          width: 250,
          cellRendererFramework: 'OpenColorText',
        },
        {
          headerName: 'Наименование',
          headerTooltip: 'Наименование',
          field: 'name',
          tooltipField: 'name',
          hide: false,
          width: 250,
          cellRendererFramework: 'OpenColorText',
        },
        {
          headerName: 'Условия',
          headerTooltip: 'Условия',
          field: 'id',
          tooltipField: 'name',
          hide: false,
          width: 100,
          cellRendererFramework: 'OpenCountConds',
          cellRendererParams: {
            showConds: this.showConds.bind(this)
          }
        },
        {
          headerName: '',
          field: 'id',
          hide: false,
          width: 50,
          cellRendererFramework: 'OperFsspClClaimSet',
          cellRendererParams: {
            questDeleteRecord: this.questDeleteRecord.bind(this),
            copyRecord: this.copyRecord.bind(this),
          }
        },
      ],
      components: {
        ActiveFsspClClaimSet, OpenColorText,OperFsspClClaimSet,OpenCountConds
      }
    }
  },

  computed: {
    condOper() {
      return (value) => {
        if (value==='равно') return '='
        if (value==='содержит') return 'содержит'
        if (value==='больше или равно') return '>='
        if (value==='меньше или равно') return '<='
        if (value==='больше') return '>'
        if (value==='меньше') return '<'
        if (value==='не равно') return '!='
      }
    },
    paginationPageSize() {
      return 300;
    },
    ...mapGetters([
      'FsspClaimPostSetTypes', 'FsspPostClaimSetItems','FsspClaimPostSetTypesWoAll'
    ]),
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },
  },
  methods: {
    copyRecord(data){
      this.getFsspClaimPostTypesWoAll();

      this.itemData = {
        post_code: data.post_code,
        name: data.name,
        conds: data.conds,
        claim_text: data.claim_text,
      };

      this.$refs.condition_vars.cancelEditCond();
      this.$refs.condition_vars.setCondData(this.itemData.conds);
      this.showAddItem = true;
    },
    showConds(data){
      this.recordConds = data;
      this.showCondsFlag = true;
    },
    getCondData(condData){
      this.itemData.conds = condData;
    },
    setPostCode() {
      if (this.post_code_id == null) {
        this.post_code_id = 'all';
      }
      this.updateRecords();
    },
    setPostCodeAdd(){
      if (this.itemData.post_code == null) {
        this.itemData.post_code = 'common';
      }
    },
    newItem() {
      this.getFsspClaimPostTypesWoAll();

      this.itemData = {
        name:'',
        conds:[],
        claim_text:'',
        post_code:this.post_code_id === 'all'?'common':this.post_code_id,
      };
      this.$refs.condition_vars.setCondData(this.itemData.conds);
      this.$refs.condition_vars.cancelEditCond();
      this.showAddItem = true;
    },

    saveItem() {
      let add_flag = true;

      if (typeof this.itemData.name == 'undefined' || this.itemData.name.trim() === '') {
        add_flag = false;
      }

      if (typeof this.itemData.claim_text == 'undefined' || this.itemData.claim_text.trim() === '') {
        add_flag = false;
      }

      if (typeof this.itemData.conds == 'undefined' || this.itemData.conds.length === 0) {
        add_flag = false;
      }

      if (add_flag) {
        this.saveFsspPostClaimItem(this.itemData).then((response) => {
          if (response.result) {
            this.$vs.notify({
              title: 'Сообщение',
              text: 'Запись сохранена',
              color: 'success',
              position: 'top-center'
            })
            this.showAddItem = false;
            this.updateRecords();
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: response.error,
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
    setActive(id_item, val) {
      this.saveActiveFsspPostClaimItem({id_item: id_item, val: val}).then((response) => {
        if (response.result) {
          this.updateRecords();
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.error,
            color: 'danger',
            position: 'top-center'
          })
          this.updateRecords();
        }
      });
    },
    questDeleteRecord(data) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'red',
        title: 'Удаление ' + data.name,
        text: 'Вы действительно хотите удалить ' + data.name + '?',
        accept: () => {
          this.deleteFsspPostClaimItem(data.id).then((response) => {
            if (response.result) {
              this.$vs.notify({
                title: 'Сообщение',
                text: 'Удалено!',
                color: 'success',
                position: 'top-center'
              })
              this.updateRecords();
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: response.error,
                color: 'danger',
                position: 'top-center'
              })
            }
          }).catch(error => {
            this.$vs.notify({
              title: 'Ошибка',
              text: error.message,
              color: 'danger',
              position: 'top-center'
            })
          });
        },
        acceptText: 'Удалить',
        cancelText: 'Отмена'
      })
    },
    updateRecords() {
      this.getFsspPostClaimSetItems(this.post_code_id);
    },
    onrowDoubleClicked(event) {
      this.getFsspPostClaimItemData(event.data.id).then((response) => {
        if (response.result) {
          this.getFsspClaimPostTypesWoAll();
          this.itemData = response.data;
          this.$refs.condition_vars.cancelEditCond();
          this.$refs.condition_vars.setCondData(this.itemData.conds);
          this.showAddItem = true;
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.error,
            color: 'danger',
            position: 'top-center'
          })
        }
      }).catch(error => {
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })
      });
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
    ...mapActions([
      'getFsspClaimPostTypes', 'saveActiveFsspPostClaimItem', 'getFsspPostClaimSetItems','saveFsspPostClaimItem',
      'getFsspPostClaimItemData','deleteFsspPostClaimItem','getFsspClaimPostTypesWoAll'
    ]),
    onRowDataChanged() {
      Vue.nextTick(() => {
            this.gridOptions.api.sizeColumnsToFit();
          }
      );
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.getFsspClaimPostTypes();
    this.getFsspPostClaimSetItems(this.post_code_id);
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

.vh75 {
  min-height: 75vh;
}

.fssp-post-claim-settings-banner {
  margin-top: 10px;
  background: #f7e1e1;
  padding: 15px;
  border-radius: 10px;
  color: red;
}
</style>
