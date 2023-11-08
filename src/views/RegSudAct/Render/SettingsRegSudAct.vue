<template>
    <div v-if="User.access_regsudact==1 && User.pag.showSettingsRegSud">
      <vs-button color="danger" style="margin-left: 10px" @click="showSettingsRegSudAct">Настройка</vs-button>

      <vs-popup class="holamundo" title="Настройка" :active.sync="showSet">
        <h5 style="color: red">{{ perem }}</h5>

        <div v-if="type == 'otpr'">
        <div style="margin-top: 10px">Шаблон отправки</div>
        <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDcList" v-model="data.id_shab"></v-select>
        </div>
        <div v-if="type == 'zapros'">
          <div style="margin-top: 10px">Шаблон запроса копии</div>
          <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDcList" v-model="data.id_shab_zapr_copy"></v-select>
        </div>
        <div v-if="type == 'all'">
          <div style="margin-top: 10px">Шаблон отправки</div>
          <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDcList" v-model="data.id_shab"></v-select>
          <div style="margin-top: 10px">Шаблон запроса копии</div>
          <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDcList" v-model="data.id_shab_zapr_copy"></v-select>
        </div>

        <vs-button color="success" class="pull-right" type="filled" style="margin-top: 20px"
                   @click="saveSet">Сохранить</vs-button>
      </vs-popup>
    </div>
</template>

<script>

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import vSelect from 'vue-select'
    import Vue from "vue";

    export default {
        components: {
          vSelect
        },

        props:['perem', 'type'],
        data () {
            return {
              showSet:false,
              data:{},
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
          saveSet(){
            this.showSet = false;
            this.saveSettingRegSudAct({perem: this.perem, data: this.data}).then((response) => {
              if(response){
                this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
              }
              else{
                this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
              }
            })
          },
          showSettingsRegSudAct(){
            this.getShablonDcList();
            this.getSettingRegSudActData(this.perem).then((response_set) => {
              if (response_set.result) {
                this.data = response_set.data;
              }
            });
            this.showSet = true;
          },



          ...mapActions([
              'getShablonDcList','getSettingRegSudActData','saveSettingRegSudAct'
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
