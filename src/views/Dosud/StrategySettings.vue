<template>
    <vx-card no-shadow>


        <template v-if="Object.keys(this.data).length == 0">
           <h3> В данном реестре используются настройки по умолчанию.</h3>
            <vs-button color="primary"  class="pull-right" type="filled"  @click="change">Изменить</vs-button>
        </template>

        <template v-else>
            <div class="flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2" @click="add">Добавить действие</vs-button>

            </div>

            <vs-popup classContent="popup-example" title="Новое действие" :active.sync="popupActive2">
                <template v-if="this.$route.name!=='dosudReestrID'">
                <h6 class="h6Blue mb-1">Укажите количество дней через которое запуститься действие:</h6>
                <vs-input type="number" class="w-50" style="margin-bottom: 15px" v-model="count" />
                </template>
                <template v-else>
                <vs-radio style="padding-bottom: 12px" v-model="pickedTypeDay" vs-value="0">Укажите количество дней через которое запуститься действие:</vs-radio>
                <vs-radio style="padding-bottom: 12px" v-model="pickedTypeDay" vs-value="1">Укажите дату когда запуститься действие:</vs-radio>
                <template v-if="pickedTypeDay==0">
                <vs-input type="number" class="w-50" style="margin-top: 15px; margin-bottom: 15px" v-model="count" />
                </template>
                <template v-if="pickedTypeDay==1">
                    <vs-input type="date" class="w-50" style="margin-top: 15px; margin-bottom: 15px" v-model="dateSend" />
                </template>
                </template>


                <div class="mt-2 mb-4">
                    <div class="centerx">
                        <vs-tooltip text="Тип действия" position="top" >
                            <h6 class="h6Blue mb-1">Тип действия:</h6>
                        </vs-tooltip>
                    </div>
                    <v-select  style="max-width: 250px;" class="w-50 " :reduce="label => label.id" label="name" :options="ActionArr"  v-model="action" ></v-select>

                </div>

                <template v-if="action==0">

                    <div class="mt-2">
                        <div class="centerx">
                            <vs-tooltip text="Вид отправки" position="top" >
                                <h6 class="h6Blue mb-1">Вид отправки:</h6>
                            </vs-tooltip>
                        </div>
                        <v-select style="max-width: 250px;" class="w-50 " :reduce="label => label.id" label="name" :options="TypeArr"  v-model="type" ></v-select>

                    </div>

                    <template v-if="type==0">

                        <div class="mt-2">
                            <v-select style="max-width: 250px;" class="w-50 " :reduce="label => label.name" label="name" :options="EmailArr"  v-model="shablon" ></v-select>

                        </div>

                    </template>
                    <template v-if="type==1">

                        <div class="mt-2">
                            <v-select style="max-width: 250px;" class="w-50 " :reduce="label => label.name" label="name" :options="SmsArr"  v-model="shablon" ></v-select>

                        </div>

                    </template>
                    <template v-if="type==2">

                        <div class="mt-2">
                            <v-select style="max-width: 250px;" class="w-50 " :reduce="label => label.name" label="name" :options="VoiceArr"  v-model="shablon" ></v-select>

                        </div>

                    </template>
                    <template v-if="type==3">

                      <div class="mt-2">
                        <v-select style="max-width: 250px;" class="w-50 " :reduce="label => label.name" label="name" :options="PochtaArr"  v-model="shablon" ></v-select>

                      </div>

                    </template>

                </template>
                <template v-if="action==1">
                    <div class="mt-2">
                        <div class="centerx">
                            <vs-tooltip text="Статус" position="top" >
                                <h6 class="h6Blue mb-1">Статус:</h6>
                            </vs-tooltip>
                        </div>
                        <v-select style="max-width: 250px;" class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="status" ></v-select>

                    </div>
                </template>

                <div style="margin-top: 15px; text-align: center">
                    <vs-button color="primary" type="border"  @click="addDey">Добавить</vs-button>
                </div>



            </vs-popup>
            <template v-if="data.setting!=null">
                <vx-card title="Список действийe:" no-shadow>
                    <VxTimeline :data="data.setting" />
                </vx-card>
            </template>
            <div style="margin-top: 20px">
                <div class="flex flex-wrap items-center justify-end">
                    <vs-button style="margin-right: 20px" color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                    <vs-button style="margin-left: 20px" color="warning"  class="pull-right" type="filled"  @click="returnDefault">Вернуть настройки по умолчанию</vs-button>

                </div>

            </div>
        </template>


    </vx-card>
</template>

<script>
    import VxTimeline from '@/components/timeline/VxTimeline.vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            VxTimeline
        },
        props: {
            id_reestr: {
                required: false
            }
        },

        data () {
            return {
                loadingSettings:true,
                pickedTypeDay:0,
                count:0,
                shablon:'',
                keydata:0,
                dateSend:'',

                action:0,
                status:0,
                type:0,
                label:'Телефонное приветствие для заёмщиков:',
                data:{},
                popupActive2:false,
            }
        },
        mounted(){
            this.$vs.loading()
            this.getData().then((response)=>{this.$vs.loading.close()})
            this.getTemplSoftsEmail()
            this.getTemplSoftsVoice()
            this.getTemplSoftsPochta()
            this.getDataStatuss()
            this.getTemplSoftsSms()

        },

        computed: {
            ...mapGetters([
                'StatussArr','TypeArr','SmsArr','VoiceArr','EmailArr','ActionArr','PochtaArr'

            ]),


        },
        methods: {
            change(){
                let param
                if(typeof this.id_reestr!='undefined'){
                    param=this.id_reestr
                }
                else{
                    param=1
                }
                axios.post(r("reestrSetting.index"), {
                    params: {
                        method: 'changeDefaultSetting',
                        param: param

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })

            },
            addDey(){
                let ob={
                    count:this.count,
                    dateSend:(this.count===0)?this.dateSend: '',
                    action:this.action,
                    type:this.type,
                    shablon:this.shablon,
                    status:this.status,
                }
                if(this.pickedTypeDay==1){
                    ob.count=Math.floor((Date.parse(this.dateSend)-Date.parse(this.data.created_at))/(1000*60*60*24))
                }
                this.count=0
                this.status=0
                    this.action=0
                    this.type=0
                    this.shablon=''
                this.dateSend=''
                if(this.data.setting==null){
                    this.data.setting=[]
                }
                this.data.setting.unshift(ob);
                this.data.setting.sort((prev, next) => prev.count - next.count);
                this.popupActive2=false;


            },
            ...mapActions([
                'getDataStatuss','getTemplSoftsEmail','getTemplSoftsVoice','getTemplSoftsSms','getTemplSoftsPochta'
            ]),
            add(){
                this.count=0
                this.popupActive2=true
            },
            close(){

                this.$router.back()
            },
            getData(){
                return new Promise((resolve)=> {
                   this.data= {};
                    let param
                    if (typeof this.id_reestr != 'undefined') {
                        param = this.id_reestr
                    }
                    else {
                        param = 1
                    }
                    axios.get(r("reestrSetting.index"), {
                        params: {
                            method: 'getByIdReestSetting',
                            param: param

                        }
                    }).then((response) => {
                        if (response.data.result) {
                            this.data = response.data.data
                            resolve(response.data.result)

                        }
                    })
                })
            },

            returnDefault(){
                axios.post(r("reestrSetting.update"), {
                    params: {
                        method: 'deleteReestSetting',
                        param: this.id_reestr

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено' , color: 'success', position: 'top-center' })
                        this.data=''

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })



            },

            save(){
                axios.post(r("reestrSetting.update"), {
                    params: {
                        method: 'saveDefaultReestSetting',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })



            },


        },
    }
</script>
<style  lang="scss">
    .vs-popup--content {
        min-height: 400px !important;
    }
</style>