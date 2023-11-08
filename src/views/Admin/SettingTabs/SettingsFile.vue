<template>
    <div>
        <div>
            <vs-button style="margin-left: auto;margin-right: 0em" color="success" class="pull-right" type="filled"  @click="popupActive2=!popupActive2">Добавить файл</vs-button>
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="FileSetting"
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

            <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                      v-on:change="saveDocument($event)" style="display: none"/>
            <vs-popup classContent="popup-example" title="Тип документа" :active.sync="popupActive2">

                <div class="mt-8 mb-base">
                    <h6 class="h6" style="margin-top: 15px">Тип документа:</h6>
                    <vs-input  class="w-100"  v-model="typeFile"></vs-input>
                </div>
                <div style="text-align: center">
                    <vs-button class="w-1/3 ml-auto" @click="chooseFiles1()" color="primary" type="filled">Загрузить</vs-button>
                </div>


            </vs-popup>

        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters,mapMutations} from 'vuex'
import OpenSettFile from './Render/OpenSettFile.vue'
import Name from './Render/Name.vue'
export default {
    components: {
        OpenSettFile,
        Name,
     },
    data() {
        return {
            searchQuery: '',
            typeFile:'',
            // AgGrid
            gridApi: null,
            popupActive2:false,
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
                    width: 300,
                    cellRendererFramework: 'Name',
                },
                {
                    headerName: 'Тип',
                    field: 'type',
                    filter: true,
                    width: 150,
                },

                {
                    headerName: 'Операции',
                    field: 'id',
                    filter: true,
                    width: 130,
                    cellRendererFramework: 'OpenSettFile',
//                    cellRendererParams: {
//                        editRecord: this.editPorts.bind(this),
//                    },
                },
            ],
            components: {
                OpenSettFile,Name
            },

            readonly_status: true
        }
    },
    computed: {
        ...mapGetters([
            'FileSetting',
        ]),
        paginationPageSize () {
            if (this.gridApi) return this.gridApi.paginationGetPageSize()
            else return 100
        },
    },
    methods: {
        saveDocument(evt){
            this.$vs.loading({color: '#ff8000'})
            this.saveFileSetting({
                file: evt.target.files,
                type: this.typeFile,
            }).then((response) => {
                this.getDataFileSetting();
                if (response.result) {
                    this.popupActive2=false
                    this.$vs.notify({
                        title: 'Успешно',
                        text: 'Сохранено!!!',
                        color: 'success',
                        position: 'top-center'
                    })
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: response.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                }
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
        chooseFiles1: function () {
            document.getElementById("fileUpload1").click()
        },

        onrowDoubleClicked(event){
            this.popupActive2=true;
            this.typeFile=event.data.type
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

        ...mapMutations([
        ]),

        ...mapActions([
            'getDataFileSetting','saveFileSetting'
        ]),
    },

    mounted() {
        this.gridApi = this.gridOptions.api
        this.getDataFileSetting()
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
