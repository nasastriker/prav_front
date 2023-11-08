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
        <label style="margin-bottom: 10px">{{label}} </label>
        <vs-input class="w-full mb-base" label-placeholder="Название" v-model="data.name"></vs-input>

        <vs-input class="w-full mb-base" label-placeholder="Функция" v-model="data.function"></vs-input>
        <label >Указать статус для которого используется функция, только для функций в статусах </label>
        <v-select    v-if="ShowStatusChange"   class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="data.id_status"   ></v-select>
         <label >Подсказка </label>
         <vs-textarea class="w-100"  v-model="data.text" > </vs-textarea>
        <vs-checkbox style="margin-top: 15px" v-model="data.rec" >Отображать во взыскателях</vs-checkbox>
        <vs-checkbox style="margin-top: 15px" v-model="data.not_show" >Не показывать</vs-checkbox>
        <vs-checkbox style="margin-top: 15px" v-model="data.generate" >Функция формирования</vs-checkbox>
        <vs-checkbox style="margin-top: 15px" v-model="data.fns" >Отображать в фнс</vs-checkbox>
        <vs-checkbox style="margin-top: 15px" v-model="data.return_bank" >Отображать в возрат банк</vs-checkbox>
        <vs-checkbox style="margin-top: 15px" v-model="data.showshedule" >Отображать в расписании функций</vs-checkbox>
        <vs-checkbox style="margin-top: 15px" v-model="data.date_control" >Отображать в контроле дат</vs-checkbox>
        <vs-checkbox v-if="data.date_control" style="margin-top: 15px;margin-left: 20px;" v-model="data.date_control_group" >Групповая функция в контроле дат</vs-checkbox>
      <vs-checkbox style="margin-top: 15px" v-model="data.status_control" >Отображать в контроле статусов</vs-checkbox>
      <vs-checkbox style="margin-top: 15px" v-model="data.show_fssp_schema">Отображать на схеме ФССП</vs-checkbox>
        <FuncPeremen :id_func="EditFunc" ref="funcPeremen"></FuncPeremen>


    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import FuncPeremen from './FuncPeremen.vue'
    import { ArrowLeftIcon } from 'vue-feather-icons'
    export default {
        components: {
          FuncPeremen,
          ArrowLeftIcon
        },
        props: {
            id_recover:0,
        },
        data () {
            return {
                data:{
                },
                label:'Редактирование функции:',

            }
        },
        mounted(){
            if(this.EditFunc!=0){
                this.getData(this.EditFunc);
                this.label='Редактирование функции:'
            }
            else{
                this.label='Новая функция'
             
            }
        },

        computed: {
            ...mapGetters([
               'User','ShowEditFunc','EditFunc','ShowStatusChange','StatussArr'
            ]),
        },
        methods: {
            close(){
                this.setShowEditFunc(false)
                this.setEditFunc(0)
            },
            ...mapMutations([
                'setShowEditFunc','setEditFunc'
            ]),
            ...mapActions([
                'saveFunc', 'getDataFuncs'
            ]),
            getData(id){
                axios.get(r("func.index"), {
                    params: {
                        method: 'getFunc',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data;
                    }
                })
            },
            save(){
                this.data.peremenArr=this.$refs.funcPeremen.peremenArr
                this.data.id=this.EditFunc
                this.saveFunc(this.data).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })
                this.setShowEditFunc(false);
                this.setEditFunc(0)
                this.getDataFuncs('')



            },


        },
    }
</script>
