<template>
  <div id="page-user-list">
   <div class="vx-card p-6">
    <Back></Back>
    <h3 style="margin-left: 15px">{{ AnswerFileName }} Количество:{{TotalRecordsAns}}</h3>
      <hr style="margin-bottom: 15px; border: 0.5px solid #7367f0;">
      <ag-grid-vue
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="AnsCreditsArr"
          rowSelection="multiple"
          :rowDataChanged="onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="false"
          :overlayLoadingTemplate="'Идёт загрузка'"
          :overlayNoRowsTemplate="'Нет записей'"
          :enableBrowserTooltips="true"
          @rowDoubleClicked="onrowDoubleClicked"
          @grid-size-changed="onGridSizeChanged"
          @column-resized="onColumnResized"
          @column-visible="onColumnVisible"
          >
      </ag-grid-vue>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Back from '../../components/Back.vue'
import axios from "@/axios";
import r from "@/route";
import moment from 'moment';
export default {
  components: {
    Back,
  },
  data() {
    return {
      pag:100,
      AnswerFileName:'',
      AnsCreditsArr: '',
      TotalRecordsAns:0,
      csv: [],
      // AgGrid
      gridApi: null,
      gridOptions: {},
      popupActiveAnswerFile: false,
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Заемщик',
          field: 'debtor_fio',
          headerTooltip: 'Заемщик',
          tooltipField: 'debtor_fio',
          filter: true,
          width: 120,
        },
        {
          headerName: 'Дата рождения',
          field: 'birthdate',
          headerTooltip: 'Дата рождения',
          tooltipField: 'birthdate',
          filter: true,
          width: 70,
          cellRenderer: params => moment(params.value).format('DD.MM.YYYY')
        },

        {
          headerName: 'Кредит',
          headerTooltip: 'Кредит',
          tooltipField: 'id',
          field: 'id',
          filter: true,
          width: 50,
        },
        {
          headerName: 'Статус',
          headerTooltip: 'Статус',
          tooltipField: 'status',
          field: 'status',
          filter: true,
          width: 100,
        },
        {
          headerName: 'Статус превед',
          headerTooltip: 'Статус преведущий',
          tooltipField: 'id_status_old',
          field: 'id_status_old',
          filter: true,
          width: 100,
          cellRenderer: params =>{
            for (let i = 0; i < this.StatussArr.length; i++) {
              if (this.StatussArr[i].id==params.data.id_status_old){return this.StatussArr[i].name}
            }
            return ''
          }

        },
        {
          headerName: 'Дата фнс',
          field: 'date_fns',
          headerTooltip: 'Дата фнс',
          tooltipField: 'date_fns',
          filter: true,
          width: 60,
          cellRenderer: params => {

              if (params.value!= null) {
                return moment(params.value).format('DD.MM.YYYY')
              }

            return ''
          }
        },

        {
          headerName: 'ФССП',
          field: 'name_fssp',
          headerTooltip: 'ФССП',
          tooltipField: 'name_fssp',
          filter: true,
          width: 280,

        },

      ],
      components: {
      }
    }
  },

 

  computed: {

    ...mapGetters([
      'StatussArr',
    ]),

  },
  methods: {
   
    
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

    getAnsCredits(){
      axios.get(r("fssp.index"), {
        params: {
          method: 'getFsspCredits',
          param:this.$route.params.id

        }
      }).then((response) => {
        if(response.data.result){
             this.AnswerFileName=response.data.file
             this.AnsCreditsArr=response.data.data
             this.TotalRecordsAns=response.data.total
        }
      })
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
    this.getAnsCredits(this.$route.params.id);

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
