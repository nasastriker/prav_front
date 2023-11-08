<template>
    <div>
        <div style="margin-left: 20px; width: 100%;">
            <ag-grid-vue
                style="width: 100%;"
                ref="agGridTableL"
                :components="components"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="BanksSudOrderArr"
                rowSelection="multiple"
                @rowClicked=""
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                @rowDoubleClicked=""
                :enableRtl="$vs.rtl">
            </ag-grid-vue>


            <!--            <fieldset class="f" v-for="edoBank in Deb.sudOrder.banks_data">-->
            <!--                <legend class="l">{{ edoBank.bank_id }}:</legend>-->
            <!--                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">-->
            <!--                    <div class="vx-col w-2/5  mb-2">-->
            <!--                        <h5>{{ edoBank.bank_acc_exist }}</h5>-->
            <!--                        <vs-radio v-model="edoBank.bank_acc_exist" vs-value="1" class="mr-4"-->
            <!--                                  @input="changeDeb">Есть-->
            <!--                        </vs-radio>-->
            <!--                        <vs-radio v-model="edoBank.bank_acc_exist" vs-value="2" class="mr-4"-->
            <!--                                  @input="changeDeb">Нет-->
            <!--                        </vs-radio>-->
            <!--                    </div>-->
            <!--                    <vs-checkbox style="margin-bottom: 15px" v-model="edoBank.bank_recoverable"-->
            <!--                                 @input="changeDeb">Нет возможности взыскать-->
            <!--                    </vs-checkbox>-->
            <!--                </div>-->
            <!--            </fieldset>-->
        </div>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import {mapActions, mapGetters} from 'vuex'
import BankListAccExist from './Render/BankListAccExist.vue'
import BankListRecoverable from './Render/BankListRecoverable.vue'


export default {
    components: {
        VueCsvImport,
        BankListAccExist,
        BankListRecoverable
    },
    props: {
        sud_order_id: 0,
        checkBank: {
            default: false
        },
    },
    data() {
        return {
            showSob: false,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs: [
                {
                    headerName: 'Банк',
                    field: 'bank_name',
                    filter: true,
                    width: 150,
                },
                {
                    headerName: 'Счет',
                    field: 'bank_acc_exist',
                    filter: true,
                    width: 100,
                    cellRendererFramework: 'BankListAccExist',
                },
                {
                    headerName: 'Взыскание',
                    field: 'bank_recoverable',
                    filter: true,
                    width: 200,
                    cellRendererFramework: 'BankListRecoverable',
                },
            ],
            components: {
                BankListAccExist,
                BankListRecoverable
            }
        }
    },
    computed: {
        ...mapGetters([
            'Deb', 'User', 'BanksSudOrderArr'
        ]),
    },
    methods: {
        ...mapActions([

        ]),
    },
    mounted() {
    }
}

</script>

<style lang="scss">

.h6 {
    font-size: 12px;
    color: cadetblue;
}

.f {
    width: 100%;
    border: 1px;
    border-style: double;
    border-color: #62626262;
    border-radius: 8px;
}

.l {
    color: #a00;
    padding: 0 10px;
}

.box {
    display: flex;
    margin-top: 15px;
}

.box1 {
    display: flex;
}

.push {
    margin-left: auto;
    width: 300px;
}

.push1 {
    margin-left: auto;
    margin-bottom: 5px;
}


</style>
