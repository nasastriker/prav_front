<template>
    <vx-card no-shadow>

        <!-- Img Row -->

        <!-- Info -->
        <vs-tabs>
            <vs-tab label="Общие">


        <label style="margin: 20px 0; display: block;">{{label}} </label>

        <h6 class="mb-1">Код</h6>
        <vs-input v-model="fssp.fssp_code"></vs-input>
        <h6 class="h6 mb-1" style="margin-top: 10px;">Код районный</h6>
        <v-select  class="w-50 mb-4" style="min-width: 300px;" :reduce="label => label.fssp_area_code" label="name" :options="FsspSListArr"  v-model="fssp.fssp_code_area"  ></v-select>

        <!--<vs-input label-placeholder="Код районный" v-model="fssp.fssp_code_area"></vs-input>!-->
        <h6 class="mb-1">Наименование</h6>
        <vs-input class="w-full mb-4" v-model="fssp.fssp_name"></vs-input>
        <h6 class="mb-1">Наименование CSV</h6>
        <vs-input class="w-full mb-4" v-model="fssp.fssp_name_from_csv"></vs-input>


        <!--<vs-input class="w-full mb-4" label-placeholder="Адрес" v-model="fssp.address"></vs-input>!-->
        <div style="margin-bottom: 10px">
            <h6 class="h6 mb-1">Адрес :</h6>
        <VueSuggestionsChange
                class="mb-4"
                @changeme="saveLocal"
                :model.sync="fssp.address"
                :fias.sync="fssp.data_address"
                :options="SuggestionOptionsAddress">
        </VueSuggestionsChange>
        </div>

        <div style="margin-top: 10px">
            <h6 class="h6 mb-1">Почтовый адрес <VarToClipboard name="d_pochta_address"/><span style="color: red;cursor: pointer;font-size: 12px" @click="getPochtaAddress">Проверить</span></h6>
            <vs-input class="w-full mb-4" v-model="fssp.pochta_address" ></vs-input>
        </div>
        <div style="margin-bottom: 30px">
            <h6 class="h6 mb-1">Адрес фактический:</h6>
            <VueSuggestionsChange
                    @changeme="saveLocalFact"
                    :model.sync="fssp.address_fact"
                    :fias.sync="fssp.data_address"
                    :options="SuggestionOptionsAddress">

            </VueSuggestionsChange>
        </div>
        <h6 class="mb-1">Территория</h6>
        <vs-input class="w-full mb-4" v-model="fssp.territory_of_service"></vs-input>
        <h6 class="mb-1">Должность начальника</h6>
        <vs-input class="w-full mb-4" v-model="fssp.director_dolj"></vs-input>
        <h6 class="mb-1">ФИО начальника</h6>
        <vs-input class="w-full mb-4" v-model="fssp.director_fio"></vs-input>
        <h6 class="mb-1">Телефон начальника</h6>
        <vs-input class="w-full mb-4" v-model="fssp.director_tel"></vs-input>
        <div style="margin-top: 20px">

            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/fssp_otdels/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>
            </vs-tab>
            <vs-tab label="Адреса участка">
                <FsspOtdelsIDAdresses :fssp_id="$route.params.id" :fssp_code="fssp.fssp_code" ></FsspOtdelsIDAdresses>
            </vs-tab>

        </vs-tabs>

    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import VueSuggestionsChange from '../../components/vue-suggestions/vue-suggestionsChange.vue'
    import FsspOtdelsIDAdresses from './FsspOtdelsIDAddresses.vue'
    import vSelect from 'vue-select'
    export default {
        components: {
            VueSuggestionsChange,
            FsspOtdelsIDAdresses,
            vSelect
        },
        props:{
            fssp_id:'new',
        },
        data () {
            return {
                label:'Редактирование отдела ФССП:',
                fssp:{

                },

            }
        },
        mounted(){
         ///   console.log(this.$route)
            this.getFsspSListArr().then((response)=>{
                if (this.$route.params.id){
                    if (this.$route.params.id!='new') {
                        this.getData(this.$route.params.id);
                        this.label='Редактирование отдела ФССП:'
                    }
                    else{
                        this.label='Новый отдел ФССП'
                    }


                }

            })


        },

        computed: {
            ...mapGetters([
                'FsspSListArr','SuggestionOptionsAddress'
            ]),

        },
        methods: {
            ...mapActions([
                'saveFsspOtdel','getFsspSListArr'
            ]),
            saveLocal(){
                if(typeof this.fssp.data.address!="undefined") {
                    this.fssp.address = this.fssp.data.data_address
                } else {
                    this.fssp.address = null
                }
            },
            getPochtaAddress(){
                axios.post(r('debtors.update'), {
                    params: {
                        method: 'getPochtaAddressFirtsSettingPochta',
                        param: {
                            address:this.fssp.address,
                        }
                    }
                }).then((response) => {
                    if (response.data.result){
                        console.log(response.data.data)
                        this.fssp.pochta_address=''
                        if(typeof response.data.data.index!=='undefined')this.fssp.pochta_address+=response.data.data.index
                        if(typeof response.data.data.region!=='undefined')this.fssp.pochta_address+=' '+response.data.data.region
                        if(typeof response.data.data.area!=='undefined')this.fssp.pochta_address+=' '+response.data.data.area
                        if(typeof response.data.data.place!=='undefined')this.fssp.pochta_address+=' '+response.data.data.place
                        if(typeof response.data.data.location!=='undefined')this.fssp.pochta_address+=' '+response.data.data.location
                        if(typeof response.data.data.street!=='undefined')this.fssp.pochta_address+=' '+response.data.data.street
                        //if(typeof response.data.data.num-address-type!=='undefined')this.fssp.pochta_address+=' '+response.data.data.num-address-type
                        if(typeof response.data.data.house!=='undefined')this.fssp.pochta_address+=' д. '+response.data.data.house
                        if(typeof response.data.data.hotel!=='undefined')this.fssp.pochta_address+=' гостиница '+response.data.data.hotel
                        if(typeof response.data.data.building!=='undefined')this.fssp.pochta_address+=' корп. '+response.data.data.building
                        if(typeof response.data.data.corpus!=='undefined')this.fssp.pochta_address+=' корп. '+response.data.data.corpus
                        if(typeof response.data.data.slash!=='undefined')this.fssp.pochta_address+=' /'
                        if(typeof response.data.data.letter!=='undefined')this.fssp.pochta_address+=' '+response.data.data.letter
                        if(typeof response.data.data.room!=='undefined')this.fssp.pochta_address+=' кв.'+response.data.data.room
                        this.$vs.notify({
                        title: 'Сообщение',
                            text: 'Почтовый адрес определен',
                            color: 'success',
                            position: 'top-center'
                        });
                    } else {
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Почтовый адрес определить не удалось('+response.data.error||''+')',
                            color: 'danger',
                            position: 'top-center'
                        });

                    }

                }).catch(error => {
                    console.log(error.message)
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },

            saveLocalFact(){
                if(typeof this.fssp.data.address_fact!="undefined") {
                    this.fssp.address_fact = this.fssp.data.data_address
                } else {
                    this.fssp.address_fact = null
                }
            },
            getData(id){
                axios.get(r("fssp.index"), {
                    params: {
                        method: 'getFsspOtdel',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.fssp=response.data.data
                    }



                })
            },
            save(){
                this.fssp.id=this.$route.params.id;
                this.saveFsspOtdel(this.fssp).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/fssp_otdels/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })



            },

            close(){


            },
        },
    }
</script>
