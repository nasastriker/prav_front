<template>
  <div>
    <span style="color: red; cursor:pointer" @click="showQuest">Вопросы</span>
    <vs-popup class="holamundo" title="Вопросы" :active.sync="show">

      <div class="vx-row">
        <div class="vx-col w-1/3">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ total - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : total }} of {{ total }}</span>
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
        <div class="vx-col w-1/3">
          <vs-button v-if="!showAdd" class="mb-4 md:mb-0 mr-4" @click="add"> Добавить</vs-button>
        </div>
      </div>
      <template v-if="showAdd">
        <h6  class="h6" style="margin-top: 10px">Вопрос:</h6>
        <vs-input class="w-full" v-model="quest"></vs-input>

        <h6  class="h6" style="margin-top: 10px">Ответ:</h6>
        <vs-input  class="w-50" v-model="answer" ></vs-input>
        <vs-button style="margin-top: 10px" class="mb-4 md:mb-0 mr-4" @click="save"> Сохранить</vs-button>
      </template>
      <ag-grid-vue
          style="height: 500px"
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="data"
          rowSelection="multiple"
          :enableBrowserTooltips="true"
          colResizeDefault="shift"
          :animateRows="true"
          :overlayNoRowsTemplate="'Нет записей'"
          @grid-size-changed="onGridSizeChanged"
          :floatingFilter="false"
          :pagination="true"
          @rowDoubleClicked="onrowDoubleClicked"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          :enableRtl="$vs.rtl"
          :rowClassRules="rowClassRules">
      </ag-grid-vue>
      <vs-pagination
          :total="totalPages"
          :max="7"
          v-model="currentPage" />
     

    </vs-popup>
  </div>
</template>

<script>
import r from '@/route';
import axios from '@/axios'
import { mapActions,mapGetters,mapMutations } from 'vuex'
import TaskSudStatus from "@/views/Rabsud/Sud/Render/TaskSudStatus";
export default {
  components: {

  },
  props:['login'],
  data () {
    return {
      data:[],
      total:0,
      id:0,
      quest:'',
      showAdd:false,
      answer:'',
      paginationPageSize:100,
      show: false,
      gridApi: null,
      gridOptions: {},
      rowClassRules: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Вопрос',
          headerTooltip: 'Вопрос',
          tooltipField: 'quest',
          field: 'quest',
          filter: true,
          width: 120,
         
        },
        {
          headerName: 'Ответ',
          headerTooltip: 'Ответ',
          field: 'answer',
          tooltipField: 'answer',
          filter: true,
          width: 150
        },
      

      ],
      components: {
        
      }
    }
  },


  computed: {
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.total/this.paginationPageSize)
      else return 0
    },


    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {

        this.gridApi.paginationGoToPage(val - 1)
      },

    },
    ...mapGetters([

    ]),

  },
  methods: {
    onrowDoubleClicked(event){
      this.quest=event.data.quest
      this.answer=event.data.answer
      this.id=event.data.id
      this.showAdd=true

    },
    add(){
      this.showAdd=true
    },
    save(){
      this.$vs.loading({color: '#ff8000'})
      axios.post(r("questGu.update"), {
        params: {
          method: 'save',
          param: {
            login:this.login,
            answer:this.answer,
            quest:this.quest,
            id:this.id,

          }

        }
      }).then((response) => {
        this.$vs.loading.close()
        if (response.data.result){
          this.showAdd=false
          this.quest=''
          this.answer=''
          this.id=0
          this.getData()
          this.$vs.notify({  title:'Успешно', text: 'Сохранено!!' , color: 'success', position: 'top-center' })
        }
        else{
          this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
        }



      }).catch(error => {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })
      })


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
    getData(){
      axios.get(r("questGu.index"), {
        params: {
          method: 'getQuestGu',
          param: this.login
        }
      }).then((response) => {
        if(response.data.result){
          this.data=response.data.data
        }
      })
    },
    showQuest(){
      this.show=true
      this.getData()
    },

    close(){

    },

    ...mapActions([
    ]),

  },
  mounted() {
    this.gridApi = this.gridOptions.api;

  }
}
</script>
<style>
.standart{
  color: #a9a7f0
}
</style>
