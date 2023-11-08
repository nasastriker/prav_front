<template>
    <div>
      <vs-tabs>
        <vs-tab label="Настройки">
          <div style="margin-bottom: 10px; display: flex">
            <vs-button style="margin-left: auto" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
          </div>
          <div class="vx-row" style="padding-top: 5px">
            <div class="vx-col sm:w-1/2 w-full mb-3">

              <fieldset class="f">
                <legend class="l">Статусы:</legend>
                <label class="text-sm"><span title="Статус с которого попадут заемщики в задачу">Статус:</span>  <VarToClipboard name="id_status"/></label>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="data.id_status"   ></v-select>
                <label class="text-sm"><span title="Дополнительный статус для выбора заемщиков для задачи">Статус доп.</span>:  <VarToClipboard name="id_status_dop"/></label>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="data.id_status_dop"   ></v-select>

                <label class="text-sm"><span title="После выполнения задачи статус измениться на выбранный, если пусто то измениться на стандартный статус">Изменить на статус</span>:  <VarToClipboard name="id_status_change"/></label>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="data.id_status_change"   ></v-select>
              </fieldset>
              <fieldset class="f">
                <legend class="l">Настройки почты:</legend>
                <label style="margin-bottom: 10px">Вид отправления:  <VarToClipboard name="pochta"/></label>
                <v-select  class="w-50 " :reduce="label => label.type" label="name" :options="pochta"  v-model="data.pochta"  ></v-select>
              </fieldset>

            </div>
            <div class="vx-col sm:w-1/2 w-full mb-3">
              <fieldset class="f">
                <legend class="l">Государственная пошлина:</legend>
                <label style="margin-bottom: 10px">Сформировать ГП  <VarToClipboard name="gp_pay"/></label>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GpPay"  v-model="data.gp_pay"   ></v-select>
                <label style="margin-bottom: 10px"><span title="Будет сформирован запрос на Оригинал ПП ">Формировать запрос оригиналов ГП</span><VarToClipboard name="gp_zapros"/></label>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GpTwo"  v-model="data.gp_zapros"   ></v-select>
                <label style="margin-bottom: 10px"><span title="В платежки стоит галочка что оригинал ПП получен">Проверка наличия оригинала ПП</span><VarToClipboard name="gp_origin_pay"/></label>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GpTwo"  v-model="data.gp_origin_pay"   ></v-select>
                <label style="margin-bottom: 10px"><span title="В платежки стоит галочка что она оплачена">Проверка ГП оплачена</span><VarToClipboard name="gp_is_pay"/></label>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GpTwo"  v-model="data.gp_is_pay"   ></v-select>

              </fieldset>

            </div>
          </div>



          <label style="margin-bottom: 10px;">Универсальный шаблон обращения:<VarToClipboard name="id_shab"/></label>
          <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab"  ></v-select>
          <label class="text-sm">Приоритет индивидуального шаблона :<VarToClipboard name="shab_priority"/></label>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shab_priority"   ></v-select>
          <label class="text-sm"><span >Канал отправки :</span> <VarToClipboard name="channel"/></label>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.channel"   ></v-select>

          <label class="text-sm">Отправка через ГАС если возможно :<VarToClipboard name="send_gas"/></label>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.send_gas"   ></v-select>
          <template v-if="data.send_gas===1">
            <label style="margin-bottom: 10px;">Шаблон обращения через Гас:<VarToClipboard name="id_shab_gas"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab_gas"  ></v-select>
          </template>
          <label style="margin-bottom: 10px">Количество заемщиков в одном архиве <VarToClipboard name="count_arch"/> </label>
          <vs-input type="number" class="w-full " v-model="data.count_arch"></vs-input>

          <div class="vx-row" style="padding-top: 15px">
            <div class="vx-col mb-2">
              <vs-checkbox v-model="data.active" >Активна</vs-checkbox>
            </div>
          </div>

        </vs-tab>
        <vs-tab label="Уведомления">
          <div style="margin-bottom: 10px; display: flex">
            <vs-button style="margin-left: auto" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
          </div>
          <template v-if="id==4||id==5">
            <label class="text-sm">Проверка наличия ШПИ о покупки :<VarToClipboard name="shpi_buy"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shpi_buy"   ></v-select>
          </template>
          <template v-if="id==5">
            <label style="margin-bottom: 10px;margin-top: 30px">Шаблон уведомления ИСК:<VarToClipboard name="id_shab_uved_isk"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab_uved_isk"  ></v-select>
            <label style="margin-bottom: 10px">Вид отправления:  <VarToClipboard name="uved_isk_pochta"/></label>
            <v-select  class="w-50 " :reduce="label => label.type" label="name" :options="pochta"  v-model="data.uved_isk_pochta"  ></v-select>
            <label class="text-sm">Канал отправки : <VarToClipboard name="uved_isk_channel"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.uved_isk_channel"   ></v-select>
            <label class="text-sm">Проверка наличия ШПИ ИСК : <VarToClipboard name="shpi_isk"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shpi_isk"   ></v-select>
          </template>
          <template v-if="id==10">
            <label style="margin-bottom: 10px;">Шаблон уведомления Правприемство: <VarToClipboard name="id_shab_uved_pravo"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab_uved_pravo"  ></v-select>
            <label style="margin-bottom: 10px">Вид отправления: <VarToClipboard name="uved_pravo_pochta"/> </label>
            <v-select  class="w-50 " :reduce="label => label.type" label="name" :options="pochta"  v-model="data.uved_pravo_pochta"  ></v-select>
            <label class="text-sm">Канал отправки :<VarToClipboard name="uved_pravo_channel"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.uved_pravo_channel"   ></v-select>
            <label class="text-sm">Проверка наличия ШПИ Правприемство :<VarToClipboard name="shpi_pravo"/></label>
            <v-select style="margin-bottom: 25px;"  class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shpi_pravo"   ></v-select>
            <label style="margin-bottom: 10px;margin-top: 30px">Шаблон уведомления Цедент:<VarToClipboard name="id_shab_uved_cedent"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab_uved_cedent"  ></v-select>
            <label style="margin-bottom: 10px">Вид отправления: <VarToClipboard name="uved_cedent_pochta"/> </label>
            <v-select  class="w-50 " :reduce="label => label.type" label="name" :options="pochta"  v-model="data.uved_cedent_pochta"  ></v-select>
            <label class="text-sm">Канал отправки :<VarToClipboard name="uved_cedent_channel"/> </label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.uved_cedent_channel"   ></v-select>
            <label class="text-sm">Проверка наличия ШПИ Цедент :<VarToClipboard name="shpi_cedent"/></label>
            <v-select style="margin-bottom: 25px;" class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shpi_cedent"   ></v-select>
            <label style="margin-bottom: 10px;margin-top: 30px">Шаблон уведомления ОСП:<VarToClipboard name="id_shab_uved_osp"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab_uved_osp"  ></v-select>
            <label style="margin-bottom: 10px">Вид отправления: <VarToClipboard name="uved_osp_pochta"/> </label>
            <v-select  class="w-50 " :reduce="label => label.type" label="name" :options="pochta"  v-model="data.uved_osp_pochta"  ></v-select>
            <label class="text-sm">Канал отправки :<VarToClipboard name="uved_osp_channel"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.uved_osp_channel"   ></v-select>
            <label class="text-sm">Проверка наличия ШПИ ОСП :<VarToClipboard name="shpi_osp"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shpi_osp"   ></v-select>
          </template>
          <template v-if="id==11">
            <label style="margin-bottom: 10px;">Шаблон уведомления АУ:<VarToClipboard name="id_shab_uved_au"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab_uved_au"  ></v-select>
            <label style="margin-bottom: 10px">Вид отправления:  <VarToClipboard name="uved_au_pochta"/></label>
            <v-select  class="w-50 " :reduce="label => label.type" label="name" :options="pochta"  v-model="data.uved_au_pochta"  ></v-select>
            <label class="text-sm">Канал отправки :<VarToClipboard name="uved_au_channel"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.uved_au_channel"   ></v-select>
            <label class="text-sm">Проверка наличия ШПИ АУ :<VarToClipboard name="shpi_ay"/></label>
            <v-select style="margin-bottom: 25px;" class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shpi_ay"   ></v-select>
            <label style="margin-bottom: 10px;margin-top: 30px">Шаблон уведомления Банкрот:<VarToClipboard name="id_shab_uved_bankrot"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab_uved_bankrot"  ></v-select>
            <label style="margin-bottom: 10px">Вид отправления: <VarToClipboard name="uved_bankrot_pochta"/> </label>
            <v-select  class="w-50 " :reduce="label => label.type" label="name" :options="pochta"  v-model="data.uved_bankrot_pochta"  ></v-select>
            <label class="text-sm">Канал отправки :<VarToClipboard name="uved_bankrot_channel"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.uved_bankrot_channel"   ></v-select>
            <label class="text-sm">Проверка наличия ШПИ Банкрот :<VarToClipboard name="shpi_bankrot"/></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shpi_bankrot"   ></v-select>
          </template>
          <div style="margin-top: 150px">

          </div>


        </vs-tab>
        <vs-tab label="Контроль">
          <DateControls></DateControls>
        </vs-tab>
        <vs-tab label="Планировщик">
          <StadShed :id="id"></StadShed>
        </vs-tab>
        <vs-tab label="История">
          <SettingStadIDHistory :id="id"></SettingStadIDHistory>
        </vs-tab>

      </vs-tabs>
    </div>
</template>

<script>
    import r from '@/route';
    import axios from '@/axios'
    import DateControls from '../DateControls/DateControls.vue';
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import Back from '../../components/Back.vue'
    import SettingStadIDHistory from './SettingStadIDHistory'
    import StadShed from './StadShed'
    import Conditions from '../conditionComponents/Conditions.vue'
    export default {
        components: {
          Back,
          DateControls,
          StadShed,
          ArrowLeftIcon,
          Conditions,
          SettingStadIDHistory
        },
        props: {
            id:0,
        },
        data () {
            return {
                pochta:[

                ],
                channels:[
                  {
                    id:0,
                    name:'Выгрузка на печать'
                  },
                  {
                    id:1,
                    name:'Почта онлайн'
                  },
               ],
              GpTwo:[
                {
                  id:0,
                  name:'Нет'
                },
                {
                  id:1,
                  name:'Да'
                },

              ],
              GpPay:[
                {
                  id:0,
                  name:'Нет'
                },
                {
                  id:1,
                  name:'50 %'
                },
                {
                  id:2,
                  name:'100%'
                }
              ],
                optPol:[
                  {
                    id:0,
                    name:'50%'
                  },
                  {
                    id:1,
                    name:'100%'
                  }
                ],
                opt:[
                    {
                        id:0,
                        name:'нет'
                    },
                    {
                        id:1,
                        name:'Да'
                    }
                ],
                typeFieldInput:'1',
                data:{
                    usl:0,
                    gp:0,
                    pochta:'SIMPLE',
                    gp_sum:0,
                    uved_debtor:0,
                    shab_priority:0,
                    flagReestr:0,
                    id_reestr:0,
                    id_recover:null,
                    limit_count:0,
                },


            }
        },
        mounted(){
            this.getDataStatuss()

            this.getData();
            this.getSetting();

        },

        computed: {
            ShablonDocumentsArrLocal(){
                if(this.data.id_recover==-1){
                    let arr=[];
                    let index;
                    for (index = 0; index < this.ShablonDocumentsArr.length; ++index) {
                        if(this.ShablonDocumentsArr[index].id_recover==this.data.id_recover){
                            arr.push(this.ShablonDocumentsArr[index]);
                        }

                    }

                    return arr

                }else{
                    return this.ShablonDocumentsArr
                }
            },
            ...mapGetters([
               'User','ShablonDocumentsArr','AtrDebtorCredits','AtrDebtorCreditsTotal','StatussArr','Stad'
            ]),

        },
        methods: {



            ...mapMutations([




            ]),
            ...mapActions([
               'getDataAtrDebtorCredits','getDataShablonDocuments','getDataStatuss'
            ]),
            getData(){
                axios.get(r("settingStad.index"), {
                    params: {
                        method: 'getSettingStad',
                        param: this.id

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.data=response.data.data;
                    }



                })
            },
            getSetting(){
                axios.get(r("settingStad.index"), {
                    params: {
                        method: 'getSetting',
                        param: ''

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.pochta=response.data.pochta;
                        this.channels=response.data.channels;
                    }



                })
            },
            save(){



                this.data.id=this.id
                axios.post(r("settingStad.update"), {
                    params: {
                        method: 'saveSettingStad',
                        param: this.data
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })

                    }else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }



                })





            },


        },
    }
</script>
