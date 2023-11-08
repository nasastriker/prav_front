<template>
    <div >
        <span title="Поставить отметку об отправке в ИФНС">
            <feather-icon icon="SendIcon" svgClasses="h-5 w-5 mr-3 hover:text-primary cursor-pointer" @click="send" />
        </span>
        <span title="Поставить отметку об возврате из ИФНС">
          <feather-icon icon="RewindIcon" svgClasses="h-5 w-5 mr-3 hover:text-primary cursor-pointer" @click="returnFns" />
        </span>
        <span title="Удалить реестр ИФНС">
          <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-3 hover:text-danger cursor-pointer" @click="confirmDeleteRecordNew" />
        </span>
        <span title="Просмотреть содержимое реестра ИФНС">
          <feather-icon icon="ChromeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                        @click="$router.push('/fns/arhiv/'+params.value)"/>
        </span>
        <span title="Загрузить ответы ИФНС">
          <ImportAnswerFileFnsRender style="margin-left: 10px" :dataid="params.value" @refreshAfterImport="onRefreshAfterImport"></ImportAnswerFileFnsRender>
        </span>
        <vs-popup classContent="popup-example" title="Возрат из ИФНС" :active.sync="sendShowReturn">


            <div class="vx-row" style="margin-left: 2px;margin-right: 15px">
                <div class="vx-col md:w-1/2 w-full mt-5">
                    <h6>Дата возврата:</h6>
                    <vs-input type="date" class="w-100 mb-base"  v-model="params.data.date_return_ifns" />
                </div>

            </div>
            <div class="vx-row" style="margin-left: 2px;margin-right: 15px">
                <div class="vx-col md:w-1/2 w-full mt-5">
                    <h6>Дата жалобы:</h6>
                    <vs-input type="date" class="w-100 mb-base"  v-model="params.data.claim_date" />
                </div>

            </div>
            <vs-row vs-type="flex" vs-justify="center">

                <vs-button color="success" type="filled"  @click="saveReturn">Сохранить</vs-button>

            </vs-row>



        </vs-popup>
        <vs-popup classContent="popup-example" title="Удаление реестра" :active.sync="showSob">
            <label class="text-sm">Вернуть на статус</label>
            <v-select   class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="statusOld"  ></v-select>
            <div c style="text-align: center;margin-top: 15px">
                <vs-button   color="primary" type="filled"  @click="deleteRecord">Удалить</vs-button>
            </div>
        </vs-popup>
        <vs-popup classContent="popup-example" title="Отправка в ИФНС" :active.sync="sendShow">
            <div class="vx-row">
                <div class="vx-col">
                    <h6>ИФНС:</h6>
                    <v-select v-if="params.data.id_ifns==null" class="w-50" style="min-width: 500px;" :reduce="label => label.id" label="code+' '+name" :options="IfnssArrWeek"  v-model="params.data.id_ifns"  >
                        <template slot="option" slot-scope="option">
                            <span v-if="option.zabr" style="color: green">{{ option.name }}</span>
                            <span  v-if="!option.zabr">{{option.name }}</span>
                        </template>
                    </v-select>
                    <v-select v-else class="w-50" style="min-width: 500px;" :reduce="label => label.id" label="code+' '+name" :options="IfnssArr"  v-model="params.data.id_ifns"  >
                        <template slot="option" slot-scope="option">
                            <span v-if="option.zabr" style="color: green">{{ option.name }}</span>
                            <span  v-if="!option.zabr">{{option.name }}</span>

                        </template>
                    </v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mt-5">
                    <h6>Дата отправки:</h6>
                    <vs-input type="date" class="w-100 mb-base"  v-model="params.data.date_ifns" />
                </div>

            </div>
            <vs-row vs-type="flex" vs-justify="center">
                    <vs-button color="success" type="filled"  @click="saveSend">Сохранить</vs-button>
            </vs-row>
        </vs-popup>
    </div>
</template>

<script>
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import ImportAnswerFileFnsRender from "./ImportAnswerFileFnsRender.vue";
    import moment from 'moment';
    export default {
        name: 'OpenLink',
        components: {
            ImportAnswerFileFnsRender,
        },
        computed: {
            ...mapGetters([
                'IfnssArr','User','IfnssArrWeek','StatussArr'
            ]),
        },
        data () {
            return {
                showSob:false,
                statusOld:8,
                sendShow:false,
                sendShowReturn:false,
                sogl:{}
            }
        },
        methods: {
            confirmDeleteRecordNew(){
              this.params.delete_func(this.params);
            },
            ...mapActions([
                'deleteFns','getDataFnss'
            ]),
            onRefreshAfterImport(){
                this.params.go_refresh();
            },
            tripToFns(){
                this.$router.push('/fns/work/' + this.params.value)
            },
            showId(){
                this.$vs.notify({
                    title: 'Ошибка',
                    text: this.params.value,
                    color: 'danger',
                    position: 'top-center'
                })
            },
            refresh(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("fns.index"), {
                    params: {
                        method: 'refreshFns',
                        param: this.params.value

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Обновление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление не выполнено !!!', color: 'danger', position: 'top-center' })
                    }




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
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить ? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            saveReturn(){
                this.sendShowReturn=false
                axios.post(r("fns.index"), {
                    params: {
                        method: 'saveReturn',
                        param: this.params.data
                    }
                }).then((response) => {
                    this.sendShowReturn=false
                    if(response.data.result){
                        this.sendShowReturn=false
                        this.updateDataFnsWorks(response.data.data).then((value)=> {
                            this.params.api.refreshCells()
                        });
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    }
                    else{
                        this.getDataFnsWorks();
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })
            },
            deleteRecord () {
                axios.post(r("fns.update"), {
                    params: {
                        method: 'deleteFns',
                        param: {
                            id:this.params.value,
                            statusOld:this.statusOld,
                        }
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataFnss()
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление выполнено успешно!!!', color: 'success', position: 'top-center' })
                          this.showSob=false
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление не выполнено !!!', color: 'danger', position: 'top-center' })
                    }
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
            saveSend(){
                this.sendShow=false;
                axios.post(r("fns.index"), {
                    params: {
                        method: 'sendFns',
                        param: this.params.data
                    }
                }).then((response) => {
                    if(response.data.result){
                            this.getDataFnsWorks();
                            this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                            this.sendShow=false
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })
            },
            ...mapMutations([
            ]),
            ...mapActions([
                'getDataFnsWorks','updateDataFnsWorks'
            ]),
            returnFns(){
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                let formattedDate = year + '-' + month + '-' + day
                this.sendShowReturn=true
            },
            send(){
             let date =  moment().startOf('week').toDate();
             let year = date.getFullYear();
             let month = date.getMonth()+1;
             let day = date.getDate()+1;
             if (day < 10) {
                 day = '0' + day;
             }
             if (month < 10) {
                 month = '0' + month;
             }
             this.params.data.date_ifns= year + '-' + month + '-' + day
            this.sendShow=true
         }


        }
    }
</script>
<style>

    .vs-popup {

        min-width: 600px;
    }
</style>