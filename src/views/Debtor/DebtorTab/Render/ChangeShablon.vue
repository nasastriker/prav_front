<template>
    <div>
      <div v-if="type_visual == 1" >
      <div class="vx-row" style="padding-top: 20px;">
        <div class="vx-col w-full">
          <vs-button color="primary" style="width: 100%;" @click="changeShab">Выбрать шаблон</vs-button>
          <h4 style=" display: block;text-align: center;font-size: 12pt;margin-top: 5px;color: #7367f0;"><b>{{ shab_name }}</b></h4>
        </div>
      </div>
      <div class="vx-row" style="padding-top: 20px;">
        <div class="vx-col w-full">
          <div style="width: 100%;">
            <v-select class="w-50 mb-4" :options="['Электронное письмо Почта РФ','Электронное письмо Почта РФ (только районный)','Email','Email (только районный)','Email Заемщик','Скачать']" v-model="load"></v-select>
          </div>
        </div>
      </div>
      <div class="vx-row" style="padding-top: 20px;">
        <div class="vx-col w-full">
          <vs-button color="primary" style="margin: 0px auto;display: inherit;" @click="sendShab(load)">Отправить</vs-button>
        </div>
      </div>
      </div>
      
      <div v-else style="">
        <div class="vx-row" style="padding-top: 20px;margin-bottom: 30px; margin: 0 0 30px!important;">
          <vs-button color="primary" style="width: 230px;" @click="changeShab">Выбрать шаблон</vs-button>
        </div>
        <div style="flex: 1;margin-left: 0px;">
          <v-select class="w-50 mb-4" :options="['Электронное письмо Почта РФ','Электронное письмо Почта РФ (только районный)','Email','Email (только районный)','Email Заемщик','Скачать']" v-model="load"></v-select>
        </div>
        <vs-button color="primary" style="margin-left: 0px" @click="sendShab(load)">Отправить</vs-button>
        <h4 style="margin-left: 10px; margin-top: 10px; font-size: 14px;">{{ shab_name }}</h4>
      </div>

      <vs-popup classContent="popup-example" title="Выбор шаблона" :active.sync="showShabs">
        <vs-input class="mb-4 md:mb-0 mr-4" style="width: 100%" v-model="find_value"
                  @input="getShablonList(find_value)"
                  placeholder="Поиск..."/>
        <div style="margin-top: 10px" v-for="shab in ShablonDocumentList" @click="changeShablon(shab.id)" class="hover:text-primary cursor-pointer">{{ shab.shablon_name }}</div>
      </vs-popup>
    </div>
</template>

<script>
    import vSelect from 'vue-select'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from "../../../../axios";
    import r from "../../../../route";
    export default {
        components: {
          vSelect
        },

        props:['type_visual','perem'],
        data () {
            return {
              showShabs:false,
              find_value:'',
              id_shablon:'',
              shab_name:'',
              load:'',
            }
        },
        mounted(){


        },

        asyncComputed: {

        },
        computed: {


            ...mapGetters([
                'User','ShablonDocumentList','Deb'

            ]),


        },
        methods: {
          changeShab(){
            this.getShablonList(this.find_value);
            this.showShabs = true;
          },
          getShablonList(find_value){
            this.getShablonDocumentList(find_value);
          },
          changeShablon(id_shab){
            this.showShabs = false;
            this.id_shablon = id_shab;
            this.getShablonName(this.id_shablon).then((response) => {
              this.shab_name = response;
            });
          },
          sendShab(e){
            if (e=='' || this.id_shablon == '' || e==null){
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Выберите шаблон и канал отправки',
                color: 'danger',
                position: 'top-center'
              })
            } else {
              if(e=='Электронное письмо Почта РФ'){
                this.sendPochta(e,'pochta_mir')
              }
              if(e=='Электронное письмо Почта РФ (только районный)'){
                this.sendPochta(e,'pochta_area')
              }
              if(e=='Email'){
                this.sendEmail(e,'email_mir')
              }
              if(e=='Email (только районный)'){
                this.sendEmail(e,'email_area')
              }
            if(e=='Email Заемщик'){
                this.sendEmail(e,'email_debtor')
            }
              if(e=='Скачать'){
                this.getDoc(e,'dwnld')
              }
            }
          },
          getDoc(e,type_send){
            // this.setAutoPeremen(e)
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("shablonDocument.index"), {
              responseType: 'arraybuffer',

              params: {
                method: 'sendDocShab',
                param:{
                  id_shab:this.id_shablon,
                  id_credit:this.Deb.debtorCredit.id,
                  type_send:type_send,
                  perem: this.perem,
                  type_name: "Шаблон: "+this.shab_name
                }


              }
            }).then((response) => {
              // this.setAutoPeremen(e)
              const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

              let filename=response.headers['content-disposition'].replace('attachment; filename=', '');

              filename = filename.split('; filename*=utf')[0];

              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', filename);
              document.body.appendChild(link);
              link.click();

              this.$vs.loading.close()

              this.$emit('refreshAfterSend');


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
            // this.setAutoPeremen(e)
            this.$vs.loading({color: '#ff8000'})
            axios.post(r("shablonDocument.index"), {
              params: {
                method: 'sendDocShabPost',
                param:{
                  id_shab:this.id_shablon,
                  id_credit:this.Deb.debtorCredit.id,
                  type_send:type_send,
                  perem: this.perem,
                  type_name: "Шаблон: "+this.shab_name
                }


              }
            }).then((response) => {
              // this.setAutoPeremen(e)

              if(response.data.result) {
                this.$vs.notify({title: 'Успешно', text: 'Отправлено', color: 'success', position: 'top-center'})
                this.$emit('refreshAfterSend');
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
            // this.setAutoPeremen(e)
            this.$vs.loading({color: '#ff8000'})
            axios.post(r("shablonDocument.index"), {
              params: {
                method: 'sendDocShabPost',
                param:{
                  id_shab:this.id_shablon,
                  id_credit:this.Deb.debtorCredit.id,
                  type_send:type_send,
                  perem: this.perem,
                  type_name: "Шаблон: "+this.shab_name
                }


              }
            }).then((response) => {
              // this.setAutoPeremen(e)

              if(response.data.result) {
                this.$vs.notify({title: 'Успешно', text: 'Отправлено', color: 'success', position: 'top-center'})
                this.$emit('refreshAfterSend');
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


          ...mapActions([
            'getShablonDocumentList','getShablonName'
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
