<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>
            <vs-tab label="Подсудность">
                <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full mb-2">

                    <Status :id_deb="id_deb"></Status>

                    <label class="text-sm">

                        Подсудность:

                    </label>
                    <vx-input-group class="w-100 mb-base">
                        <vs-input  v-model="Deb.debtor.jud_number" />

                        <template slot="append">
                            <div class="append-text btn-addon">
                                <vs-button color="warning" type="border" @click="showJud=!showJud">ИНФО</vs-button>
                                <vs-button color="warning" type="border" @click="setJud">Установить</vs-button>
                            </div>
                        </template>

                    </vx-input-group>
                    <template v-if="showJud">
                        <Jud :number="Deb.debtor.jud_number" ></Jud>
                    </template>

                    <template v-if="Deb.debtor.jud_number_geo!=null">
                        <label class="text-sm">
                            Гео подсудность:
                        </label>
                        <span v-for="(item, index) in Deb.debtor.jud_number_geo" :key="item">
                                                <vx-input-group class="w-100 mb-base"  >
                                                    <template v-if="Deb.debtor.jud_number_geo_pri==Deb.debtor.jud_number_geo[index]">
                                                            <vs-input v-model="Deb.debtor.jud_number_geo[index]"  style="color: green"/>
                                                    </template>
                                                    <template v-else>
                                                        <vs-input v-model="Deb.debtor.jud_number_geo[index]"  />
                                                    </template>

                                                    <template slot="append">
                                                        <div class="append-text btn-addon">
                                                            <vs-button color="warning" type="border" @click="showIndexProc(index) ">
                                                                <template v-if="showIndex === index">
                                                                    СКРЫТЬ
                                                                </template>
                                                                <template v-else>
                                                                ИНФО
                                                                </template>

                                                            </vs-button>
                                                        </div>
                                                    </template>
                                                </vx-input-group>
                                                <template v-if="showIndex === index">
                                                    <Jud :number="Deb.debtor.jud_number_geo[index]" ></Jud>
                                                </template>
                                            </span>
                    </template>

                    <vs-popup class="holamundo" :title="labelPop" :active.sync="popupActive">
                        <json-viewer
                                :value="ispl"
                                :expand-depth=5
                                copyable

                                sort></json-viewer>

                    </vs-popup>


                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2" >


                    <div style="margin-bottom: 0px">
                    <span style="margin-bottom: 5px">
        Адрес регистрации:
      </span>
                        <VueSuggestions

                                :model.sync="Deb.debtor.address_reg"
                                :fias.sync="Deb.debtor.data_reg"
                                :options="SuggestionOptionsAddress">

                        </VueSuggestions>
                    </div>
                    <template v-if="typeof Deb.debtor.data_reg!='undefined'">
                    <span style="margin-bottom: 5px">
                                ФИАС код улицы:
                              </span>
                    <vx-input-group class="w-100 mb-base">
                            <vs-input disabled v-model="Deb.debtor.data_reg.street_fias_id"  />



                        <template slot="append">
                            <div class="append-text btn-addon">
                                <vs-button color="warning" type="border" @click="showEditForm(Deb.debtor.data_reg.street_fias_id)">ИНФО</vs-button>
                            </div>
                        </template>
                    </vx-input-group>
                    <vs-input class="w-full mb-base"  disabled label-placeholder="geo_lat" v-model="Deb.debtor.data_reg.geo_lat"></vs-input>
                    <vs-input class="w-full mb-base"  disabled label-placeholder="geo_lon" v-model="Deb.debtor.data_reg.geo_lon"></vs-input>
                    <vs-input class="w-full mb-base"  disabled label-placeholder="Дом." v-model="Deb.debtor.data_reg.house"></vs-input>
                    </template>
                    <div style="margin-top: 10px">
                    <span style="margin-bottom: 5px; margin-top: 5px">
                        Адрес фактический:
                      </span>
                        <VueSuggestions

                                :model.sync="Deb.debtor.address_fact"
                                :fias.sync="Deb.debtor.data_fact"
                                :options="SuggestionOptionsAddress">
                        </VueSuggestions>
                    </div>
                    <template v-if="typeof Deb.debtor.data_fact!='undefined'">
                    <div style="margin-top: 40px"> </div>
                    <vs-input class="w-full mb-base" disabled label-placeholder="ФИАС код улицы" v-model="Deb.debtor.data_fact.street_fias_id"></vs-input>
                    <vs-input class="w-full mb-base"  disabled label-placeholder="Дом" v-model="Deb.debtor.data_fact.house"></vs-input>
                    </template>
                </div>

                </div>





            </vs-tab>

            <vs-tab label="Договор">
                <DebtorID :idDep="id_deb" :back="false"></DebtorID>

            </vs-tab>

        </vs-tabs>

    </vx-card>
</template>

<script>
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import r from '../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../axios'
    import DebtorID from '../Debtor/DebtorID.vue'
    import Status from '../../components/Status.vue'
    import Jud from '../Debtor/Jud.vue'
    import VueSuggestions from 'vue-suggestions';
    import JsonViewer from 'vue-json-viewer'
    import Back from '../../components/Back.vue'
    export default {
        components: {
            VueSuggestions,
            DebtorID,
            Jud,
            Back,
            Status,
            JsonViewer,
            ArrowLeftIcon
        },
        props:['id_deb'],
        data () {
            return {
                labelPop:'Подсудность',
                ispl:[],
                popupActive:false,
                showJud:false,
                showIndex: null,

            }
        },
        mounted(){
            this.getDataDebtorsById(this.id_deb)
        },

        computed: {
            ...mapGetters([
                'StatussDebtorArr','Deb' ,'SuggestionOptionsAddress'

            ]),

        },
        methods: {
            showIndexProc(index){
                if(this.showIndex!=index){
                    this.showIndex = index
                }
                else{
                    this.showIndex = null
                }

            },
            showEditForm(e){
                axios.get(r("jurisdiction.index"), {
                    params: {
                        method: 'getJurisdictionsByStreetFias',
                        param: e

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.popupActive=true;
                        this.labelPop='Адреса в базе данных по данному коду'
                        this.ispl=response.data.data
                    }



                })
            },
            setJud(){
                axios.post(r("jurisdiction.index"), {
                    params: {
                        method: 'setJurisdictions',
                        param: {
                            jud_number:this.Deb.debtor.jud_number,
                            address_reg:this.Deb.debtor.address_reg,
                            data_reg:this.Deb.debtor.data_reg,
                            id_debtor:this.Deb.debtor.id,
                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            close(){

                this.$router.back()
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById'
            ]),

        },
    }
</script>
