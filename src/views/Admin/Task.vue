<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalTasksUser - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalTasksUser }} of {{ TotalTasksUser }}</span>
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
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">Статус {{status}}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu class="scroll">
                            <template v-for="(item,index) in TasksUserStatusArrAll">
                                <vs-dropdown-item @click="setStatus(index)">
                                    <span>{{ item.name }}</span>


                                </vs-dropdown-item>
                            </template>

                        </vs-dropdown-menu>
                    </vs-dropdown>
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">Сотрудник {{user}}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu class="scroll">
                            <template v-for="(item,index) in UsersArrAll">
                                <vs-dropdown-item @click="setUser(index)">
                                    <span>{{ item.name }}</span>


                                </vs-dropdown-item>
                            </template>

                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />

                        <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/adm/task_user/new')">Новая задача</vs-button>
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
                    :rowData="TasksUserArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
            @rowDoubleClicked="onrowDoubleClicked"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
import Status from '../Task/Render/Status.vue'
import User from './Render/User.vue'
import OpenTask from './Render/OpenTask.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Status,
    User,
    OpenTask
  },

  data () {
    return {

      // Filter Options

      user:'',
      searchQuery: '',
      status:'Все',
      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [


        {
          headerName: 'Название',
          field: 'name',
          filter: true,
          width: 200
        },
        {
          headerName: 'Сотрудник',
          field: 'id_user',
          filter: true,
          width: 200,
          cellRendererFramework: 'User'
        },
        {
          headerName: 'Дата начала',
          field: 'date_begin',
          filter: true,
          width: 120
        },
        {
          headerName: 'Дата окон.',
          field: 'date_end',
          filter: true,
          width: 120
        },
        {
          headerName: 'Статус',
          field: 'id_status',
          filter: true,
          width: 200,
          cellRendererFramework: 'Status'
        },
        {
          headerName: 'Операции',
          field: 'id',
          filter: true,
          width: 200,
          cellRendererFramework: 'OpenTask'
        }


      ],

      // Cell Renderer Components
      components: {
        Status, User, OpenTask
      }
    }
  },

  computed: {
    totalPages () {
      //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
      if (this.gridApi) return Math.ceil(this.TotalTasksUser / this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },

    ...mapGetters(['TasksUserArr', 'TotalTasksUser',   'ShowTask', 'UsersArr', 'TasksUserStatusArrAll', 'User', 'UsersArrAll']),
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }

  },
  methods: {
    setUser (index) {
      this.user = this.UsersArrAll[index].name
      this.User.pag.task_user.user = this.UsersArrAll[index].id
      this.setDataUser()
      this.getDataTasksUserAll(this.User.pag.task_user)
    },
    setStatus (index) {
      this.status = this.TasksUserStatusArrAll[index].name
      this.User.pag.task_user.status = this.TasksUserStatusArrAll[index].id
      this.setDataUser()
      this.getDataTasksUserAll(this.User.pag.task_user)
    },
    onrowDoubleClicked (event) {
      this.$router.push(`/adm/task_user/${event.data.id}`)


    },
    ...mapMutations(['setShowTask']),
    ...mapActions(['getDataTasksUserAll', 'getTaskUserStatuss', 'getDataUsers', 'setDataUser']),
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged () {
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit()
      }
      )
    }

  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.getTaskUserStatuss()
    this.getDataTasksUserAll(this.User.pag.task_user)
    this.getDataUsers()
    for (let i = 0; i < this.TasksUserStatusArrAll.length; i++) {
      if (this.TasksUserStatusArrAll[i].id == this.User.pag.task_user.status) {
        this.status = this.TasksUserStatusArrAll[i].name
      }

    }
    for (let i = 0; i < this.UsersArrAll.length; i++) {
      if (this.UsersArrAll[i].id == this.User.pag.task_user.user) {
        this.user = this.UsersArrAll[i].name
      }

    }

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
</style>
