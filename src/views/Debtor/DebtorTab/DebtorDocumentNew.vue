<template>
  <div>
        <div class="vx-row" style="padding-top: 20px">

          <div class="vx-col sm:w-1/2 w-full mb-3">
            <span style="font-weight: bold;"> Сформировать ответ по запросу:</span>

            <div style="margin-bottom: 20px;margin-top: 20px;">
            <h6 class="h6">Поиск параметра:</h6>
            <vs-input type="search" v-model="find" @input="updateSearchQuery" placeholder="Поиск..." />
            </div>
            <div class="vs-show-list" :class="{ activeList }" >
              <ul>
                  <li class="li-border"
                      v-for="(item, index) in ShabDebtor.shabList"
                      :key="index"
                      tag="li"
                      @dblclick="addItem(item)"
                  >
                    <template v-if="item.type==1">
                      <template v-if="item.rec==0">

                        <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ заемщика</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }}</span> </strong>
                      </template>
                      <template v-if="item.rec==1">

                        <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }}</span> </strong>
                      </template>
                      <template v-if="item.rec==2">

                        <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }}</span> </strong>
                      </template>

                    </template>
                    <template v-else>
                      <template v-if="item.typeVar==1">
                        <strong><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>

                      </template>
                      <template v-else>
                        <strong><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>

                      </template>

                    </template>
                  </li>
              </ul>
            </div>
            
            <div class="center">
              <button id="toggle" type="button" class="toggleActiveList" :class="{activeList}" @click="activeList = !activeList">
                <vs-divider position="center" icon="arrow_downward" @click="activeList = !activeList" ></vs-divider>
              </button>
              
            </div>
            
            



          </div>
          <div class="vx-col sm:w-1/2 w-full mb-3">
            <div class="centerx">
              <vs-tooltip text="Отправитель" position="top" >
                <h6 class="h6Blue mb-1">Получатель <VarToClipboard name="code_sender"/></h6>
              </vs-tooltip>
            </div>
            <vs-input class="w-full"  style="margin-bottom: 10px"  v-model="sender" ></vs-input>
            <div class="centerx">
              <vs-tooltip text="Адрес отправителя" position="top" >
                <h6 class="h6Blue mb-1">Адрес получателя<VarToClipboard name="code_sender_address"/></h6>
              </vs-tooltip>
            </div>
            <vs-input class="w-full"  style="margin-bottom: 10px"  v-model="sender_address"></vs-input>

            <h5>Поля ответа</h5>
            <draggable
                @change="setDataShab"
                v-model="data.shabList"
                tag="ul"
                class="list-group list-group-flush cursor-move"
            >
              <li
                  class="li-border"
                  v-for="(item, index) in data.shabList"
                  :key="index"
                  tag="li"
                  @dblclick="delItem(item)"
              >
                <template v-if="item.type==1">
                  <template v-if="item.rec==0">

                    <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ заемщика</span> <span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span> </strong>
                  </template>
                  <template v-if="item.rec==1">

                    <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span> </strong>
                  </template>
                  <template v-if="item.rec==2">

                    <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span> </strong>
                  </template>

                </template>
                <template v-else>
                  <template v-if="item.typeVar==1">
                    <strong><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>

                  </template>
                  <template v-else>
                    <strong><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>

                  </template>

                </template>
              </li>
              <h6 class="h6">Дополнительный текст:</h6>
              <vs-textarea class="vs-textarea-scrolled" height="200px" v-model="dop_text" > </vs-textarea>


            </draggable>
            <vs-button color="warning" class="pull-right" type="border" style="margin-top: 15px"  @click="clear">Очистить</vs-button>

            <div class="vx-row" style="padding-top: 20px;margin-bottom: 150px">
              <div class="vx-col mb-2">
              <h6 class="h6">Канал отправки</h6>
                <div style="width: 200px">
              <v-select class="w-50 mb-base1"
                        :options="['Электронное письмо Почта РФ','Электронное письмо Почта РФ (только районный)','Email','Email (только районный)','Email Заемщик','Скачать']" v-model="loadSud"
              ></v-select>
                </div>
              </div>
              <div class="vx-col mb-2" style="margin-top: 15px">
              <vs-button color="primary"  class="pull-right" type="filled"  @click="sendShab(loadSud)">Отправить</vs-button>
              </div>
            </div>


          </div>

        </div>

    <DateControls :perem="'debtor_constructor'" :ref="'comp_date_controls'"></DateControls>
  </div>

</template>

<script>
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import JsonViewer from 'vue-json-viewer'
import VueDadata from 'vue-dadata'
import { mapActions,mapGetters } from 'vuex'
import VueSuggestions from 'vue-suggestions';
import vSelect from 'vue-select'
import Status from '../../../components/Status.vue'
import DateControls from "./Render/DateControls.vue";

import r from '../../../route';

import axios from '../../../axios'
import FsspAnswerInfo from "../../Fssp/FsspAnswerInfo.vue";
import moment from 'moment';
import draggable from 'vuedraggable'
Vue.prototype.$moment = moment;
Vue.use(AsyncComputed)
export default {
  components: {
    FsspAnswerInfo, VueSuggestions,Status,  'v-select': vSelect,JsonViewer,draggable,DateControls
  },
  data () {
    return {
      sender:'',
      sender_address:'',
      data:{
        shabList:[]
      },
      load:'',
      dop_text:'',
      showConstrSud:false,
      showConstrIsk:false,
      loadSud:'',
      showOtkz:false,
      sud_pp:false,
      sud_dover:false,
      utoch_podsud:false,
      prav_prich:false,
      showData_refusal_sp:false,
      showdata_return_zay_sp:false,
      showPrich:false,
      find:'',
      activeList: false,
      shortList: true,
    }
  },
  mounted(){
    this.getDataShablonDocumentsDebtorParam('');
  },
  asyncComputed: {

  },
  computed: {


    ...mapGetters([
      'StatussDebtorArr','Deb','User','ShabDebtor'

    ]),


  },
  methods: {

    refreshAfterSend(){
      this.$refs.comp_date_controls.refreshDateControls();
    },
    updateSearchQuery(){
      this.getDataShablonDocumentsDebtorParam(this.find);
    },

    sendEmailTest(id){
      this.testShab=id;
      this.popupActive=true;

    },


    clear(){
      this.data.shabList=[];
    },
    delItem(item){

      for(let i=0;i<this.data.shabList.length;i++){
        if(this.data.shabList[i].id==item.id){
          this.data.shabList.splice(i, 1);
        }
      }
    },
    addItem(item){
      if(this.data.shabList==null){
        this.data.shabList=[];
      }
      this.data.shabList.push(item)
    },
    setDataShab(){

    },

    sendShab(e){
      if (e=='' || e==null) {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Выберите канал отправки',
          color: 'danger',
          position: 'top-center'
        })
      } else {
        if (e == 'Электронное письмо Почта РФ') {
          this.sendPochta(e, 'pochta_mir')
        }
        if (e == 'Электронное письмо Почта РФ (только районный)') {
          this.sendPochta(e, 'pochta_area')
        }
        if (e == 'Email') {
          this.sendEmail(e, 'email_mir')
        }
        if (e == 'Email (только районный)') {
          this.sendEmail(e, 'email_area')
        }

          if (e == 'Email Заемщик') {
              this.sendEmail(e, 'email_debtor')
          }
        if (e == 'Скачать') {
          this.getDoc(e, 'dwnld')
        }
      }
    },

    getFile(file,file_name){



      this.$vs.loading({color: '#ff8000'})
      axios.get(r("shablonDocument.index"), {
        responseType: 'arraybuffer',

        params: {
          method: 'getFileName',
          param:{file: file, file_name: file_name}


        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

        let filename=response.headers['content-disposition'].replace('attachment; filename=', '');

        filename = filename.split('; filename*=utf')[0];

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        this.$vs.loading.close()


      }).catch(error => {
        this.$vs.loading.close()
        //   this.popupActive3=false;
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })

      });
    },
    getDoc(e,type_send){

      let a=this.ShabDebtor

      this.$vs.loading({color: '#ff8000'})
      axios.post(r("shablonDocument.index"), {
        responseType: 'arraybuffer',

        params: {
          method: 'sendConstr',
          param:{
            id_shab:a.id,
            shabList:this.data.shabList,
            id_credit:this.Deb.debtorCredit.id,
            sender:this.sender,
            sender_address:this.sender_address,
            dop_text:this.dop_text,
            type_send:type_send,
              perem: "debtor_constructor",
              type_name: "Конструктор заемщик"
          }


        }
      }).then((response) => {
        if(response.data.result){
          this.getFile(response.data.data, response.data.file_name)
          this.refreshAfterSend()
        }else{
          this.$vs.notify({
            title: 'Ошибка',
            text: error.message,
            color: 'danger',
            position: 'top-center'
          })
        }


        this.$vs.loading.close()


      }).catch(error => {
        this.$vs.loading.close()
        //   this.popupActive3=false;
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })

      });
    },
    sendEmail(e,type_send){
      let a=this.ShabDebtor

      this.$vs.loading({color: '#ff8000'})
      axios.post(r("shablonDocument.index"), {


        params: {
          method: 'sendConstr',
          param:{
            id_shab:a.id,
            shabList:this.data.shabList,
            id_credit:this.Deb.debtorCredit.id,
            dop_text:this.dop_text,
            sender:this.sender,
            sender_address:this.sender_address,
            type_send:type_send,
            perem: "debtor_constructor",
            type_name: "Конструктор заемщик"
          }


        }
      }).then((response) => {
            if(response.data.result) {
              this.$vs.notify({title: 'Успешно', text: 'Отправлено', color: 'success', position: 'top-center'})
              this.refreshAfterSend()
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: error.message,
                color: 'danger',
                position: 'top-center'
              })
            }
        this.$vs.loading.close()

      }).catch(error => {
        this.$vs.loading.close()
        //   this.popupActive3=false;
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })

      });
    },
    sendPochta(e,type_send){
      let a=this.ShabDebtor

      this.$vs.loading({color: '#ff8000'})
      axios.post(r("shablonDocument.index"), {


        params: {
          method: 'sendConstr',
          param:{
            id_shab:a.id,
            shabList:this.data.shabList,
            id_credit:this.Deb.debtorCredit.id,
            dop_text:this.dop_text,
            sender:this.sender,
            sender_address:this.sender_address,
            type_send:type_send,
              perem: "debtor_constructor",
              type_name: "Конструктор заемщик"
          }


        }
      }).then((response) => {

        if(response.data.result) {
          this.$vs.notify({title: 'Успешно', text: 'Отправлено', color: 'success', position: 'top-center'})
          this.refreshAfterSend()
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: error.message,
            color: 'danger',
            position: 'top-center'
          })
        }
        this.$vs.loading.close()


      }).catch(error => {
        this.$vs.loading.close()
        //   this.popupActive3=false;
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })

      });
    },

    close(){
      this.$router.back()
    },

    ...mapActions([
      'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataDebtorsById','getDataShablonDocumentsIsk',
        'getDataShablonDocumentsDebtorParam'
    ]),


  },
}
</script>

<style lang="scss">
.const{
  margin-top: 10px;
  color: red;
  border: 1px;

  cursor: pointer;
  text-decoration-line: underline;
  text-decoration-style: dashed;
}
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
.vs-show-list{
  max-height: 210px;
  overflow: hidden;
  transition: all .2s;
}
::-webkit-scrollbar {
  width: 5px; 
  height: 8px; 
  background-color: #ссс;
  border-radius: 5px
}
::-webkit-scrollbar-thumb {
  background-color: #c9c9c9;
  border-radius: 5px
}
.vs-show-list.activeList {
    height: auto!important;
    max-height: 610!important;
    overflow: auto;
}
.toggleActiveList {
    border: none;
    background: transparent;
    width: 100%;
    cursor: pointer;
}
.toggleActiveList .vs-divider--text{
    cursor: pointer;
}
.toggleActiveList .vs-icon{
    border: none;
    background: transparent;
    width: 100%;
    cursor: pointer;
    transition: all .2s;
}
.activeList .vs-icon{
  transform: rotate(180deg);
}

</style>
