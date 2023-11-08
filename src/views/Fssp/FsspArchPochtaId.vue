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
import OpenReestrPochta from './Render/OpenReestrPochta.vue'
import DeleteFromReestr from './Render/DeleteFromReestr.vue'
import axios from "@/axios";
import r from "@/route";

export default {
  components: {
    Back,
    OpenReestrPochta,
    DeleteFromReestr
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
          filter: true,
          width: 150,
        },
        {
          headerName: 'Дата рождения',
          field: 'birthdate',
          filter: true,
          width: 80,
        },

        {
          headerName: 'Кредит',
          field: 'id',
          filter: true,
          width: 50,
        },

        {
          headerName: 'Адрес',
          field: 'address',
          filter: true,
          width: 350,
          cellRendererFramework: 'OpenReestrPochta'
        },
        {
          headerName: 'ФССП',
          field: 'name_fssp',
          filter: true,
          width: 280,

        },
        {
          headerName: 'Операции',
          headerTooltip: 'Операции',
          field: 'id_from_file',
          filter: true,
          width: 150,
          cellRendererFramework: 'DeleteFromReestr',
          cellRendererParams: {
            update: this.getAnsCredits.bind(this),

          }
        },
      ],
      components: {
        OpenReestrPochta,
        DeleteFromReestr
      }
    }
  },

 

  computed: {

    ...mapGetters([
     
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
          method: 'getPochtaCredits',
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
