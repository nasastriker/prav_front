<template>
    <div>
      <div class="vynoska-fns-answer" v-if="dataItem.p_file_data.hand_binding">
        <span style="font-size: 12px; color: #0b0b0b; margin-left: 20px"><b>Ответ привязан вручную {{
            dataItem.p_file_data.date_binding
          }}</b></span>
      </div>

      <div v-if="dataItem.p_file_data.by_inn" style="margin-bottom: 15px">
        <h5 style="color: red"><b>Найдено по ИНН</b></h5>
        <h5>ФИО из файла: {{ dataItem.p_file_data.debtor_data.last_name }} {{ dataItem.p_file_data.debtor_data.first_name }} {{ dataItem.p_file_data.debtor_data.middle_name }} / ИНН: {{ dataItem.p_file_data.debtor_data.inn }}</h5>
      </div>

        <h5><b>Файл:</b> {{ dataItem.p_file_data.short_names_files }}</h5>
        <h5><b>Дата загрузки:</b> {{ dataItem.p_file_data.file_date }}</h5>
        <br>
            <div v-if="dataItem.p_file_data.is_no_acc">
                <h5><b>Данные файла:</b></h5>
                <br>
                <h5>Ответ ФНС: Сведения о счетах отсутствуют в БД</h5>
                <br>
                <h6><b>Обработаны кредиты (id):</b> {{ dataItem.p_credit }}</h6>
                <br>
            </div>
            <div v-else>
                <h5><b>Данные файла:</b></h5>
                <h6><b>Банков:</b> {{ dataItem.p_file_data.count_banks }}</h6>
                <h6 v-for="item in dataItem.p_file_data.banks_and_years">{{ item.year }} - {{ item.bank_name }}</h6>
                <br>

                <h6><b>Банков для добавления:</b> {{ dataItem.p_file_data.count_banks_for_add }}</h6>
                <h6 v-for="item in dataItem.p_file_data.banks_for_add">{{ item.year }} - {{ item.bank_name }}</h6>
                <br>

              <div v-if="showDet">
                <h6 class="all_info_title" @click="showDet=!showDet"><b>Данные для обработки [-]</b></h6>
                <h6 v-for="(item, index) in dataItem.p_file_data.banks_matches"><b>{{ index + 1 }}:</b>{{ item.data }}
                </h6>
              </div>
              <div v-else>
                <h6 class="all_info_title" @click="showDet=!showDet"><b>Данные для обработки [+]</b></h6>
              </div>
                <br>
                <h6><b>Обработаны кредиты (id):</b> {{ dataItem.p_credit }}</h6>
                <br>
            </div>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import {mapActions, mapGetters} from 'vuex'

export default {
    components: {
        VueCsvImport
    },
    props: {
        dataItem: {},
        correctState: 0

    },
    data() {
        return {
            start_value: '',
            showDet: false
        }
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        onRefreshAfterSet(par_vals) {
            this.$emit('refreshAfterSet', par_vals);
        },
        ...mapActions([]),
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

.vynoska-fns-answer {
    background-color: #ADD8E6;
    margin-bottom: 20px;
    margin-left: -30px;
    width: 180px;
    padding: 10px;
    border-radius: 0px 10px 10px 0px;
    text-align: right;
}

.all_info_title {
  cursor: pointer;
}
</style>
