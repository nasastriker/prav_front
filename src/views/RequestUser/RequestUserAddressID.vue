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

                <div style="margin-bottom: 30px">
                    <span style="margin-bottom: 5px">
        Адрес регистрации:
      </span>
                    <VueSuggestions

                            :model.sync="req.request_data.address_reg"
                            :fias.sync="req.request_data.address_reg"
                            :options="SuggestionOptionsAddress">

                    </VueSuggestions>
                </div>
                <div style="margin-top: 10px">
                    <span style="margin-bottom: 5px; margin-top: 5px">
        Адрес фактический:
      </span>
                    <VueSuggestions

                            :model.sync="req.request_data.address_fact"
                            :fias.sync="req.request_data.address_fact"
                            :options="SuggestionOptionsAddress">
                    </VueSuggestions>
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
            <vs-tab label="Заемщик:">
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
    import VueSuggestions from 'vue-suggestions';
    export default {
        props:['req'],
        components: {
            DebtorID,
            vSelect,
            VueSuggestions,
        },
        data () {
            return {
                label:'Уведомление о смене адреса:',

            }
        },
        mounted(){
            this.getDataRequestStatuss();

        },

        computed: {
            ...mapGetters([
                'User','RequestStatussArr', 'SuggestionOptionsAddress'
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
