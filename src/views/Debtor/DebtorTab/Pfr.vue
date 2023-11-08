<template>
  <vx-card no-shadow>
    <div class="vx-row" style="padding-top: 20px">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <template v-if="typeof Deb.debtorCredit.id!='undefined'">
          <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
        </template>
        <div class="vx-row" style="padding-top: 20px">
          <div class="vx-col sm:w-1/2 mb-2">
            <h6 class="h6">Особые пометки:<VarToClipboard name="dc_comment"/></h6>
            <vs-textarea class="w-100"  v-model="Deb.debtorCredit.comment" @change="changeDeb"> </vs-textarea>
            <h6 class="h6">Взыскатель:</h6>
            <vs-input class="w-100" readonly v-model="Deb.recover.name"> </vs-input>
            <h6 class="h6">Цедент:</h6>
            <vs-input class="w-100 "  v-model="Deb.recover.namePerv"></vs-input>
            <h6 class="h6">№ Договор цессии:<VarToClipboard name="dc_id_recover"/></h6>
            <v-select  class="w-50 " :reduce="label => label.id" label="number" :options="RecoverersArrDogov"  v-model="Deb.debtorCredit.id_recover" @change="changeDeb"></v-select>
            <h6 class="h6">Дата договора цессии:<VarToClipboard name="rec_date"/></h6>
            <vs-input type="date" class="w-100" v-model="RecoverDateCession"></vs-input>
            <h6 class="h6">Фамилия:<VarToClipboard name="d_name_family"/></h6>
            <vs-input class="w-100 "  v-model="Deb.debtor.name_family" @change="changeDeb"></vs-input>
            <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
            <vs-input class="w-100 "  v-model="Deb.debtor.name_family_last" @change="changeDeb"></vs-input>
            <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
            <vs-input class="w-100 " v-model="Deb.debtor.name" @change="changeDeb"></vs-input>
            <h6 class="h6">Отчество:<VarToClipboard name="d_name_patronymic"/></h6>
            <vs-input class="w-100 "  v-model="Deb.debtor.name_patronymic" @change="changeDeb"></vs-input>
            <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
            <vs-input type="date" class="w-100 " v-model="Deb.debtor.birthdate" @blur="changeDeb"></vs-input>
            <h6 class="h6" style="margin-top: 15px">Номер договора займа:<VarToClipboard name="dc_number_dog"/></h6>
            <vs-input class="w-100"  v-model="Deb.debtorCredit.number_dog" @change="changeDeb"></vs-input>
            <h6 class="h6">Дата договора займа:<VarToClipboard name="dc_date_dog"/></h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_dog" @blur="changeDeb"></vs-input>
          </div>
          <div class="vx-col sm:w-1/2 mb-2">
            <h6 class="h6" >№ ИД:<VarToClipboard name="dc_number_sa"/></h6>
            <vs-input class="w-100"  v-model="Deb.debtorCredit.number_sa" @change="changeDeb"></vs-input>
            <h6 class="h6">Дата ИД:<VarToClipboard name="dc_date_sa"/></h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa" @blur="changeDeb"></vs-input>
            <h6 class="h6">ПФР адрес:</h6>
            <vs-textarea class="w-full " disabled  v-model="pfr"></vs-textarea>
            <h6 class="h6">Дата заявления в ПФР:<VarToClipboard name="dc_date_pfr"/></h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_pfr" @blur="changeDeb"></vs-input>
            <h6 class="h6" >ШПИ отправка ПФР:<VarToClipboard name="dc_shpi_pfr"/></h6>
            <vs-input class="w-100"  v-model="Deb.debtorCredit.shpi_pfr" @change="changeDeb"></vs-input>
            <h6 class="h6">Дата получения ИД ПФР:<VarToClipboard name="dc_date_shpi_pfr"/></h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_shpi_pfr" @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата отзыв ПФР:<VarToClipboard name="dc_date_return_pfr"/></h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_pfr" @blur="changeDeb"></vs-input>
            <h6 class="h6">Мин.размер пенсии для региона:<VarToClipboard name="min_pensioner_pay"/></h6>
            <vs-input type="number" class="w-100 " disabled v-model="min_sum_pens"></vs-input>
          </div>
        </div>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
<!--        <ControlSends :perem="'pfr'"></ControlSends>-->
        <DateControls :perem="'pfr'" :ref="'comp_date_controls'"></DateControls>
      </div>
    </div>


  </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
    import Status from '../../../components/Status.vue'
    import ControlSends from "./Render/ControlSends.vue";
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from "../../../axios";
    import r from "../../../route";
    import VarToClipboard from './../../VarToClipboard.vue'
    import DateControls from "./Render/DateControls.vue";
    export default {
        components: {
          Status,vSelect,ControlSends,VarToClipboard,DateControls
        },


        data () {
            return {
              popupChangeRecover: false,
              rec_id: 0,
            }
        },
        mounted(){
          this.getDataReestrsAndCessionDogov()

        },

        asyncComputed: {
          async pfr() {
            //   console.log(this.debtor.data_reg.region_kladr_id)
            if(this.Deb.debtor.data_reg!=null){
              if(this.Deb.debtor.data_reg.region_kladr_id!=null && this.Deb.debtor.data_reg.region_kladr_id!=''){
                const res = await  axios.get(r("pfr.index"), {
                  params: {
                    method: 'getPfrByKladrId',
                    param: this.Deb.debtor.data_reg.region_kladr_id
                  }
                })
                //    console.log(res.data);
                if(res.data.result){
                  return res.data.data.address;
                }
                else{
                  return ''
                }

              }
              else{
                return ''
              }
            }


          },
          async min_sum_pens() {
            //   console.log(this.debtor.data_reg.region_kladr_id)
            if(this.Deb.debtor.data_reg!=null){
              if(this.Deb.debtor.data_reg.region_kladr_id!=null && this.Deb.debtor.data_reg.region_kladr_id!=''){
                const res = await  axios.get(r("minPension.index"), {
                  params: {
                    method: 'getMinSumByKladrId',
                    param: this.Deb.debtor.data_reg.region_kladr_id
                  }
                })
                //    console.log(res.data);
                if(res.data.result){
                  return res.data.sum;
                }
                else{
                  return ''
                }

              }
              else{
                return ''
              }
            }


          },
        },
        computed: {


            ...mapGetters([
                'User','Deb','RecoverersArrDogov','RecoverDateCession'

            ]),


        },
        methods: {



          ...mapActions([
              'changeDeb',
              'getDataReestrsAndCessionDogov'
          ]),



        },
    }
</script>

<style lang="scss">
    .address-component {
        flex: 1 1 auto;
        width: 1%;

    input {
        height: auto;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

    &:focus {
         color: #495057;
         background-color: #fff;
         border-color: #80bdff;
         outline: 0;
         box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
     }
    }
    }
</style>
