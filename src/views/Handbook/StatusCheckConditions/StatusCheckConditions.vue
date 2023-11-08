<template>
  <div>

    <div style="display: flex">
      <span style="color: red;margin-top: 15px"><b>При данных условиях будет показан баннер</b></span>
      <vs-button style="margin-left: auto" color="success" type="filled" @click="addNewCond"> + Новое условие</vs-button>
    </div>

    <div class="out-main-status-check-conds">
      <ag-grid-vue
          style="height: 400px"
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="CheckStatusConds"
          rowSelection="multiple"
          :rowDataChanged="onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          @grid-size-changed="onGridSizeChanged"
          :overlayNoRowsTemplate="'Нет условий'"
          @rowDoubleClicked="onrowDoubleClickedCond"
          :enableRtl="$vs.rtl">
      </ag-grid-vue>
      <transition name="fade">
        <div class="outer-div-status-check-conds" v-if="CheckStatusCondsLoadingFlag"><img class="load-bar" src="/loading.gif">
        </div>
      </transition>
    </div>

    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage"/>

    <vs-popup classContent="popup-example" :title="titleCondDataPopup" :active.sync="showCondData">
      <h6 class="h6">Переменная:</h6>
      <vs-input type="text" class="w-auto" v-model="condData.perem"></vs-input>
      <h6 class="h6" style="margin-top: 20px">Условие:</h6>
      <v-select :options="condValues" v-model="condData.cond" @input="changeCondition"></v-select>
      <h6 class="h6" style="margin-top: 20px">Значение:</h6>
      <vs-input type="text" class="w-auto" v-model="condData.val"></vs-input>

      <vs-button style="margin-left: auto;margin-top: 20px" color="primary" type="filled" @click="addNewCondStart">Сохранить</vs-button>
    </vs-popup>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import OperCheckStatusConds from "./Render/OperCheckStatusConds.vue";

export default {
  components: {
    OperCheckStatusConds
  },
  data() {
    return {
      condValues:['равно','содержит','больше','меньше','больше или равно','меньше или равно','не равно'],
      condData:{
        cond:'равно',
      },
      titleCondDataPopup:'Новое условие',
      showCondData:false,
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Переменная',
          field: 'perem',
          filter: true,
          width: 150,
        },
        {
          headerName: 'Условие',
          field: 'cond',
          filter: true,
          width: 60,
        },
        {
          headerName: 'Значение',
          field: 'val',
          filter: true,
          width: 150,
        },
        {
          headerName: '',
          field: 'id',
          filter: true,
          width: 50,
          cellRendererFramework: 'OperCheckStatusConds',
          cellRendererParams: {
            questionDeleteCheckStatusCond: this.questionDeleteCheckStatusCond.bind(this),
          }
        },
      ],
      components: {
        OperCheckStatusConds
      }
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.getCheckStatusConds(this.$route.params.id);
  },
  computed: {
    totalPages() {
      if (this.gridApi)
        return Math.ceil(this.CheckStatusCondsTotal / this.paginationPageSize)
      else return 0
    },
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },
    ...mapGetters([
      'CheckStatusConds', 'CheckStatusCondsTotal', 'CheckStatusCondsLoadingFlag'
    ]),
  },
  methods: {
    addNewCondStart(){
      let flag = true;

      if (typeof this.condData.perem == 'undefined' || this.condData.perem.trim() === ''){
        flag = false;
      }

      if (flag){
        this.condData.id_status = this.$route.params.id;
        this.saveCheckStatusCond(this.condData).then((response) => {
          if (response.result) {
            this.getCheckStatusConds(this.$route.params.id);
            this.$vs.notify({title: 'Сообщение', text: 'Успешно', color: 'success', position: 'top-center'})
            this.showCondData = false;
          } else {
            this.$vs.notify({
              title: 'Сообщение',
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
      } else {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните необходимые поля',
          color: 'danger',
          position: 'top-center'
        })
      }
    },
    changeCondition(){
      if (this.condData.cond == null){
        this.condData.cond = 'равно';
      }
    },
    addNewCond(){
      this.condData = {
        cond:'равно',
      };
      this.titleCondDataPopup = 'Новое условие';
      this.showCondData = true;
    },
    onrowDoubleClickedCond(event){
      this.getCheckStatusCondData(event.data.id).then((response) => {
        if (response.result) {
          this.condData = response.data;
          this.titleCondDataPopup = 'Редактирование условия';
          this.showCondData = true;
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка',
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
    questionDeleteCheckStatusCond(id_cond) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'red',
        title: 'Удаление условия',
        text: 'Вы действительно хотите удалить условие?',
        accept: () => {
          this.deleteCheckStatusCond(id_cond).then((response) => {
            if (response.result) {
              this.$vs.notify({title: 'Сообщение', text: 'Условие удалено', color: 'success', position: 'top-center'})
              this.getCheckStatusConds(this.$route.params.id);
            } else {
              this.$vs.notify({
                title: 'Сообщение',
                text: 'Ошибка при удалении',
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
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged() {
      Vue.nextTick(() => {
            this.gridOptions.api.sizeColumnsToFit();
          }
      );
    },
    onGridSizeChanged(params) {
      this.gridApi = this.gridOptions.api;
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
      'getCheckStatusConds','saveCheckStatusCond','getCheckStatusCondData','deleteCheckStatusCond'
    ]),
  },
}
</script>

<style lang="scss">
.h6 {
  font-size: 12px;
  color: cadetblue;
}

.unrecognized_files_move_file_banner {
  margin-top: 10px;
  background: #f7e1e1;
  padding: 15px;
  border-radius: 10px;
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.vh75 {
  min-height: 75vh;
}

.load-bar {
  display: inline-block;
  margin: auto;
  max-width: 100px;
}

.outer-div-status-check-conds {
  display: flex;
  text-align: center;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(200, 80%, 90%, 0.3);
}

.out-main-status-check-conds {
  position: relative;
}
</style>
