<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>
            <vs-tab :label="label">
                <Status :status="req.request_status" :req="req"></Status>

                <div>
                    <div class="centerx">
                        <vs-tooltip text="Номер судебного дела" position="top" >
                            <h6 class="h6Blue mb-1">Номер судебного дела</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-4" v-model="req.request_data.numberBankrot"></vs-input>
                </div>

                <div>
                    <div class="centerx">
                        <vs-tooltip text="Дата признания банкротом" position="top" >
                            <h6 class="h6Blue mb-1">Дата признания банкротом</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input type="date" class="w-100 mb-4" v-model="req.request_data.dateBankrot"></vs-input>
                </div>
                
                
                <div class="centerx">
                    <vs-tooltip text="Ссылка на судебное дело:" position="top" >
                        <h6 class="h6Blue mb-1">Ссылка на судебное дело:</h6>
                    </vs-tooltip>
                </div>
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
                        <vs-col vs-offset="9"  vs-type="flex" vs-justify="end" vs-align="center" >
                            <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                            <vs-button style="margin-left: 15px; " color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>



            </vs-tab>
            <vs-tab label="Договор:">
                <DebtorID :idDep="req.id_credit" :back="false"></DebtorID>
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
    import Back from '../../components/Back.vue'
    import Status from './Status.vue'
    export default {
        props:['req'],
        components: {
            DebtorID,
            vSelect,
            Status,
            Back
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
            close(){
                this.$router.back()
            },
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
