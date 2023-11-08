<template>
  <div id="page-user-list">
    <div class="vx-card p-6 no-shadow">
          <h6 class="h6">ID Кредита:</h6>
          <vs-input type="text" id="fssp_id_credit" class="w-100" v-model="id_credit"></vs-input>

      <h6 class="h6" style="margin-top: 20px">Переменная:</h6>
      <vs-input type="text" id="fssp_perem" class="w-100" v-model="perem"></vs-input>

      <h6 class="h6" style="margin-top: 20px">Тип документа:</h6>
      <vs-input type="text" id="fssp_type_doc" class="w-100" v-model="type_doc"></vs-input>

          <h6 class="h6" style="margin-top: 20px">Файл:</h6>
          <vs-input id="fssp_file_upload" type="file" class="w-full mb-base" label-placeholder="file"
                    v-on:change="saveDocument($event)"/>
        </div>
    </div>
</template>

<script>
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {

        },

        //props:['idDep','back'],
        data () {
            return {
              id_credit:'',
              perem:'',
              type_doc:'',

            }
        },
        mounted(){

        },

        asyncComputed: {

        },
        computed: {


            ...mapGetters([

            ]),


        },
        methods: {

          ...mapActions([
              'saveFsspAnswerDocument'
          ]),

          saveDocument(evt) {
            this.saveFsspAnswerDocument({
              file: evt.target.files[0],
              name: evt.target.files[0].name,
              id_credit: this.id_credit,
              perem: this.perem,
              type_doc: this.type_doc
            })
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
