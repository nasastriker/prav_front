<template>
  <vx-card no-shadow style="min-height: 95vh;padding-top: 0px;" class="handbook_bank">
        <h3 class="mt-4">{{ bank.name }}</h3>
        <hr style="margin-bottom: 15px; margin-top: 10px; border: 1px solid #D3D3D3;">
        <vs-tabs>
            <vs-tab label="Данные банка">
                <label class="mt-4 mb-4">{{ label }} </label>

                <h6 class="mb-1 mt-4">Номер</h6>
                <vs-input class="w-full mb-4" v-model="bank.reg_number"></vs-input>

                <h6 class="mb-1">Название</h6>
                <vs-input class="w-full mb-4" v-model="bank.name"></vs-input>

                <h6 class="mb-1">БИК</h6>
                <vs-input class="w-full mb-4" v-model="bank.bic"></vs-input>

                <h6 class="mb-1">Адрес</h6>
                <vs-input class="w-full mb-4" v-model="bank.address"></vs-input>

                <h6 class="mb-1">Название Адрес</h6>
                <vs-textarea class="w-full mb-4" v-model="bank.name_address"></vs-textarea>

                <h6 class="mb-1">Вид</h6>
                <vs-input class="w-full mb-4" v-model="bank.vid"></vs-input>

                <h6 class="mb-1">Форма</h6>
                <vs-input class="w-full mb-4" v-model="bank.form"></vs-input>

                <h6 class="mb-1">Дата регистрации</h6>
                <vs-input type="date" class="w-full mb-4" v-model="bank.date_reg"></vs-input>

                <h6 class="mb-1">Статус</h6>
                <vs-input class="w-full mb-4" v-model="bank.status"></vs-input>

                <h6 class="mb-1">Приоритет</h6>
                <vs-input class="w-full mb-4" v-model="bank.priority"></vs-input>

                <h6 class="mb-1">Приоритет ЭДО</h6>
                <vs-input class="w-full mb-4" v-model="bank.priority_edo"></vs-input>

                <div style="display: flex">
                    <vs-checkbox style="margin-bottom: 15px" v-model="bank.edo">Банк ЭДО</vs-checkbox>
                    <vs-checkbox style="margin-bottom: 15px; margin-left: 10px" v-model="bank.send">Не отправлять
                    </vs-checkbox>
                </div>
            </vs-tab>
            <vs-tab label="ЭДО">
              <h6 class="h6 mb-1 mt-4">Функция запроса:</h6>
                <vs-input class="mb-4 mr-4"  v-model="bank.funcs.func_req" style="width: 100%;"/>
              <h6 class="h6 mb-1" >Шаблон отзыва:</h6>
                 <v-select  class="w-50 " :reduce="label => label.id" label="nameForTask" :options="ShablonDocumentsArr"  v-model="bank.id_return_shab"  ></v-select>

            </vs-tab>
            <div style="margin-top: 120px">
                <vs-button color="primary" class="pull-right mr-4" type="filled" @click="$router.push('/handbook/bank/')">
                    Закрыть
                </vs-button>
                <vs-button color="success" class="pull-right" type="filled" @click="save">Сохранить</vs-button>
            </div>
        </vs-tabs>
    </vx-card>
</template>

<script>
import r from '../../route';
import {mapActions, mapGetters} from 'vuex'
import axios from '../../axios'

export default {
    components: {},
    data() {
        return {
            label: 'Редактирование банка:',
            bank: {
                funcs:{},
            },
        }
    },
    mounted() {
        this.getDataShablonDocuments();
        if (this.$route.params.id) {
            if (this.$route.params.id != 'new') {
                this.getData(this.$route.params.id);
            } else {
                this.label = 'Новый банк'
            }
        }

    },
    computed: {
      ...mapGetters([
        'ShablonDocumentsArr'
      ]),
    },
    methods: {

        ...mapActions([
            'saveBank','getDataShablonDocuments'
        ]),
        getData(id) {
            axios.get(r("bank.index"), {
                params: {
                    method: 'getBank',
                    param: id
                }
            }).then((response) => {
                if (response.data.result) {
                    this.bank = response.data.data
                }
            })
        },
        save() {
            this.bank.id = this.$route.params.id;
            this.saveBank(this.bank).then((response) => {
                if (response) {
                    this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                    this.$router.push('/handbook/bank/')
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Сохранить не удалось !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                }
            })
        },
    },
}
</script>
<style>
    .handbook_bank .con-slot-tabs,
    .handbook_ban .con-vs-tabs{
        overflow: visible;
    }
</style>