<template>
    <div >
      <div>
        <span @click="showInfo" class="hover:text-primary cursor-pointer">Добавить</span>
      </div>

        <vs-popup classContent="popup-example" title="Добавление Расчетного счета" :active.sync="popupActiveAccs">
          <div>Банк</div>
          <v-select  class="w-50 " :reduce="label => label" label="name" :options="BankListBic" v-model="data_acc.bank"></v-select>
          <div style="margin-top: 10px">Номер счета</div>
          <vs-input class="w-full " v-model="data_acc.fssp_Acc" @keypress="validateNumberInt"></vs-input>
          <div style="margin-top: 10px">Дата ареста</div>
          <vs-input type="date" v-model="data_acc.date_start"></vs-input>
          <div style="margin-top: 10px">Дата снятия ареста</div>
          <vs-input type="date" v-model="data_acc.date_end"></vs-input>

          <vs-button color="success" class="pull-right" type="filled" style="margin-top: 20px"
                     @click="saveAcc">Сохранить</vs-button>
        </vs-popup>
      <vs-popup classContent="popup-example" title="Недвижимое имущество" :active.sync="popupActiveNedvizh">
        <PropertyNedvizh></PropertyNedvizh>
      </vs-popup>
      <vs-popup classContent="popup-example" title="Транспортные средства" :active.sync="popupActiveTransp">
        <PropertyTransport></PropertyTransport>
      </vs-popup>
      <vs-popup classContent="popup-example" title="Доход" :active.sync="popupActiveDohod">
        <PropertyDohod></PropertyDohod>
      </vs-popup>

    </div>
</template>

<script>
    import Vue from 'vue'
    import PropertyAccs from "../Post/PropertyAccs.vue";
    import PropertyNedvizh from "../Post/PropertyNedvizh.vue";
    import PropertyTransport from "../Post/PropertyTransport.vue";
    import PropertyDohod from "../Post/PropertyDohod.vue";
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from "vue-suggestions";
    import vSelect from "vue-select";
    import {AgGridVue} from "ag-grid-vue";
    export default {
      components: {
        VueSuggestions,'v-select': vSelect,AgGridVue,PropertyAccs,PropertyNedvizh,PropertyTransport,
        PropertyDohod
      },
        name: 'OpenLink',
        data () {
            return {
                data_acc:{
                  bank:null,
                  fssp_Acc:'',
                  date_start:null,
                  date_end:null
                },
                popupActiveAccs: false,
                popupActiveNedvizh: false,
                popupActiveTransp: false,
                popupActiveDohod: false,
            }
        },
      computed: {
        ...mapGetters([
          'Deb','BankListBic'
        ]),
      },
        methods: {
            ...mapActions([
                'getBanksListBic','saveAccProp'
            ]),
          saveAcc(){
            let flag = true;

            if (this.data_acc.fssp_Acc.trim() == ''){
              flag = false;
            }
            if( this.data_acc.bank == null){
              flag = false;
            }

            if (flag) {
              this.data_acc.id_credit = this.Deb.debtorCredit.id;
              this.saveAccProp(this.data_acc).then(res => {
                if (res.result) {
                  console.log(res.result)
                }
              });
            } else {
              this.showError();
            }
          },
          showError(){
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Заполните необходимые поля',
              color: 'danger',
              position: 'top-center'
            })
          },
          validateNumberInt: event => {
            const charCode = String.fromCharCode(event.keyCode);
            if (!/[0-9]/.test(charCode)) {
              event.preventDefault();
            }
          },
          showInfo(){
              if (this.params.data.dbtrProperty == "Расчетные счета"){
                this.getBanksListBic();
                this.popupActiveAccs = true;
              }
            if (this.params.data.dbtrProperty == "Недвижимое имущество"){
              this.getFsspPropNedvizh(this.Deb.debtorCredit.id);
              this.getIskData(this.Deb.debtorCredit.id);
              this.popupActiveNedvizh = true;
            }
            if (this.params.data.dbtrProperty == "Транспортные средства"){
              this.getFsspPropTransp(this.Deb.debtorCredit.id);
              this.popupActiveTransp = true;
            }
            if (this.params.data.dbtrProperty == "Доход"){
              this.getFsspPropDohod(this.Deb.debtorCredit.id);
              this.popupActiveDohod = true;
            }
          }
        }
    }
</script>
