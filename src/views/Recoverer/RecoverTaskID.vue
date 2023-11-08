<template>
    <vx-card no-shadow style="    min-height: 80vh;">
        <div style="margin-bottom: 10px; display: flex">
            <div class="vx-breadcrumb ml-4 md:block hidden" style="cursor: pointer;">
                <ul class="flex flex-wrap items-center" style="cursor: pointer;">

                    <li class="inline-flex items-center" style="cursor: pointer;" @click="close"><span class="text-primary cursor-default">   <arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" ></arrow-left-icon></span><span
                        class="breadcrumb-separator mx-2 flex items-start"><span
                        class="feather-icon select-none relative"></span></span></li>

                </ul>
            </div>
            <vs-button style="margin-left: auto" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>

        <label>Взыскатель или договор цессии:</label>
        <v-select   class="w-50 " :reduce="label => label.id" label="name" :options="optArr"
                   v-model="data.id_recover" style="margin-bottom: 5px" ></v-select>


        <label>Название задачи:</label>
        <vs-input class="w-full mb-base" v-model="data.name"></vs-input>
        <div class="vx-row" style="padding-top: 5px">
            <div class="vx-col sm:w-1/2 w-full mb-3">
                <label class="text-sm">Стадия:</label>
                <v-select class="w-50 " style="padding-right: 10px;margin-bottom: 5px"
                         :reduce="label => label.id" label="name" :options="Stad" v-model="data.id_stad"
                ></v-select>


            </div>



        </div>
      <div class="vx-row" >

        <div class="vx-col sm:w-1/2 w-full mb-2">
          <template v-if="data.flagReestr==0">
            <fieldset class="f">
              <legend class="l">Статусы:</legend>
              <label class="text-sm"><span title="Статус с которого попадут заемщики в задачу">Статус:</span></label>
              <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="data.id_status"   ></v-select>
              <label class="text-sm"><span title="Дополнительный статус для выбора заемщиков для задачи">Статус доп.</span>:</label>
              <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="data.id_status_dop"   ></v-select>

              <label class="text-sm"><span title="После выполнения задачи статус измениться на выбранный, если пусто то измениться на стандартный статус">Изменить на статус</span>:</label>
              <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="data.id_status_change"   ></v-select>
            </fieldset>
          </template>
          <template v-if="data.flagReestr==1">
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="ReestrsArrShow"  v-model="data.id_reestr"   ></v-select>
          </template>
          <vs-checkbox style="margin-top: 10px" v-model="data.flagReestr" ><span title="Для выбора заемщиков не по статусу а по загруженному реестру">По реестру</span></vs-checkbox>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <fieldset class="f">
            <legend class="l">Государственная пошлина:</legend>
            <label style="margin-bottom: 10px">Сформировать ГП  </label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GpPay"  v-model="data.gp_pay"   ></v-select>
            <label style="margin-bottom: 10px"><span title="Будет сформирован запрос на Оригинал ПП ">Формировать запрос оригиналов ГП</span></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GpTwo"  v-model="data.gp_zapros"   ></v-select>
            <label style="margin-bottom: 10px"><span title="В платежки стоит галочка что оригинал ПП получен">Проверка наличия оригинала ПП</span></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GpTwo"  v-model="data.gp_origin_pay"   ></v-select>
            <label style="margin-bottom: 10px"><span title="В платежки стоит галочка что она оплачена">Проверка ГП оплачена</span></label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GpTwo"  v-model="data.gp_is_pay"   ></v-select>

          </fieldset>

        </div>
      </div>

        <label style="margin-bottom: 10px">Лимит (ноль не ограниченно)  </label>
        <vs-input type="number" class="w-full " v-model="data.limit_count"></vs-input>
        <label style="margin-bottom: 10px">Количество заемщиков в одном архиве  </label>
        <vs-input type="number" class="w-full " v-model="data.count_arch"></vs-input>
        <label class="text-sm"><span >Канал отправки :</span> </label>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.channel"   ></v-select>
        <template v-if="data.channel==1">
          <label style="margin-bottom: 10px">Вид отправления: </label>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="pochta"  v-model="data.pochta"  ></v-select>
        </template>

        <label style="margin-bottom: 10px; color:red">Шаблон</label>
        <v-select  class="w-50 " :reduce="label => label.id" label="nameForTask" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab"  ></v-select>
        <template v-if="data.id_recover==0">
          <label class="text-sm">Приоритет индивидуального шаблона :</label>
          <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="opt"  v-model="data.shab_priority"   ></v-select>
        </template>

        <Conditions></Conditions>
        <div class="vx-row" style="padding-top: 15px">
            <div class="vx-col mb-2">
                <vs-checkbox v-model="data.active" >Активна</vs-checkbox>
            </div>
            <div class="vx-col mb-2">
                <vs-checkbox v-model="data.every_day" >Ежедневная задача</vs-checkbox>
            </div>
            <div class="vx-col mb-2">
              <span style="color: red;cursor: pointer" @click="showSendsPlan" >Удовлетворяющие по условиям кредиты</span>
            </div>
        </div>

        <div class="vx-row" style="padding-top: 20px">

            <div class="vx-col sm:w-1/2 w-full mb-3">
                <h5>Все функции:</h5>
                <vs-input class="w-full mb-base" placeholder="поиск..." v-model="filterField" ></vs-input>

                <li class="li-border"
                    v-for="(item, index) in FuncsArrRecLoc"
                    :key="index"
                    tag="li"
                    @dblclick="addItem(item)"
                >

                    <strong><span style="cursor: pointer" :title="item.text" >{{ item.name }}</span> </strong>



                </li>


            </div>
            <div class="vx-col sm:w-1/2 w-full mb-3">
              <h5>Функции:<span style="color: red">(внимания порядок функций важен!!!)</span></h5>
                <draggable
                    v-model="data.function"
                    tag="ul"
                    class="list-group list-group-flush cursor-move"
                >
                    <li
                        class="li-border"
                        v-for="(item, index) in data.function"
                        :key="index"
                        tag="li"
                        @dblclick="delItem(item)"
                    >
                        <strong><span style="cursor: pointer" :title="item.text" >{{ item.name }}</span> </strong>
                    </li>


                </draggable>
                <vs-button color="warning" class="pull-right" type="border" style="margin-top: 15px"  @click="clear">Очистить</vs-button>

              <h5 style="margin-top: 15px">Функциия Генрации:</h5>
              <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="FuncsGenerateArr"  v-model="data.id_gen_func"   ></v-select>
            </div>


        </div>
      <vs-popup classContent="popup-example" title="Удовлетворяющие по условиям кредиты" :active.sync="flagShowSendsPlan">
        <RecoverTaskPlan v-if="flagShowSendsPlan" :data="data"></RecoverTaskPlan>
      </vs-popup>


        <vs-textarea v-model="data.comm"  />
        <vs-button color="warning" class="pull-right" type="border" style="margin-top: 15px"  @click="startRecTask">Запустить</vs-button>


    </vx-card>
</template>

<script>
import VueSuggestions from 'vue-suggestions';
import r from '../../route';
import { ArrowLeftIcon } from 'vue-feather-icons'
import { mapActions,mapGetters } from 'vuex'
import axios from '../../axios'
import Back from '../../components/Back.vue'
import RecoverTaskPlan from './RecoverTaskPlan.vue'
import draggable from 'vuedraggable'
import Conditions from '../conditionComponents/Conditions.vue'
export default {
    components: { VueSuggestions,
      Back,
      ArrowLeftIcon,
      draggable,
      Conditions,
      RecoverTaskPlan
    },

    data () {
        return {
          flagShowSendsPlan:false,
          pochta:[
            {
              id:'SIMPLE',
              name:'Простое'
            },
            {
              id:'ORDERED',
              name:'Заказное'
            },
          ],
            typeFieldInput:'1',
            filterField:'',
            GpTwo:[
              {
                id:0,
                name:'Нет'
              },
              {
                id:1,
                name:'Да'
              },

            ],
            opt:[
              {
                id:0,
                name:'нет'
              },
              {
                id:1,
                name:'Да'
              }
            ],
            channels:[
              {
                id:0,
                name:'Выгрузка на печать'
              },
              {
                id:1,
                name:'Почта онлайн'
              },
            ],
            GpPay:[
              {
                id:0,
                name:'Нет'
              },
              {
                id:1,
                name:'50 %'
              },
              {
                id:2,
                name:'100%'
              }
            ],
            data:{
                usl:0,
                pochta:null,
                flagReestr:0,
                id_reestr:0,
                function:[],
                id_recover:null,
                limit_count:0,
            },

            label:'Редактирование задачи:',

        }
    },
    mounted(){
        this.getDataOrganizationArr();
        this.getDataReestrsAndCession()
        this.getDataShablonDocumentsStad();
        this.getDataReestrs()
        this.getDataStatuss()
        this.getDataFuncs();
        if(this.$route.params.id!=='new'){
            this.getData(this.$route.params.id);

        }else{
            if(this.$route.query.recover){
                this.data={
                    usl:0,
                    flagReestr:0,
                    id_reestr:0,
                    function:[],
                    id_recover:parseInt(this.$route.query.recover),
                    limit_count:0,

                }

            }
            if(this.$route.query.org){
              this.data={
                usl:0,
                channel:0,
                flagReestr:0,
                id_reestr:0,
                function:[],
                id_recover:-parseInt(this.$route.query.org),
                limit_count:0,

              }

            }
        }


        this.getDataShablonDocuments()

    },

    computed: {
        FuncsArrRecLoc(){
          if(this.filterField==''){
            return this.FuncsArrRec
          }else{
            return this.FuncsArrRec.filter(arr => arr.name.toLowerCase().includes(this.filterField.toLowerCase()))
          }
        },
        optArr(){
          let arr=[];
          arr.push({
            name:'Общий',
            id:0,
          });

          for (let index = 0; index < this.RecoverersArr.length; ++index) {
            if(this.RecoverersArr[index].cession){
              arr.push({
                name:'Договор цессии №'+this.RecoverersArr[index].number+' от '+this.RecoverersArr[index].date+' Взыскатель '+this.RecoverersArr[index].name,
                id:this.RecoverersArr[index].id,
              });
            }
            else{
              arr.push({
                name:'Взыскатель '+this.RecoverersArr[index].name,
                id:this.RecoverersArr[index].id,
              })

            }
          }
          for (let index = 0; index < this.OrganizationArr.length; ++index) {
            arr.push({
              name:'Организация '+this.OrganizationArr[index].name,
              id:-1*this.OrganizationArr[index].id,
            })
          }

          return arr
        },
        ShablonDocumentsArrLocal(){
            if(this.data.id_recover==-1){
                let arr=[];
                let index;
                for (index = 0; index < this.ShablonDocumentsArr.length; ++index) {
                    if(this.ShablonDocumentsArr[index].id_recover==this.data.id_recover){
                        arr.push(this.ShablonDocumentsArr[index]);
                    }

                }

                return arr

            }else{
                return this.ShablonDocumentsArr
            }
        },
        ...mapGetters([
            'User','EditTaskRecover','FuncsGenerateArr','ShablonDocumentsArr','AtrDebtorCredits','AtrDebtorCreditsTotal','FuncsArrRec','StatussArr','ReestrsArrShow','RecoverersArr','OrganizationArr','RecoverersArrOpt','Stad'
        ]),

    },
    methods: {
        showSendsPlan(){
          this.flagShowSendsPlan=true
          console.log(this.data)
        },
        startRecTask(){
            axios.get(r("recoverTask.index"), {
                params: {
                    method: 'startRecTask',
                    param: this.data
                }
            }).then((response) => {

                if(response.data.result){
                    this.$vs.notify({  title:'Успешно', text: 'Запущенно!!!', color: 'success', position: 'top-center' })
                    // this.$router.push('/handbook/jurisdiction/')
                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Выполнить не удалось !!!', color: 'danger', position: 'top-center' })
                }

            })
        },
        delItem(item){
            for(let i=0;i<this.data.function.length;i++){
                if(this.data.function[i].name==item.name){
                    this.data.function.splice(i, 1);
                }
            }
        },
        addItem(item){
            if(this.data.function==null){
                this.data.function=[];
            }
            this.data.function.push(item)
        },
        clear(){
            this.data.function=[];
        },
        close(){
            this.data={
                id:'new',
                usl:0,
                channel:0,
                flagReestr:0,
                id_reestr:0,
                function:[],
                id_recover:null,
                pochta:null,
                limit_count:0,
            },
                this.id_recover=null
            this.$router.back()


        },

        ...mapActions([
            'saveRecoverTask','getDataOrganizationArr','getDataReestrsAndCession', 'getDataShablonDocuments','getDataFuncs','getDataStatuss','getDataReestrs','getDataShablonDocumentsStad'
        ]),
        getData(id){
            axios.get(r("recoverTask.index"), {
                params: {
                    method: 'getRecoverTask',
                    param: id
                }
            }).then((response) => {
                if (response.data.result){
                    this.data=response.data.data;

                }
            })
        },
        save(){
            if(this.data.id_status_dop==this.data.id_status&&this.data.id_reestr==0){
                this.$vs.notify({  title:'Ошибка', text: 'Основной и дополнительный статус не может быть одинаковым !!!', color: 'danger', position: 'top-center' })
                //   return
            }
            this.data.id=this.$route.params.id
            if(this.data.channel==0){
              this.data.pochta=null;
            }
            this.saveRecoverTask(this.data).then((response) => {
                if(response){
                    this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    if(this.$route.params.id=='new'){
                        this.$router.back()
                    }
                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                }
            })
            this.$router.back()
        },


    },
}
</script>
