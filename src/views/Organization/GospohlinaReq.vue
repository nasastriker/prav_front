<template>
    <vx-card no-shadow>
        <vs-input class="w-full mb-base" label-placeholder="Название" v-model="data.name"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ПлательщикСчет" v-model="data.payment_acc"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Плательщик" v-model="data.payment_name1"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Плательщик1" v-model="data.payment_name2"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ПлательщикИНН" v-model="data.payment_inn"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ПлательщикБанк1" v-model="data.payment_bank1"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ПлательщикБанк2" v-model="data.payment_bank2"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ПлательщикБИК" v-model="data.payment_bic"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ПлательщикКПП" v-model="data.payment_kpp"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ПлательщикКорсчет" v-model="data.payment_cor"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="СтатусСоставителя" v-model="data.payment_stat"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ПоказательКБК" v-model="data.payment_kbk"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="ТП (г., п.)" v-model="data.tnp"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Город" v-model="data.city"></vs-input>
        <h6 class="h6">Основание платежа судебный приказ: <span style="color: red">Можно использовать только перменную $fio и $id_credit</span></h6>
        <vs-input class="w-full mb-base" v-model="data.appointment"></vs-input>
        <h6 class="h6">Основание платежа исковое: <span style="color: red">Можно использовать только перменную $fio и $id_credit</span></h6>
        <vs-input class="w-full mb-base" v-model="data.appointment_isk"></vs-input>
        <div style="margin-top: 20px">
            <vs-button color="blue" class="pull-right" type="filled"  @click="onBackClick">Отменить</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>
    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    export default {
        components: {
        },
        props: ['id','id_orgn'],
        data () {
            return {
                label:'Новое',
                data:{

                },
            }
        },
        mounted(){
            if (this.id!=-1) {
                this.label='Редактирование'
                this.getData(this.id);
            }

        },

        computed: {


        },
        methods: {
            ...mapActions([
                'saveGospohlinaReq',
            ]),
            onBackClick(){
                this.$emit('back_click')
            },
            getData(id){
                axios.get(r("gospohlinaReq.index"), {
                    params: {
                        method: 'getGospohlinaReq',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })
            },
            save(){
                this.data.id_orgn=this.id_orgn
                this.saveGospohlinaReq(this.data).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.onBackClick()

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })

            },

        },
    }
</script>
