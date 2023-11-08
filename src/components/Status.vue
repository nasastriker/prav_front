<template>

    <div class="mb-2">
        <h6 class="text-sm mb-2" style="display: block">Статус:<span style="color:red;cursor:pointer;float:right;" @click="showQuestion">Вернуть предыдущий статус</span></h6>
        <VarToClipboard name="dc_id_status"/>
        <vx-input-group class="w-100 " v-if="showStat">

            <v-select  v-if="ShowStatusChange" class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="Deb.statusLast"  @input="checkChange" ></v-select>

            <template   >
                <div class="append-text btn-addon" slot="append">
                    <vs-button width="60px" color="warning" type="border" @click="showHisFunc">История</vs-button>
                </div>
            </template>

        </vx-input-group>

        <vs-popup class="holamundo" title="История Статусов:" :active.sync="showHis">
            <json-viewer
                    :value="statusArr"
                    :expand-depth=5
                    copyable

                    sort></json-viewer>

        </vs-popup>

        <vs-popup class="holamundo" title="Внимание!" :active.sync="show_warning_dialog_opis">
            <h3><b>В случаях:</b></h3>
            <h4>1. Нет печати в судебном приказе.</h4>
            <h4>2. Описка (любая) в исполнительном листе.</h4>
            <h3 style="margin-top: 10px;margin-bottom: 10px"><b>Необходимо:</b></h3>
            <h4>1. Выгрузить заявление в суд на описку самостоятельно.</h4>
            <h4>2. Приложить оригинал Исполнительного документа.</h4>
            <h4>3. Положить на отправку в лоток "На конверты"</h4>
        </vs-popup>

    </div >

</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import r from '../route';
    import axios from '../axios'
    export default {
        props: {
            id_credit: {
                default: '',
                // type: Number
            },

        },
        components: {


        },
        data () {
            return {
                statusArr:[],
                showStat:true,
                statusLast:0,
                statusLastOld:0,
                showHis:false,
                show_warning_dialog_opis:false,
            }
        },

        computed: {
            ...mapGetters([
                'StatussArr','Deb','ShowStatusChange','User'

            ]),

        },
        methods: {
          showQuestion(){
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: 'Внимание',
              text: 'Вы действительно хотите вернуть предыдущий статус?',
              accept: this.ReturnLastStatus,
              cancel:this.closeDialog,
              acceptText: 'Да',
              cancelText: 'Нет',
              parameters: ['hello']
            })
          },
          closeDialog(){

          },
            ReturnLastStatus(){
                if(this.id_credit!=null ){
                    axios.post(r("creditStatus.update"), {
                        params: {
                            method: 'returnLastCreditStatus',
                            param: this.id_credit

                        }
                    }).then((response) => {

                        if (response.data.result) {

                            this.Deb.statusLast=response.data.data;
                            this.getData();
                            this.$vs.notify({
                                title: 'Сообщение',
                                text: 'Статус  изменен!!!',
                                color: 'success',
                                position: 'top-center'
                            })
                        }
                        else {
                            this.$vs.notify({
                                title: 'Сообщение',
                                text: 'Статус НЕ изменен!!!',
                                color: 'danger',
                                position: 'top-center'
                            })
                        }
                    }).catch(e=>{
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Статус НЕ изменен!!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    })
                }
            },

            setStatus(id_stat){
                this.Deb.statusLast= id_stat;
                this.checkChange();
            },
            checkChange(){
                if(this.Deb.statusLastOld==45){
                    this.$vs.dialog({
                        type: 'confirm',
                        color: 'danger',
                        title: 'Внимание',
                        text: `Стоит технический статус вы точно хотите изменить? `,
                        accept: this.change,
                        cancel:this.cancel,
                        acceptText: 'Да',
                        cancelText: 'Нет'
                    })
                }
                else{
                    this.change();
                }
            },
            cancel(){
                this.Deb.statusLast=this.Deb.statusLastOld
            },
            change(){


                axios.post(r("creditStatus.index"), {
                    params: {
                        method: 'setCreditStatus',
                        param: {
                            id_credit:this.id_credit,
                            id_status:this.Deb.statusLast,
                        }

                    }
                }).then((response) => {
                       // this.getDataDebtorRefines()
                        this.getData();
                        if (this.Deb.statusLast == 38) {
                            this.getDataDebtorsById(this.id_credit);
                        }
                        if (this.Deb.statusLast == 12) {
                            this.checkOrigShtampOpiska(this.id_credit).then((response) => {
                                if (response){
                                    this.show_warning_dialog_opis = true;
                                }
                            })
                        }
                })

            },
            ...mapActions([
                'getDataStatuss','getDataDebtorRefines','getDataDebtorsById','checkOrigShtampOpiska'
            ]),
            showHisFunc(){
                if(this.id_credit!=null ){
                    axios.get(r("creditStatus.index"), {
                        params: {
                            method: 'getCreditStatus',
                            param: this.id_credit

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.data) {

                            this.showStat=false
                            this.statusArr=response.data.data;
                            this.showStat=true
                            this.showHis=true

                        }


                    })}
            },
            getData(){
                this.Deb.statusLast=this.Deb.debtorCredit.id_status;
                if(this.id_credit!=null ){
                    axios.get(r("creditStatus.index"), {
                        params: {
                            method: 'getCreditStatus',
                            param: this.id_credit

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.data) {
                            this.showStat=false
                            this.Deb.statusLastOld=response.data.status;
                            this.Deb.statusLast=response.data.status;
                            this.Deb.debtorCredit.id_status=this.statusLast
                            this.showStat=true

                        }


                    })}


            }

        },
        mounted () {
            this.getDataStatuss()
            this.getData()

        }
    }


</script>

<style lang="scss">

</style>
