<template>
    <vx-card no-shadow>

            <h6 style="margin-bottom: 5px">Выберите бюро кредитных историй</h6>
            <v-select  class="w-100" style="margin-bottom: 5px" :reduce="label => label.id" label="name" :options="BKIOrganization"   v-model="BkiData.bki_organization" @input="getMenu"></v-select>
            <vs-tabs>
            <vs-tab label="Данные кредита">
            <div class="vx-row" style="padding-top: 20px">
            <template v-if="BkiData.bki_organization=='Credo'">
                <div class="vx-col w-1/2">
                    <h6 style="margin-bottom: 15px;color: #0e84b5">Свойства:</h6>

                    <template v-for="(item,index) in SortMenu(Menu,'credo')"  >
                        <template v-if="item.item_type==='m'">
                            <h6 style="margin-bottom: 5px">{{item.name}}</h6>
                            <v-select  class="w-100" style="margin-bottom: 5px" :reduce="label => label.id" label="name" :options="GetterMenu(SortMenu(Menu,'credo'),index)"   v-model="BkiData[item.field]" @input="save" ></v-select>
                        </template>

                    </template>
                </div>
                <div class="vx-col w-1/2">
                    <h6 style="margin-bottom: 15px;color: #0e84b5">События:</h6>
                    <template v-for="(item,index) in SortMenu(Menu,'credo')" >
                        <template v-if="item.item_type==='event'">
                            <h6 style="margin-bottom: 5px">{{item.name}}</h6>
                            <vs-checkbox v-model="BkiData[item.field]"  @input="save">Активно</vs-checkbox>
                        </template>
                    </template>
                </div>
            </template>
            <template v-if="BkiData.bki_organization=='Scoring'">
                <div class="vx-col w-1/2">
                    <h6 style="margin-bottom: 15px;color: #0e84b5">Свойства:</h6>

                    <template v-for="(item,index) in SortMenu(Menu,'scoring')"  >
                        <template v-if="item.item_type==='m'">
                            <h6 style="margin-bottom: 5px">{{item.name}}</h6>
                            <v-select  class="w-100" style="margin-bottom: 5px" :reduce="label => label.value" label="name" :options="GetterMenu(SortMenu(Menu,'scoring'),index)"   v-model="BkiData[item.field]" @input="save" ></v-select>
                        </template>

                    </template>
                </div>
                <div class="vx-col w-1/2">
                    <vs-button @click="checkCreditToBki">Проверка данных кредита для выгрузки в БКИ</vs-button>
                    <h6 style="margin-bottom: 15px;color: #0e84b5">События:</h6>
                    <template v-for="(item,index) in SortMenu(Menu,'scoring')" >
                        <template v-if="item.item_type==='event'">
                            <h6 style="margin-bottom: 5px">{{item.name}}</h6>
                            <vs-checkbox v-model="BkiData[item.field]"  @input="save">Активно</vs-checkbox>
                        </template>
                    </template>
                </div>
            </template>


            </div>
            <div style="height: 300px;"></div>
            </vs-tab>
            <vs-tab label="Журнал работы с БКИ">
                <BKIDebtorJournal></BKIDebtorJournal>
            </vs-tab>
            </vs-tabs>
        <vs-popup classContent="popup-example" title="Проверка отправки по ФНС" :active.sync="showCheck">
            <div style="color: red">Если есть ошибки то данный кредит в выгрузку БКИ не попадет, предупреждения будут проигнорированы и заполнены значениями заглушками</div>
            <json-viewer
                    :value="resultCheck"
                    :expand-depth=5
                    copyable

                    sort></json-viewer>

        </vs-popup>
    </vx-card>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import vSelect from 'vue-select'
    import axios from '../../../axios'
    import r from '../../../route'
    import JsonViewer from 'vue-json-viewer'
    import BKIDebtorJournal from './BKIDebtorJournal.vue'
    export default {
        components: {
            'v-select': vSelect,JsonViewer,BKIDebtorJournal
        },
        data () {

            return {
                BKIOrganization:[{id:'Credo',name:'ООО «МБКИ «КРЕДО»'},{id:'Scoring',name:'БКИ Скоринг Бюро'}],

                BkiData:{
                    bki_organization:null,
                },
                Menu:{},
                showCheck:false,
                resultCheck:'',
            }
        },
        mounted(){
            this.getBkiScoringLists()
            this.getBkiCredoLists().then(res=>{
                axios.get(r("bkiDebtor.index"), {
                    params: {
                        method: 'getBkiOnes',
                        param: this.Deb.debtorCredit.id
                    }
                }).then(res=>{
                    if(res.data.result){
                        this.BkiData=res.data.data
                    }
                    else{
                        this.BkiData={
                            id_credit:this.Deb.debtorCredit.id,
                            bki_organization:null,
                        }
                    }
                    this.getMenu()
                })
            })

        },
        computed: {

            ...mapGetters([
                'Deb','BkiCredoContractSpecies',
                'BkiCredoObligationType',
                'BkiCredoCreditPurpose',
                'BkiCredoCreditForm',
                'BkiCredoContractPercentPeriod',
                'BkiCredoContractState',
                'BkiScoringRatio',
                'BkiScoringCategory',
                'BkiScoringPurpose',
                'BkiScoringType',
                'Deb',    

            ]),


        },
        methods: {
            ...mapActions([
                'getBkiCredoLists','getBkiScoringLists',
            ]),

            GetterMenu(menu,index){
                return this[menu[index].option.getter]||[]
            },
            SortMenu(menu,bki){
                let res=[]
                for(let men in menu){
                    if(menu[men].bki===bki)res.push(menu[men])
                }
                return res
            },
            getMenu(){
              if(typeof this.BkiData.bki_organization==='undefined')this.BkiData.bki_organization=null
              if(typeof this.BkiData.id_credit==='undefined')this.BkiData.id_credit=this.Deb.debtorCredit.id
              if(this.BkiData.bki_organization!==null) {
                  axios.post(r("bkiDebtor.update"), {
                      params: {
                          method: 'getMenu',
                          param: this.BkiData
                      }
                  }).then(res=>{
                      if(res.data.result){
                         this.Menu=res.data.data
                      }
                      else{
                          this.$vs.notify({
                                                          title: 'Ошибка',
                                                          text: 'Ошибка !!!',
                                                          color: 'danger',
                                                          position: 'top-center'
                                                      })
                      }
                  }).catch(err=>{
                      this.$vs.notify({
                                                      title: 'Ошибка',
                                                      text: 'Ошибка !!!',
                                                      color: 'danger',
                                                      position: 'top-center'
                                                  })
                  })
              }
          },
          checkCreditToBki(){
              axios.get(r("bkiDebtor.index"), {
                  params: {
                      method: 'checkCreditToBki',
                      param: this.Deb.debtorCredit.id
                  }
              }).then(res=>{
                  this.showCheck=true
                  this.resultCheck=res.data.data
              })
          },  
          save(){
                this.BkiData.id_credit=this.Deb.debtorCredit.id
                axios.post(r("bkiDebtor.update"), {
                  params: {
                      method: 'save',
                      param: this.BkiData
                  }
              }).then(res=>{
                  if(res.data.result){
                       this.$vs.notify({
                                                       title: 'Успешно',
                                                       text: 'Успешно!!!',
                                                       color: 'success',
                                                       position: 'top-center'
                                                   })
                  }
                  else {
                      this.$vs.notify({
                                                      title: 'Ошибка',
                                                      text: 'Ошибка !!! '+res.data.error,
                                                      color: 'danger',
                                                      position: 'top-center'
                                                  })
                  }
              }).catch(error=>{
                  this.$vs.notify({
                                                  title: 'Ошибка',
                                                  text: 'Ошибка !!!',
                                                  color: 'danger',
                                                  position: 'top-center'
                                              })
              })
          },
        },
    }
</script>

<style >

</style>
