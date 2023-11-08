<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="vx-row" style="z-index: 222; position: relative;">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium ml-4 mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalJudicials - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalJudicials }} of {{ TotalJudicials }}</span>
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
              <div class="centerx mt-3 mr-4">
                <vs-tooltip text="Использовать БД локально позволяет вносить изменения " position="top" >
                  <vs-checkbox v-model="LocalBd.bd_jud" @change="changeLocal">Использовать БД локально</vs-checkbox>
                </vs-tooltip>
              </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input style="    min-width: 450px;" class="mb-4 md:mb-0 mr-4"  v-model="User.pag.judicial.find" @input="updateSearchQuery" placeholder="Поиск..." />
                  <template v-if="butttonNewIs">
                    <div class="dropdown-button-container">
                      <vs-button  class="btnx" color="danger" type="filled"
                                  @click="$router.push('/handbook/judicial/new')">Новый участок</vs-button>
                      <vs-dropdown>
                        <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                        <vs-dropdown-menu>
                          <vs-dropdown-item>
                            <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="downLoadBd">Скачать БД</vs-button>
                          </vs-dropdown-item>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </div>
                  </template>
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="JudicialsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @selection-changed="onSelectionChanged"
                    @column-visible="onColumnVisible"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true"
                    :paginationPageSize="paginationPageSize"
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
    import OpenJudicial from './Render/OpenJudicial.vue'
    import OpenJudicialName from './Render/OpenJudicialName.vue'
    import OpenJudicialRefine from './Render/OpenJudicialRefine.vue'
    import r from '@/route';
    import axios from '@/axios'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        props:['buttonNew'],
        components: {
            OpenJudicial,
            OpenJudicialName,
            OpenJudicialRefine,
        },
        data () {
            return {
                searchQuery: '',
                csv:[],
                // AgGrid
                gridApi: null,
                gridOptions: {
                  suppressScrollOnNewData:true
                },
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

                    {
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        headerTooltip: 'ID',
                        tooltipField: 'id',
                        width: 100
                    },
                    {
                        headerName: 'Номер',
                        field: 'number',
                        headerTooltip: 'Номер',
                        tooltipField: 'number',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Имя',
                        field: 'name',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        filter: true,
                        width: 600,
                    },
                    {
                        headerName: 'Адрес',
                        field: 'address',
                        headerTooltip: 'Адрес',
                        tooltipField: 'address',
                        filter: true,
                        width: 600
                    },
                    {
                        headerName: 'Url подсуд',
                        field: 'podsupnost',
                        headerTooltip: 'Url подсуд',
                        tooltipField: 'podsupnost',
                        filter: true,
                        width: 600
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        headerTooltip: 'Операции',
                        tooltipField: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenJudicial',
                    },
                ],
                components: {
                    OpenJudicial,
                    OpenJudicialName,
                    OpenJudicialRefine,
                }
            }
        },

        computed: {


            totalPages () {
                //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalJudicials/this.paginationPageSize)
                else return 100
            },
            paginationPageSize () {
                return this.User.pag.judicial.limit
            },

            ...mapGetters([
                'JudicialsArr','TotalJudicials','User','LocalBd'

            ]),
            butttonNewIs(){
              if(this.buttonNew==false){
                this.columnDefs= [

                  {
                    headerName: 'Номер',
                    field: 'number',
                    filter: true,
                    width: 200
                  },
                  {
                    headerName: 'Имя',
                    field: 'name',
                    filter: true,
                    width: 600,
                    //cellRendererFramework: 'OpenJudicialName'
                  },

                  {
                    headerName: 'Операции',
                    field: 'id',
                    filter: true,
                    width: 200,
                    cellRendererFramework: 'OpenJudicialRefine',
                    cellRendererParams:{
                      editAddress: this.editAddressRefine.bind(this),
                      linkJud:this.linkJudAddressRefine.bind(this)
                    },

                  },
                ]
                return false
              }
              return true
            },
            currentPage: {
                get () {
                  if (typeof this.User.pag.judicial.curPage !== 'undefined') return this.User.pag.judicial.curPage
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.User.pag.judicial.curPage=val;
                    this.setQueryJudicalOffset(val-1)
                    this.getDataJudicials(this.User.pag.judicial);
                    this.gridApi.paginationGoToPage(val - 1)
                    this.setDataUser()

                }
            },


        },
        methods: {

            downLoadBd(){
              this.$vs.loading({color: '#ff8000'})
              axios.get(r("judicial.index"), {
                responseType: 'arraybuffer',

                params: {
                  method: 'downLoadBd',


                }
              }).then((response) => {
                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                let filename =decodeURI(response.headers[0]);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                this.$vs.loading.close()

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

            changeLocal(){
              this.changeLocalBd(this.LocalBd)
            },
            ...mapMutations([
                'setQueryJudicalOffset','setQueryJudicalLimit'

            ]),
            ...mapActions([
               'getDataJudicialAreasForSug'

            ]),
            editAddressRefine(id){
             this.$emit('editAddress',id)
            },

            linkJudAddressRefine(id){
                this.$emit('linkJudAddress',id)
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
          onGridReady() {
            this.gridOptions.api.forEachNode(node=>
                node.data.id == this.User.pag.judicial.selectIdCredit ? node.setSelected (true) : node.setSelected(false));
          },
          onSelectionChanged() {
             this.User.pag.judicial.selectIdCredit=this.gridApi.getSelectedRows()[0].id
             this.setDataUser()

          },
            hideJudical(data){
                if(this.User.pag==null){
                    this.User.pag={
                        judicalProblem:false
                    }
                }
                if(this.User.pag.judicalProblem==null){
                    this.User.pag={
                        judicalProblem:false
                    }
                }
                if(data=='problem'){
                    this.User.pag.judicalProblem=!this.User.pag.judicalProblem
                }


                this.setDataUser().then((response) => {
                    this.getDataJudicials()
                })
            },
            changePag(pag){

                this.User.pag.judicial.limit=pag
                this.setDataUser()
                this.getDataJudicials(this.User.pag.judicial);
                this.setQueryJudicalLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){
              this.$router.push('/handbook/judicial/'+event.data.id)
            },
            loadS(){
                console.log(this.csv)
            },
            ...mapActions([
                'getDataJudicials','setDataUser','getLocalBd','changeLocalBd'
            ]),
            updateSearchQuery (val) {
                this.User.pag.judicial.find=val

                this.getDataJudicials(this.User.pag.judicial);

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.getLocalBd();
            this.getDataJudicialAreasForSug()
            this.gridApi = this.gridOptions.api
            this.gridApi.paginationSetPageSize(this.User.pag.judicial.limit)
            this.getDataJudicials(this.User.pag.judicial).then((response)=>{
              setTimeout(() =>{
                this.onGridReady()
              }, 500);
            })
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
