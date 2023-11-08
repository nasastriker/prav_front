<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="vx-row" >

        <div class="vx-col ">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalSettingLogs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalSettingLogs }} of {{ TotalSettingLogs }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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

        <div class="vx-col" style="margin-right: 0rem !important;">
          <vs-input style="margin-right: 0rem !important;" class="mb-4 md:mb-0 mr-4" v-model="settingStadHistoryView.find" @input="updateSearchQuery" placeholder="Поиск..." />

        </div>
        <div class="vx-col 1" >
                            <span style="max-width: 40px;">
                            <img src="/loading.gif" v-if="LogsSettingFindFlag" style="max-width: 40px; margin-top: 5px;">
                            </span>
        </div>
      </div>



      <!-- AgGrid Table -->
      <ag-grid-vue
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="LogsStadHistoryArr"
          rowSelection="multiple"
          :rowDataChanged = "onRowDataChanged"
          colResizeDefault="shift"

          :animateRows="true"
          :floatingFilter="true"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          @rowDoubleClicked="onrowDoubleClicked"
          :enableRtl="$vs.rtl"
          @grid-size-changed="onGridSizeChanged"
          @column-resized="onColumnResized"
          @column-visible="onColumnVisible"
      >
      </ag-grid-vue>

      <vs-pagination

          :total="totalPages"
          :max="7"
          v-model="currentPage" />

    </div>

  </div>
</template>

<script>
import { mapActions,mapGetters,mapMutations } from 'vuex'

export default {
  components: {
  },
  props:['id'],
  data () {
    return {
      settingStadHistoryView:{
        offset:0,
        limit:100,
        find:'',
        // fields:{},
        id:0,
      },

      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [


        {
          headerName: 'Пользователь',
          field: 'user_name',
          width: 150,
    
        },
        {
          headerName: 'Название переменной',
          field: 'name',
          filter: true,
          width: 300,
      
        },
        {
          headerName: 'Старое значение',
          field: 'old_value',
          filter: true,
          width: 150,
        },
        {
          headerName: 'Новое значение',
          field: 'new_value',
          filter: true,
          width: 150,
        },
        {
          headerName: 'Дата изменения',
          field: 'date',
          filter: true,
          width: 150,
   
        },

    
      ],

      // Cell Renderer Components
      components: {
      }

    }
  },
  mounted(){
    this.gridApi = this.gridOptions.api
    if(typeof this.User.pag.settingStadHistoryView=="undefined"){
      this.User.pag.settingStadHistoryView=this.settingStadHistoryView
    }

    this.getDataUser().then(res=>{
      this.User.pag.settingStadHistoryView.id=1
      this.User.pag.settingStadHistoryView.find=''
      this.setDataUser().then(res=>{
        this.getSettingStadHistoryArr(this.User.pag.settingStadHistoryView);
        this.settingStadHistoryView=this.User.pag.settingStadHistoryView;
      })

    })

  },
  computed: {

    ...mapGetters([
      'LogsStadHistoryArr','User','TotalSettingLogs','LogsSettingFindFlag'

    ]),
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.TotalSettingLogs/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      // return this.User.pag.settingStadHistoryView.limit
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 20
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        // this.setQuerysettingStadHistoryViewOffset(val-1)
        // this.getSettingStadHistoryArr(this.User.pag.settingStadHistoryView);
        this.gridApi.paginationGoToPage(val - 1)
      }
    },

  },
  methods: {
    ...mapActions([
      'getSettingStadHistoryArr','getDataUser','setDataUser'
    ]),
    ...mapMutations([
      // 'setQuerysettingStadHistoryViewOffset'
    ] ),
    confirmDeleteRecord(id){
      // console.log(id)
    },
    infoRecord(id){

    },
    updateSearchField(findField, findFieldName, findType, not_update=false){

    },
    changePag(pag){
      this.User.pag.settingStadHistoryView.limit=pag
      this.setDataUser().then((response)=>{
        this.getSettingStadHistoryArr(this.User.pag.settingStadHistoryView);
      })
      this.gridApi.paginationSetPageSize(pag)

    },

    onrowDoubleClicked(event){


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
    onColumnResized(params) {
      params.api.resetRowHeights();
    },
    onColumnVisible(params) {
      params.api.resetRowHeights();
    },
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged () {
      Vue . nextTick (() => {
            this.gridOptions.api.sizeColumnsToFit();
          }
      );
    },

  }

}
</script>

<style>

</style>