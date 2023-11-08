<template>
    <vx-card no-shadow>
        <Back></Back>

      <h3>{{label}}</h3>

        <div  style="margin-top: 30px;     max-width: 450px;">
            <h6 class="text-sm mb-1">Название плтаежной системы:</h6>
            <vs-input  class="w-100 mb-4" style="min-width: 500px;" v-model="data.pay_sys"></vs-input>

            <h6 class="text-sm mb-1">Адрес платежной системы:</h6>
            <VueSuggestions
                    style="margin-bottom: 20px; border: 1px solid rgba(0, 0, 0, 0.2);padding: 0.75rem !important;width: 500px;border-radius: 5px;color: #626262;"
                    placeholder="Адрес"
                    :model.sync="data.address"
                    :options="SuggestionOptionsAddress">

            </VueSuggestions>

        </div >

        <label class="text-sm">Документ:</label>

        <div class="flex flex-wrap items-center mb-base">
            <div @click="downloadDocument()">

                    <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />

            </div>


            <div>
                <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить документ</vs-button>
                <vs-input id="fileUpload1" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,data.pay_sys)" style="display: none"/>


                <p class="text-sm mt-2">Документ должен быть doc,docx,txt</p>
            </div>
        </div>





        <div style="margin-top: 20px">
            <vs-button color="success" class="pull-right mr-4" type="filled" @click="test">Тест</vs-button>
            <vs-button color="primary" class="pull-right mr-4" type="filled" @click="$router.push('/handbook/check/')">
                Закрыть
            </vs-button>
            <vs-button color="success" class="pull-right" type="filled" @click="save">Сохранить</vs-button>


        </div>


    </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    import Back from '../../../components/Back.vue'
    import VueSuggestions from 'vue-suggestions';
    export default {
        components: {
            'v-select': vSelect,Back,VueSuggestions
        },
        data () {
            return {
                documentWord:'/word-logo.png',
                documentUrl:'',
                label:'Редактирование шаблона:',
                data:{

                },

            }
        },
        mounted(){
         ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                }
                else{
                    this.label='Новый чек'
                }


            }


        },

        computed: {
            ...mapGetters([
                'SuggestionOptionsAddress',

            ]),

        },
        methods: {
            test(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("check.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getTestCheck',
                        param:this.data.id


                    }
                }).then((response) => {

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
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
            close(){
                this.$router.back()
            },
            ...mapActions([

            ]),
            save() {
                this.data.id = this.$route.params.id;
                axios.post(r("check.update"), {
                    params: {
                        method: 'saveCheck',
                        param: this.data
                    }
                }).then((response) => {

                    if (response.data.result) {
                        this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                        this.$router.push('/handbook/check/')
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Сохранить не удалось !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }

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
            downloadDocument(){
                axios.get(r("check.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getCheckFile',
                        param:this.data.id


                    }
                }).then((response) => {

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);




                    document.body.appendChild(link);
                    link.click();
//
//                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
//
//                    const link = document.createElement('a');
//                    link.href = url;
//                    link.setAttribute('download', this.data.document_name);
//                    document.body.appendChild(link);
//                    link.click();


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


            chooseFiles1: function() {
                document.getElementById("fileUpload1").click()
            },
            saveDocument(evt,name_id){

                this.saveCheck({file:evt.target.files,id:this.$route.params.id,name_id:name_id}).then((response) => {
                    this.getData(this.$route.params.id);
                    if(response){
                        this.close();
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    }




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
                'saveCheck',
            ]),
            getData(id){
                axios.get(r("check.index"), {
                    params: {
                        method: 'getCheck',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })
            },



        },
    }
</script>
