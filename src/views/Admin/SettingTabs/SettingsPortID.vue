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
            <vs-button style="margin-left: auto;margin-right: 0em" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>
        <label style="margin-bottom: 10px">{{label}} </label>
        <vs-input class="w-full mb-base" label-placeholder="Название"  v-model="data.work"></vs-input>

        <vs-input class="w-full mb-base" label-placeholder="Функция"  v-model="data.comment"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="IP адрес" v-model="data.ip"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Порт" v-model="data.port"></vs-input>


    </vx-card>
</template>

<script>
    import VueSuggestions from 'vue-suggestions';
    import r from '../../../route';
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../../axios'

    import vSelect from 'vue-select'
    export default {
        components: { VueSuggestions, ArrowLeftIcon, 'v-select': vSelect,
        },

        data () {
            return {
                editPorts:false,
                data:{
                },
                label:'Редактирование портов:',

            }
        },


        computed: {
            ...mapGetters([
                'ShowEditSelPorts','SelPortsOnes' //  'User','ShowEditFunc','EditFunc',
            ]),

        },
        methods: {
            close(){
                /*
                this.setShowEditFunc(false)
                this.setEditFunc(0)*/
                this.getSelPortsAll()
                this.setShowEditPorts(false)
            },
            ...mapMutations([
              //  'setShowEditFunc','setEditFunc'
               'setShowEditPorts'


            ]),
            ...mapActions([
                'getSelPortsAll', //  'saveFunc', 'getDataFuncs',
            ]),
            getData( id ){

                if(id!==0){
                axios.get(r("selports.index"), {
                    params: {
                        method: 'getSelPortsOnes',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.data=response.data.data;
                    }

                })
              }
              else this.data={
                  work:'',
                  comment:'',
                  id:id,
                  ip:'',
                  port:''
                }
            },
            save(){

                axios.post(r("selports.update"), {
                    params: {
                        method: 'SaveSelPortsOnes',
                        param: {
                            editPorts:this.editPorts,
                            data: this.data,


                        }

                    }
                }).then((response) => {
                    if(response.data.result) {

                        if (response.data.exist) {
                            this.$vs.dialog({
                                type: 'confirm',
                                color: 'danger',
                                title: 'Такая запись уже существует',
                                text: 'Такая запись уже существует. Вы действительно хотите перезаписать? ',
                                accept: () => {
                                    this.editPorts = true
                                    this.data.id=response.data.id
                                    this.save()
                                    this.close()
                                    this.getSelPortsAll()
                                },

                                acceptText: 'Перезписать',
                                cancelText: 'Отмена'
                            })
                        }
                        else
                            {
                                this.$vs.notify({
                                    title: 'Успешно',
                                    text: 'Сохранено!!!',
                                    color: 'success',
                                    position: 'top-center'
                                })
                                this.close()
                            }

                    }
                    else{
                            this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                           // this.close();
                        }


                })

                this.getSelPortsAll()
            },


        },
        mounted(){

            this.getData(this.SelPortsOnes)
            if (this.SelPortsOnes==0)this.editPorts=false
            else this.editPorts=true

        },
    }
</script>
