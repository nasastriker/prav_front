<template>
    <vx-card no-shadow>

        <vs-tabs v-model="$store.state.funcshedule.activeTab">
            <vs-tab label="Общие"  >
                <label class="text-sm">Функция:</label>

                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="FuncsArrToShedule"   v-model="data.id_func"  ></v-select>

                <label class="text-sm" style="margin-top: 10px">Статус:</label>
                <vs-checkbox style="margin-bottom: 15px" v-model="data.status">Активна</vs-checkbox>
                <h6 class="h6" style="margin-top: 10px">Первая дата запуска функции:</h6>

                <vs-input type="date" class="w-100"  v-model="data.date_p"></vs-input>

                <h6 class="h6" style="margin-top: 10px;margin-bottom: 10px">Периодичность:</h6>
                <v-select  class="w-50 " :reduce="label => label.id" label="label" :options="PeriodList"    v-model="data.period"  ></v-select>

                <template v-if="(data.period==3)||(data.period==5)">
                    <v-select  class="w-50 " style="margin-top: 10px" :reduce="label => label.id" label="label" :options="WeekList"    v-model="data.week"  ></v-select>

                </template>
                <template v-if="data.period==4">
                    <v-select  class="w-50 " style="margin-top: 10px" :reduce="label => label.id" label="label" :options="MounthList"    v-model="data.mounth"  ></v-select>
                </template>
                <vs-input type="time" class="w-100" style="margin-top: 10px"  v-model="data.time"></vs-input>



                <FuncPeremen style="margin-top: 15px" ref="funcPeremen" v-if="$route.params.id!='new'"></FuncPeremen>

                <div style="margin-top: 10px">
                    <vs-row>
                        <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                            <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                            <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>

            </vs-tab>
            <vs-tab label="История" >
                <FuncSheduleHystoryID v-if="$route.params.id!='new'" ></FuncSheduleHystoryID>
            </vs-tab>
        </vs-tabs>



    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import FuncPeremen from './FuncShedulePeremenID.vue'
    import FuncSheduleHystoryID from './FuncSheduleHystoryID.vue'
    export default {
        components: {
            FuncPeremen,FuncSheduleHystoryID
        },
        data () {
            return {
                label:'Редактирование расписания функций:',
                data:{
                    date_p:0,
                    id_func:0,
                    period:0,
                    week:0,
                    mounth:0,
                    time:0,
                },

            }
        },

        mounted(){
            this.getFuncsArrToShedule()
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                } {
                    this.label='Новое поле'
                }


            }
            this.PushMounthDate();
        },
        computed: {

            ...mapGetters([
                'FuncsArrToShedule','PeriodList','WeekList','MounthList'

            ]),
        },
        methods: {
            PushMounthDate(){
                for(let i=0;i<30;i++){this.MounthList.push({id: i+1, label: (i+1).toString()})};
                this.MounthList.push({id: 31, label: 'Последнее число месяца'});
            },
            close(){
                this.$router.back()
            },
            ...mapMutations([

            ]),
            ...mapActions([
                'getFuncsArrToShedule','saveFuncShedule',
            ]),
           // работа без store.js
            getData(id){
                axios.get(r("funcshedule.index"), {
                    params: {
                        method: 'getFuncSheduleOnce',
                        param: id

                    }
                }).then((response) => {
                  //  console.log(response)
                    if (response.data.result){
                        this.data=response.data.data
                    }
                })
            },
            save(){
                this.data.id=this.$route.params.id;
                this.saveFuncShedule(this.data).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.back()
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })
            },
        },
    }
</script>
