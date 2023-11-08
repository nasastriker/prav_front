<template>
    <div>
      <vs-button color="primary" @click="showSettingsSend">Запрос копии</vs-button>

      <vs-popup class="holamundo" title="Отправка запроса копии" :active.sync="showSend">
        <h5 style="color: red">{{ perem }}</h5>

        <div style="margin-top: 10px">Шаблон</div>
        <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDcList" v-model="id_shab_zapr"></v-select>
        <div style="margin-top: 10px">Отправка на</div>
        <v-select class="w-50" :options="['Email','Email (только районный)']" v-model="load"></v-select>

        <vs-button color="success" class="pull-right" type="filled" style="margin-top: 20px"
                   @click="sendSudReq">Отправить</vs-button>
      </vs-popup>
    </div>
</template>

<script>

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import vSelect from 'vue-select'
    import Vue from "vue";
    import axios from "../../../axios";
    import r from "../../../route";

    export default {
        components: {
          vSelect
        },

        props:['perem'],
        data () {
            return {
              showSend:false,
              data:{},
              load:'',
              id_shab_zapr:0,
              shab_name:'',
            }
        },
        mounted(){

        },

        asyncComputed: {

        },
        computed: {
          ...mapGetters([
                'User','Deb','ShablonDcList'

            ]),


        },
        methods: {
          sendSudReq(){
            if (this.load=='' || this.id_shab_zapr == 0 || this.id_shab_zapr == null || this.load==null){
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Выберите шаблон и канал отправки',
                color: 'danger',
                position: 'top-center'
              })
            } else {
              this.getShablonName(this.id_shab_zapr).then((response) => {
                this.shab_name = response;
                this.showSend = false;
                if (this.load == 'Email') {
                  this.sendEmail(this.load, 'email_mir')
                }
                if (this.load == 'Email (только районный)') {
                  this.sendEmail(this.load, 'email_area')
                }
              });
            }
          },
          showSettingsSend(){
            this.getShablonDcList();
            this.getSettingRegSudActData(this.perem).then((response_set) => {
              if (response_set.result) {
                this.id_shab_zapr = response_set.data.id_shab_zapr_copy;
              }
            });
            this.showSend = true;
          },
          sendEmail(e,type_send){
            // this.setAutoPeremen(e)
            this.$vs.loading({color: '#ff8000'})
            axios.post(r("shablonDocument.index"), {
              params: {
                method: 'sendDocShabPost',
                param:{
                  id_shab:this.id_shab_zapr,
                  id_credit:this.Deb.debtorCredit.id,
                  type_send:type_send,
                  perem: this.perem+"_zapros",
                  type_name: "Запрос копии: "+this.shab_name
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
              'getShablonDcList','getSettingRegSudActData','getShablonName'
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
