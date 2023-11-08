<template>
    <div>
      <div class="centerx">
        <vs-tooltip text="Информация о судебном участке выдавшем исполнительный документ" position="top" >
          <h6 class="h6 mb-1">Наименование суда:<VarToClipboard name="dc_sud_send  Код суда"/></h6>
        </vs-tooltip>
      </div>

      <vx-input-group class="w-100 ">
        <vs-input v-model="judi.name" />
        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button color="warning" type="border" @click="showJud=!showJud">ИНФО</vs-button>
            <!--                <vs-button color="warning" type="border" @click="setJud">Установить</vs-button>-->
            <!--                                        <vs-button color="primary" @click="checkJud">Определить</vs-button>-->
            <vs-button color="primary" @click="setAnotherJud">Перепривязать</vs-button>
          </div>
        </template>
      </vx-input-group>

      <vs-popup classContent="popup-example" title="Информация" :active.sync="showJud">
      <template v-if="judi.number!=''">
              <span style="margin-bottom: 5px">Сайт:</span>
        <vx-input-group class="w-100 mb-base">
          <vs-input disabled v-model="judi.site"  />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button color="warning" type="border"  @click="openUrl(judi.site)">Открыть</vs-button>
            </div>
          </template>
        </vx-input-group>
        <span style="margin-bottom: 5px">Страница терр. подсудности:</span>
        <vx-input-group class="w-100 mb-base">
          <template v-if="judi.podsupnost!=null">
            <vs-input disabled v-model="judi.podsupnost"  />
          </template>
          <template v-else>
            <vs-input disabled v-model="judi.podsupnost"/>
          </template>


          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button color="warning" type="border"  @click="openUrl(judi.podsupnost)">Открыть</vs-button>
            </div>
          </template>
        </vx-input-group>
        <vs-input class="w-full mb-base" disabled label-placeholder="Название" v-model="judi.name"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="Адрес" v-model="judi.address"></vs-input>

        <vs-input class="w-full mb-base" disabled label-placeholder="Бик Банка" v-model="judi.bankBic"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="Название банка" v-model="judi.bankName"></vs-input>


        <vs-input class="w-full mb-base" disabled  label-placeholder="ОКТМО" v-model="judi.oktmmf"></vs-input>

        <vs-input class="w-full mb-base" disabled label-placeholder="Номер счета" v-model="judi.payeeAcc"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="ИНН" v-model="judi.payeeInn"></vs-input>

        <vs-input class="w-full mb-base" disabled label-placeholder="КПП" v-model="judi.payeeKpp"></vs-input>
        <vs-input class="w-full mb-base" disabled label-placeholder="Получатель" v-model="judi.payeeName"></vs-input>
      </template>
      </vs-popup>

      <vs-popup classContent="popup-example" title="Перепривязка суда" :active.sync="popupResetJud">
        <h5 style="margin-right: 20px"><b>Текущий суд:</b> {{ judi.number }} - {{ judi.name }}</h5>

        <div v-if="showVar == 1"  style="margin-top: 20px">
          <h4 style="text-align: center">Вы действительно хотите привязать к заемщику данный суд:</h4>
          <h4 style="text-align: center;margin-top: 10px"><b> {{ choosed_jud_name }} </b>?</h4>
          <br>
          <div style="text-align: center;">
            <vs-button color="danger" class="pull-right mr-4" type="filled" @click="setYes">Да</vs-button>
            <vs-button color="success" class="pull-right" type="filled" @click="setNo">Нет</vs-button>
          </div>
        </div>


        <div v-if="showVar == 0"  style="margin-top: 20px">
        <vs-tabs>
          <vs-tab label="Мировые суды">
            <vs-input type="search" style="min-width: 500px;margin-bottom: 20px"  v-model="find" @input="updateSearchQuery" placeholder="Поиск..." />
            <div style="margin-top: 10px;" v-for="(jud_mir, index) in jud_mirs" class="hover:text-primary cursor-pointer">
                <div @click="clickJud(jud_mir.id, jud_mir.name,'mirs', jud_mir.number)">
                  <div>{{ jud_mir.number }} - {{ jud_mir.name }}
                  </div>
                </div>
              <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
            </div>
          </vs-tab>
          <vs-tab label="Районные суды">
            <vs-input type="search" style="min-width: 500px;margin-bottom: 20px"  v-model="find" @input="updateSearchQuery" placeholder="Поиск..." />
            <div style="margin-top: 10px;" v-for="(jud_ar, index) in jud_area" class="hover:text-primary cursor-pointer">
              <div @click="clickJud(jud_ar.id, jud_ar.name,'area', jud_ar.number)">
                <div>{{ jud_ar.number }} - {{ jud_ar.name }}
                </div>
              </div>
              <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
            </div>
          </vs-tab>
        </vs-tabs>
        </div>
      </vs-popup>


    </div>
</template>

<script>

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import VarToClipboard from './../../VarToClipboard.vue'
    export default {
        components: {
            VarToClipboard,
        },

        //props:['idDep','back'],
        data () {
            return {
              judi:{},
              jud_mirs:[],
              jud_area:[],
              choosed_jud_number:'',
              showJud:false,
              popupResetJud:false,
              find:'',
              showVar:0,
              choosed_jud_name:'',
              choosed_jud_id:0,
              choosed_jud_type:'',
            }
        },
        mounted(){
          this.getJudData(this.Deb.debtorCredit.id).then((response) => {
            if (response.result){
              this.judi = response.data;
            }
          });


        },

        asyncComputed: {

        },
        computed: {


            ...mapGetters([
                'User','Deb'

            ]),


        },
        methods: {
          ...mapActions([
            'getJudData','getJudicialsListForResetAll','resetJudSudSend','changeDebUpdate','changeDeb'
          ]),
          setYes(){
            this.showVar = 0;
            this.popupResetJud = false;
            this.Deb.debtorCredit.sud_send=this.choosed_jud_number;
            this.changeDeb().then((response) => {
                this.getJudData(this.Deb.debtorCredit.id).then((response) => {
                    if (response.result){
                        this.judi = response.data;
                    }
                });
            });
          },
          setNo(){
            this.choosed_jud_name = '';
              this.choosed_jud_number = '';

            this.choosed_jud_id = 0;
            this.choosed_jud_type = '';
            this.showVar = 0;
            this.popupResetJud = false;
          },
          updateSearchQuery(){
            this.getJudicialsListForResetAll({find: this.find, id_debtor: this.Deb.debtor.id}).then((response) => {
              if (response.result){
                this.jud_mirs = response.juds;
                this.jud_area = response.jud_areas;
              }
            });
          },
          clickJud(id_jud, name_jud, type_jud,number){
            this.choosed_jud_name = name_jud;
            this.choosed_jud_number = number;
            this.choosed_jud_id = id_jud;
            this.choosed_jud_type = type_jud;
            this.showVar = 1;
          },
          openUrl(url){
            window.open(url, '_blank');
          },
          setAnotherJud(){
            if (this.Deb.debtor.data_reg==null){
              this.$vs.notify({  title:'Ошибка', text: 'Проверьте адрес', color: 'danger', position: 'top-center' })
            }else{
              this.getJudicialsListForResetAll({find: this.find, id_debtor: this.Deb.debtor.id}).then((response) => {
                if (response.result){
                  this.jud_mirs = response.juds;
                  this.jud_area = response.jud_areas;
                  this.popupResetJud = true;
                }
              });

            }
          },




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
