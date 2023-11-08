<template>
    <div>
      <fieldset class="f" >
        <legend class="l">Cведения из ответов ФССП РФ:</legend>
        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">
          <div class="vx-col w-2/4  mb-2" style="border: 1px;">
            <vs-checkbox  v-model="data_cl.fssp_dsip">
              Поступление ДС по ИП</vs-checkbox>
          </div>

          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox v-model="data_cl.fssp_postds">
              Постановление о распределении ДС
            </vs-checkbox>
          </div>

          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox v-model="data_cl.fssp_postsum">
              Взыскателем не получена вся сумма денежных средств, поступивших в ФССП в рамках исполнительного производства
            </vs-checkbox>
          </div>
        </div>

        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">
          <div class="vx-col w-2/4  mb-2" style="border: 1px;">
            <vs-checkbox  v-model="data_cl.fssp_mvd" style="min-width: 20px;">
              Запрос в ГИБДД МВД России на получения сведений о зарегистрированных автомототранспортных средствах</vs-checkbox>
          </div>
          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox v-model="data_cl.fssp_transport">
              Постановление об аресте транспортного средства (транспорт)</vs-checkbox>
          </div>
        </div>

        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">
          <div class="vx-col w-2/4  mb-2" style="border: 1px;">
            <vs-checkbox  v-model="data_cl.fssp_rosreestr">
              Запрос в Росреестр (ФНС к ЕГРН)</vs-checkbox>
          </div>
          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox v-model="data_cl.fssp_nedvizh">
              Постановление об аресте недвижимого имущества</vs-checkbox>
          </div>
        </div>

        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">
          <div class="vx-col w-2/4  mb-2" style="border: 1px;">
            <vs-checkbox  v-model="data_cl.fssp_fns">
              Запрос о счетатах должника-ФЛ в ФНС</vs-checkbox>
          </div>
          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox v-model="data_cl.fssp_bank">
              Постановление об обращении взыскания на ДС должника, находящиеся в банке или иной кредитной организации (кредит)</vs-checkbox>
          </div>
        </div>

        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">
          <div class="vx-col w-2/4  mb-2" style="border: 1px;">
            <vs-checkbox  v-model="data_cl.fssp_pfr">
              Запрос в ПФР на получение сведения о заработной плате, иных выплатах и вознаграждениях застрахованного лица (ПФР)</vs-checkbox>
          </div>
          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox v-model="data_cl.fssp_zarplata">
              Постановление об обращении взыскания на заработную плату и иные доходы должника</vs-checkbox>
          </div>
        </div>

        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">
          <div class="vx-col w-2/4  mb-2" style="border: 1px;min-width: 20px;">
            <vs-checkbox  v-model="data_cl.fssp_orgnviesd">
              Постановление о временном ограничении на выезд должника из Российской Федерации</vs-checkbox>
          </div>
          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox  v-model="data_cl.fssp_strahnum">
              Запрос страхового номера индивидуального лицевого счёта</vs-checkbox>
          </div>

          <div class="vx-col w-2/4  mb-2" style="border: 1px;min-width: 20px;">
            <vs-checkbox  v-model="data_cl.fssp_zags">
              Запрос об актах гражданского состояния</vs-checkbox>
          </div>
          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox  v-model="data_cl.fssp_migr">
              Запрос в орган, которой реализует политику в области миграции</vs-checkbox>
          </div>
          <div class="vx-col w-2/4  mb-2" >
            <vs-checkbox  v-model="data_cl.fssp_reqpf">
              Запрос в пенсионный фонд</vs-checkbox>
          </div>
        </div>
      </fieldset>
    </div>
</template>

<script>
    import { mapActions,mapGetters, } from 'vuex'
    export default {
        props: {
          data_cl:{}
        },
        components: {

        },
        data () {
            return {

            }
        },
        mounted(){

        },
        computed: {
            ...mapGetters([
                'Deb','User'

            ]),
        },
        methods: {
            ...mapActions([
                'changeDeb',
            ]),
        },
    }
</script>
<style>
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
</style>
