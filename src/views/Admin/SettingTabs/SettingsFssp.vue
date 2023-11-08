<template>
    <div>
      <div class="vx-row" style="padding-top: 5px">
        <div class="vx-col sm:w-1/2 w-full mb-2">

<!--          <vs-tabs alignment="fixed" color="danger" style="margin-top: 20px;">-->
<!--            <vs-tab label="Постановления ФССП">-->
            <h2 style="margin-top: 20px;">Постановления ФССП</h2>
      <vs-checkbox v-model="SettingsFssp.claim_date_sa" style="margin-top: 30px;">Проверка на "описку в дате ИД" в Постановлениях ФССП</vs-checkbox>
      <div class="sud_work_set_one">
        <span><b>Если включено:</b> будет производиться проверка на описку в дате ИД в Постановлениях ФССП, в случае описки будет отправлена жалоба</span>
      </div>
      <vs-checkbox v-model="SettingsFssp.claim_sum_isp_sbor" style="margin-top: 30px;">Проверка на "несоответствие суммы исп.сбора" и "очередность гашения ИС" в Постановлениях ФССП</vs-checkbox>
      <div class="sud_work_set_one">
        <span><b>Если включено:</b> будет производиться проверка на несоответствие суммы исп.сбора и на нарушение очередности гашения ИС в Постановлениях ФССП, в случае несоответствия будет отправлена жалоба</span>
      </div>
      <vs-checkbox v-model="SettingsFssp.check_opiska_name_org" style="margin-top: 30px;">Проверка на описку в наименовании организации в Постановлениях ФССП</vs-checkbox>
      <div class="sud_work_set_one">
        <span><b>Если включено:</b> будет производиться проверка на описку в наименовании организации в Постановлениях ФССП, в случае описки будет отправлена жалоба</span>
      </div>
          <vs-checkbox v-model="SettingsFssp.check_send_post_debtor" style="margin-top: 30px;">Проверка на направление постановления должнику и в различные инстанции</vs-checkbox>
          <div class="sud_work_set_one">
            <span><b>Если включено:</b> будет производиться проверка на направление постановления должнику и в различные инстанции, в случае ненаправления будет отправлена жалоба</span>
          </div>
      <vs-checkbox v-model="SettingsFssp.not_claim_priost" style="margin-top: 30px;">Не обжаловать Приостановления</vs-checkbox>
      <div class="sud_work_set_one">
        <span><b>Если включено:</b> жалобы по Постановлениям о Приостановлении отправляться не будут</span>
      </div>
      <vs-checkbox v-model="SettingsFssp.check_death_and_battle" style="margin-top: 30px;">Проверка на фразы смерть (смерти) должника</vs-checkbox>
          <vs-checkbox v-if="SettingsFssp.check_death_and_battle == 1" v-model="SettingsFssp.check_death_zapros" style="margin-top: 10px;">Отправить запрос на получение справки</vs-checkbox>
          <vs-checkbox v-else disabled v-model="SettingsFssp.check_death_zapros" style="margin-top: 10px;">Отправить запрос на получение справки</vs-checkbox>
          <div class="sud_work_set_one">
        <span><b>Если включено:</b> будет производиться поиск фразы "смерть/смерти должника" в Постановлениях о Приостановлении.
        Если галка Отправить запрос на получение справки <b>не включена</b>, то будет сразу переход на статус Умерший. Если <b>включена</b>, то сначала будет отправлен запрос СПИ
          на получение справки, и после ее проверки, если подтверждено, то будет переключен на статус Умерший.
        </span>
      </div>
      <vs-checkbox v-model="SettingsFssp.check_army" style="margin-top: 30px;">Проверка на фразы проходящего военную службу по призыву и участия должника в боевых действиях</vs-checkbox>
          <vs-checkbox v-if="SettingsFssp.check_army == 1" v-model="SettingsFssp.check_army_zapros" style="margin-top: 10px;">Отправить запрос на получение справки</vs-checkbox>
          <vs-checkbox v-else disabled v-model="SettingsFssp.check_army_zapros" style="margin-top: 10px;">Отправить запрос на получение справки</vs-checkbox>
          <div style="margin-top: 10px">При нахождении фразы переводить на статус: </div>
          <v-select v-if="SettingsFssp.check_army == 1" class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr" v-model="SettingsFssp.check_army_id_status"></v-select>
          <v-select v-else disabled class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr" v-model="SettingsFssp.check_army_id_status"></v-select>
          <div class="sud_work_set_one">
        <span><b>Если включено:</b> будет производиться поиск фраз "проходящего военную службу по призыву" и "участия должника в боевых действиях" в Постановлениях о Приостановлении.
        Если галка Отправить запрос на получение справки <b>не включена</b>, то будет сразу переход на выбранный статус. Если <b>включена</b>, то сначала будет отправлен запрос СПИ
          на получение справки, и после ее проверки, если подтверждено, то будет переключен статус.
        </span>
      </div>
          <h6 class="h6" style="margin-top: 20px;">Количество дней до отправки Жалобы постановлений:</h6>
          <vs-input v-model="SettingsFssp.count_days_claim_post_send" @keypress="validateNumberInt"></vs-input>
          <div class="sud_work_set_one">
            <span>Жалоба постановлений будет отправлена не ранее данного количества дней с даты постановления</span>
          </div>
          <vs-checkbox v-model="SettingsFssp.check_srok_claim_post" style="margin-top: 30px;">Проверять срок подачи жалобы постановлений</vs-checkbox>
          <h6 class="h6" style="margin-top: 10px;">Срок подачи Жалобы постановлений:</h6>
          <vs-input v-if="SettingsFssp.check_srok_claim_post == 1" v-model="SettingsFssp.count_days_claim_post_srok" @keypress="validateNumberInt"></vs-input>
          <vs-input v-else disabled v-model="SettingsFssp.count_days_claim_post_srok"></vs-input>
          <div class="sud_work_set_one">
            <span><b>Если включено:</b> будет производится проверка срока возможности подачи жалобы постановлений:
              если количество дней с даты постановления более указаного выше - жалоба будет отменена</span>
          </div>
<!--            </vs-tab>-->
<!--          </vs-tabs>-->

<!--          <vs-tabs alignment="fixed" color="danger" style="margin-top: 30px;">-->
<!--            <vs-tab label="Жалоба чек-листов">-->
          <h2 style="margin-top: 30px;">Жалоба чек-листов</h2>
              <vs-checkbox v-model="SettingsFssp.no_claim_cl" style="margin-top: 20px;">Не отправлять жалобы чек-листов</vs-checkbox>
              <div class="sud_work_set_one">
                <span><b>Если включено:</b> жалобы по Чек-листам отправляться не будут</span>
              </div>

<!--              <vs-checkbox v-if="SettingsFssp.no_claim_cl == 0" v-model="SettingsFssp.no_pays_claim_cl" style="margin-top: 20px;">Не обжаловать платежи в жалобе чек-листов</vs-checkbox>-->
<!--              <vs-checkbox v-else disabled v-model="SettingsFssp.no_pays_claim_cl" style="margin-top: 20px;">Не обжаловать платежи в жалобе чек-листов</vs-checkbox>-->
<!--              <div class="sud_work_set_one">-->
<!--                <span><b>Если включено:</b> обжалование платежей в Жалобе Чек-листов производиться не будет</span>-->
<!--              </div>-->

<!--              <vs-checkbox v-if="SettingsFssp.no_claim_cl == 0" v-model="SettingsFssp.no_banks_ans_and_req_claim_cl" style="margin-top: 20px;">Не обжаловать не отправку запроса в банк, ответа банков в жалобе чек-листов</vs-checkbox>-->
<!--              <vs-checkbox v-else disabled v-model="SettingsFssp.no_banks_ans_and_req_claim_cl" style="margin-top: 20px;">Не обжаловать не отправку запроса в банк, ответа банков в жалобе чек-листов</vs-checkbox>-->
<!--              <div class="sud_work_set_one">-->
<!--                <span><b>Если включено:</b> обжалование не отправок банком ответа на запрос или запроса в банк приставом в Жалобе Чек-листов производиться не будет</span>-->
<!--              </div>-->

<!--              <v-select v-if="SettingsFssp.no_claim_cl == 0" style="margin-top: 30px" class="w-50 " :reduce="label => label" label="name" :options="ClaimClItems" v-model="item_claim_cl" @input="setClaimClItem"></v-select>-->
<!--              <v-select v-else disabled style="margin-top: 30px" class="w-50 " :reduce="label => label" label="name" :options="ClaimClItems" v-model="item_claim_cl" @input="setClaimClItem"></v-select>-->
<!--              <vs-button v-if="SettingsFssp.no_claim_cl == 0" style="margin-top: 10px" color="primary" class="pull-right" type="filled"  @click="notClaimItem">Не обжаловать</vs-button>-->
<!--              <vs-button v-else disabled style="margin-top: 10px" color="primary" class="pull-right" type="filled"  @click="notClaimItem">Не обжаловать</vs-button>-->
<!--              <vs-button v-if="SettingsFssp.no_claim_cl == 0" style="margin-top: 10px;margin-left:20px" color="danger" class="pull-right" type="filled"  @click="clearNotClaimItems">Очистить список</vs-button>-->
<!--              <vs-button v-else disabled style="margin-top: 10px;margin-left:20px" color="danger" class="pull-right" type="filled"  @click="clearNotClaimItems">Очистить список</vs-button>-->
<!--          <div v-if="SettingsFssp.no_claim_cl == 0">-->
<!--          <div v-if="not_claim_items.length > 0">-->
<!--                <div style="margin-top: 15px"><b>Не обжалуются:</b></div>-->
<!--                <div style="margin-top: 10px" v-for="item in not_claim_items">-->
<!--                  - {{ item.name }} ({{ item.id }}) - <span class="hover:text-primary cursor-pointer" @click="claimItem(item.id)">[ удалить ]</span>-->
<!--                </div>-->
<!--              </div>-->
<!--          </div>-->
<!--          <div v-else disabled>-->
<!--            <div v-if="not_claim_items.length > 0">-->
<!--              <div style="margin-top: 15px"><b>Не обжалуются:</b></div>-->
<!--              <div style="margin-top: 10px" v-for="item in not_claim_items">-->
<!--                - {{ item.name }} ({{ item.id }}) - <span class="hover:text-primary cursor-pointer" @click="claimItem(item.id)">[ удалить ]</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="sud_work_set_one">-->
<!--            <span><b>Выбранные типы</b> не будут проверяться и обжаловаться в Жалобе Чек-листов</span>-->
<!--          </div>-->

<!--            </vs-tab>-->
<!--          </vs-tabs>-->
          <h2 style="margin-top: 30px;">Остальные настройки</h2>
          <h6 class="h6" style="margin-top: 20px;">Количество дней до отправки Ходатайства о ходе ИП:</h6>
          <vs-input v-model="SettingsFssp.count_days_req_fssp" @keypress="validateNumberInt"></vs-input>
          <div class="sud_work_set_one">
            <span>Через данное количество дней при отсутствии платежей будет сформировано Ходатайство о ходе ИП</span>
          </div>
          <vs-checkbox v-model="SettingsFssp.change_phone" style="margin-top: 30px;">Менять номер телефона в Жалобе нет ИП</vs-checkbox>
          <div class="sud_work_set_one">
            <span><b>Если включено:</b> номер телефона организации в Жалобе нет ИП будет заменен</span>
          </div>
          <vs-checkbox v-model="SettingsFssp.send_email_no_number_id_pravo" style="margin-top: 30px;">Отправлять на почту список договоров с пустыми номерами ИД при поиске ИП Правопреемство</vs-checkbox>
      <div class="sud_work_set_one">
        <span><b>Если включено:</b> на почту будет отправлен список договоров с пустыми номерами ИД при поиске ИП Правопреемство</span>
      </div>
          <h6 class="h6" style="margin-top: 20px;">Количество дней до перехода на Жалобу нет ИД:</h6>
          <vs-input v-model="SettingsFssp.count_days_claim_no_id" @keypress="validateNumberInt"></vs-input>
          <div class="sud_work_set_one">
            <span>Через данное количество дней при не поступлении ИД переход на статус Жалоба нет ИД</span>
          </div>
          <vs-checkbox v-model="SettingsFssp.to_control_otsyv_fssp" style="margin-top: 30px;">При нахождении окончания ИП сразу переводить на статус Контроль Отзыв СА ФССП</vs-checkbox>
          <div class="sud_work_set_one">
            <span><b>Если включено:</b> при нахождении окончания ИП статус сразу переводится на Контроль Отзыв СА ФССП</span>
          </div>
          <vs-checkbox v-model="SettingsFssp.isp_no_return" style="margin-top: 30px;">Не отправлять отзыв ИД по исполненным</vs-checkbox>
          <div class="sud_work_set_one">
            <span><b>Если включено:</b> Отзыв ИД в ФССП по исполненным направляться не будет</span>
          </div>
<!--      <vs-checkbox v-model="SettingsFssp.countFile" style="margin-top: 30px;">Количество человек в архиве ФССП</vs-checkbox>-->
          <h6 class="h6" style="margin-top: 20px;">Количество человек в архиве ФССП:</h6>
          <vs-input v-model="SettingsFssp.countFile" @keypress="validateNumberInt"></vs-input>
            <h6 class="h6" style="margin-top: 20px;">ID шаблона для сопроводов ФССП по организациям:</h6>
            <vs-input v-model="SettingsFssp.shablon_org"></vs-input>
            <div class="sud_work_set_one">
                <span><b>Если пусто:</b> то используется шаблон по умолчанию</span>
            </div>
            <h6 class="h6" style="margin-top: 20px;">ID шаблона для сопроводов ФССП по взыскателям:</h6>
            <vs-input v-model="SettingsFssp.shablon_rec"></vs-input>
            <div class="sud_work_set_one">
                <span><b>Если пусто:</b> то используется шаблон по умолчанию</span>
            </div>

          <h6 class="h6" style="margin-top: 20px;">Документ вместо доверенности от Организации:</h6>
          <v-select class="w-50 " :reduce="label => label.id" label="name" :options="FsspSetTypesDocsOrgn" v-model="SettingsFssp.id_type_dover_orgn" @input="setFsspSetTypesDocsOrgn"></v-select>
          <div class="sud_work_set_one">
            <span>
              Выбранный документ будет прикладываться вместо доверенности в жалобах и заявлениях в ГУ от Организации.
              <b>Если выбрано Не прикладывать:</b> документ прикладываться не будет.
            </span>
          </div>
          <h6 class="h6" style="margin-top: 20px;">Документ вместо доверенности от Взыскателя:</h6>
          <v-select class="w-50 " :reduce="label => label.id" label="name" :options="FsspSetTypesDocsRec" v-model="SettingsFssp.id_type_dover_rec" @input="setFsspSetTypesDocsRec"></v-select>
          <div class="sud_work_set_one">
            <span>
              Выбранный документ будет прикладываться вместо доверенности в жалобах и заявлениях в ГУ от Взыскателя.
              <b>Если выбрано Не прикладывать:</b> документ прикладываться не будет.
            </span>
          </div>

      </div>
      </div>
      <vs-button style="margin-top: 20px;margin-bottom: 300px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
    </div>

</template>

<script>
import {mapActions, mapGetters,mapMutations} from 'vuex'
import r from '../../../route';
import axios from '../../../axios'
export default {

    components: {
     },
    data() {
        return {
            // not_claim_items:[],
            // item_claim_cl:{
            //   id:'O_IP_REQ_FNS_ZAGS',
            //   name:'Запрос в ФНС (ЗАГС) об актах гражданского состояния (МВВ)',
            // },
            pop:false,
            readonly_status: true
        }
    },
    computed: {
        ...mapGetters([
            'SettingsFssp','StatussArr','ClaimClItems','FsspSetTypesDocsOrgn','FsspSetTypesDocsRec'
        ]),
    },
    methods: {

      validateNumberInt: event => {
        const charCode = String.fromCharCode(event.keyCode);
        if (!/[0-9]/.test(charCode)) {
          event.preventDefault();
        }
      },

      clearNotClaimItems(){
        this.not_claim_items = [];
      },

      claimItem(id_item){
        for (var i = 0; i < this.not_claim_items.length; i++) {
          if (this.not_claim_items[i].id === id_item) {
            this.not_claim_items.splice(i, 1);
            return true;
          }
        }
        return false;
      },

      notClaimItem(){
        if (!this.isInNotClaimItems(this.item_claim_cl)){
          let item_copy = {};
          Object.assign(item_copy, this.item_claim_cl);
          this.not_claim_items.push(item_copy);
        } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Данный тип уже есть!',
              color: 'danger',
              position: 'top-center'
            })
        }
      },

      isInNotClaimItems(item){
        for (var i = 0; i < this.not_claim_items.length; i++) {
          if (this.not_claim_items[i].id === item.id) {
            return true;
          }
        }
        return false;
      },

      setClaimClItem(){
        if(this.item_claim_cl==null){
          this.item_claim_cl={
            id:'O_IP_REQ_FNS_ZAGS',
            name:'Запрос в ФНС (ЗАГС) об актах гражданского состояния (МВВ)',
          };
        }
      },

      setFsspSetTypesDocsOrgn(){
        if(this.SettingsFssp.id_type_dover_orgn==null){
          this.SettingsFssp.id_type_dover_orgn = 0;
        }
      },

      setFsspSetTypesDocsRec(){
        if(this.SettingsFssp.id_type_dover_rec==null){
          this.SettingsFssp.id_type_dover_rec = 0;
        }
      },

      save(){
        let flag = true;
        if (this.SettingsFssp.check_army == 1){
          if(this.SettingsFssp.check_army_id_status==null || typeof this.SettingsFssp.check_army_id_status == 'undefined'){
            flag = false;
          }
        }

        if (flag) {
          // this.SettingsFssp.claim_cl_items_no_claim = this.not_claim_items;

          axios.post(r("setting.update"), {
            params: {
              method: 'saveFsspSetting',
              param: this.SettingsFssp

            }
          }).then((response) => {
            if (response.data.result) {

              this.$vs.notify({
                title: 'Успешно',
                text: 'Сохранено!!!',
                color: 'success',
                position: 'top-center'
              })

            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Сохранить не удалось !!!',
                color: 'danger',
                position: 'top-center'
              })
              // this.close();
            }
            this.getSettingsFssp()

          })
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Не выбран статус',
            color: 'danger',
            position: 'top-center'
          })
        }


      },


        ...mapMutations([
          //  'setselPortsOnes','setShowEditPorts'
        ]),

        ...mapActions([
            'getSettingsFssp','getDataStatuss','getClaimClItems','getFsspSetTypesDocsDover'
        ]),
    },

    mounted() {
        // this.getSettingsChapterList()
        this.getSettingsFssp().then((response) => {
          if (response.result) {
            // if (this.SettingsFssp.claim_cl_items_no_claim != null) {
            //   this.not_claim_items = this.SettingsFssp.claim_cl_items_no_claim;
            // }
          }
        });
      // this.getClaimClItems();
      this.getDataStatuss();
      this.getFsspSetTypesDocsDover();
    }
}

</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
#page-user-list {
    .user-list-filters {
        .vs__actions {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-58%);
        }
    }
}
</style>
