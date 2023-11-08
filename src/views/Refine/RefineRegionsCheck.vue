<template>
    <div>
        <ag-grid-vue
            style="height: 700px"
            ref="agGridTable"
            :gridOptions="gridOptions1"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs1"
            :defaultColDef="defaultColDef1"
            :rowData="RegionsCheckArr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            @grid-size-changed="onGridSizeChanged1"
            :floatingFilter="false"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl">
        </ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import {mapActions, mapGetters} from 'vuex'
import {} from 'vue-feather-icons'
import vSelect from 'vue-select'
import OpenRegionCheck from "./Render/OpenRegionCheck.vue";

export default {
    components: {
        AgGridVue,
        'v-select': vSelect,
        OpenRegionCheck
    },
    data() {
        return {
            gridApi1: null,
            gridOptions1: {},
            defaultColDef1: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs1: [
                {
                    headerName: '',
                    field: 'to_change',
                    hide: false,
                    filter: true,
                    width: 40,
                    cellRendererFramework: 'OpenRegionCheck'
                },
                {
                    headerName: 'Регион',
                    field: 'name',
                    hide: false,
                    filter: true,
                    width: 600,
                },
            ],
            components: {
                OpenRegionCheck
            }
        }
    },

    computed: {
        ...mapGetters([
            'RegionsCheckArr'
        ]),
    },
    methods: {
        onGridSizeChanged1(params) {
            if (params.clientWidth > 500) {
                this.gridApi1.sizeColumnsToFit();
            } else {
                this.columnDefs1.forEach(x => {
                    x.width = 300;
                });
                this.gridApi1.setColumnDefs(this.columnDefs1);
            }
        },
        ...mapActions([
            'getRegion'
        ]),
    },
    mounted() {
        this.gridApi1 = this.gridOptions1.api;
        this.getRegion();
    }
}

</script>

<style>
</style>
