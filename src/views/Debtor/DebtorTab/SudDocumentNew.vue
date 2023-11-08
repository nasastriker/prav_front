<template>
  <div>
        <div class="vx-row" style="padding-top: 20px">

          <div class="vx-col sm:w-1/2 w-full mb-3">
            <h5>Все поля</h5>

            <div style="margin-bottom: 20px;margin-top: 20px;">
            <h6 class="h6">Поиск параметра:</h6>
            <vs-input type="search" v-model="find" @input="updateSearchQuery" placeholder="Поиск..." />
            </div>

            <li class="li-border"
                v-for="(item, index) in ShabIsk.shabList"
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



          </div>
          <div class="vx-col sm:w-1/2 w-full mb-3">
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
              <vs-textarea  class="vs-textarea-scrolled" height="200px" v-model="dop_text" > </vs-textarea>


            </draggable>
            <vs-button color="warning" class="pull-right" type="border" style="margin-top: 15px"  @click="clear">Очистить</vs-button>

            <div class="vx-row" style="padding-top: 20px;margin-bottom: 150px">
              <div class="vx-col mb-2">
              <h6 class="h6">Канал отправки</h6>
                <div style="width: 200px">
              <v-select class="w-50 mb-base1"
                        :options="['Электронное письмо Почта РФ','Электронное письмо Почта РФ (только районный)','Email','Email (только районный)','Скачать']" v-model="loadSud"
              ></v-select>
                </div>
              </div>
              <div class="vx-col mb-2" style="margin-top: 15px">
              <vs-button color="primary"  class="pull-right" type="filled"  @click="sendShab(loadSud)">Отправить</vs-button>
              </div>
            </div>


          </div>

        </div>

    <DateControls :perem="'sud_constructor'" :ref="'comp_date_controls'"></DateControls>
  </div>

</template>

<script>
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import JsonViewer from 'vue-json-viewer'
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
      years:['2021','2020','2019','2018'],
      find:'',
    }
  },
  mounted(){
    this.getBanksNameAndId();
    this.getDataShablonDocumentsIskParam('');
  },
  asyncComputed: {

  },
  computed: {


    ...mapGetters([
      'StatussDebtorArr','Deb','BanksArr','User','ShabIsk'

    ]),


  },
  methods: {
    refreshAfterSend(){
      this.$refs.comp_date_controls.refreshDateControls();
    },
    updateSearchQuery(){
      this.getDataShablonDocumentsIskParam(this.find);
    },

    sendEmailTest(id){
      this.testShab=id;
      this.popupActive=true;

    },
    changeDebDateOkz(){
      if(this.Deb.debtorCredit.data_otkz==null){
        this.Deb.debtorCredit.data_otkz=[];
      }
      if(this.Deb.debtorCredit.data_otkz.length>0){
        if(this.Deb.data_otkz!=this.Deb.debtorCredit.data_otkz[this.Deb.debtorCredit.data_otkz.length-1]){
          this.Deb.debtorCredit.data_otkz.push(this.Deb.data_otkz)
          this.changeDeb();
        }
      }
      else{
        this.Deb.debtorCredit.data_otkz.push(this.Deb.data_otkz)
        this.changeDeb();
      }


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
        if (e == 'Скачать') {
          this.getDoc(e, 'dwnld')
        }
      }
    },
    setAutoPeremen(e,type){
      if(type=='sud'){
        let date1 = new Date();
        this.Deb.debtorCredit.date_sud_req_ans=moment(date1.toString()).format("YYYY-MM-DD")
      }
      if(type=='isk'){
        let date1 = new Date();
        this.Deb.debtorCredit.date_isk_req_ans=moment(date1.toString()).format("YYYY-MM-DD")
      }
      this.changeDeb()

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

      let a=this.ShabIsk

      this.$vs.loading({color: '#ff8000'})
      axios.post(r("shablonDocument.index"), {
        responseType: 'arraybuffer',

        params: {
          method: 'sendConstr',
          param:{
            id_shab:a.id,
            shabList:this.data.shabList,
            id_credit:this.Deb.debtorCredit.id,
            dop_text:this.dop_text,
            type_send:type_send,
            perem: "sud_constructor",
            type_name: "Конструктор ответов"
          }


        }
      }).then((response) => {
        // this.setAutoPeremen(e,type)
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
      let a=this.ShabIsk

      this.$vs.loading({color: '#ff8000'})
      axios.post(r("shablonDocument.index"), {


        params: {
          method: 'sendConstr',
          param:{
            id_shab:a.id,
            shabList:this.data.shabList,
            id_credit:this.Deb.debtorCredit.id,
            dop_text:this.dop_text,
            type_send:type_send,
            perem: "sud_constructor",
            type_name: "Конструктор ответов"
          }


        }
      }).then((response) => {
        // this.setAutoPeremen(e,type)
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
      let a=this.ShabIsk

      this.$vs.loading({color: '#ff8000'})
      axios.post(r("shablonDocument.index"), {


        params: {
          method: 'sendConstr',
          param:{
            id_shab:a.id,
            shabList:this.data.shabList,
            id_credit:this.Deb.debtorCredit.id,
            dop_text:this.dop_text,
            type_send:type_send,
            perem: "sud_constructor",
            type_name: "Конструктор ответов"
          }


        }
      }).then((response) => {
        // this.setAutoPeremen(e,type)

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
        'getDataShablonDocumentsIskParam'
    ]),


  },
}
</script>

<style lang="scss">
  .vs-textarea-scrolled .vs-textarea{
    height: 100%!important;
    resize: none!important;
  }
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

</style>
