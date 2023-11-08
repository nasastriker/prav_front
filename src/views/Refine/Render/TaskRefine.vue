<template>
    <div>
        <vs-input type="date" v-model="bankTaskRefineDate"  ></vs-input>
        <ag-grid-vue
            style="height: 500px"
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="TaskRefineArrLocal"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            @rowDoubleClicked="onrowDoubleClicked"
            @grid-size-changed="onGridSizeChanged"
            :floatingFilter="false"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl"
            :rowClassRules="rowClassRules">
        </ag-grid-vue>
        <vs-popup classContent="popup-example" title="Ошибка" :active.sync="popTaskRefine">
            <vs-textarea class="w-100" height="600px" v-model="error" > </vs-textarea>
        </vs-popup>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import TaskRefineStatus from './TaskRefineStatus.vue'

export default {
    components: {
      TaskRefineStatus,
    },
    data() {
        return {
            data:[],
            popTaskRefine:false,
            bankTaskRefineDate:null,
            error:'',
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
                    headerName: 'Дата',
                    field: 'created_at',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Имя',
                    field: 'name',
                    filter: true,
                    width: 180
                },

                {
                    headerName: 'Статус',
                    field: 'status',
                    filter: true,
                    width: 100,
                    cellRendererFramework: 'TaskRefineStatus'
                },
                {
                    headerName: 'Ошибка',
                    field: 'error',
                    filter: true,
                    width: 200
                },

            ],
            components: {
              TaskRefineStatus
            }
        }
    },

    created() {

    },

    computed: {
        TaskRefineArrLocal(){

            if(this.bankTaskRefineDate==null||this.bankTaskRefineDate==''){
                return this.TaskRefineArr
            }else{
                let arr=[];
                let index;

                for (index = 0; index < this.TaskRefineArr.length; ++index) {

                    if(this.TaskRefineArr[index].created_at==this.bankTaskRefineDate){
                        arr.push(this.TaskRefineArr[index]);
                    }

                }

                return arr
            }
        },
        channel(){
            return this.$echo.join("taskRefine-channel");
        },
        ...mapGetters([
            'TaskRefineArr','User'
        ]),
    },
    methods: {

        reload(e){
            this.getTasRefine();
        },
        onrowDoubleClicked(event){
            this.error=event.data.error;
            this.popTaskRefine=true;
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
        ...mapActions([
            'getTasRefine','setDataUser'
        ]),
    },
    mounted() {
        this.channel.listen(".TaskRefine", (e) => this.reload(e));
        this.gridApi = this.gridOptions.api;
        this.getTasRefine();
    }
}

</script>

<style lang="scss">
    .vs-popup--content{
        min-height: 500px!important;
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

</style>
