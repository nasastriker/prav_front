<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <h2>Вернуть на статус:</h2>
      <v-select   class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="statusOldLc"  ></v-select>


      <ag-grid-vue
          v-if="showTab"
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="AnsCreditsArrLocal"
          rowSelection="multiple"
          :rowDataChanged="onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="false"
          style="height: 60vh!important;"
          @rowDoubleClicked="onrowDoubleClicked"
          @grid-size-changed="onGridSizeChanged"
          @column-resized="onColumnResized"
          @column-visible="onColumnVisible"
      >
      </ag-grid-vue>
      <div style="text-align: center">
        <vs-button color="primary" @click="retunStatus">Удалить</vs-button>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import OpenCheck from './Render/OpenCheck.vue'
import axios from "@/axios";
import r from "@/route";
export default {
  components: {
    OpenCheck
  },
  props:[
    'AnswerFileName',
    'AnsCreditsArr',
    'TotalRecordsAns',
    'statusOld'
  ],
  data() {
    return {
      pag:100,
      showTab:true,
      csv: [],
      // AgGrid
      statusOldLocal:null,
      gridApi: null,
      AnsCreditsArrLo:[],
      gridOptions: {},
      popupActiveAnswerFile: false,
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: '',
          field: 'check',
          filter: true,
          width: 150,
          cellRendererFramework: 'OpenCheck',
          cellRendererParams: {
            change_check: this.changeCheck.bind(this)
          }
        },
        {
          headerName: 'Заемщик',
          field: 'debtor_fio',
          filter: true,
          width: 300,
        },
        {
          headerName: 'Дата рождения',
          field: 'birthdate',
          filter: true,
          width: 120,
        },

        {
          headerName: 'Кредит',
          field: 'id',
          filter: true,
          width: 100,
        },

        {
          headerName: 'Статус',
          field: 'status',
          filter: true,
          width: 280,

        },
      ],
      components: {
        OpenCheck
      }
    }
  },

  computed: {
    AnsCreditsArrLocal: function () {
      if(this.AnsCreditsArrLo.length==0) {
        return this.AnsCreditsArr
      }else{
        return this.AnsCreditsArrLo
      }


    },
    statusOldLc: {
      get() {
        if(this.statusOldLocal!=null) {
          return this.statusOldLocal
        }else{
          return this.statusOld
        }
      },
      set(val) {
        this.statusOldLocal=val
      }
    },
    ...mapGetters([
        'StatussArr'
    ]),
  },
  methods: {
    changeCheck(e){
      if(this.AnsCreditsArrLo.length==0) {
        for (let index = 0; index < this.AnsCreditsArr.length; ++index) {
          if(this.AnsCreditsArr[index].id==e.id){
            this.AnsCreditsArr[index].check=e.check;
          }
          this.AnsCreditsArrLo.push(this.AnsCreditsArr[index])
        }
      }else{
        let arr=[];
        for (let index = 0; index < this.AnsCreditsArrLo.length; ++index) {
          if(this.AnsCreditsArrLo[index].id==e.id){
            this.AnsCreditsArrLo[index].check=e.check;
          }
        }
        this.AnsCreditsArrLo=arr
      }
    },
    retunStatus(){
      let arr=[];
      if(this.AnsCreditsArrLo.length==0) {
        arr=this.AnsCreditsArr
      }else{
        arr=this.AnsCreditsArrLo
      }
      this.$vs.loading({color: '#ff8000'})
      axios.post(r("archPfr.update"), {
        params: {
          method: 'deleteArchPfr',
          param: {
            'status':this.statusOldLc,
            'credits':arr,
            'file':this.AnswerFileName
          }

        }
      }).then((response) => {
          this.$vs.loading.close()
          this.$emit('close')
          if(response.data.result){

            this.$vs.notify({
              title: 'Сообщение',
              text: 'Удаленно',
              color: 'success',
              position: 'top-center'
            })
          }else{
            this.$vs.notify({  title:'Сообщение', text: 'Удаленние не выполнено !!!', color: 'danger', position: 'top-center' })
          }
      }).catch(error => {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })

      });
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
    changePag(pag) {
      this.gridApi.paginationSetPageSize(pag)
    },
    onrowDoubleClicked(event) {
      this.$router.push('/debtors/' + event.data.id);
    },
    ...mapActions([
    ]),
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged() {
      Vue.nextTick(() => {
            this.gridOptions.api.sizeColumnsToFit();
          }
      );
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
  }
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
.vs-popup {
  min-width: 800px;
}
.err_mess {
  color: red;
}

.succs_mess {
  color: green;
}

.row-no-file {
  background-color: #FFC0CB;
}

hr {
  transform: scaleY(0.5);
}
</style>
