<template>
    <div class="box-tables-banks-edo1">
        <div class="box-banks-edo-all1">
            <vs-input class="mb-4 mr-4" v-model="find_value" @input="searchUsersAll"
                      placeholder="Поиск..." style="width: 100%; margin-top: 10px"/>
            <ag-grid-vue

                style="width: 100%;"
                ref="agGridTableL"
                :gridOptions="gridOptions"
                class="ag-theme-material mb-4 ag-grid-table"
                :columnDefs="columnDefsLT"
                :defaultColDef="defaultColDef"
                :rowData="LUsersArr"
                rowSelection="multiple"
                @rowClicked="selectLeftTableRec"
                colResizeDefault="shift"
                :overlayNoRowsTemplate="'Нет записей'"
                :animateRows="true"
                @grid-size-changed="onGridSizeChangedOne"
                @column-resized="onColumnResizedOne"
                @column-visible="onColumnVisibleOne"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>
        </div>
        <div class="box-arrows-be1">
            <div v-if="WorkActionsMoveFlag" class="move-banks-loading-bar1">
                <img src="/loading.gif" style="max-width: 40px; margin-top: 5px;">
            </div>
            <div class="move-banks-loading-bar1" v-else>
                <div class="box-btn-arrow-right-be1">
                    <h2 class="arrow-be1" style="color: rgb(40,199,111)" @click="fromAllToWa">
                        <chevrons-right-icon size="1.5x" class="custom-class"></chevrons-right-icon>
                    </h2>
                </div>
                <div class="box-btn-arrow-left-be1">
                    <h2 class="arrow-be1" style="color: rgb(234,84,85)" @click="fromWaToAll">
                        <chevrons-left-icon size="1.5x" class="custom-class"></chevrons-left-icon>
                    </h2>
                </div>
            </div>
        </div>
        <div class="box-table-be-edo1">
           <div class="mb-4" style="font-size: 16px; height: 39.4px; margin-top: 10px; display: flex; justify-content: center; align-items: center;" >
             <span style="background-color: rgb(40,199,111); color: #fff; border-radius: 10px; padding: 5px 10px">Сотрудники с данным еженедельным действием:</span></div>
            <ag-grid-vue
                style="width: 100%;"
                ref="agGridTableR"
                :gridOptions="gridOptionsOne"
                class="ag-theme-material mb-4 ag-grid-table"
                :columnDefs="columnDefsRT"
                :defaultColDef="defaultColDef"
                :rowData="RUsersArr"
                rowSelection="multiple"
                @rowClicked="selectRightTableRec"
                colResizeDefault="shift"

                :overlayNoRowsTemplate="'Нет записей'"
                :animateRows="true"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>
        </div>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import {mapActions, mapGetters} from 'vuex'
import { ChevronsRightIcon, ChevronsLeftIcon } from 'vue-feather-icons'

export default {
    components: {
        VueCsvImport,
        ChevronsRightIcon,
        ChevronsLeftIcon
    },
    props: {
        id_wa: 0
    },
    data() {
        return {
            select_from_all_users_id: null,
            select_from_wa_users_id: null,
            selected_from_all_users: false,
            selected_from_wa_users: false,
            find_value: '',
            gridApi: null,
          gridApiOne: null,
            gridOptions: {},
           gridOptionsOne: {},
          defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefsLT: [
                {
                    headerName: 'ФИО',
                    field: 'fio',
                    filter: true,
                    width: 30,

                    // flex: 1 не работает + min/max тоже не решают проблему
                },
            ],
            columnDefsRT: [
                {
                    headerName: 'ФИО',
                    field: 'fio',
                    filter: true,
                    width: 30,
                    pinned: 'left'
                },
            ],
        }
    },

    computed: {
        ...mapGetters([
            'LUsersArr', 'RUsersArr', 'WorkActionsMoveFlag'
        ]),
    },
    methods: {
      onGridSizeChanged(params) {
        if (params.clientWidth > 500) {
          this.gridApi.sizeColumnsToFit();
        } else {
          this.columnDefsRT.forEach(x => {
            x.width = 300;
          });
          this.gridApi.setColumnDefs(this.columnDefsRT);
        }
      },
      onColumnResized(params) {
        params.api.resetRowHeights();
      },
      onColumnVisible(params) {
        params.api.resetRowHeights();
      },
      onGridSizeChangedOne(params) {
        if (params.clientWidth > 500) {
          this.gridApiOne.sizeColumnsToFit();
        } else {
          this.columnDefsLT.forEach(x => {
            x.width = 300;
          });
          this.gridApiOne.setColumnDefs(this.columnDefsLT);
        }
      },
      onColumnResizedOne(params) {
        params.api.resetRowHeights();
      },
      onColumnVisibleOne(params) {
        params.api.resetRowHeights();
      },
        fromAllToWa() {
            if (this.selected_from_all_users) {
                this.fromAllToUserMove({id_action: this.id_wa, id_user: this.select_from_all_users_id}).then((response) => {
                    if (response) {
                        this.selected_from_all_users = false;
                        this.select_from_all_users_id = null;
                        this.getAllUsers(this.id_wa);
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
                    title: 'Сотрудник не выбран',
                    text: 'Выберите сотрудника',
                    color: 'success',
                    position: 'top-center'
                })
            }
        },
        fromWaToAll() {
            if (this.selected_from_wa_users) {
                this.fromUserToAllMove({id_action: this.id_wa, id_user: this.select_from_wa_users_id}).then((response) => {
                    if (response) {
                        this.selected_from_wa_users = false;
                        this.select_from_wa_users_id = null;
                        this.getAllUsers(this.id_wa);
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
                    title: 'Сотрудник не выбран',
                    text: 'Выберите сотрудника',
                    color: 'success',
                    position: 'top-center'
                })
            }
        },
        selectLeftTableRec(event) {
            this.selected_from_all_users = true;
            this.select_from_all_users_id = event.data.id;
        },
        selectRightTableRec(event) {
            this.selected_from_wa_users = true;
            this.select_from_wa_users_id = event.data.id;
        },
        searchUsersAll() {
            this.getUsersAllByName({find_value: this.find_value, id_wa: this.id_wa});
        },
        ...mapActions([
            'getAllUsers', 'getUsersAllByName', 'fromAllToUserMove', 'fromUserToAllMove'
        ]),
    },
    mounted() {
      this.gridApi = this.gridOptions.api
      this.gridApiOne = this.gridOptionsOne.api
        this.getAllUsers(this.id_wa);
    }
}

</script>

<style lang="scss">
.ag-header-cell {
  padding-left: 5px !important;
}
.box-tables-banks-edo1 {
    display: flex;
    text-align: left;
}

.box-banks-edo-all1 {
    display: flex;
    flex-direction: column;
    //width: 45%;
}

//.box-table-be-edo1 {
//    width: 45%;
//}

.box-arrows-be1 {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;

}

.arrow-be1 {
    font-size: 40px;
    cursor: pointer;
}

.move-banks-loading-bar1{
    margin-top: auto;
    margin-bottom: auto;
}

</style>
