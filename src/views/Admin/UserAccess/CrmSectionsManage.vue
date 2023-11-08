<template>
    <div>
        <vs-button color="primary" class="pull-right" type="filled"
                   @click="showPopupAddSection">Новый раздел</vs-button>


        <ag-grid-vue
            style="height: 700px"
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="CrmSectionsAllArr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            @grid-size-changed="onGridSizeChanged"
            :floatingFilter="false"
            @rowDoubleClicked="onrowDoubleClicked"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl"
            :rowClassRules="rowClassRules"
            :overlayLoadingTemplate="'Идёт загрузка'"
            :overlayNoRowsTemplate="'Нет записей'"
            :enableBrowserTooltips="true">
        </ag-grid-vue>



        <vs-popup classContent="popup-example" title="Новый раздел" :active.sync="popupActiveAddSection">
            <div style="margin-top: 10px">Название</div>
            <vs-input class="w-full mb-base" v-model="data.name"></vs-input>
            <div style="margin-top: 10px">В разделе</div>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="CrmSectionsAllArrMenu" v-model="data.in_section"></v-select>
            <div style="margin-top: 10px">URL</div>
            <vs-input class="w-full mb-base" v-model="data.url"></vs-input>
            <div style="margin-top: 10px">Icon</div>
            <vs-input class="w-full mb-base" v-model="data.icon"></vs-input>
            <div style="margin-top: 10px">Slug</div>
            <vs-input class="w-full mb-base" v-model="data.slug"></vs-input>

            <template v-if="User.admin==1">
                <div style="margin-top: 10px">Super</div>
                <vs-checkbox style="margin-bottom: 15px" v-model="data.super">Раздел для админ</vs-checkbox>

            </template>


            <vs-button color="success" class="pull-right" type="filled"
                       @click="saveSection">Сохранить</vs-button>
        </vs-popup>
    </div>
</template>

<script>
import CrmSectionsPriority from "./Render/CrmSectionsPriority.vue";
import {mapActions, mapGetters} from 'vuex'

export default {
    components: {
      CrmSectionsPriority
    },
    data() {
        return {
            popupActiveAddSection: false,
            data: {},
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
                    headerName: 'Название раздела',
                    children: [
                        {
                            headerName: '',
                            field: 'lvl0',
                            filter: true,
                            width: 100
                        },
                        {
                            headerName: '',
                            field: 'lvl1',
                            filter: true,
                            width: 100
                        },
                        {
                            headerName: '',
                            field: 'lvl2',
                            filter: true,
                            width: 100
                        },
                        {
                            headerName: '',
                            field: 'lvl3',
                            filter: true,
                            width: 100
                        },
                    ]
                },
                {
                    headerName: 'URL',
                    field: 'url',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Icon',
                    field: 'icon',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Slug',
                    field: 'slug',
                    filter: true,
                    width: 100
                },
              {
                headerName: 'Приоритет',
                field: 'priority',
                filter: true,
                width: 60,
                cellRendererFramework: 'CrmSectionsPriority'
              },
            ],
            components: {
            }
        }
    },

    computed: {
        ...mapGetters([
            'CrmSectionsAllArr', 'CrmSectionsAllArrMenu','User'
        ]),
    },
    methods: {
        showPopupAddSection(){
            this.data = {};
            this.popupActiveAddSection = true;
        },
        saveSection(){
            this.popupActiveAddSection = false;
            this.saveCrmSectionAll(this.data).then((response) => {
                if(response){
                    this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                }
            })
        },
        onrowDoubleClicked(event){
            this.popupActiveAddSection = true;
            this.getCrmSectionDataInfo(event.data.id).then((response) => {
                if (response.result){
                    this.data = response.data;
                }
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
        ...mapActions([
            'saveCrmSectionAll', 'getCrmSectionDataInfo', 'getCrmSectionsAlls'
        ]),
    },
    mounted() {
        this.gridApi = this.gridOptions.api;
        this.getCrmSectionsAlls();
    }
}

</script>

<style>
</style>
