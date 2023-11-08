<template>
    <vx-card class="juridictionID" no-shadow>
        <div style="margin-bottom: 10px; display: flex">
            <div class="vx-breadcrumb md:block hidden" style="cursor: pointer;">
                <ul class="flex flex-wrap items-center" style="cursor: pointer;">
                    <li class="inline-flex items-center" style="cursor: pointer;" @click="close">
                        <span class="text-primary cursor-default">
                            <arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" ></arrow-left-icon>
                        </span>
                        <span class="breadcrumb-separator mx-2 flex items-start"><span class="feather-icon select-none relative"></span></span>
                    </li>
                </ul>
            </div>
            <vs-button style="margin-left: auto" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>

        <label style="margin-bottom: 10px">{{label}} </label>
        <br>
        <br>

        <div class="centerx">
            <vs-tooltip text="Номер судебного участка" position="top" >
                <h6 class="h6 mb-1">Номер суд. участка</h6>
            </vs-tooltip>
        </div>
        <vs-input class="w-full mb-4" v-model="judi.jud_number"></vs-input>

        <div class="centerx">
            <vs-tooltip text="Указывается конкретный дом, например 25, только один" position="top" >
                <h6 class="h6 mb-1">Дом</h6>
            </vs-tooltip>
        </div>
        <vs-input
            onkeypress="return (event.charCode === 8 || event.charCode === 0 ) ? null :
             (event.charCode >= 47 && event.charCode <= 57)
              || (event.charCode >= 1040 && event.charCode <= 1103)"
            class="w-full mb-4"  v-model="judi.hous">
        </vs-input>

        <div class="centerx">
            <vs-tooltip text="Указываются дома, допустимо: 12,23,34,45; чет 20-30; чет все; чет 20- ; нечет 20-30; нечет все; нечет 20- ; можно оставить пустым тогда вся улица" position="top" >
                <h6 class="h6 mb-1">Дома</h6>
            </vs-tooltip>
        </div>
        <vs-input
                onkeypress="return (event.charCode === 8 || event.charCode === 0 || event.charCode === 13) ? null :
                (event.charCode >= 44 && event.charCode <= 57)
                || (event.charCode >= 1040 && event.charCode <= 1103)
                || (event.charCode === 32)"
                class="w-full mb-4"
                v-model="judi.house">
        </vs-input>


        <div class="centerx">
            <vs-tooltip text="Адрес" position="top" >
                <h6 class="h6 mb-1">Адрес <span style="color: red;cursor: pointer;font-size: 12px" @click="showData=!showData">Инфо</span></h6>
            </vs-tooltip>
        </div>
        <VueSuggestionsChange
                style="margin-bottom: 20px"
                :model.sync="judi.address"
                :fias.sync="judi.data_address"
                :options="SuggestionOptionsAddress">

        </VueSuggestionsChange>

        <div class="centerx">
            <vs-tooltip text="Указываются дома, 1,3,6" position="top" >
                <h6 class="h6 mb-1">Дома Исключения</h6>
            </vs-tooltip>
        </div>
        <vs-input
                onkeypress="return (event.charCode === 8 || event.charCode === 0 || event.charCode === 13) ? null :
             (event.charCode >= 44 && event.charCode <= 57)
              || (event.charCode >= 1040 && event.charCode <= 1103)
              || (event.charCode === 32)"
                class="w-full mb-4" v-model="judi.house_not">
        </vs-input>

        <div class="centerx">
            <vs-tooltip text="Улица Исключения" position="top" >
                <h6 class="h6 mb-1">Улица Исключения</h6>
            </vs-tooltip>
        </div>
        <VueSuggestionsChange
                style="margin-bottom: 10px"
                :model.sync="judi.street_not_suggest"
                :fias.sync="judi.street_not_data"
                :options="suggestionOptionsStreetNot">
        </VueSuggestionsChange>

        <vs-input class="w-full mb-4" disabled label-placeholder="street_not" v-model="judi.street_not"></vs-input>

        <label style="margin-bottom: 35px; margin-top: 35px">Доп. инфо заполняется автоматически </label>
        <br>
        <br>
        <h6 class="mb-1">settlement_kladr_id</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.settlement_kladr_id"></vs-input>
        <h6 class="mb-1">street_fias_id</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.street_fias_id"></vs-input>
        <h6 class="mb-1">street_kladr_id</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.street_kladr_id"></vs-input>

        <h6 class="mb-1">street_type</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.street_type"></vs-input>
        <h6 class="mb-1">street_type_full</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.street_type_full"></vs-input>

        <h6 class="mb-1">street_with_type</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.street_with_type"></vs-input>
        <h6 class="mb-1">region</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.region"></vs-input>

        <h6 class="mb-1">region_fias_id</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.region_fias_id"></vs-input>
        <h6 class="mb-1">region_iso_code</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.region_iso_code"></vs-input>

        <h6 class="mb-1">region_kladr_id</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.region_kladr_id"></vs-input>
        <h6 class="mb-1">region_type</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.region_type"></vs-input>
        <h6 class="mb-1">region_type_full</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.region_type_full"></vs-input>
        <h6 class="mb-1">region_with_type</h6>
        <vs-input class="w-full mb-4" disabled v-model="judi.data_address.region_with_type"></vs-input>

        <div style="margin-top: 20px">

<!--            <vs-button color="primary"  class="pull-right" type="filled"  @click="$router.push('/handbook/jurisdiction/')">Закрыть</vs-button>-->

            <vs-popup class="holamundo" title="Инфо" :active.sync="showData">
                <json-viewer
                        :value="judi.data_address"
                        :expand-depth=5
                        copyable

                        sort></json-viewer>

            </vs-popup>

        </div>


    </vx-card>
</template>

<script>
    import VueSuggestions from 'vue-suggestions';
    import VueSuggestionsChange from '../../components/vue-suggestions/vue-suggestionsChange.vue'
    import r from '../../route';
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import Back from '../../components/Back.vue'
    import JsonViewer from 'vue-json-viewer'
    export default {
        components: { VueSuggestions, Back,ArrowLeftIcon,JsonViewer,VueSuggestionsChange
        },
        props: {
            name_judicial: '',
            jud_id:0,

        },
        data () {
            return {
                showData:false,
                p_jud_number: null,
                data_reg:{

                },
                label:'Редактирование адреса участка:',
                judi:{
                    jud_number: '',
                    data_address:{
                        street_fias_id:'',
                        street_kladr_id:'',
                        street_type:'',
                        street_type_full:'',
                        street_with_type:'',
                        region:'',
                        region_fias_id:'',
                        region_iso_code:'',
                        region_kladr_id:'',
                        region_type:'',
                        region_type_full:'',
                        region_with_type:'',
                    },
                    street_not:'',
                    street_not_data: {}
                },

            }
        },
        mounted(){
            ///   console.log(this.$route)
            if(this.EditJud!=0){
                this.getData(this.EditJud);
                this.label='Редактирование адреса участка:'
            }
            else{
                this.label='Новый адрес'
                this.getJudicialNumberById(this.jud_id).then((response) => {
                    if (response.result){
                        // console.log(response.jud_number)
                        this.judi.jud_number = response.jud_number;
                    }
                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            }


        },

        computed: {
            ...mapGetters([
               'User','ShowTabJud','EditJud','SuggestionOptionsAddress'
            ]),

        },
        methods: {
            close(){
                this.setShowTabJud(false);
                if(typeof this.jud_id==='undefined'){
                    this.$router.back()
                }
                else {
                    this.$emit('reload');
                }

            },
            ...mapMutations([
                'setShowTabJud','setEditJud'



            ]),
            ...mapActions([
                'saveJurisdiction', 'getJudicialNumberById','getDataJurisdictionsByJudicial'
            ]),
            getData(id){
                axios.get(r("jurisdiction.index"), {
                    params: {
                        method: 'getJurisdiction',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                            this.judi=response.data.data;
                            if(typeof this.judi.data_address=='undefined'){
                                this.judi.data_address={}
                            }
                            if(this.judi.data_address==null){
                                this.judi.data_address={}
                            }
                            this.judi.data_address.street_fias_id=this.judi.street_fias_id
                            this.judi.data_address.street_kladr_id=this.judi.street_kladr_id
                            this.judi.data_address.street_type=this.judi.street_type
                            this.judi.data_address.street_type_full=this.judi.street_type_full
                            this.judi.data_address.street_with_type=this.judi.street_with_type
                            this.judi.data_address.region=this.judi.region
                            this.judi.data_address.region_fias_id=this.judi.region_fias_id
                            this.judi.data_address.region_iso_code=this.judi.region_iso_code
                            this.judi.data_address.region_kladr_id=this.judi.region_kladr_id
                            this.judi.data_address.region_type=this.judi.region_type
                            this.judi.data_address.region_type_full=this.judi.region_type_full
                            this.judi.data_address.region_with_type=this.judi.region_with_type

                    }



                })
            },
            save(){

                this.data_reg.id=this.EditJud;

                this.saveJurisdiction(this.judi).then((response) => {
                    this.getDataJurisdictionsByJudicial({jud_id: this.jud_id});
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                       // this.$router.push('/handbook/jurisdiction/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })
                this.setShowTabJud(false);
                this.setEditJud(0)
                this.$emit('reload');


            },


        },
    }
</script>
<style>
    .vx-card.juridictionID .vx-card__collapsible-content .vx-card__body {
        padding: 0!important;
    }
</style>