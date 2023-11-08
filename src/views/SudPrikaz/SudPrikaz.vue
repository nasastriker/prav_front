<template>
    <div>
        <h6><b>ВЗЫСКАТЕЛЬ: {{ dataItem.special_data.recoverer }} </b></h6>
        <br>
        <div v-if="show_all_info">
            <h6 @click="allInfoClick" class="all_info_title"><b>Вся информация файла: [-]</b></h6>
            <div class="all_info_file">
                <b>Распознание ФИО:</b>
                <div class="all_info_file_smaller">
                    [ {{ dataItem.special_data.fio_data.fio }} ]
                </div>
                <br>
                <b>Распознанные данные договора:</b>
                [ {{ dataItem.special_data.dogovor_data }} ]
                <div v-if="dataItem.status === 2">
                    <div v-if="NearCreditsForSocAnswerArr.dog_data.exist_data"
                         style="background-color: #cccccc;padding: 10px">
                        Кредиты с таким номером договора:<br>
                        <span v-for="(item, index) in NearCreditsForSocAnswerArr.dog_data.nd_credits"><b>{{
                                index + 1
                            }}: </b>{{ item.id_credit }} - {{ item.debtor_data }} - № СА: {{ item.number_sa }} - № договора: {{
                                item.num_dog
                            }}
                       - <span style="cursor: pointer" @click="itsHimNdClick(item.id_credit)"><b>Это он!</b></span><br></span>
                    </div>
                    <div v-if="show_quest_nd" style="background-color: #eeffcc;padding: 10px;display: flex">
                        <div style="width: 60%"><span>
                        Вы действительно хотите привязать данное определение суда к данному кредиту (id {{
                                id_credit
                            }})?
                    </span>
                        </div>
                        <div style="margin-right: 10px">
                            <img src="/loading.gif" v-if="SocAnswerFindFlagToDc"
                                 style="max-width: 40px; margin-top: 5px;">
                        </div>
                        <div style="display: flex;margin-left: auto">
                            <vs-button color="danger" style="margin-right: 10px" class="pull-right" type="filled"
                                       @click="setYes">Да
                            </vs-button>
                            <vs-button color="success" class="pull-right" type="filled" @click="setNo">Нет</vs-button>
                        </div>
                    </div>
                </div>
                <br>
                <b>Распознанные данные СА:</b>
                [ {{ dataItem.special_data.sa_data }} ]
                <div v-if="dataItem.status === 2">
                    <div v-if="NearCreditsForSocAnswerArr.sa_data.exist_data"
                         style="background-color: #cccccc;padding: 10px">
                        Кредиты с таким номером СА:<br>
                        <span v-for="(item, index) in NearCreditsForSocAnswerArr.sa_data.sa_credits"><b>{{
                                index + 1
                            }}: </b>{{ item.id_credit }} - {{ item.debtor_data }} - № СА: {{ item.number_sa }} - № договора: {{
                                item.num_dog
                            }}
                        - <span style="cursor: pointer" @click="itsHimSaClick(item.id_credit)"><b>Это он!</b></span><br></span>
                    </div>
                    <div v-if="show_quest_sa" style="background-color: #eeffcc;padding: 10px;display: flex">
                        <div style="width: 60%"><span>
                        Вы действительно хотите привязать данный документ к данному кредиту (id {{
                                id_credit
                            }})?
                    </span>
                        </div>
                        <div style="margin-right: 10px">
                            <img src="/loading.gif" v-if="SocAnswerFindFlagToDc"
                                 style="max-width: 40px; margin-top: 5px;">
                        </div>
                        <div style="display: flex;margin-left: auto">
                            <vs-button color="danger" style="margin-right: 10px" class="pull-right" type="filled"
                                       @click="setYes">Да
                            </vs-button>
                            <vs-button color="success" class="pull-right" type="filled" @click="setNo">Нет</vs-button>
                        </div>
                    </div>
                </div>

                <br>
                <b>Текст файла:</b>
                [ {{ dataItem.in_file_data }} ]
                <br>
                <br>
            </div>
        </div>
        <div v-else>
            <h6 @click="allInfoClick" class="all_info_title"><b>Вся информация файла: [+]</b></h6>
            <br>
        </div>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import {mapActions, mapGetters} from 'vuex'
import {SpinnerLoader} from 'vue-spinners-css';
import r from '../../route';
import axios from '../../axios'

export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
    },
    props: {
        dataItem: {},
        show_quest_nd: false,
        show_quest_sa: false
    },
    data() {
        return {
            show_all_info: false,
        }
    },
    computed: {
        ...mapGetters([
            'SocAnswerFindFlagToDc', 'NearCreditsForSocAnswerArr'
        ]),
    },
    methods: {
        onRefreshAfterSet(par_vals) {
            this.$emit('refreshAfterSet', par_vals);
        },
        allInfoClick() {
            this.show_all_info = !this.show_all_info;
        },
        itsHimSaClick(credit_id) {
            this.show_quest_sa = true;
            this.show_quest_nd = false;
            this.id_credit = credit_id;
        },
        itsHimNdClick(credit_id) {
            this.show_quest_nd = true;
            this.show_quest_sa = false;
            this.id_credit = credit_id;
        },
        setNo() {
            this.show_quest_sa = false;
            this.show_quest_nd = false;
        },
        setYes() {
            this.setSocAnswerToDebtorCredit({
                id_answer: this.dataItem.id,
                id_credit: this.id_credit
            }).then((response) => {
                if (response.result) {
                    this.onRefreshAfterSet({
                        file_id: this.dataItem.id,
                        fio_debtor: response.fio_debtor
                    });
                }
            }).catch(error => {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            });
        },
        ...mapActions([
            'setSocAnswerToDebtorCredit'
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

.err_mess {
    color: red;
}

.succs_mess {
    color: green;
}

.vynoska {
    background-color: #ADD8E6;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: -30px;
    width: 180px;
    padding: 10px;
    border-radius: 0px 10px 10px 0px;
    text-align: right;
}

.all_info_file {
    font-size: 11px;
}

.all_info_file_smaller {
    font-size: 10px;
}

.all_info_title {
    cursor: pointer;
}
</style>
