<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col 2">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalControlStatus - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalControlStatus }} of {{ TotalControlStatus }}</span>
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
                        <vs-input type="text" placeholder="Название" v-model="User.pag.controlStatus.find" @change="changeFind" style="margin-left: 10px"></vs-input>
                        <div>
                            <svg style="    margin-top: 10px;    cursor: pointer;    max-height: 20px;    padding-right: 80px;" @click="clearFilter" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.88px" height="110.668px" viewBox="0 0 122.88 110.668" enable-background="new 0 0 122.88 110.668" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M91.124,15.645c12.928,0,23.406,10.479,23.406,23.406 c0,12.927-10.479,23.406-23.406,23.406c-12.927,0-23.406-10.479-23.406-23.406C67.718,26.125,78.197,15.645,91.124,15.645 L91.124,15.645z M2.756,0h117.322c1.548,0,2.802,1.254,2.802,2.802c0,0.848-0.368,1.622-0.996,2.139l-10.667,13.556 c-1.405-1.375-2.95-2.607-4.614-3.672l6.628-9.22H9.43l37.975,46.171c0.59,0.516,0.958,1.254,0.958,2.102v49.148l21.056-9.623 V57.896c1.651,1.9,3.548,3.582,5.642,4.996v32.133c0,1.105-0.627,2.064-1.586,2.506l-26.476,12.758 c-1.327,0.773-3.023,0.332-3.798-1.033c-0.258-0.441-0.368-0.92-0.368-1.4V55.02L0.803,4.756c-1.07-1.106-1.07-2.839,0-3.945 C1.355,0.258,2.056,0,2.756,0L2.756,0z M96.93,28.282c1.328-1.349,3.489-1.355,4.825-0.013c1.335,1.342,1.341,3.524,0.013,4.872 l-5.829,5.914l5.836,5.919c1.317,1.338,1.299,3.506-0.04,4.843c-1.34,1.336-3.493,1.333-4.81-0.006l-5.797-5.878l-5.807,5.889 c-1.329,1.349-3.489,1.355-4.826,0.013c-1.335-1.342-1.341-3.523-0.013-4.872l5.83-5.913l-5.836-5.919 c-1.317-1.338-1.3-3.507,0.04-4.843c1.339-1.336,3.492-1.333,4.81,0.006l5.796,5.878L96.93,28.282L96.93,28.282z"/></g></svg>
                        </div>


                    </div>
                </div>




                <div class="vx-col 1" style="    text-align: end;">
                    <img src="loading.gif" v-if="ControlStatusFlag" style="max-width: 40px; margin-top: 5px;">

                </div>



            </div>




            <ag-grid-vue
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ControlStatusArr"
                    rowSelection="multiple"
                    colResizeDefault="shift"
                    :animateRows="true"
            @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible"
            :floatingFilter="false"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :suppressPaginationPanel="true"
            @rowDoubleClicked="onrowDoubleClicked"
            :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage"/>

        </div>
    </div>

</template>

<script>

    import {AgGridVue} from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import Open from './Render/Open.vue'

    export default {
        components: {
            AgGridVue,
            vSelect,

            Open,
        },

        data() {
            return {

                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'Open',



                    },

                    {
                        headerName: 'id',
                        field: 'id',
                        filter: true,
                        width: 100
                    },


                ],

                // Cell Renderer Components
                components: {
                    Open
                }
            }
        },

        computed: {
            ...mapGetters([
                'User','ControlStatusFlag'
            ]),
            totalPages() {
                if (this.gridApi)
                    return Math.ceil(this.TotalControlStatus / this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User.pag.controlStatus=='undefined'){
                    return this.User.pag.controlStatus={
                        offset:0,
                        find:null,
                        status:null,
                        limit:100
                    }
                }
                if(typeof this.User.pag.controlStatus.limit=='undefined'){
                    this.User.pag.controlStatus.limit=100
                }
                return this.User.pag.controlStatus.limit

            },

            currentPage: {
                get() {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set(val) {
                    if(typeof this.User.pag.controlStatus=='undefined'){
                        return this.User.pag.controlStatus={
                            offset:0,
                            find:null,
                            status:null,
                            limit:100
                        }
                    }
                    if(typeof this.User.pag.controlStatus.offset=='undefined'){
                        this.User.pag.controlStatus.offset=0
                    }
                    this.User.pag.controlStatus.offset=val-1
                    this.getControlStatuss(this.User.pag.controlStatus);
                    this.gridApi.paginationGoToPage(val - 1);
                }
            },
            ...mapGetters([
                'ControlStatusArr', 'TotalControlStatus', 'User'
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

            onrowDoubleClicked(event){


            },

            clearFilter(){
                if(typeof this.User.pag.controlStatus=='undefined'){
                    this.User.pag.controlStatus={
                        offset:0,
                        find:null,
                        filter:null,
                        status:null,
                        limit:100
                    }
                }
                this.User.pag.controlStatus.find=null
                this.User.pag.controlStatus.filter=null
                this.setDataUser().then((response) => {
                    this.getControlStatuss(this.User.pag.controlStatus);

                })
            },

            changeFind(){
                if(typeof this.User.pag.controlStatus=='undefined'){
                    this.User.pag.controlStatus={
                        offset:0,
                        find:null,
                        filter:null,
                        status:null,
                        limit:100
                    }
                }

                this.setDataUser().then((response) => {
                    this.getControlStatuss(this.User.pag.controlStatus);

                })
            },
            changePag(pag){
                if(typeof this.User.pag.controlStatus=='undefined'){
                    this.User.pag.controlStatus={
                        offset:0,
                        find:null,
                        filter:null,
                        status:null,
                        limit:100
                    }
                }
                this.User.pag.controlStatus.limit=pag

                this.setDataUser().then((response) => {
                    this.getControlStatuss(this.User.pag.controlStatus);

                })


                this.gridApi.paginationSetPageSize(pag)
            },
            updateSearchQuery (val) {
                this.User.pag.controlStatus.find=val

                this.getControlStatuss(this.User.pag.controlStatus);

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },



            ...mapMutations([
            ]),
            ...mapActions([
                'getControlStatuss','setDataUser'
            ]),
        },
        mounted() {
            this.gridApi = this.gridOptions.api
            this.getControlStatuss(this.User.pag.controlStatus);

        }
    }

</script>
<style>
    .router-view {
        padding: 1.2rem;
    }
    .ag-theme-material.w-100.my-4.ag-grid-table {
        /*height: 80vh;*/
    }
    .ag-theme-material .ag-ltr .ag-cell {
        border-right: 1px solid #bfbfbf!important;
    }
    .ag-theme-material .ag-row {
        border-color: #bfbfbf!important;
    }
</style>

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

    .plan-group {
        background-color: #2E8B57;
        color: white;
    }

    .fact-group {
        background-color: #4682B4;
        color: white;
    }

    .new-task {
        font-weight: bolder;
    }

    .cell-succ {
        background-color: #00FF00;
    }
    .cell-warn {
        background-color: #FFA07A;
    }

</style>
<style lang="scss">
    .con-vs-popup {
        z-index: 53000;

    .vs-popup {
        width: 800px !important; //You can change the width according to your content
    height: auto;
    }
    .vs-popup--content {
        width: auto !important;
        padding: 1rem;
        font-size: 1rem;
    }
    }
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
    .con-vs-pagination{
        margin-right: 40px!important;
    }
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
