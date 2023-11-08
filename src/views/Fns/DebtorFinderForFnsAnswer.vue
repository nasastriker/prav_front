<template>
    <div>
        <hr style="margin-top: 15px; border: 1px solid #ADD8E6;">
        <div v-if="correctState === 0">
            <div class="box">
                <div>
                    <h5><b>Указать вручную:</b></h5>
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="find_value" @input="searchDebtorsForFnsAnswer"
                              placeholder="Поиск..."/>
                </div>
                <div class="box1">
                <span class="push1" style="max-width: 40px;">
            <img src="/loading.gif" v-if="FnsAnswerFindFlag" style="max-width: 40px; margin-top: 5px;">
        </span>
                </div>
                <div class="push" style="padding: 15px; background-color: #ADD8E6; margin-bottom: -30px;margin-right: 15px;border-radius: 10px;">
                    <span style="font-size: 12px; color: #0b0b0b;">Двойной клик по записи в таблице - правка ФИО заемщика в БД</span>
                </div>
            </div>
            <ag-grid-vue
                ref="agGridTable"
                :components="components"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :rowData="FindedDebtorsForFnsAnswerArr"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                @rowDoubleClicked="onrowDoubleClicked"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>
        </div>
        <div v-else-if="correctState === 1">
            <DebtorFioFastCorrect :debtor_data="debtor_data"
                                  @canceledCorrect="onCanceledCorrect"
                                  @correctedDebtor="onDebtorCorrected"></DebtorFioFastCorrect>
        </div>
        <div v-else-if="correctState === 2">
            <br>
            <h5 style="text-align: center">Вы действительно хотите привязать данный ответ ФНС к заемщику:</h5>
            <h4 style="text-align: center"><b> {{ fio_debtor }} </b>?</h4>
            <br>

            <div style="text-align: center;">
                <span style="max-width: 40px;">
            <img src="/loading.gif" v-if="FnsAnswerFindFlag" style="max-width: 40px; margin-top: 5px;">
        </span>
                <vs-button color="danger" class="pull-right" type="filled" @click="setYes">Да</vs-button>
                <vs-button color="success" class="pull-right" type="filled" @click="setNo">Нет</vs-button>
            </div>
            <div v-if="set_error">
                <hr style="margin-top: 15px; border: 1px solid red;">
                <h5 style="color: red;margin-top: 5px">Ошибка! Не удалось привязать ответ к заемщику...</h5>
            </div>
        </div>

    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import {mapActions, mapGetters} from 'vuex'
import AnswerToDebtor from './Render/AnswerFnsToDebtor.vue'
import DebtorFioFastCorrect from '../Debtor/DebtorFioFastCorrect.vue'

export default {
    components: {
        VueCsvImport,
        AnswerToDebtor,
        DebtorFioFastCorrect
    },
    props: {
        find_value: '',
        answerId: 0,
        correctState: 0
    },
    data() {
        return {
            set_error: false,
            id_debtor: 0,
            fio_debtor: '',
            debtor_data: [],
            columnDefs: [
                {
                    headerName: 'ID',
                    field: 'id',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Заемщик',
                    field: 'debtor_fio',
                    filter: true,
                    width: 250,
                },
                {
                    headerName: 'ДР',
                    field: 'birthdate',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Действия',
                    field: 'answer_to_debtor',
                    filter: true,
                    width: 150,
                    cellRendererFramework: 'AnswerToDebtor',
                    cellRendererParams: {
                        my_action: this.setAnswerToDebtorGo.bind(this)
                    }
                },
            ],
            components: {
                AnswerToDebtor
            }
        }
    },
    computed: {
        ...mapGetters([
            'FnsAnswerFindFlag', 'FindedDebtorsForFnsAnswerArr'
        ]),
    },
    methods: {
        setYes() {
            this.setFnsAnswerToDebtor({id_debtor: this.id_debtor, id_answer: this.answerId}).then((response) => {
                if (response.result){
                    this.$emit('refreshAfterSet', {fnsDataId: this.answerId, what_from: "fromAnswers", fio_debtor: this.fio_debtor});
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
        setAnswerToDebtorGo(id_debtor) {
            this.id_debtor = id_debtor;
            this.fio_debtor = '';
            this.getFioDebtorByIdForFnsAnswer(id_debtor).then((response) => {
                if (response.result) {
                    this.fio_debtor = response.fio;
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
            this.correctState = 2;
        },
        searchDebtorsForFnsAnswer() {
            this.getDebtorsForAnswerData(this.find_value);
        },
        onrowDoubleClicked(event) {
            this.debtor_data = {
                debtor_id: event.data.id,
                d_last_name: event.data.name_family,
                d_first_name: event.data.name,
                d_middle_name: event.data.name_patronymic,
                f_fio: event.data.debtor_fio
            }
            this.correctState = 1;
        },
        onCanceledCorrect() {
            this.correctState = 0;
        },
        onDebtorCorrected() {
            this.searchDebtorsForFnsAnswer();
            this.correctState = 0;
        },
        ...mapActions([
            'getDebtorsForAnswerData', 'setFnsAnswerToDebtor', 'getFioDebtorByIdForFnsAnswer'
        ]),
    },
    mounted() {

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
    margin-top: 15px;
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
