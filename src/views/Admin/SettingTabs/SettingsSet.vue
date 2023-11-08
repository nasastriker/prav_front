<template>
    <div>

        <div>
            <vs-button color="primary"  class="ag-grid-cell-button cursor-pointer "  type="filled"  style="margin-top: 20px;" @click="NewSetting">Добавить переменую настройку</vs-button>
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="SettingsAllTable"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                @rowDoubleClicked="onrowDoubleClicked"
                :suppressPaginationPanel="true"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                :enableRtl="$vs.rtl">

        </ag-grid-vue>
        </div>
        <vs-popup classContent="popup-example" title="Скачать файлы выгрузок" :active.sync="pop">
            <h6>Переменная</h6>
            <vs-input    style="magrin-bottom: 20px;margin-top: 2px;" v-model="settingOfValue.name"></vs-input>
            <h6>Раздел</h6>
            <v-select    placeholder="Раздел" style="magrin-bottom: 20px;margin-top: 2px;" :reduce="label => label.id" label="name" :options="SettingsChapterList" v-model="settingOfValue.chapter" ></v-select>


            <h6>Описание переменной</h6>
            <vs-textarea    style="magrin-bottom: 20px;margin-top: 2px;" v-model="settingOfValue.textName"></vs-textarea>

            <template>
            <div class="center">
                <vs-radio vs-value="0" v-model="settingOfValue.type">
                    Boolean
                </vs-radio>
                <vs-radio vs-value="1" v-model="settingOfValue.type">
                          Integer
                </vs-radio>
                <vs-radio  vs-value="2" v-model="settingOfValue.type" >
                    String
                </vs-radio>
            </div>
            </template>


            <template v-if="settingOfValue.type==0">
                <vs-checkbox style="margin-top: 20px;margin-bottom: 20px" v-model="settingOfValue.value"></vs-checkbox>
            </template>
            <template v-if="settingOfValue.type==1">
                <vs-input   type="NUMBER"  style="magrin-bottom: 20px;margin-top: 20px;" v-model="settingOfValue.value"></vs-input>
            </template>
            <template v-if="settingOfValue.type==2">
                <vs-input    style="magrin-bottom: 20px;margin-top: 20px;" v-model="settingOfValue.value"></vs-input>
            </template>
            <vs-button style="magrin-bottom: 20px;margin-top: 20px;" @click="saveSetting">Сохранить</vs-button>
        </vs-popup>



    </div>
</template>

<script>
import {mapActions, mapGetters,mapMutations} from 'vuex'
import SetValue from './Render/SetValue.vue'
import TypeValue from './Render/TypeValue.vue'
export default {

    components: {
        SetValue,
        TypeValue,
     },
    data() {
        return {
            settingOfValue:{
              id:'new',
              name:'',
              textName:'',
              type:0,
              value:0,
            },


            pop:false,
            // AgGrid
            gridApi: null,
            gridOptions: {
            },

            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },

            columnDefs: [
                {
                    headerName: 'Переменная',
                    field: 'name',
                    filter: true,
                    width: 300,
                },
                {
                    headerName: 'Описание переменной',
                    field: 'textName',
                    filter: true,
                    width: 300,
                },
                {
                    headerName: 'Раздел',
                    field: 'chapterName',
                    filter: true,
                    width: 300,
                },
                {
                    headerName: 'Тип переменной',
                    field: 'type',
                    filter: true,
                    width: 100,
                    cellRendererFramework: 'TypeValue'
                },
                {
                    headerName: 'Значение',
                    field: 'value',
                    filter: true,
                    width: 190,
                    cellRendererFramework: 'SetValue',
                    cellRendererParams: {
                        editValue: this.editValue.bind(this),
                    },

                },

            ],
            components: {
                SetValue, TypeValue
            },

            readonly_status: true
        }
    },
    computed: {
        ...mapGetters([
            'SettingsAllTable','SettingsChapterList'
        ]),
        paginationPageSize () {
            if (this.gridApi) return this.gridApi.paginationGetPageSize()
            else return 100
        },
    },
    methods: {
        editValue(params){
                this.settingOfValue.id=params.id
                this.settingOfValue.name=params.name
                this.settingOfValue.textName=params.textName
                this.settingOfValue.type=params.type
                this.settingOfValue.value=params.value
            this.getSettingsChapterList()
            this.settingOfValue.chapter=params.chapter



            this.pop=true
        },
        NewSetting(){
            this.settingOfValue.id='New'
            this.settingOfValue.name=''
            this.settingOfValue.textName=''
            this.settingOfValue.type=0
            this.settingOfValue.value=''
            this.pop=true
        },
        onrowDoubleClicked(event){
         //   this.setShowEditPorts(true)
            this.editValue(event.data)
         //   this.setselPortsOnes(event.data.id)

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
                this.gridApi.sizeColumnsToFit()

            } else {
                this.columnDefs.forEach(x => {
                    x.width = 300;
                });
                this.gridApi.setColumnDefs(this.columnDefs)
            }
        },
        saveSetting(){
            this.saveSettingCur(this.settingOfValue).then((response) => {
                if(response){
                    this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    this.getSettingsAllTable()

                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                }
                this.pop=false
            })




        },
        ...mapMutations([
          //  'setselPortsOnes','setShowEditPorts'
        ]),

        ...mapActions([
            'getSettingsAllTable','saveSettingCur','getSettingsChapterList'
        ]),
    },

    mounted() {
        this.gridApi = this.gridOptions.api
        this.getSettingsChapterList()
        this.getSettingsAllTable()
    }
}

</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
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
