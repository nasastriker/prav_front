<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>
            <vs-tab :label="label">
                <div class="vx-row" >

                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <Status :status="req.request_status" :req="req"></Status>
                        <h6 class="h6 mb-1" >ID_заемщика:</h6>
                        <vs-input class="w-full mb-4" v-model="req.id_debtor"></vs-input>
                        <h6 class="h6 mb-1" >Имя:</h6>
                        <vs-input class="w-full mb-4" v-model="req.request_data.name"></vs-input>
                        <h6 class="h6 mb-1" >Телефон:</h6>
                        <vs-input class="w-full mb-4" v-model="req.request_data.phone"></vs-input>
                        <h6 class="h6 mb-1" >Email:</h6>
                        <vs-input class="w-full mb-4" v-model="req.request_data.email"></vs-input>
                        <h6 class="h6 mb-1" >Серия:</h6>
                        <vs-input class="w-full mb-4" v-model="req.request_data.series"></vs-input>
                        <h6 class="h6 mb-1" >Номер паспорта:</h6>
                        <vs-input class="w-full mb-4" v-model="req.request_data.number"></vs-input>
                        <h6 class="h6 mb-1" >ФИО:</h6>
                        <vs-input class="w-full mb-4" v-model="req.request_data.fio"></vs-input>

                        <h6 class="h6 mb-1" >Дата рождения:</h6>
                        <vs-input type="date" class="w-full mb-4" v-model="req.request_data.bithdate"></vs-input>


                        <h6 class="h6 mb-1" >Сообщение:</h6>
                        <vs-textarea v-model="req.request_data.text" />
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        Поиск:
                        <vs-input class="w-full" style="max-width: 350px"  v-model="fio"  @keyup.enter="findFio" ></vs-input>
                        <json-viewer :value="Deb"></json-viewer>
                        <template v-if="typeof Deb.debtor.id!='undefined'||req.id_debtor!=null">
                            <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="privAndSend">Привязать и отправить СМС</vs-button>
                        </template>
                    </div>
                </div>

                <div style="margin-top: 10px">
                    <vs-row>
                        <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                            <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                            <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>



            </vs-tab>

        </vs-tabs>

    </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import JsonViewer from 'vue-json-viewer'
    import DebtorID from '../Debtor/DebtorID.vue'
    import Back from '../../components/Back.vue'
    import Status from './Status.vue'
    export default {
        props:['req'],
        components: {
            DebtorID,
            JsonViewer,
            vSelect,
            Status,
            Back
        },
        data () {
            return {
                label:'Доступ в личный кабинет:',
                data:{},
                dataSer:{},
                fio:'',

            }
        },
        mounted(){
            this.getDataRequestStatuss();
            this.clearDeb();

        },

        computed: {
            ...mapGetters([
                'User','RequestStatussArr','Deb'
            ]),

        },
        methods: {
            ...mapMutations([
                'clearDeb',
            ]),
            privAndSend(){
               // this.req.id_debtor=this.Deb.debtor.id

                axios.post(r("requestUser.index"), {
                    params: {
                        method: 'privAndSend',
                        param: this.req

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })

                    }



                })
            },
            findFio(){

                    this.$vs.loading({ color: '#ff8000' })
                    axios.get(r("find.index"), {
                        params: {
                            method: 'findFio',
                            param: {
                                id_recover:0,
                                find:this.fio,

                            }

                        }
                    }).then((response) => {
                        if (response.data.result){
                            this.findFlag=true;
                            if(response.data.total==1){
                                this.getDataDebtorsById(response.data.data[0].id)
                            }
                            else{
                                this.$vs.notify({  title:'Успешно', text: 'Есть несколько вариантов!!!', color: 'success', position: 'top-center' })
                            }


                            this.findFlagNotFound=false;
                            this.$vs.loading.close()
                        }
                        else{
                            this.findFlagNotFound=true;
                        }this.$vs.loading.close()



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
            close(){
                this.$router.back()
            },
            openUrl(url){
                window.open(url, '_blank');
            },

            ...mapActions([
                'getDataRequestStatuss','getDataDebtorsById'
            ]),

            save(){


                axios.post(r("requestUser.index"), {
                    params: {
                        method: 'privAndSend',
                        param: this.req

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })

                    }



                })


            },


        },
    }
</script>
<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }

</style>
