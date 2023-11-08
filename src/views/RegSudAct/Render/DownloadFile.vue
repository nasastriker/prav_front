<template>
    <div>
      <vs-button color="primary" @click="downloadDocument" style="margin-left: 10px">Файл</vs-button>
      <a v-auth-href id="fileDwnld" :href="url" style="display: none">Скачать</a>
    </div>
</template>

<script>

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import Vue from "vue";
    import VueAuthHref from "vue-auth-href";
    import axios from "../../../axios";
    import r from "../../../route";
    const options = {
      token: () => `${localStorage.getItem('accessToken')}`
    }

    Vue.use(VueAuthHref, options)
    export default {
        components: {

        },

        props:['perem_type_doc'],
        data () {
            return {
              token:{
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              },
            }
        },
        mounted(){

        },

        asyncComputed: {

        },
        computed: {
          url(){
            return 'document/credit_regsud/?id_credit=' + this.Deb.debtorCredit.id + '&perem=' + this.perem_type_doc




          },


            ...mapGetters([
                'User','Deb'

            ]),


        },
        methods: {
          downloadDocument() {
            // document.getElementById("fileDwnld").click()
            this.$vs.loading({color: '#ff8000'})
            axios.post(r("sudWork.index"), {
              responseType: 'arraybuffer',

              params: {
                method: 'dwnldDoc',
                param:{
                  id_credit:this.Deb.debtorCredit.id,
                  perem: this.perem_type_doc
                }


              }
            }).then((response) => {
              if(response.data.result){
                this.getFile(response.data.data, response.data.file_name)
              }else{
                this.$vs.notify({
                  title: 'Ошибка',
                  text: response.data.msg,
                  color: 'danger',
                  position: 'top-center'
                })
              }


              this.$vs.loading.close()


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
          getFile(file, file_name){
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


          ...mapActions([

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
