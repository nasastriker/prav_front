<template>

    <fieldset class="f"  style="min-height: 480px;">
        <legend class="l">Документы:</legend>
        <div class="vx-row" style="padding: 20px">
            <template v-if="showConstrSud">
                <div class="vx-row" style="padding-top: 20px">

                    <div class="vx-col sm:w-1/2 w-full mb-3">
                        <h5>Все поля</h5>
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
                            <vs-textarea class="vs-textarea-scrolled" height="200px" v-model="dop_text" > </vs-textarea>


                        </draggable>
                        <vs-button color="warning" class="pull-right" type="border" style="margin-top: 15px"  @click="clear">Очистить</vs-button>


                    </div>

                </div>
            </template>


        </div>

        <h3 style="    margin-left: 10px;
                            font-size: 16px;">Определение об оставлении иска без движения:</h3>
        <div class="vx-row" style="padding: 20px">
            <div class="vx-col sm:w-1/2 w-full mb-2" style="padding-left: 10px">
                <h6 class="h6">Дата определения об отказе в иске/оставление без рассмотрения <span style="color: red;cursor: pointer;font-size: 12px" @click="showOtkz=!showOtkz">История</span>:</h6>

                <vs-input type="date" class="w-100 " v-model="Deb.data_otkz"  v-on:keyup.enter="changeDebDateOkz"  @blur="changeDebDateOkz"></vs-input>
                <h6 class="h6">Дата ответа на запрос :<VarToClipboard name="dc_date_isk_req_ans"/></h6>

                <vs-input type="date" class="w-100 " v-model="Deb.debtorCredit.date_isk_req_ans"  @blur="changeDeb"></vs-input>
                <h6 class="const" @click="showConstrSud=!showConstrSud">Конструктор</h6>

            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">

                <h6 class="h6">Канал отправки</h6>

                <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                          :options="['Почта','Email','Скачать']" v-model="load"
                ></v-select>
                <vs-button color="primary"  class="pull-right" type="filled"  @click="sendShab(load,'isk')">Отправить</vs-button>


            </div>
        </div>

        <h3 style="    margin-left: 10px;
                            font-size: 16px;">Судебный запрос:</h3>
        <div class="vx-row" style="padding: 20px">
            <div class="vx-col sm:w-1/2 w-full mb-2" style="padding-left: 10px">
                <h6 class="h6">Дата запрос суда :<VarToClipboard name="dc_date_sud_req"/></h6>

                <vs-input type="date" class="w-100 " v-model="Deb.debtorCredit.date_sud_req" @blur="changeDeb"></vs-input>

                <h6 class="h6">Дата ответа на запрос :<VarToClipboard name="dc_date_sud_req_ans"/></h6>

                <vs-input type="date" class="w-100 " v-model="Deb.debtorCredit.date_sud_req_ans"  @blur="changeDeb"></vs-input>

                <h6 class="const" @click="showConstrSud=!showConstrSud">Конструктор</h6>


            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">

                <h6 class="h6">Канал отправки</h6>

                <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                          :options="['Почта','Email','Скачать']" v-model="loadSud"
                ></v-select>

                <vs-button color="primary"  class="pull-right" type="filled"  @click="sendShab(loadSud,'sud')">Отправить</vs-button>

            </div>
        </div>


    </fieldset>


</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import Status from '../../../components/Status.vue'

    import r from '../../../route';

    import axios from '../../../axios'
    import FsspAnswerInfo from "../../Fssp/FsspAnswerInfo.vue"
    import moment from 'moment';
    import draggable from 'vuedraggable'
    import VarToClipboard from './../../VarToClipboard.vue'
    Vue.prototype.$moment = moment;
    Vue.use(AsyncComputed)
    export default {
        components: {
            FsspAnswerInfo, VueSuggestions,Status,  'v-select': vSelect,JsonViewer,draggable,VarToClipboard
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
                years:['2021','2020','2019','2018']
            }
        },
        mounted(){
            this.getBanksNameAndId();
            this.getDataShablonDocumentsIsk();
        },
        asyncComputed: {

        },
        computed: {


            ...mapGetters([
                'StatussDebtorArr','Deb','BanksArr','User','ShabIsk'

            ]),


        },
        methods: {

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

            sendShab(e,type){
                if(e=='Почта'){
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Отправка по почте на работает  !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                }
                if(e=='Email'){
                    this.sendEmail(e,type)
                }
                if(e=='Скачать'){
                    this.getDoc(e,type)
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
            getFile(file){



                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getFile',
                        param:file


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
            getDoc(e,type){

                let a=this.ShabIsk

                this.$vs.loading({color: '#ff8000'})
                axios.post(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDocIskovoe',
                        param:{
                            id_shab:a.id,
                            shabList:this.data.shabList,
                            id_credit:this.Deb.debtorCredit.id,
                            dop_text:this.dop_text
                        }


                    }
                }).then((response) => {
                    this.setAutoPeremen(e,type)
                    if(response.data.result){
                        this.getFile(response.data.data)
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
            sendEmail(e,type){
                let a=this.ShabIsk

                this.$vs.loading({color: '#ff8000'})
                axios.post(r("shablonDocument.index"), {


                    params: {
                        method: 'sendEmailIskovoe',
                        param:{
                            id_shab:a.id,
                            shabList:this.data.shabList,
                            id_credit:this.Deb.debtorCredit.id,
                            dop_text:this.dop_text
                        }


                    }
                }).then((response) => {
                    this.setAutoPeremen(e,type)

                    this.$vs.notify({  title:'Успешно', text: 'Отправленно' , color: 'success', position: 'top-center' })
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
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataDebtorsById','getDataShablonDocumentsIsk'
            ]),


        },
    }
</script>

<style lang="scss">
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
