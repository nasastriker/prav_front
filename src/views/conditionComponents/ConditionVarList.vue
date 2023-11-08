<template>
    <div>
        <div>
        <h6 style="color:deepskyblue">Выбрать список</h6>
            <v-select  class="w-100 " style="margin-bottom: 10px" :reduce="label => label.name" label="name" :options="ConditionListArr"   v-model="nameList" @input="getListVars"></v-select>
        </div>
        <ag-grid-vue
                style="height: 200px;margin-left: 10px;margin-right: 10px"
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="ConditionListVarsArr"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                @rowDoubleClicked="onrowDoubleClicked"
                :floatingFilter="false"
                :pagination="false"
                :enableRtl="$vs.rtl"
                :overlayNoRowsTemplate="'Нет условий'"
                :rowClassRules="rowClassRules">
        </ag-grid-vue>
        <div style="margin-top: 10px;text-align: center">
            <vs-button @click="loadList"> Загрузить условия из выбранного списка</vs-button>
        </div>
    </div>

</template>

<script>
    import {AgGridVue} from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import operationConditionVars from './Render/operationConditionVars.vue'
    export default {
        components: {
            AgGridVue, 'v-select': vSelect, operationConditionVars
        },
        props: [],
        data() {
            return {
                nameList:null,
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
                        headerName: 'Переменная',
                        field: 'var',
                        width: 200
                    },
                    {
                        headerName: 'Условие',
                        field: 'var_condition',
                        width: 150
                    },
                    {
                        headerName: 'Значение',
                        field: 'value',
                        width: 200
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        width: 100,
                        cellRendererFramework: 'operationConditionVars',
                        cellRendererParams: {
                            edit: this.edit.bind(this),
                        },
                    },


                ],
                components: {
                    operationConditionVars
                }
            }

        },
        computed: {
            ...mapGetters([
                'ConditionVarsArr','ConditionListArr','ConditionListVarsArr'
            ]),
        },
        methods: {
            ...mapMutations([
                'setConditionListVarsArr'
            ]),
            ...mapActions([
                'getDataConditionVars', 'getDataConditionVarOnce','getDataConditionList','getDataConditionListVars'
            ]),
            loadList(){
                if(this.nameList!==null){
                    this.$emit('load',this.nameList)
                }
                else{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Выберите список условий для загрузки',
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                }

            },

            getListVars(){
                if(this.nameList===null)this.setConditionListVarsArr([])
                this.getDataConditionListVars(this.nameList)
            },
            onrowDoubleClicked(event){
              //  this.edit(event.data.id)

            },
            edit(){

            },
        },
        mounted(){
            this.getDataConditionList()
            this.nameList=null
            this.setConditionListVarsArr([])
        },

    }
</script>

<style scoped>

</style>
