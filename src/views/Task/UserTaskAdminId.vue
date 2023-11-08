<template>
    <div class="box-tables-banks-edo1">
        <div class="box-banks-edo-all1">
            <vs-input class="mb-4 md:mb-0 mr-4" v-model="find_value" @input="searchActionsAll"
                      placeholder="Поиск..." style="width: 100%; margin-top: 10px"/>
            <ag-grid-vue
                style="width: 100%;"
                ref="agGridTableL"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefsLT"
                :defaultColDef="defaultColDef"
                :rowData="LWorkActionsArr"
                rowSelection="multiple"
                @rowClicked="selectLeftTableRec"
                colResizeDefault="shift"
                :animateRows="true"
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
                    <h2 class="arrow-be1" style="color: green" @click="fromAllToUser">
                        <chevrons-right-icon size="1.5x" class="custom-class"></chevrons-right-icon>
                    </h2>
                </div>
                <div class="box-btn-arrow-left-be1">
                    <h2 class="arrow-be1" style="color: red" @click="fromUserToAll">
                        <chevrons-left-icon size="1.5x" class="custom-class"></chevrons-left-icon>
                    </h2>
                </div>
            </div>
        </div>
        <div class="box-table-be-edo1">
           <div>Еженедельные рабочие действия сотрудника:</div>
            <ag-grid-vue
                style="width: 100%;height: 95%"
                ref="agGridTableR"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefsRT"
                :defaultColDef="defaultColDef"
                :rowData="RWorkActionsArr"
                rowSelection="multiple"
                @rowClicked="selectRightTableRec"
                colResizeDefault="shift"
                :animateRows="true"
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
        id_user: 0
    },
    data() {
        return {
            select_from_all_actions_id: null,
            select_from_user_actions_id: null,
            selected_from_all_actions: false,
            selected_from_user_actions: false,
            find_value: '',
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefsLT: [
                {
                    headerName: 'Наименование',
                    field: 'name',
                    filter: true,
                    width: 500,
                },
            ],
            columnDefsRT: [
                {
                    headerName: 'Наименование',
                    field: 'name',
                    filter: true,
                    width: 500,
                },
            ],
        }
    },

    computed: {
        ...mapGetters([
            'LWorkActionsArr', 'RWorkActionsArr', 'WorkActionsMoveFlag'
        ]),
    },
    methods: {
        fromAllToUser() {
            if (this.selected_from_all_actions) {
                this.fromAllToUserMove({id_action: this.select_from_all_actions_id, id_user: this.id_user}).then((response) => {
                    if (response) {
                        this.selected_from_all_actions = false;
                        this.select_from_all_actions_id = null;
                        this.getAllWorkActions(this.id_user);
                        this.getDataTasksUser(this.id_user);
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
                    title: 'Действие не выбрано',
                    text: 'Выберите действие',
                    color: 'success',
                    position: 'top-center'
                })
            }
        },
        fromUserToAll() {
            if (this.selected_from_user_actions) {
                this.fromUserToAllMove({id_action: this.select_from_user_actions_id, id_user: this.id_user}).then((response) => {
                    if (response) {
                        this.selected_from_user_actions = false;
                        this.select_from_user_actions_id = null;
                        this.getAllWorkActions(this.id_user);
                        this.getDataTasksUser(this.id_user);
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
                    title: 'Действие не выбрано',
                    text: 'Выберите действие',
                    color: 'success',
                    position: 'top-center'
                })
            }
        },
        selectLeftTableRec(event) {
            this.selected_from_all_actions = true;
            this.select_from_all_actions_id = event.data.id;
        },
        selectRightTableRec(event) {
            this.selected_from_user_actions = true;
            this.select_from_user_actions_id = event.data.id;
        },
        searchActionsAll() {
            this.getWorkActionsAllByName({find_value: this.find_value, id_user: this.id_user});
        },
        ...mapActions([
            'getAllWorkActions', 'getWorkActionsAllByName', 'fromAllToUserMove', 'fromUserToAllMove', 'getDataTasksUser'
        ]),
    },
    mounted() {
        this.getAllWorkActions(this.id_user);
    }
}

</script>

<style lang="scss">
.box-tables-banks-edo1 {
    display: flex;
    text-align: left;
}

.box-banks-edo-all1 {
    display: flex;
    flex-direction: column;
    width: 45%;
}

.box-table-be-edo1 {
    width: 45%;
}

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
