<template>
    <div>
        <div v-if="dataItem.status === 1">
            <div style="display: flex;width: 550px">
                    <div class="succ_vyn">
                        <h5 style="display: table-cell;vertical-align: middle;color: green;">Файл загружен успешно <a style="cursor:pointer" @click="goCredit">Кредит</a></h5>

                    </div>
            </div>
            <hr style="margin-bottom: 10px; margin-top: 10px; border: 1px solid #ADD8E6;">
            <h4 style="color: #1f2b7b"><b>{{ dataItem.type_doc_name }}</b></h4>
            <hr style="margin-bottom: 15px; margin-top: 10px; border: 1px solid #ADD8E6;">
            <div class="vynoska" v-if="dataItem.hand_edit === 1">
                <span style="font-size: 12px; color: #0b0b0b; margin-left: 20px"><b>Ответ привязан вручную {{
                        dataItem.hand_edit_date
                    }}</b></span>
            </div>
            <br v-else>
        </div>
        <div v-if="dataItem.status === 2 || dataItem.status === 6">
            <div v-if="dataItem.status === 2" style="display: flex;width: 550px">
                <div class="err_vyn1">
                    <h5 style="display: table-cell;vertical-align: middle;color: white;">Ошибка</h5>
                </div>
            <div class="err_vyn2">
                <h5 style="display: table-cell;vertical-align: middle;color: #FF6000;">{{ dataItem.error_message }}</h5>
            </div>
            </div>
            <div v-if="dataItem.status === 6" style="display: flex;width: 550px">
                <div class="err_vynzz">
                    <h5 style="display: table-cell;vertical-align: middle;color: white;">Внимание</h5>
                </div>
                <div class="err_vynxx">
                    <h5 style="display: table-cell;vertical-align: middle;color: #00008B;">Файл уже загружен</h5>
                </div>
            </div>
            <div style="display: flex;width: 550px;margin-bottom: 20px">
                <div class="one-el1" @click="tryAgain">
                    <div style="display: table;padding: 10px;">
                        <repeat-icon size="1.5x" class="custom-class" style="display: table-cell;vertical-align: middle;"></repeat-icon>
                    </div>
                    <div style="display: table;padding-right: 20px;">
                        <div style="display: table-cell;vertical-align: middle;">Повторить</div>
                    </div>
                </div>

                <div class="one-el2" @click="getFileUrl">
                    <div style="display: table;padding: 10px;">
                        <file-text-icon size="1.5x" class="custom-class" style="display: table-cell;vertical-align: middle;"></file-text-icon>
                    </div>
                    <div style="display: table;padding-right: 20px;">
                        <div style="display: table-cell;vertical-align: middle;">Просмотреть файл</div>
                    </div>
                </div>

                <div class="one-el3" @click="deleteUplFile">
                    <div style="display: table;padding: 10px;">
                        <trash-2-icon size="1.5x" class="custom-class"></trash-2-icon>
                    </div>
                    <div style="display: table;padding-right: 20px;">
                        <div style="display: table-cell;vertical-align: middle;">Удалить</div>
                    </div>
                </div>

                <div style="margin-left: auto">
                    <img src="/loading.gif" v-if="FileRetryFlag" style="max-width: 40px; margin-top: 5px;">
                </div>
            </div>

            <div v-if="show_quest_delete" style="background-color: #eeffcc;padding: 10px;display: flex">
                <div style="width: 60%"><span>
                        Вы действительно хотите удалить данный файл?
                    </span>
                </div>
                <div style="display: flex;margin-left: auto">
                    <vs-button color="danger" style="margin-right: 10px" class="pull-right" type="filled"
                               @click="setYesDel">Да
                    </vs-button>
                    <vs-button color="success" class="pull-right" type="filled" @click="setNoDel">Нет</vs-button>
                </div>
            </div>

            <hr style="margin-bottom: 10px; margin-top: 10px; border: 1px solid #ADD8E6;">
            <h4 style="color: #1f2b7b"><b>{{ dataItem.type_doc_name }}</b></h4>
            <hr style="margin-bottom: 15px; margin-top: 10px; border: 1px solid #ADD8E6;">


            <div v-if="show_finder">
                <h6 @click="showFinderClick" class="all_info_title"><b>Привязать вручную: [-]</b></h6>
                <br>
                <DebtorFinderForFileAnswer :find_value="dataItem.full_fio" :answerId="dataItem.id"
                                           :correctState="correctState"
                                           @refreshAfterSet="onRefreshAfterSet"></DebtorFinderForFileAnswer>
            </div>
            <div v-else>
                <h6 @click="showFinderClick" class="all_info_title"><b>Привязать вручную: [+]</b></h6>
                <br>
            </div>
        </div>

        <h5><b>Файл:</b> {{ dataItem.name_answer_file }}</h5>
        <h5><b>Дата загрузки:</b> {{ dataItem.date_file }}</h5>
        <br>
        <h5><b>Данные файла:</b></h5>
        <br>

        <div v-if="dataItem.doc_type === 7">
            <SudPrikazCancelData :dataItem="dataItem" @refreshAfterSet="onRefreshAfterSet"
                                 :show_quest_nd="show_quest_nd" :show_quest_sa="show_quest_sa"
            ></SudPrikazCancelData>
        </div>
        <div v-if="dataItem.doc_type === 39">
            <SudPrikaz :dataItem="dataItem" @refreshAfterSet="onRefreshAfterSet"
            :show_quest_nd="show_quest_nd" :show_quest_sa="show_quest_sa"
            ></SudPrikaz>
        </div>

        <div v-if="dataItem.status === 1">
            <div>
                <h6><b>Обработаны кредиты (id):</b></h6>
                <h6 v-for="(item, index) in CreditsForFilesUploadArr"><b>{{ index + 1 }}: </b>{{ item.id }} - № СА:
                    {{ item.number_sa }} - № договора: {{ item.number_dog }}</h6>
                <br>
            </div>
        </div>
        <div v-else-if="dataItem.status === 2">
            <h6><b>Кредиты (id):</b></h6>
            <h6 v-for="(item, index) in CreditsForFilesUploadArr"><b>{{ index + 1 }}: </b>{{ item.id }} - № СА:
                {{ item.number_sa }} - № договора: {{ item.number_dog }}</h6>
            <br>
        </div>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import {mapActions, mapGetters} from 'vuex'
import DebtorFinderForFileAnswer from "./DebtorFinderForFileAnswer.vue";
import SudPrikazCancelData from "../SudPrikaz/SudPrikazCancelData.vue";
import { RepeatIcon, FileTextIcon, Trash2Icon } from 'vue-feather-icons'
import SudPrikaz from "../SudPrikaz/SudPrikaz.vue";
import {SpinnerLoader} from 'vue-spinners-css';
import r from '../../route';
import axios from '../../axios'

export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
        DebtorFinderForFileAnswer,
        SudPrikazCancelData,
        SudPrikaz,
        RepeatIcon,
        FileTextIcon,
        Trash2Icon
    },
    props: {
        dataItem: {},
        correctState: 0,
        show_quest_nd: false,
        show_quest_sa: false,
    },
    data() {
        return {
            start_value: '',
            show_finder: false,
            id_credit: null,
            show_quest_delete: false
        }
    },
    computed: {
        ...mapGetters([
            'FileRetryFlag', 'CreditsForFilesUploadArr'
        ]),
    },
    methods: {
        goCredit(){
            this.$emit('clousePop','/debtors/'+this.dataItem.credits[0]);


        },
        deleteUplFile(){
            this.show_quest_delete = true;
        },
        setYesDel() {
            this.deleteUploadFile(this.dataItem.id).then((value)=> {
                if(value){
                    this.showDeleteSuccess()
                    this.$emit('refreshAfterDelete');
                }
                else{
                    this.showDeleteDanger()
                }
            });
        },
        setNoDel(){
            this.show_quest_delete = false;
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
        getFileUrl() {
            this.getUploadFilesForImportServ(this.dataItem.id).then((response) => {
                const url = window.URL.createObjectURL(new Blob([(response)], {type: 'application/pdf'}));
                window.open(url);
            }).catch(error => {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })

            });
        },

        onRefreshAfterSet(par_vals) {
            this.$emit('refreshAfterSet', par_vals);
        },
        showFinderClick() {
            this.show_finder = !this.show_finder;
        },
        tryAgain() {
         //   console.log(this.dataItem.id)
            this.tryParseFileAgain(this.dataItem.id).then((response) => {
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
            'tryParseFileAgain', 'getUploadFilesForImportServ', 'deleteUploadFile'
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
    color: #FF6000;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-right: 10px;
}

.one-el1 {
    display: flex;
    background-color: #EEDDFF;
    cursor: pointer;
    border-radius: 5px;
    color: #1f2b7b;
    width: 50%;
}
.one-el2 {
    display: flex;
    background-color: #EEDDFF;
    cursor: pointer;
    border-radius: 5px;
    color: #1f2b7b;
    width: 50%;
    margin-left: 10px;
}
.one-el3 {
    display: flex;
    background-color: #FCEEE0;
    cursor: pointer;
    border-radius: 5px;
    color: #FF6000;
    width: 50%;
    margin-left: 10px;
}
.one-el1:hover {
    background-color: #7922CC;
    color: white;
}
.one-el2:hover {
    background-color: #7922CC;
    color: white;
}
.one-el3:hover {
    background-color: #FF6000;
    color: white;
}

.err_vyn1 {
    display: table;
    background-color: #FF6000;
    margin-bottom: 10px;
    border-radius: 5px 0px 0px 5px;
    text-align: center;
    padding: 10px;
    width: 20%;
}

.err_vynzz {
    display: table;
    background-color: #00008B;
    margin-bottom: 10px;
    border-radius: 5px 0px 0px 5px;
    text-align: center;
    padding: 10px;
    width: 20%;
}

.succ_vyn {
    display: table;
    background-color: #DFF7EA;
    margin-bottom: 10px;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    width: 100%;
}

.err_vyn2 {
    display: table;
    background-color: #FCEEE0;
    margin-bottom: 10px;
    border-radius: 0px 5px 5px 0px;
    text-align: center;
    padding: 10px;
    width: 80%;
}

.err_vynxx {
    display: table;
    background-color: #ADD8E6;
    margin-bottom: 10px;
    border-radius: 0px 5px 5px 0px;
    text-align: center;
    padding: 10px;
    width: 80%;
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
