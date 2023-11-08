<template>
    <div id="page-user-list">

        <div >

            <vs-button class="ml-auto mt-2" @click="add">Шаблон</vs-button>
            <vs-button class="ml-auto mt-2" @click="save">Сохранить</vs-button>



        </div>
        <vs-popup classContent="popup-example" title="Настройка" :active.sync="popupActive2">
            <h6>Статус вх.</h6>
            <vs-input    style="magrin-bottom: 20px;margin-top: 2px;" disabled v-model="data.status_vx"></vs-input>
            <h6>Статус исх.</h6>
            <vs-input    style="magrin-bottom: 20px;margin-top: 2px;" disabled v-model="data.status_is"></vs-input>

            <vs-checkbox style="margin-bottom: 15px" v-model="data.usl.active"  >Активно</vs-checkbox>



            <h6>Количество дней.</h6>
            <vs-input   type="NUMBER"  style="magrin-bottom: 20px;margin-top: 20px;" v-model="data.usl.count"></vs-input>

            <vs-button style="magrin-bottom: 20px;margin-top: 20px;" @click="saveData">Сохранить</vs-button>
        </vs-popup>
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="RetBankArr"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
        @grid-size-changed="onGridSizeChanged"
        @column-resized="onColumnResized"
        @column-visible="onColumnVisible"
        @rowDoubleClicked="onrowDoubleClicked"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
        </ag-grid-vue>





    </div>
</template>

<script>
    import VxTimeline from './Render/VxTimeline.vue'
    import OpenCheckReturnBank from './Render/OpenCheckReturnBank.vue'
    import VueBlocksContainer from './components/VueBlocksContainer.vue'
    import VueBlockProperty from './components/VueBlockProperty.vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import Vue from 'vue'
    import FlowChart from 'flowchart-vue';
    Vue.use(FlowChart);
    export default {
        components: {
            VxTimeline,VueBlocksContainer,VueBlockProperty,FlowChart,  OpenCheckReturnBank
        },

        data () {
            return {
                RetBankArr:[

                ],
                shab:[],
                searchQuery: '',

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
                        headerName: 'Статус вх.',
                        field: 'status_vx',
                        filter: true,
                        width: 150
                    },

                    {
                        headerName: 'Условия',
                        field: 'usl',
                        filter: true,
                        width: 300,
                        cellRendererFramework: 'OpenCheckReturnBank'
                    },
                    {
                        headerName: 'Статус исх.',
                        field: 'status_is',
                        filter: true,
                        width: 150
                    },





                ],

                // Cell Renderer Components
                components: {
                    OpenCheckReturnBank
                },
                first:false,

                shablon:'',
                action:0,
                status:0,
                type:0,
                label:'',
                data:{
                    status_vx:'',
                    status_is:'',
                    usl:{
                        count:0,
                        active:true,
                    }
                },
                popupActive2:false,
            }
        },
        mounted(){
            this.getDataStatuss()
            this.getDataFuncFnss()
            this.getData()
            this.gridApi = this.gridOptions.api


        },

        computed: {
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },


            ...mapGetters([
                'StatussArr','TotalStatuss','FuncsArr','TotalFuncs',

            ]),

        },
        watch: {

        },
        methods: {
            saveData(){
                this.popupActive2=false;
            },
            onrowDoubleClicked(event){
                this.popupActive2=true
                this.data=event.data;

            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
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
            handleChartSave(nodes, connections) {
                // axios.post(url, {nodes, connections}).then(resp => {
                //   this.nodes = resp.data.nodes;
                //   this.connections = resp.data.connections;
                //   // Flowchart will refresh after this.nodes and this.connections changed
                // });
            },
            handleEditNode(node) {
                if (node.id === 2) {
                    console.log(node.description);
                }
            },
            handleEditConnection(connection) {
            },
            handleDblClick(position) {
                this.$refs.chart.add({
                    id: +new Date(),
                    x: position.x,
                    y: position.y,
                    name: 'New',
                    type: 'operation',
                    approvers: [],
                });
            },




            ...mapActions([

               'getDataStatuss','getDataFuncFnss'
            ]),
            add(){

                this.RetBankArr=this.shab
                console.log('s')
                this.save();

            },
            close(){

                this.$router.back()
            },
            getData(){

                axios.get(r("bank.index"), {
                    params: {
                        method: 'getReturnBank',

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.RetBankArr=response.data.data.setting
                       // this.RetBankArr=response.data.data.setting
                        this.shab=response.data.shab
                    }



                })
            },

            save(){

                axios.post(r("bank.index"), {
                    params: {
                        method: 'saveReturnBank',
                        param: this.RetBankArr

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено' , color: 'success', position: 'top-center' })
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


        },
    }
</script>
<style  lang="scss">
    .vs-popup--content {
        min-height: 400px !important;
    }
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
</style>
