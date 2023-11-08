<template>
    <vx-card no-shadow>
        <div style="margin-bottom: 10px; display: flex">
            <div class="vx-breadcrumb ml-4 md:block hidden" style="cursor: pointer;">
                <ul class="flex flex-wrap items-center" style="cursor: pointer;">

                    <li class="inline-flex items-center" style="cursor: pointer;" @click="close"><span class="text-primary cursor-default">   <arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" ></arrow-left-icon></span><span
                                class="breadcrumb-separator mx-2 flex items-start"><span
                                    class="feather-icon select-none relative"></span></span></li>

                </ul>
            </div>
            <vs-button style="margin-left: auto" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>
        <label style="margin-bottom: 20px; display: block;">{{label}} </label>
        <h6 class="mb-1">Код отдела ФССП</h6>
        <vs-input class="w-full mb-base" :readonly="true" v-model="fssp.fssp_number"></vs-input>
        <!--      <label style="margin-bottom: 10px">Дом (указывается конкретный дом, например 25, только один)</label>
              <vs-input
                  onkeypress="return (event.charCode === 8 || event.charCode === 0 ) ? null :
                   (event.charCode >= 47 && event.charCode <= 57)
                    || (event.charCode >= 1040 && event.charCode <= 1103)"
                  class="w-full mb-base"  v-model="fssp.hous"></vs-input>
              <label style="margin-bottom: 10px">Дома (указываются дома, допустимо: 12,23,34,45; чет 20-30; чет все; чет 20- ; нечет 20-30; нечет все; нечет 20- ; можно оставить пустым тогда вся улица)</label>
          !-->
           <!--   <vs-input
                      onkeypress="return (event.charCode === 8 || event.charCode === 0 || event.charCode === 13) ? null :
                   (event.charCode >= 44 && event.charCode <= 57)
                    || (event.charCode >= 1040 && event.charCode <= 1103)
                    || (event.charCode === 32)"
                      class="w-full mb-base" label-placeholder="Дома" v-model="fssp.house"></vs-input> !-->



        <h6 class="mb-1">Адрес <span style="color: red;cursor: pointer;font-size: 12px" @click="showData=!showData">Инфо</span></h6>
        <VueSuggestionsChange
                style="margin-bottom: 20px"
                placeholder="Адрес"
                :model.sync="fssp.address"
                :fias.sync="fssp.data_address"
                :options="SuggestionOptionsAddress">

        </VueSuggestionsChange>

        <label style="margin-bottom: 25px; margin-top: 35px">Доп. инфо заполняется автоматически </label>

        <vs-input class="w-full mb-base" disabled label-placeholder="street_fias_id" v-model="fssp.data_address.street_fias_id"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="street_kladr_id" v-model="fssp.data_address.street_kladr_id"></vs-input>

        <vs-input class="w-full mb-base" disabled label-placeholder="street_type" v-model="fssp.data_address.street_type"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="street_type_full" v-model="fssp.data_address.street_type_full"></vs-input>

        <vs-input class="w-full mb-base" disabled label-placeholder="street_with_type" v-model="fssp.data_address.street_with_type"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="region" v-model="fssp.data_address.region"></vs-input>

        <vs-input class="w-full mb-base" disabled label-placeholder="region_fias_id" v-model="fssp.data_address.region_fias_id"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="region_iso_code" v-model="fssp.data_address.region_iso_code"></vs-input>

        <vs-input class="w-full mb-base" disabled  label-placeholder="region_kladr_id" v-model="fssp.data_address.region_kladr_id"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="region_type" v-model="fssp.data_address.region_type"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="region_type_full" v-model="fssp.data_address.region_type_full"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="region_with_type" v-model="fssp.data_address.region_with_type"></vs-input>

        <div style="margin-top: 20px">

<!--            <vs-button color="primary"  class="pull-right" type="filled"  @click="$router.push('/handbook/jurisdiction/')">Закрыть</vs-button>-->

            <vs-popup class="holamundo" title="Инфо" :active.sync="showData">
                <json-viewer
                        :value="fssp.data_address"
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
            fssp_id: null,
            fssp_code:null,

        },
        data () {
            return {
                showData:false,
                p_fssp_number: null,
                data_reg:{

                },
                label:'Редактирование адреса участка:',
                fssp:{
                    id:0,
                    fssp_number: '',
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
          //  console.log(this.fssp_code)
            this.fssp.fssp_number=this.fssp_code
            this.fssp.id=this.fssp_id
            if(this.EditFsspAddress!=0){
                this.getData(this.EditFsspAddress);
                this.label='Редактирование адреса участка:'
            }
            else{
                this.label='Новый адрес'
               /*
                this.getJudicialNumberById(this.fssp_id).then((response) => {
                    console.log(this.fssp_id)
                    if (response.result){
                        // console.log(response.fssp_number)
                        this.fssp.fssp_number = response.fssp_number;
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
                */
            }


        },

        computed: {
            ...mapGetters([
               'User','ShowTabFsspAddress','EditFsspAddress','SuggestionOptionsAddress'
            ]),

        },
        methods: {
            close(){

                this.setShowTabFsspAddress(false);
              //  this.$emit('reload');
            },
            ...mapMutations([
                'setShowTabFsspAddress','setEditFsspAddress'



            ]),
            ...mapActions([
                'saveFsspOtdelsAddress','getDataFsspOtdelsAddressArr'
           //     'saveJurisdiction', 'getJudicialNumberById','getDataJurisdictionsByJudicial'
            ]),
            getData(id){
                axios.get(r("fsspOtdelsAddress.index"), {
                    params: {
                        method: 'getFsspOtdelsAddress',
                        param: id

                    }
                }).then((response) => {
                    console.log(response)
                    if (response.data.result){
                            this.fssp=response.data.data;
                            if(typeof this.fssp.data_address=='undefined'){
                                this.fssp.data_address={}
                            }
                            if(this.fssp.data_address==null){
                                this.fssp.data_address={}
                            }
                            this.fssp.data_address.street_fias_id=this.fssp.street_fias_id
                            this.fssp.data_address.street_kladr_id=this.fssp.street_kladr_id
                            this.fssp.data_address.street_type=this.fssp.street_type
                            this.fssp.data_address.street_type_full=this.fssp.street_type_full
                            this.fssp.data_address.street_with_type=this.fssp.street_with_type
                            this.fssp.data_address.region=this.fssp.region
                            this.fssp.data_address.region_fias_id=this.fssp.region_fias_id
                            this.fssp.data_address.region_iso_code=this.fssp.region_iso_code
                            this.fssp.data_address.region_kladr_id=this.fssp.region_kladr_id
                            this.fssp.data_address.region_type=this.fssp.region_type
                            this.fssp.data_address.region_type_full=this.fssp.region_type_full
                            this.fssp.data_address.region_with_type=this.fssp.region_with_type

                    }



                })
            },
            save(){

             //   this.data_reg.id=this.EditJud;

                this.saveFsspOtdelsAddress(this.fssp).then((response) => {
                    this.getDataFsspOtdelsAddressArr(this.fssp_code);
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                       // this.$router.push('/handbook/jurisdiction/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })
                this.setShowTabFsspAddress(false)
                this.setEditFsspAddress(0)


            },


        },
    }
</script>
