<template>
    <div >
        <div v-if="correctState === 0" style="    min-width: 800px;">
            <div class="box">
                <div style="width: 300px">
                    <vs-input class="w-full mb-4 md:mb-0 mr-4" v-model="find_val" @input="searchDebtorsForFiles"
                              placeholder="Поиск..."/>
                </div>
                <div class="box1" style="width: 300px;margin-left: 15px">
                    <v-select  class="w-full " :reduce="label => label.id" label="name" :options="RecoverArrList"  v-model="rec_id" @input="searchDebtorsForFiles" ></v-select>
                <span class="push1" style="max-width: 40px;">
            <img src="/loading.gif" v-if="SocAnswerFindFlag" style="max-width: 40px; margin-top: 5px;">
        </span>
                </div>
            </div>
            <ag-grid-vue style="width: 1100px"
                ref="agGridTable"
                :components="components"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :rowData="CreditsArr"
                rowSelection="multiple"
                colResizeDefault="shift"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>
        </div>
        <div v-else-if="correctState === 2">
            <h5 style="text-align: center">Вы действительно хотите привязать</h5>
            <h5 style="text-align: center">данное определение суда к заемщику:</h5>
            <h4 style="text-align: center;margin-top: 10px"><b> {{ fio_debtor }} </b>?</h4>
            <br>


            <div style="text-align: center;">
                <span style="max-width: 40px;">
            <img src="/loading.gif" v-if="SocAnswerFindFlag" style="max-width: 40px; margin-top: 5px;">
        </span>
                <vs-button color="danger" class="pull-right" type="filled" @click="setYes">Да</vs-button>
                <vs-button color="success" class="pull-right" type="filled" @click="setNo">Нет</vs-button>
            </div>
            <div v-if="set_error">
                <hr style="margin-top: 15px; border: 1px solid red;">
                <h5 style="color: red;margin-top: 5px">Ошибка! Не удалось привязать ответ к заемщику...</h5>
            </div>
            <hr style="margin-bottom: 15px; margin-top: 15px; border: 1px solid #ADD8E6;">
        </div>


    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import {mapActions, mapGetters} from 'vuex'
import AnswerFileToDebtor from './Render/AnswerFileToDebtor.vue'
import Fio from './Render/Fio.vue'
import OpenCreditStatus from "../Debtor/Render/OpenCreditStatus.vue";
import {SpinnerLoader} from 'vue-spinners-css';
import r from '../../route';
import axios from '../../axios'

export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
        Fio,
        AnswerFileToDebtor,
        OpenCreditStatus
    },
    props: {
        find_value: '',
        answerId: 0,
        correctState: 0
    },
    data() {
        return {
            rec_id: 0,
            credit: {
                id_recover: 0,
                num_recover: 0,
                cession: 0,
                typeRecover: 0
            },
            set_error: false,
            find_val: '',
            id_debtor: 0,
            id_credit: 0,
            fio_debtor: '',
            defaultColDef: {
                resizable: true,
            },
            debtor_data: [],
            columnDefs: [
                {
                    headerName: '',
                    field: 'answer_to_debtor',
                    filter: true,
                    width: 80,
                    cellRendererFramework: 'AnswerFileToDebtor',
                    cellRendererParams: {
                        my_action: this.setAnswerToDebtorGo.bind(this)
                    }
                },
                {
                    headerName: 'Заемщик',
                    field: 'debtor_fio',
                    filter: true,
                    width: 250,
                    cellRendererFramework: 'Fio'
                },
                {
                    headerName: 'Взыскатель',
                    field: 'recover',
                    filter: true,
                    hide:false,
                    width: 180,
                },

                {
                    headerName: 'Статус',
                    field: 'id_status',
                    hide: false,
                    filter: true,
                    width: 200,

                    cellRendererFramework: 'OpenCreditStatus'
                },
                {
                    headerName: '№ договора',
                    field: 'number_dog',
                    filter: true,

                    width: 200,
                },
                {
                    headerName: '№ СА',
                    field: 'number_sa',
                    filter: true,
                    width: 150,
                },
                {
                    headerName: '№ дела Иск',
                    field: 'number_delo_il',
                    filter: true,
                    width: 150,
                },
                {
                    headerName: 'ДР',
                    field: 'birthdate',
                    filter: true,
                    width: 100,
                },
            ],
            components: {
                AnswerFileToDebtor, OpenCreditStatus,Fio
            }
        }
    },
    watch: {
        find_value: function () {
            this.find_val = this.find_value;
            this.searchDebtorsForFiles();
        }
    },
    computed: {
        ...mapGetters([
            'SocAnswerFindFlag', 'CreditsArr', 'RecoverersArr','RecoverArrList'
        ]),
    },
    methods: {
        setYes() {
            this.setSocAnswerToDebtor({id_credit: this.id_credit,id_debtor: this.id_debtor, id_answer: this.answerId}).then((response) => {
                if (response.result){
                    this.$emit('refreshAfterSet', {file_id: this.answerId, what_from: "fromAnswers", fio_debtor: this.fio_debtor});
                } else {
                    this.set_error = true;
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
        },
        setNo() {
            this.correctState = 0;
        },
        setAnswerToDebtorGo(id,fio) {
//            console.log(id_debtor)
//            this.id_debtor = id_debtor;
            this.id_credit = id;
            this.fio_debtor = fio;
//            this.fio_debtor = '';
//            this.getFioDebtorByIdForSocAnswer(id_debtor).then((response) => {
//                if (response.result) {
//                    this.fio_debtor = response.fio;
//                }
//            }).catch(error => {
//                this.$vs.loading.close()
//                this.$vs.notify({
//                    title: 'Ошибка',
//                    text: error.message,
//                    color: 'danger',
//                    position: 'top-center'
//                })
//            });
            this.correctState = 2;
        },
        searchDebtorsForFiles() {
            if(this.rec_id==null){
                this.rec_id=0;
            }
            console.log(this.RecoverArrList)
            for (let i=0;i<this.RecoverArrList.length;i++){

                if(this.RecoverArrList[i].id==this.rec_id){
                    this.credit.id_recover=this.RecoverArrList[i].num
                    this.credit.num_recover=this.RecoverArrList[i].id
                    this.credit.cession=this.RecoverArrList[i].cession
                    this.credit.typeRecover=this.RecoverArrList[i].typeRecover
                }

            }

            this.getDataCreditsUploadFiles({
                'find': this.find_val,
                'id_recover': this.credit.id_recover,
                'num_recover':this.credit.num_recover,
                'cession':this.credit.cession,
                'typeRecover':this.credit.typeRecover,
                'fast':true
            });
        },
        ...mapActions([
            'getDataCreditsUploadFiles', 'setSocAnswerToDebtor', 'getFioDebtorByIdForSocAnswer', 'getDataRecoverersAndPravez',
            'getDataStatuss','getRecoverArrList'
        ]),
    },
    mounted() {
        this.getDataStatuss();
        this.getRecoverArrList();
        this.find_val = this.find_value;
        this.searchDebtorsForFiles();
        this.getDataRecoverersAndPravez();
    }
}

</script>

<style lang="scss">
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

.box {
    display: flex;
}

.box1 {
    display: flex;
}

.push {
    margin-left: auto;
    width: 240px;
}

.push1 {
    margin-top: auto;
    margin-bottom: 5px;
}

.err_mess {
    color: red;
}

.succs_mess {
    color: green;
}
</style>
