<template>
    <div class="excel-import" style="margin-left: 20px">
        <div class="dropdown-button-container">
            <vs-button class="btnx" color="success" type="gradient" @click="open">Импорт</vs-button>
            <vs-dropdown>
                <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>
                <vs-dropdown-menu>
                    <vs-dropdown-item>
                    </vs-dropdown-item>


                </vs-dropdown-menu>
            </vs-dropdown>
        </div>
        <vs-popup style="min-height: 500px;" classContent="popup-example" title="Выберите взыскателя или договор цессии" :active.sync="popupActive2">
            <label>Взыскатель или договор цессии:</label>
            <v-select  class="w-50 mb-base" :reduce="label => label.id" label="name" :options="optArr"  v-model="id_recover" style="margin-bottom: 40px" ></v-select>

            <!--<label>Вид взыскания</label>-->
            <!--<v-select  class="w-50 mb-base" :reduce="label => label.id" label="name" :options="VidRecoverInDebtorCreditArr"  v-model="vid_recover" style="margin-bottom: 40px" ></v-select>-->


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
    </div>
</template>

<script>
    import Vue from 'vue'
    import XLSX from 'xlsx'
    import { mapActions,mapGetters } from 'vuex'
    import vSelect from 'vue-select'
    import VueAuthHref from 'vue-auth-href'
    const options = {
        token: () => `${localStorage.getItem('accessToken')}`
    }
    import r from '../../../route';
    import axios from '../../../axios'
    Vue.use(VueAuthHref, options)
    export default {
        components: {
            'v-select': vSelect,
        },
        props: {
            onSuccess: {
                type: Function,
                required: true
            },
        },
        data () {
            return {
                errorValidate:'',
                showError:false,
                import_type: 0,
                import_his:0,
                import_obr:0,
                id_recover:null,
                vid_recover:null,
                popupActive2: false,
                status:2,
                imp1c:false,
                onlyBic:false,
                count:1,
                excelData: {
                    header: null,
                    results: null,
                    meta: null
                }
            }
        },
        computed:{
            ...mapGetters([
                'VidRecoverInDebtorCreditArr','getVidRecoverInDebtorCreditArr',
            ]),

            optArr(){
                let arr=[];
                var index;
                for (index = 0; index < this.RecoverersArr.length; ++index) {
                    if(this.RecoverersArr[index].cession){
                        arr.push({
                            name:'Договор цессии №'+this.RecoverersArr[index].number+' от '+this.RecoverersArr[index].date+' Взыскатель '+this.RecoverersArr[index].name,
                            id:this.RecoverersArr[index].id,
                        });
                    }
                    else{
                        if(this.RecoverersArr[index].id<0){
                            arr.push({
                                name:'Организация '+this.RecoverersArr[index].name,
                                id:this.RecoverersArr[index].id,
                            })
                        }else{
                            arr.push({
                                name:'Взыскатель '+this.RecoverersArr[index].name,
                                id:this.RecoverersArr[index].id,
                            })
                        }


                    }
                }

                return arr
            },
            ...mapGetters([
                'RecoverersArr'

            ]),
        },
        mounted(){
            this.getDataReestrsAndPrav();
            // this.getVidRecoverInDebtorCreditArr()
        },
        methods: {
            ...mapActions([
                'saveImportGosposhlinaFile','getDataReestrsAndPrav','getDataReestrsGosposhlina'
            ]),



            saveDocument(evt){
                this.$vs.loading({color: '#ff8000'})
                this.saveImportGosposhlinaFile({
                    file: evt.target.files,
                    import_type:this.import_type,
                    // import_obr:this.import_obr ,
                    // import_his:this.import_his ,
                    id_recover:this.id_recover,
                    // vid_recover:this.vid_recover,
                    // onlyBic:this.onlyBic,
                }).then((response) => {
                    this.getDataReestrsGosposhlina();
                    if (response.result) {
                        this.popupActive2=false
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сохранено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    } else {
                        this.popupActive2=true
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



            open(){
                this.popupActive2=!this.popupActive2;
                //this.$refs.fileInput.click()
            },
            goImport(){
                document.getElementById("fileUpload1").click()
                this.popupActive2=false;





            },





        }
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
