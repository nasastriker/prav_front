<template>
    <vs-popup style="min-height: 500px;" classContent="popup-example" title="Выберите взыскателя или договор цессии" :active.sync="popupVar">
        <label>Взыскатель или договор цессии:</label>
        <v-select  class="w-50 mb-base" :reduce="label => label.id" label="name" :options="optArr"  v-model="id_recover" style="margin-bottom: 40px" ></v-select>



        <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                  v-on:change="saveDocument($event)" style="display: none"/>

        <div class="vx-row">
            <!--<div class="vx-col sm:w-1/2 w-full mb-2">-->
            <!--<vs-checkbox  v-model="import_type" >Импорт из 1С</vs-checkbox>-->
            <!--<vs-checkbox  v-model="import_his" >Импорт истории</vs-checkbox>-->
            <!--<vs-checkbox  v-model="import_obr" >Импорт образец 2</vs-checkbox>-->
            <!--</div>-->
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <a v-auth-href  href="/example_file/?filename=type_import_gosposhlina" >Образец импорта </a> <br>

                <!--<a v-auth-href  href="/example_file/?filename=type_pay_1c" >Образец импорта из 1с</a><br>-->
                <!--<a v-auth-href  href="/example_file/?filename=type_pay_obr_1c" >Образец импорта 2</a>-->
            </div>

        </div>

        <div style="margin-top:10px;text-align: center">
            <vs-button class="w-1/3 ml-auto" @click="goImport" color="primary" type="filled">Загрузить</vs-button>
        </div>

        <vs-textarea v-if="showError" class="w-full" style="margin-top: 20px;color:red;" rows="10" v-model="errorValidate"></vs-textarea>

    </vs-popup>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import vSelect from 'vue-select'
    import VueAuthHref from 'vue-auth-href'

    const options = {
        token: () => `${localStorage.getItem('accessToken')}`
    }
    export default {
        components:{vSelect},
        props: ['title','popupVar'],
        data(){
          return{
              errorValidate:'',
              id_recover:0,
              showError:false,
              excelData: {
                  header: null,
                  results: null,
                  meta: null
              }
            }
        },
        computed: {
            ...mapGetters([
                'RecoverersArr',
            ]),

            optArr() {
                let arr = [];
                let index;
                for (index = 0; index < this.RecoverersArr.length; ++index) {
                    if (this.RecoverersArr[index].cession) {
                        arr.push({
                            name: 'Договор цессии №' + this.RecoverersArr[index].number + ' от ' + this.RecoverersArr[index].date + ' Взыскатель ' + this.RecoverersArr[index].name,
                            id: this.RecoverersArr[index].id,
                        });
                    }
                    else {
                        if (this.RecoverersArr[index].id < 0) {
                            arr.push({
                                name: 'Организация ' + this.RecoverersArr[index].name,
                                id: this.RecoverersArr[index].id,
                            })
                        } else {
                            arr.push({
                                name: 'Взыскатель ' + this.RecoverersArr[index].name,
                                id: this.RecoverersArr[index].id,
                            })
                        }
                    }
                }
                return arr
            },
        },
        methods:{
            saveDocument(evt){
                this.$vs.loading({color: '#ff8000'})
                this.$emit('saveImport',{
                    file: evt.target.files,
                    id_recover:this.id_recover,
                }).then((response) => {
                    this.$emit('getData');
                    if (response.result) {
                        this.popupVar=false
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сохранено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    } else {
                        this.popupVar=true
                        this.showError=true
                        this.errorValidate=response.error
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.message,
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
            goImport(){
                document.getElementById("fileUpload1").click()
                this.popupVar=false;
            },

        },
        mounted(){

        },

    }
</script>

<style lang="scss">
    .vs-popup--content{
        min-height: 500px!important;
    }
    .dropdown-button-container {
        display: flex;
        align-items: center;

        .btnx {
            border-radius: 5px 0px 0px 5px;
        }

        .btn-drop {
            border-radius: 0px 5px 5px 0px;
            border-left: 1px solid rgba(255, 255, 255, .2);
        }
    }
</style>
