<template>
    <vx-card no-shadow>
        <vs-tabs>
            <vs-tab :label="label">
         <!--<template v-if="User.id==4">

        </template> -->
                <label class="text-sm">Статус:</label>
                <div class="vs-component vs-con-input-label vs-input w-100 mb-base vs-input-primary is-label-placeholder" >
                    <vSelect  :reduce="label => label.id" label="name" :options="RequestStatussArr"  v-model="req.request_status" style="margin-bottom: 40px" ></vSelect>
                </div>


        <vs-input class="w-100 mb-base" label-placeholder="Номер судебного дела" v-model="req.request_data.numberBankrot"></vs-input>
        <vs-input type="date" class="w-100 mb-base" label-placeholder="Дата признания банкротом" v-model="req.request_data.dateBankrot"></vs-input>
                <span style="margin-bottom: 5px">
                                Ссылка на судебное дело:
                              </span>
                <vx-input-group class="w-100 mb-base">
                    <vs-input class="w-100 "  v-model="req.request_data.urlBankrot"  />

                    <template slot="append">
                        <div class="append-text btn-addon">
                            <vs-button color="warning" type="border"  @click="openUrl(req.request_data.urlBankrot)">Открыть</vs-button>
                        </div>
                    </template>
                </vx-input-group>


                <div style="margin-top: 10px">
                    <vs-row>
                        <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                            <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                            <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>



            </vs-tab>
            <vs-tab label="Договор:">
                <DebtorID :idDep="req.id_debtor"></DebtorID>
            </vs-tab>
        </vs-tabs>

    </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import DebtorID from '../Debtor/DebtorID.vue'
    export default {
        props:['req'],
        components: {
            DebtorID,
            vSelect,
        },
        data () {
            return {
                label:'Уведомление о банкротстве:',

            }
        },
        mounted(){
            this.getDataRequestStatuss();

        },

        computed: {
            ...mapGetters([
                'User','RequestStatussArr'
            ]),

        },
        methods: {
            openUrl(url){
                window.open(url, '_blank');
            },

            ...mapActions([
                'getDataRequestStatuss',
            ]),

            save(){



            },


        },
    }
</script>
