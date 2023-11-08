<template>
    <div >

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <template v-if="params.data.system==0">

        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

            <vs-button
                    size="small"
                    color="green"
                    @click="start"
                    style="margin-bottom: 5px"
            >Запустить</vs-button>

        </template>



        <vs-popup style="min-height: 500px;" classContent="popup-example" title="Настройки" :active.sync="pop">
            <h6 class="h6">Адрес электронной почты, через точку с запятой если несколько:</h6>
            <vs-input class="w-100 "  style="min-width: 450px;" v-model="params.data.email" ></vs-input>

            <div class="flex flex-wrap" style="margin-top: 15px">
                <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="save">Сохранить</vs-button>
            </div>
        </vs-popup>

        <vs-popup style="min-height: 500px;" classContent="popup-example" title="Настройки" :active.sync="popUser">
            <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Название отчета:</h6>
            <vs-input class="w-100" style="margin-top: 7px;margin-bottom: 7px"  v-model="params.data.name" ></vs-input>
            <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Адрес электронной почты, через точку с запятой если несколько:</h6>
            <vs-input class="w-100" style="margin-top: 7px;margin-bottom: 7px"  v-model="params.data.email" ></vs-input>
            <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Время запуска</h6>
            <vs-input class="w-100" style="margin-top: 7px;margin-bottom: 7px" type="time"  v-model="params.data.time" ></vs-input>
            <h6 class="h6">Периодичность</h6>
            <v-select  class="w-100 " style="margin-top: 7px;margin-bottom: 7px" :reduce="label => label.id" label="label" :options="DataSheduleRender.PeriodList"    v-model="params.data.period"  ></v-select>
            <template v-if="params.data.period==3">
                <v-select  class="w-100 " style="margin-top: 7px" :reduce="label => label.id" label="label" :options="DataSheduleRender.WeekList"    v-model="params.data.week"  ></v-select>

            </template>
            <template v-if="params.data.period==4">
                <v-select  class="w-100 " style="margin-top: 7px" :reduce="label => label.id" label="label" :options="DataSheduleRender.MounthList"    v-model="params.data.month"  ></v-select>
            </template>

            <h6 class="h6">Дата первого запуска</h6>
            <vs-input class="w-100" type="date" style="top: 7px;margin-bottom: 7px" v-model="params.data.firstday"/>



            <div class="flex flex-wrap">
                <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="saveUserReport">Сохранить</vs-button>
            </div>

        </vs-popup>



    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    import vSelect from 'vue-select'
    export default {
        components: {
            'v-select': vSelect,
        },
        name: 'OpenLink',
        data () {
            return {
                email:'',
                popUser:false,
                pop:false,
                DataSheduleRender:{
                    PeriodList:[{id: 1, label: 'Однократно'},{id: 2, label: 'Ежедневно'},{id: 3, label: 'Еженедельно'},
                        {id: 4, label: 'Ежемесячно'}],
                    WeekList:[{id: 1, label: 'Понедельник'},{id: 2, label: 'Вторник'},{id: 3, label: 'Среда'},{id: 4, label: 'Четверг'},
                        {id: 5, label: 'Пятница'},{id: 6, label: 'Суббота'},{id: 7, label: 'Воскресенье'}],
                    MounthList:[],
                },
            }
        },
        mounted(){
            if(this.params.emitSet!='undefined')
                this.$root.$on(this.params.emitSet,this.editDbl)
            this.PushMonthDate();
        },
        methods: {
            start () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Запуск',
                    text: `Вы действительно хотите запустить? `,
                    accept: this.startGo,
                    acceptText: 'Запустить',
                    cancelText: 'Отмена'
                })
            },
            startGo(){
                this.params.start_func(this.params.data.id);
            },
            ...mapActions([
                'getReportSheds','deleteReportShed',
            ]),
            PushMonthDate(){
                for(let i=0;i<30;i++){this.DataSheduleRender.MounthList.push({id: i+1, label: (i+1).toString()})};
                this.DataSheduleRender.MounthList.push({id: 31, label: 'Последнее число месяца'});
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: 'Вы действительно хотите удалить отчет?',
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },

            deleteRecord () {
                /* Below two lines are just for demo purpose */

                this.deleteReportShed(this.params.data.id).then((value)=> {

                    if(value){
                        this.showDeleteSuccess()
                    }
                    else{
                        this.showDeleteDanger()

                    }
                });
                this.getReportSheds();

                /* UnComment below lines for enabling true flow if deleting user */
                // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
                //   .then(()   => { this.showDeleteSuccess() })
                //   .catch(err => { console.error(err)       })
            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Расписание отчетов',
                    text: 'Запись из расписания удалена!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Расписание отчетов',
                    text: 'Отчет из расписания удалить не удалось!!!',
                    position: 'top-center'
                })
            },




            save(){
                axios.post(r("reportShed.update"), {
                    params: {
                        method: 'saveReportShedEmail',
                        param: {
                            id:this.params.data.id,
                            email:this.params.data.email,
                        }

                    }
                }).then((response) => {
                    this.pop=false;
                    this.getReportSheds();
                })
            },
            saveUserReport(){
                axios.post(r("reportShed.update"), {
                    params: {
                        method: 'saveReportShedUser',
                        param: {
                            id:this.params.data.id,
                            email:this.params.data.email,
                            name:this.params.data.name,
                            firstday:this.params.data.firstday,
                            period:this.params.data.period,
                            week:this.params.data.week,
                            month:this.params.data.mounth,
                            time:this.params.data.time,
                            list:this.params.data.list,
                            recov:this.params.data.recov,
                            status:this.params.data.status,
                        }

                    }
                }).then((response) => {
                    this.popUser=false;
                    this.getReportSheds();
                })
            },
            editDbl(id){
                if(this.params.data.id==id){
                    if(this.params.data.system==1)this.pop=true;
                    if(this.params.data.system==0)this.popUser=true;
                }
            },

            editRecord () {

                if(this.params.data.system==1)this.pop=true;
                if(this.params.data.system==0)this.popUser=true;
               // this.pop=true;

            },

        }
    }
</script>
