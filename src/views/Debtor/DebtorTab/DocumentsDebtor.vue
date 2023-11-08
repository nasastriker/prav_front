<template>
    <div class="vx-card no-shadow">
        <div class="vx-card__code-container" style="padding-left:20px">
            <div class="vx-row" style="padding-top: 20px">
                <div class="vx-col sm:w-1/4 w-full mb-2">
                    <vs-checkbox style="margin-bottom: 15px" @change="privDeb">Привязать к заемщику</vs-checkbox>
                  <div class="vx-row" style="padding-top: 5px">
                    <vs-button color="warning" class="pull-right" style="    width: 250px;" type="border"
                               @click="showShablon=!showShablon">Шаблоны
                    </vs-button>
                  </div>
                    <div class="vx-row" style="padding-top: 5px">
                        <vs-button color="warning" class="pull-right" style="    width: 250px;" type="border"
                                   @click="sud">Заявление в Суд
                        </vs-button>
                    </div>
                    <div class="vx-row" style="padding-top: 5px">
                        <vs-button color="warning" class="pull-right" style="    width: 250px;" type="border"
                                   @click="isk">Заявление в Суд Иск
                        </vs-button>
                    </div>
                    <div class="vx-row" style="padding-top: 5px" v-for="item in ShablonDocumentsArrLk">
                        <vs-button color="warning" class="pull-right" style="    width: 250px;" type="border"
                                   @click="getDoc(item.id)">{{item.lk_button}}
                        </vs-button>
                    </div>
                </div>
                <div class="vx-col sm:w-3/4 w-full mb-2">
                <vs-tabs>
                    <vs-tab label="Досье">
                        <spravka></spravka>
                    </vs-tab>
                    <vs-tab label="Журнал корреспонденции">
                        <DebtorCorrespondence ></DebtorCorrespondence>
                    </vs-tab>
                  <vs-tab label="Документы на проверку">
                    <DebtorUnrecognizedFiles></DebtorUnrecognizedFiles>
                  </vs-tab>
                </vs-tabs>
                </div>

            </div>
            <vs-popup fullscreen  style="min-height: 500px;    min-width: 800px!important" classContent="popup-example" :title="'Документ '+Deb.debtor.name_family+' '+Deb.debtor.name+' '+Deb.debtor.name_patronymic" :active.sync="pdfView">
                <Pdf :file="href" title="" v-if="href!=''"></Pdf>


            </vs-popup>
            <vs-popup classContent="popup-example" title="Выбор шаблона" :active.sync="showShablon">
              <label style="margin-bottom: 10px; color:red">Шаблон</label>
              <v-select  class="w-50 " :reduce="label => label.id" label="nameForTask" :options="ShablonDocumentsArr"  v-model="id_shab"  ></v-select>
              <div style="text-align: center;margin-top: 15px">
                <vs-button class=" ml-auto"  color="primary" type="filled" @click="getDoc(id_shab)">Сформировать</vs-button>
              </div>



            </vs-popup>
            <vs-popup classContent="popup-example" title="Выбор шаблона" :active.sync="popShab">
                <h6 class="h6">Нет шаблона можно сформировать по общим шаблонам:</h6>
                <v-select  class="w-50 " style="margin-left: 15px;margin-top: 15px" :reduce="label => label.id" label="shablon_name" :options="shab" v-model="shabId" ></v-select>
                <div style="text-align: center;margin-top: 15px">
                    <vs-button class=" ml-auto"  color="primary" type="filled" @click="getDoc(shabId)">Сформировать</vs-button>
                </div>



            </vs-popup>
        </div>
    </div>

</template>

<script>
 import spravka from './Spravka.vue'
 import r from '../../../route';
 import axios from '../../../axios'
 import VueDadata from 'vue-dadata'
 import {mapActions, mapGetters} from 'vuex'
 import VueSuggestions from 'vue-suggestions';
 import Status from '../../../components/Status.vue'
 import Open from './Render/OpenDocument.vue'
 import OpenHref from './Render/OpenHref.vue'
 import History from './ChildTab/History.vue'
 import HistoryBot from './ChildTab/HistoryBot.vue'
 import Pdf from '../../../components/Pdf.vue'
 import DebtorCorrespondence from './DebtorCorrespondence.vue'
 import DebtorUnrecognizedFiles from "./DebtorUnrecognizedFiles.vue";
    export default {
    components:{
      spravka,VueSuggestions,Pdf,HistoryBot,Status,VueDadata,History,OpenHref,Open,DebtorCorrespondence,
      DebtorUnrecognizedFiles
    },
    data(){
        return{
            shab:[],
            showShablon:false,
            shabId:null,
            id_shab:0,
            popShab:false,
            href:'',
            pdfView:false,
            searchQuery: '',
            csv: [],
            popupActive2:false,
        }
    },
    computed:{
        ...mapGetters([
            'StatussDebtorArr', 'Deb', 'DebtorCreditDocumentsArr', 'TotalDebtorCreditDocuments','ShablonDocumentsArr','ShablonDocumentsArrLk',
            'TypesDcDocumentsDebtor'
        ]),

    },
    methods:{
        ...mapActions([
            'saveDebtor', 'getDataStatuss', 'getDataDebtorsById', 'getDataDebtorCreditDocuments', 'saveDebtorCreditDocument',
            'getTypesDcDocuments','getDataShablonDocuments'
        ]),

        getDoc(id){
            this.popShab=false;
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("shablonDocument.index"), {
                responseType: 'arraybuffer',

                params: {
                    method: 'getDoc',
                    param:{
                        id_shab:id,
                        id_credit:this.Deb.debtorCredit.id
                    }


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
              const data =  JSON.parse(new TextDecoder().decode(error));
                this.$vs.loading.close()
                //   this.popupActive3=false;
                let mess= data.message;
                this.$vs.notify({
                    title: 'Ошибка',
                    text: this.truncateString(data.message),
                    color: 'danger',
                    position: 'top-center'
                })

            });
        },
       truncateString(str) {
         const endIndex = str.indexOf("ExceptionEnd");
         if (endIndex !== -1) {
           return str.slice(0, endIndex);
         }
         return str;
       },


        saveDocument(evt,type){
            this.$vs.loading({color: '#ff8000'})
            this.saveDebtorCreditDocument({
                file: evt.target.files[0],
                name: evt.target.files[0].name,
                id: this.Deb.debtorCredit.id,
                type:type,
            }).then((response) => {
                if (response.result) {
                    this.popupActive2=false
                    this.$vs.notify({
                        title: 'Успешно',
                        text: 'Сохранено!!!',
                        color: 'success',
                        position: 'top-center'
                    })
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: response.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                }
                this.$vs.loading.close()
            }).catch(error => {
                this.popupActive2=false
                this.$vs.loading.close()
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            });
        },
        chooseFiles1: function () {
            document.getElementById("fileUpload1").click()
        },
        genDoc(d_method, d_param, d_name){
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("document.index"), {
                responseType: 'arraybuffer',
                params: {
                    method: d_method,
                    param: d_param,
                }
            }).then((response) => {
                this.$vs.loading.close()
                const url = window.URL.createObjectURL(new File([(response.data)], {type: 'application/doc;charset=UTF-8;'}));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', d_name);
                document.body.appendChild(link);
                link.click();
            }).catch(error => {
                this.$vs.loading.close()
                this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Ошибка!!!',
                    color: 'danger',
                    position: 'top-center'
                })
            });
        },
        privDeb(){
            axios.get(r("usersDebtor.index"), {
                params: {
                    method: 'changeDebUser',
                    param: this.Deb.debtor.id,

                }
            }).then((response) => {
                if (response.data.result) {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Успешно',
                        color: 'success',
                        position: 'top-center'
                    })
                }
                else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })

                }


            })

        },
        isk(){
            this.shabId=null
            axios.get(r("document.index"), {
                params: {
                    method: 'checkIsk',
                    param: this.Deb.debtorCredit.id,
                }
            }).then((response) => {
                if(response.data.result){
                    this.genDoc('getIsk', this.Deb.debtorCredit.id,  'ISK_' + this.Deb.debtor.name_family + '_' + this.Deb.debtor.name + '_' + this.Deb.debtor.name_patronymic + '.pdf');
                }else{
                    this.shab=response.data.shab;
                    this.popShab=true;

                }

            }).catch(error => {

                this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Ошибка!!!',
                    color: 'danger',
                    position: 'top-center'
                })
            });

        },
        sud(){
            this.shabId=null
            axios.get(r("document.index"), {
                params: {
                    method: 'checkSud',
                    param: this.Deb.debtorCredit.id,
                }
            }).then((response) => {
                if(response.data.result){
                    this.genDoc('getSud', this.Deb.debtorCredit.id,  'SP_' + this.Deb.debtor.name_family + '_' + this.Deb.debtor.name + '_' + this.Deb.debtor.name_patronymic + '.pdf');
                }else{
                    this.shab=response.data.shab;
                    this.popShab=true;

                }

            }).catch(error => {

                this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Ошибка!!!',
                    color: 'danger',
                    position: 'top-center'
                })
            });

        },
    },
    mounted(){
        this.getDataShablonDocuments();
        this.getDataDebtorCreditDocuments(this.Deb.debtorCredit.id);
    },
 }
</script>

<style scoped>

</style>
