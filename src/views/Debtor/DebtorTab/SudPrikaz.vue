<template>


    <fieldset class="f"  style="min-height: 480px;">
        <legend class="l">Документы:</legend>
        <template v-for="item in ShabPrikaz">
            <h3 style="    margin-left: 10px;
                            font-size: 16px;">{{item.shablon_name}}:</h3>
            <div class="vx-row" style="padding: 20px">
                <div class="vx-col sm:w-1/2 w-full mb-2" style="padding-left: 10px">
                    <template v-for="pereme in item.sud_peremen">
                        <h6 class="h6">{{pereme.name}}:</h6>

                        <vs-input :type="pereme.type"  class="w-100 " v-model="Deb.debtorCredit.sud[pereme.peremen]" @change="changeDeb"></vs-input>

                    </template>
                    <h6 class="h6">Канал отправки</h6>

                    <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                              :options="['Почта','Email','Скачать']" v-model="item.load"
                    ></v-select>

                    <vs-button color="primary"  class="pull-right" type="filled"  @click="sendShab(item)">Отправить</vs-button>



                </div>
            </div>

        </template>


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
    import FsspAnswerInfo from "../../Fssp/FsspAnswerInfo.vue";
    import moment from 'moment';
    Vue.prototype.$moment = moment;
    Vue.use(AsyncComputed)
    export default {
        components: {
            FsspAnswerInfo, VueSuggestions,Status,  'v-select': vSelect,JsonViewer
        },
        data () {
            return {
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
            this.getDataShablonDocumentsPrikaz();
        },
        asyncComputed: {

        },
        computed: {
            planDateIsk(){

                if(typeof this.Deb.debtorCredit.date_isk!='undefined'){
                    if( this.Deb.debtorCredit.date_isk!=null){
                        let date1 = new Date(this.Deb.debtorCredit.date_isk);
                        let fortnightAway = new Date(date1);
                        date1.setDate(fortnightAway.getDate() + 140);
                        return  moment(date1.toString()).format("YYYY-MM-DD")
                    }
                }
                return null
            },
            planDateSud(){
                if(typeof this.Deb.debtorCredit.date_sud!='undefined'){
                    if(this.Deb.debtorCredit.date_sud!=null){
                        let date1 = new Date(this.Deb.debtorCredit.date_sud);
                        let fortnightAway = new Date(date1);
                        date1.setDate(fortnightAway.getDate() + 84);

                            return  moment(date1.toString()).format("YYYY-MM-DD")
                    }
                }
                return null
            },
            ...mapGetters([
                'StatussDebtorArr','Deb','BanksArr','User','ShabPrikaz'

            ]),


        },
        methods: {
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


            sendShab(e){
                if(e.load=='Почта'){
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Отправка по почте на работает  !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                }
                if(e.load=='Email'){
                    this.sendEmail(e)
                }
                if(e.load=='Скачать'){
                    this.getDoc(e)
                }
            },
            setAutoPeremen(e){
                for (let i=0;i<e.sud_peremen.length;i++){
                    if(e.sud_peremen[i].avto==true&&e.sud_peremen[i].type=='date'){
                        let date1 = new Date();
                        this.Deb.debtorCredit.sud[e.sud_peremen[i].peremen]=moment(date1.toString()).format("YYYY-MM-DD")
                        this.changeDeb()
                    }

                }
            },
            getDoc(e){
               // this.setAutoPeremen(e)
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDoc',
                        param:{
                            id_shab:e.id,
                            id_credit:this.Deb.debtorCredit.id
                        }


                    }
                }).then((response) => {
                    this.setAutoPeremen(e)
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
            sendEmail(e){
                // this.setAutoPeremen(e)
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {


                    params: {
                        method: 'sendEmail',
                        param:{
                            id_shab:e.id,
                            id_credit:this.Deb.debtorCredit.id
                        }


                    }
                }).then((response) => {
                    this.setAutoPeremen(e)

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
            savePrich(){
                let stat=false;
                let prich=[];
                if(this.prav_prich){
                    prich.push('Правовая причина')
                }
                if(this.sud_pp){
                    this.setJudPP(this.Deb.debtor.jud_number);
                    prich.push('Оригинал ПП госпошлина')
                }
                if(this.sud_dover){
                    this.setJudDov(this.Deb.debtor.jud_number);
                    prich.push('Оригинал доверенность')
                }
                if(this.utoch_podsud){
                    prich.push('Уточнить подсудность')
                    stat=true;
                }

                if(this.Deb.debtorCredit.data_return_zay_sp==null){
                    this.Deb.debtorCredit.data_return_zay_sp=[];
                }
                if(this.Deb.debtorCredit.data_return_zay_sp.length>0){
                    if(this.Deb.data_return_zay_sp!=this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1]||typeof this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1].date=='undefined'){
                        this.Deb.debtorCredit.data_return_zay_sp.push({
                            date:this.Deb.data_return_zay_sp,
                            prich:prich,
                            user:this.User.name_family+' '+this.User.name+' '+this.User.name_patronymic,
                            userId:this.User.id,


                        })
                        if(!stat){
                        }
//                        this.changeDebUpdate();
//                        this.$refs.status.setStatus(3);
                    }
                }
                else{
                    this.Deb.debtorCredit.data_return_zay_sp.push({
                        date:this.Deb.data_return_zay_sp,
                        prich:prich,
                        user:this.User.name_family+' '+this.User.name+' '+this.User.name_patronymic,
                        userId:this.User.id,


                    })
                    if(!stat){
                    }
//                    this.changeDebUpdate();
//                    this.$refs.status.setStatus(3);
                }
                this.prav_prich=false
                this.sud_pp=false
                this.sud_dover=false
                this.utoch_podsud=false
                this.changeDeb();
                this.showPrich=false

            },
            changeDebDateReturnZaySp(){

                if(this.Deb.debtorCredit.data_return_zay_sp==null){
                    this.Deb.debtorCredit.data_return_zay_sp=[];
                }
                if(this.Deb.debtorCredit.data_return_zay_sp.length>0){
                    if(this.Deb.data_return_zay_sp!=this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1].date){
                        this.showPrich=true
                    }
                }
                else{
                    this.showPrich=true
                }

            },

            changeDebDateRefusalSp(){
                if(this.Deb.debtorCredit.data_refusal_sp==null){
                    this.Deb.debtorCredit.data_refusal_sp=[];
                }
                if(this.Deb.debtorCredit.data_refusal_sp.length>0){
                    if(this.Deb.data_refusal_sp!=this.Deb.debtorCredit.data_refusal_sp[this.Deb.debtorCredit.data_refusal_sp.length-1]){
                        this.Deb.debtorCredit.data_refusal_sp.push(this.Deb.data_refusal_sp)
                        this.changeDeb();
                    }
                }
                else{
                    this.Deb.debtorCredit.data_refusal_sp.push(this.Deb.data_refusal_sp)
                    this.changeDeb();
                }

            },
            changeDebPerem(e){

                if(this.Deb.debtorCredit.sud==null){
                    this.Deb.debtorCredit.sud={};
                }
                this.Deb.debtorCredit.sud[e]=this.Deb.debtorCredit.sud[e];
                this.changeDeb()

            },
            close(){
                this.$router.back()
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataDebtorsById','getDataShablonDocumentsPrikaz'
            ]),


        },
    }
</script>

<style lang="scss">
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
