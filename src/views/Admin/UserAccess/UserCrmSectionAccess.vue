<template>
    <div>
        <div style="margin-top: 10px">Сотрудник</div>
        <v-select  :reduce="label => label.id" label="fio"
                   :options="UsersArrAllMenu" v-model="sel_id_user"
                   @input="changeUser"></v-select>

        <vs-button color="primary" class="pull-right mr-4" type="filled" style="margin-top: 10px"
                   @click="showPopupAddSection">Добавить разделы сотруднику</vs-button>
        <vs-button color="warning" class="pull-right mr-4" type="filled" style="margin-top: 10px"
                   @click="putAllAccess">Предоставить полный доступ</vs-button>
        <vs-button color="danger" class="pull-right" type="filled" style="margin-top: 10px"
                   @click="delAllAccess">Обнулить доступ</vs-button>
        <div style="background-color: #FFFFE0;margin-top: 30px;margin-bottom: 10px">
            <h5 style="padding: 20px" class="text-primary"><b>Двойной клик по записи - удаление раздела и всех его подразделов</b></h5>
        </div>

        <ag-grid-vue
            style="height: 700px"
            ref="agGridTable"
            :gridOptions="gridOptions1"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs1"
            :defaultColDef="defaultColDef"
            :rowData="crm_section_user_arr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            @grid-size-changed="onGridSizeChanged1"
            :floatingFilter="false"
            @rowDoubleClicked="onrowDoubleClickedUser"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl"
            :rowClassRules="rowClassRules"
            :overlayLoadingTemplate="'Идёт загрузка'"
            :overlayNoRowsTemplate="'Нет записей'"
            enableBrowserTooltips="true"

            >
        </ag-grid-vue>

        <vs-popup classContent="popup-example" title="Добавление Раздела CRM сотруднику" :active.sync="popupActiveAddSectionToUser">
            <div style="background-color: #FFFFE0;margin-bottom: 10px">
                <h5 style="padding: 20px" class="text-primary"><b>Двойной клик по записи - добавление раздела и всех его подразделов</b></h5>
            </div>
            <ag-grid-vue
                style="height: 700px"
                ref="agGridTable"
                :gridOptions="gridOptions2"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs2"
                :defaultColDef="defaultColDef"
                :rowData="crm_section_no_user_arr"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                @grid-size-changed="onGridSizeChanged2"
                :floatingFilter="false"
                @rowDoubleClicked="onrowDoubleClickedNoUser"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl"
                :rowClassRules="rowClassRules"
                :overlayLoadingTemplate="'Идёт загрузка'"
                            :overlayNoRowsTemplate="'Нет записей'"
                            :enableBrowserTooltips="true">
            </ag-grid-vue>
        </vs-popup>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {} from 'vue-feather-icons'

export default {
    components: {
    },
    data() {
        return {
            sel_id_user: 1,
            id_section: 0,
            crm_section_user_arr: [],
            crm_section_no_user_arr: [],
            popupActiveAddSectionToUser: false,
            gridApi1: null,
            gridApi2: null,
            gridOptions1: {},
            gridOptions2: {},
            rowClassRules: null,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs1: [
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
                }
            ],
            columnDefs2: [
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
                }
            ],
        }
    },

    computed: {
        ...mapGetters([
            'UsersArrAllMenu'
        ]),
    },
    methods: {
        putAllAccess(){
            this.$vs.dialog({
                type: 'confirm',
                color: 'primary',
                title: 'Полный доступ',
                text: `Вы действительно хотите предоставить полный доступ? `,
                accept: this.putAllAccessFunc,
                acceptText: 'Да',
                cancelText: 'Нет'
            })
        },
        putAllAccessFunc(){
            this.putAllAccessToUser(this.sel_id_user).then((value)=> {
                if(value){
                    this.changeUser();
                    this.showPutAllAccessSuccess()
                }
            });
        },
        showPutAllAccessSuccess() {
            this.$vs.notify({
                color: 'success',
                title: 'Сообщение',
                text: 'Полный доступ предоставлен',
                position: 'top-center'
            })
        },
        delAllAccess(){
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Обнуление доступа',
                text: `Вы действительно хотите обнулить доступ? `,
                accept: this.delAllAccessFunc,
                acceptText: 'Да',
                cancelText: 'Нет'
            })
        },
        delAllAccessFunc(){
            this.delAllAccessFromUser(this.sel_id_user).then((value)=> {
                if(value){
                    this.changeUser();
                    this.showDelAllAccessSuccess()
                }
            });
        },
        showDelAllAccessSuccess() {
            this.$vs.notify({
                color: 'success',
                title: 'Сообщение',
                text: 'Доступ обнулен',
                position: 'top-center'
            })
        },

        changeUser(){
            this.getCrmSectionsUser(this.sel_id_user).then((response) => {
                if (response.result){
                    this.crm_section_user_arr = response.user_sections;
                    this.crm_section_no_user_arr = response.no_user_sections;
                }
            });
        },
        showPopupAddSection(){
            this.popupActiveAddSectionToUser = true;
        },
        onrowDoubleClickedUser(event){
            this.id_section = event.data.id;
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Удаление',
                text: `Вы действительно хотите удалить раздел и все его подразделы? `,
                accept: this.deleteRecord,
                acceptText: 'Удалить',
                cancelText: 'Отмена'
            })
        },
        deleteRecord() {
            this.deleteUserCrmSection({id_section: this.id_section, id_user: this.sel_id_user}).then((value)=> {
                if(value){
                    this.changeUser();
                    this.showDeleteSuccess()
                }
                else{
                    this.showDeleteDanger()
                }
            });
        },
        showDeleteSuccess() {
            this.$vs.notify({
                color: 'success',
                title: 'Сообщение',
                text: 'Удален!!!',
                position: 'top-center'
            })
        },
        showDeleteDanger() {
            this.$vs.notify({
                color: 'danger',
                title: 'Сообщение',
                text: 'Ошибка при удалении!!!',
                position: 'top-center'
            })
        },
        onrowDoubleClickedNoUser(event){
            this.sectionAllToUser({id_crm_section: event.data.id, id_user: this.sel_id_user}).then((response) => {
                if (response){
                    this.changeUser();
                }
            })
        },
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
        onGridSizeChanged2(params) {
            if (params.clientWidth > 500) {
                this.gridApi2.sizeColumnsToFit();
            } else {
                this.columnDefs2.forEach(x => {
                    x.width = 300;
                });
                this.gridApi2.setColumnDefs(this.columnDefs2);
            }
        },
        ...mapActions([
            'getUsersAllMenu', 'getCrmSectionsUser', 'sectionAllToUser', 'deleteUserCrmSection', 'putAllAccessToUser',
            'delAllAccessFromUser'
        ]),
    },
    mounted() {
        this.gridApi1 = this.gridOptions1.api;
        this.gridApi2 = this.gridOptions2.api;
        this.getUsersAllMenu();
        this.changeUser();
    }
}

</script>

<style>
</style>
