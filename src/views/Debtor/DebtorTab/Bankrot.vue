<template>
    <vx-card no-shadow>


        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/2 s:w-1 w-full mb-2">
                <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                    <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
                </template>
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/2 s:w-1 w-full mb-2">
                        <h6 class="h6">Особые пометки:<VarToClipboard name="dc_comment"/></h6>
                        <vs-textarea class="w-100"  v-model="Deb.debtorCredit.comment" @change="changeDeb"> </vs-textarea>
                        <h6 class="h6">Взыскатель:<VarToClipboard name="r_name"/></h6>
                        <vs-input class="w-100" readonly v-model="Deb.recover.name"></vs-input>
                        <h6 class="h6">Цедент:<VarToClipboard name="r_namePerv"/></h6>
                        <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
                        <h6 class="h6" style="margin-top: 25px">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                        <vs-input class="w-100 " readonly v-model="Deb.debtor.name_family"></vs-input>
                        <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                        <vs-input class="w-100 "  readonly v-model="Deb.debtor.name_family_last"></vs-input>
                        <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
                        <vs-input class="w-100 " readonly v-model="Deb.debtor.name"></vs-input>
                        <h6 class="h6">Отчетсво:<VarToClipboard name="d_name_patronymic"/></h6>
                        <vs-input class="w-100 " readonly  v-model="Deb.debtor.name_patronymic"></vs-input>
                        <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                        <vs-input type="date" class="w-100 " readonly v-model="Deb.debtor.birthdate"></vs-input>
                        <span style="margin-bottom: 5px">
                              <h6 class="h6 mb-1">ИНН:<VarToClipboard name="d_inn"/></h6>
                          </span>
                        <vx-input-group class="w-100 mb-4">
                          <vs-input v-model="Deb.debtor.inn" @change="changeDeb" />

                          <template slot="append">
                            <div class="append-text btn-addon">
                              <vs-button color="primary" @click="checkInn(false)">Определить</vs-button>
                            </div>
                          </template>
                        </vx-input-group>
                        <h6 class="h6" style="margin-top: 15px">Номер договора:<VarToClipboard name="dc_number_dog"/></h6>
                        <vs-input class="w-100"  readonly v-model="Deb.debtorCredit.number_dog"></vs-input>
                        <h6 class="h6">Дата договора:<VarToClipboard name="dc_date_dog"/></h6>
                        <vs-input type="date" class="w-100" readonly v-model="Deb.debtorCredit.date_dog"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Статус гражданина:<VarToClipboard name="d_pensioner"/></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                        </div>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>

                    </div>
                    <div class="vx-col sm:w-1/2 s:w-1 w-full mb-2">
                        <h6 class="h6">Арбитражный суд:<VarToClipboard name="d_arb_sud Код суда"/><VarToClipboard name="arbitr_name"/><VarToClipboard name="arbitr_address"/></h6>
                      <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="ArbitrsAreaArr"   v-model="Deb.debtor.arb_sud" @input="changeDeb" ></v-select>
                        <h6 class="h6" >№Судебного дела о банкротстве:<VarToClipboard name="dc_number_bankrot_delo"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtorCredit.number_bankrot_delo"  @change="changeDeb"></vs-input>
                        <h6 class="h6">Дата СА о признании банкротом:<VarToClipboard name="dc_date_sa_bankrot"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa_bankrot"  @blur="changeDeb"></vs-input>
                        <h6 class="h6" >ФИО АУ:<VarToClipboard name="d_arb_name"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtor.arb_name"  @change="changeDeb"></vs-input>
                        <h6 class="h6" >Адрес АУ:<VarToClipboard name="d_arb_address"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtor.arb_address"  @change="changeDeb"></vs-input>
                        <h6 class="h6" >СРО АУ:<VarToClipboard name="d_arb_sro"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtor.arb_sro"  @change="changeDeb"></vs-input>
                        <h6 class="h6" >Сведения Коммерсант:<VarToClipboard name="d_arb_commercant"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtor.arb_commercant"  @change="changeDeb"></vs-input>
                        <h6 class="h6" >ШПИ АУ:<VarToClipboard name="dc_shpi_arb_name"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtorCredit.shpi_arb_name"  @change="changeDeb"></vs-input>
                        <h6 class="h6" >Дата ШПИ АУ:<VarToClipboard name="dc_date_notification_arb_name"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_notification_arb_name"  @change="changeDeb"></vs-input>

                        <h6 class="h6" >ШПИ Должнику:<VarToClipboard name="dc_shpi_bankrot"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtorCredit.shpi_bankrot"  @change="changeDeb"></vs-input>
                        <h6 class="h6" >Дата ШПИ Должнику:<VarToClipboard name="dc_date_notification_bankrot"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_notification_bankrot"  @change="changeDeb"></vs-input>

                        <h6 class="h6" >ШПИ Цеденту:<VarToClipboard name="dc_shpi_cedent_bankrot"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtorCredit.shpi_cedent_bankrot"  @change="changeDeb"></vs-input>
                        <h6 class="h6" >Дата ШПИ цеденту:<VarToClipboard name="dc_date_notification_cedent_bankrot"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_notification_cedent_bankrot"  @change="changeDeb"></vs-input>


                        <h6 class="h6">Дата СА о включении в реестр:<VarToClipboard name="dc_date_sa_reestr"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa_reestr"  @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата ходатайства АУ по установлению конкурсной массы:<VarToClipboard name="dc_date_hod_mass"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_hod_mass"  @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата Жалобы АУ по установлению конкурсной массы:<VarToClipboard name="dc_date_req_mass"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_req_mass"  @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата СА об окончании производства по делу:<VarToClipboard name="dc_date_bankrot_close"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_bankrot_close"  @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата заявления Банкротство:<VarToClipboard name="dc_date_bankrot_req"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_bankrot_req"  @blur="changeDeb"></vs-input>



                    </div>
                </div>




            </div>

            <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">
                <div class="mt-8">
                    <h6 class="h6">Банкрот:</h6>
                    <div class="mt-2">
                        <vs-radio v-model="Deb.debtor.bankrot" vs-value="0" vs-name="bankrot" class="mr-4" @input="changeDeb">Нет</vs-radio>
                        <vs-radio v-model="Deb.debtor.bankrot" vs-value="1" vs-name="bankrot" class="mr-4" @input="changeDeb">Да</vs-radio>
                        <template v-if="Deb.debtor.bankrot_delo">
                            <vs-button color="primary" type="border" @click="openBankrot">Дело</vs-button>

                        </template>
                        <vs-button color="primary" @click="checkBankrot">Определить</vs-button>
                    </div>

                </div>


                <fieldset class="f" style="margin-top:15px ">
                    <legend class="l">Cведения из ответа АУ:</legend>
                    <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                            <vs-checkbox  v-model="Deb.debtorCredit.bankrot_mvd_req" @input="changeDeb">
                                Запрос в ГИБДД МВД России на получения сведений о зарегистрированных автомототранспортных средствах
                            </vs-checkbox>


                        </div>


                        <div class="vx-col w-2/4  mb-2" >
                            <vs-checkbox v-model="Deb.debtorCredit.bankrot_rosreestr" @input="changeDeb">

                                Запрос в Росреестр (ФНС к ЕГРН)
                            </vs-checkbox>
                        </div>



                    </div>

                    <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                            <vs-checkbox  v-model="Deb.debtorCredit.bankrot_fns" @input="changeDeb" style="min-width: 20px;">
                                Запрос о счетатах должника-ФЛ в ФНС
                            </vs-checkbox>

                        </div>
                        <div class="vx-col w-2/4  mb-2" >
                            <vs-checkbox v-model="Deb.debtorCredit.bankrot_pfr" @input="changeDeb">
                                Запрос в ПФР на получение сведения о заработной плате, иных выплатах и вознаграждениях застрахованного лица (ПФР)
                            </vs-checkbox>
                        </div>



                    </div>


                    <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                            <vs-checkbox  v-model="Deb.debtorCredit.bankrot_mass" @input="changeDeb">
                                Наличие конкурсной массы
                            </vs-checkbox>

                        </div>




                    </div>




                </fieldset>
                 <h6 class="h6" style="margin-top:15px ">Проверка:</h6>
                <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="BankrotHisArr"
                    rowSelection="multiple"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    @grid-size-changed="onGridSizeChanged"
                    :pagination="true"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl">
                </ag-grid-vue>
            </div>

        </div>







    </vx-card>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import Status from '../../../components/Status.vue'
    import r from '@/route';
    import axios from '@/axios'
    import moment from 'moment';
    export default {
        components: { VueSuggestions,Status,
        },
        data () {
            return {
              BankrotHisArr:[],
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [



                {
                  headerName: 'Дата',
                  field: 'created_at',
                  filter: true,
                  width: 100,
                  cellRenderer: params => moment(params.value).format('HH:MM DD.MM.YYYY')
                },

                {
                  headerName: 'Результат',
                  field: 'res',
                  filter: true,
                  width: 150,
                  cellRenderer: params => {
                    if(params.value==0){
                      return 'Не банкрот'
                    }
                    if(params.value==1){
                      return 'Банкрот'
                    }
                  }
                },



              ],
              components: {
              }

            }
        },
        mounted(){
          this.gridApi = this.gridOptions.api;
            this.getBanksNameAndId();
            this.getDataArbitrAreas();
            this.getData();
        },

        computed: {
            ...mapGetters([
                'StatussDebtorArr','Deb','BanksArr','User','ArbitrsAreaArr'

            ]),
        },
        methods: {
          onColumnResized(params) {
            params.api.resetRowHeights();
          },
          onColumnVisible(params) {
            params.api.resetRowHeights();
          },

          getData(){
            axios.get(r("bankrotHistory.index"), {
              params: {
                method: 'getByIdDebtor',
                param: this.Deb.debtorCredit.id_debtor
              }
            }).then((response) => {
              if(response.data.result){
                this.BankrotHisArr= response.data.data

              }
            })

          },
          onGridSizeChanged(params) {
            if (params.clientWidth > 500) {
              this.gridApi.sizeColumnsToFit();
            } else {
              this.columnDefs.forEach(x => {
                x.width = 300;
              });
              this.gridApi.setColumnDefs(this.columnDefs);
            }
          },
          checkBankrot(){
              let flag=false;
              if (this.Deb.debtor.inn == null) {
                  this.checkInn(true);
                  flag=true;

              }
              if (this.Deb.debtor.inn == "") {
                  this.checkInn(true);
                  flag=true;
              }
              if(!flag) {
                  this.getBankrot();
              }

          },
          checkInn(fla){
              let flag=false;
              if (this.Deb.debtor.name==''){
                  flag=true;
                  this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Имя  !!!', color: 'danger', position: 'top-center' })
              }
              if (this.Deb.debtor.name_family==''){
                  flag=true;
                  this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Фамилия  !!!', color: 'danger', position: 'top-center' })
              }
              if (this.Deb.debtor.name_patronymic==''){
                  flag=true;
                  this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Отчество  !!!', color: 'danger', position: 'top-center' })
              }
              if (this.Deb.debtor.birthdate==''){
                  flag=true;
                  this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Дата рождения  !!!', color: 'danger', position: 'top-center' })
              }
              if (this.Deb.debtor.series==''){
                  flag=true;
                  this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Серия паспорта  !!!', color: 'danger', position: 'top-center' })
              }
              if (this.Deb.debtor.number==''){
                  flag=true;
                  this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Номер паспорта  !!!', color: 'danger', position: 'top-center' })
              }
              this.$vs.loading({ color: '#ff8000' })
              if(!flag){
                  axios.post(r("debtors.index"), {
                      params: {
                          method: 'getInn',
                          param: this.Deb.debtor

                      }
                  }).then((response) => {

                      this.$vs.loading.close()
                      if (response.data.result){
                          this.Deb.debtor.inn=response.data.data;
                          if(fla){
                              this.getBankrot();
                          }
                          this.$vs.notify({  title:'Успешно', text: 'Инн определен!!!', color: 'success', position: 'top-center' })
                      }
                      else{
                          this.$vs.notify({  title:'Ошибка', text: 'Инн определить не удалось !!!', color: 'danger', position: 'top-center' })
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
          openBankrot(){
              window.open( 'https://fedresurs.ru/person/' + this.Deb.debtor.bankrot_delo, '_blank');
          },
          getBankrot(){
              this.$vs.loading({color: '#ff8000'})
              axios.post(r("debtors.index"), {
                  params: {
                      method: 'getBankrot',
                      param: this.Deb.debtor

                  }
              }).then((response) => {
                  this.$vs.loading.close()
                  if (response.data.result) {
                      this.Deb.debtor.bankrot = 1;
                      this.Deb.debtor.bankrot_delo = response.data.data.id
                      this.$vs.notify({
                          title: 'Успешно',
                          text: 'Банкротство определено!!!',
                          color: 'success',
                          position: 'top-center'
                      })
                  }
                  else {
                      this.Deb.debtor.bankrot = 0;
                      this.$vs.notify({
                          title: 'Успешно',
                          text: 'Не банкрот !!!',
                          color: 'success',
                          position: 'top-center'
                      })
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
          },
          ...mapActions([
              'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataArbitrAreas'
          ]),


        },
    }
</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
