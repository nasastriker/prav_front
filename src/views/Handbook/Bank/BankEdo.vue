<template>
    <div class="box-tables-banks-edo">
        <div class="box-banks-edo-all">
            <vs-input class="mb-4 md:mb-0 mr-4" v-model="find_value" @input="searchBanksAll"
                      placeholder="Поиск..." style="width: 100%; margin-top: 10px"/>
            <ag-grid-vue
                style="width: 100%;"
                ref="agGridTableL"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefsLT"
                :defaultColDef="defaultColDef"
                :rowData="BanksAllArr"
                rowSelection="multiple"
                @rowClicked="selectLeftTableRec"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                @rowDoubleClicked="showBankInfo"
                :enableRtl="$vs.rtl"
                @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>
        </div>
        <div class="box-arrows-be">
            <div v-if="BanksMoveFlag" class="move-banks-loading-bar">
                <img src="/loading.gif" style="max-width: 40px; margin-top: 5px;">
            </div>
            <div class="move-banks-loading-bar" v-else>
                <div class="box-btn-arrow-right-be">
                    <h2 class="arrow-be" style="color: green" @click="fromAllToEdo">
                        <chevrons-right-icon size="1.5x" class="custom-class"></chevrons-right-icon>
                    </h2>
                </div>
                <div class="box-btn-arrow-left-be">
                    <h2 class="arrow-be" style="color: red" @click="fromEdoToAll">
                        <chevrons-left-icon size="1.5x" class="custom-class"></chevrons-left-icon>
                    </h2>
                </div>
            </div>
        </div>
        <div class="box-table-be-edo">
            <ag-grid-vue
                style="width: 100%;height: 95%"
                ref="agGridTableR"
                :components="components"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefsRT"
                :defaultColDef="defaultColDef"
                :rowData="BanksEdoArr"
                rowSelection="multiple"
                @rowClicked="selectRightTableRec"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                @rowDoubleClicked="showBankInfo"
                :enableRtl="$vs.rtl"
                @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>
        </div>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import {mapActions, mapGetters} from 'vuex'
import BankListEdoPriority from './Render/BankListEdoPriority.vue'
import { ChevronsRightIcon, ChevronsLeftIcon } from 'vue-feather-icons'

export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
        BankListEdoPriority,
        ChevronsRightIcon,
        ChevronsLeftIcon
    },
    data() {
        return {
            select_from_all_banks_id: null,
            select_from_edo_banks_id: null,
            selected_from_all_banks: false,
            selected_from_edo_banks: false,
            find_value: '',
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefsLT: [
                {
                    headerName: 'ID',
                    field: 'id',
                    filter: true,
                    width: 50,
                },
                {
                    headerName: 'Номер',
                    headerTooltip: 'Номер',
                    tooltipField: 'reg_number',
                    field: 'reg_number',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Наименование',
                    headerTooltip: 'Наименование',
                    tooltipField: 'name',
                    field: 'name',
                    filter: true,
                    width: 500,
                },
            ],
            columnDefsRT: [
                {
                    headerName: 'Пр-т',
                    headerTooltip: 'Приоритет',
                    tooltipField: 'priority_edo',
                    field: 'priority_edo',
                    filter: true,
                    width: 60,
                },
                {
                    headerName: 'ID',
                    headerTooltip: 'ID',
                    tooltipField: 'id',
                    field: 'id',
                    filter: true,
                    width: 50,
                },
                {
                    headerName: 'Н-р',
                    headerTooltip: 'Номер регистрации',
                    tooltipField: 'reg_number',
                    field: 'reg_number',
                    filter: true,
                    width: 60,
                },
                {
                    headerName: 'Наименование',
                    headerTooltip: 'Наименование',
                    tooltipField: 'name',
                    field: 'name',
                    filter: true,
                    width: 400,
                },
                {
                    headerName: 'Приоритет',
                    headerTooltip: 'Приоритет',
                    tooltipField: 'priority_edo',
                    field: 'priority_edo',
                    filter: true,
                    width: 130,
                    cellRendererFramework: 'BankListEdoPriority'
                },
            ],
            components: {
                BankListEdoPriority
            }

        }
    },

    computed: {
        ...mapGetters([
            'BanksAllArr', 'BanksEdoArr', 'BanksMoveFlag', 'BanksEdoData'
        ]),
    },
    methods: {
        showBankInfo(event){
            this.$router.push('/handbook/bank/' + event.data.id)
        },
        fromAllToEdo() {
            if (this.selected_from_all_banks) {
                this.fromAllToEdoMove(this.select_from_all_banks_id).then((response) => {
                    if (response) {
                        this.selected_from_all_banks = false;
                        this.select_from_all_banks_id = null;
                        this.getBanksAll();
                    }
                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                });
            } else {
                this.$vs.notify({
                    title: 'Банк не выбран',
                    text: 'Укажите банк',
                    color: 'success',
                    position: 'top-center'
                })
            }
        },
        fromEdoToAll() {
            if (this.selected_from_edo_banks) {
                this.fromEdoToAllMove(this.select_from_edo_banks_id).then((response) => {
                    if (response) {
                        this.selected_from_edo_banks = false;
                        this.select_from_edo_banks_id = null;
                        this.getBanksAll();
                    }
                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                });
            } else {
                this.$vs.notify({
                    title: 'Банк не выбран',
                    text: 'Укажите банк',
                    color: 'success',
                    position: 'top-center'
                })
            }
        },
        selectLeftTableRec(event) {
            this.selected_from_all_banks = true;
            this.select_from_all_banks_id = event.data.id;
        },
        selectRightTableRec(event) {
            this.selected_from_edo_banks = true;
            this.select_from_edo_banks_id = event.data.id;
        },
        searchBanksAll() {
            this.getBanksAllByName(this.find_value);
        },
        ...mapActions([
            'getBanksAll', 'getBanksAllByName', 'fromAllToEdoMove', 'fromEdoToAllMove', 'getBankEdoData'
        ]),
    },
    mounted() {
    }
}

</script>

<style lang="scss">
.box-tables-banks-edo {
    display: flex;
    text-align: center;
}

.box-banks-edo-all {
    display: flex;
    flex-direction: column;
    width: 45%;
}

.box-table-be-edo {
    width: 45%;
}

.box-arrows-be {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;

}

.arrow-be {
    font-size: 40px;
    cursor: pointer;
}

.move-banks-loading-bar{
    margin-top: auto;
    margin-bottom: auto;
}

</style>
