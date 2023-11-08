<template>
    <vx-card no-shadow style="min-height: 95vh;">



        <!--    <div class="flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2" @click="add">Добавить статус</vs-button>


            </div>
            <vs-input class="w-full mb-base" label-placeholder="Наименование" v-model="data.name"></vs-input>

            <vs-checkbox style="margin-top: 150px" v-model="data.def">По умолчанию</vs-checkbox>
            <vs-popup classContent="popup-example" title="Статус    " :active.sync="popupActive2">

                <label class="text-sm">Статус:</label>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" v-model="status"  :options="StatussArr"  ></v-select>

                <div style="margin-top: 15px; text-align: center">
                    <vs-button color="primary" type="border"  @click="addDey">Добавить</vs-button>
                </div>



            </vs-popup>
            <template v-if="data.setting!=null">
                <vx-card title="Список :" no-shadow>
                    <VxTimeline :data="data.setting" />
                </vx-card>
            </template>
            <div style="margin-top: 20px">
                <div class="flex flex-wrap items-center justify-end">
                    <vs-button style="margin-right: 20px" color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>

                </div>

            </div>
            -->

            <graph-wrapper/>







    </vx-card>
</template>

<script>
    import GraphWrapper from "./Render/GraphWrapper";
    import VxTimeline from './Render/VxTimeline'

    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import vSelect from 'vue-select'
    export default {
        components: {
            'v-select': vSelect,
            VxTimeline,GraphWrapper
        },

        data () {
            return {

                count:0,
                shablon:'',
                action:0,
                status:0,
                type:0,
                label:'',
                data:{
                    setting:[]
                },
                popupActive2:false,
            }
        },
        mounted(){
            this.getDataStatuss()
            this.getDataFuncs()
            if (this.$route.params.id) {
                if (this.$route.params.id != 'new') {

                    this.getData(this.$route.params.id);
                } else {
                    this.data.id='new'
                }
            }


        },

        computed: {
            FuncArrFilt(){
                let $arr=[]
                for (let i=0;i<this.FuncsArr.length;i++){
                    if(this.FuncsArr.id_status==this.status){
                        $arr.push(this.FuncsArr[i])
                    }

                }

                return $arr;
            },
            ...mapGetters([
                'StatussArr','TotalStatuss','FuncsArr','TotalFuncs',

            ]),

        },
        methods: {

            funcStatus(id_status){
                let arr=[]
                for(let a=0;a<this.FuncsArr.length;a++){
                    if(this.FuncsArr[a].id_status==id_status){
                        arr.push(this.FuncsArr[a])
                    }
                }
                return arr
            },
            addDey(){
                let  stat=''
                for(let a=0;a<this.StatussArr.length;a++){
                    if(this.StatussArr[a].id==this.status){
                        stat=this.StatussArr[a].name
                    }
                }

                let ob={
                    icon:'ChevronsRightIcon',
                    color:'success',
                    stat:stat,
                    status:this.status,
                    func:this.funcStatus(this.status)
                }

                this.status=0
                if(this.data.setting==null){
                    this.data.setting=[]
                }
                this.data.setting.unshift(ob);
                this.data.setting.sort((prev, next) => prev.count - next.count);
                this.popupActive2=false;


                //   console.log(this.shablon);
            },
            ...mapActions([
                'getDataStatuss','getDataTemplSoftsEmail','getTemplSoftsSms','getDataTemplSoftsVoice',
                'getTemplSoftsEmail','getTemplSoftsVoice','getTemplSoftsSms','getDataStatuss','getDataFuncs'
            ]),
            add(){
                this.popupActive2=true;
            },
            close(){

                this.$router.back()
            },
            getData(id){

                axios.get(r("strategy.index"), {
                    params: {
                        method: 'getStrategy',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })
            },
            save(){
                axios.post(r("strategy.index"), {
                    params: {
                        method: 'saveStrategy',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$router.push('/strategy/')
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })



            },


        },
    }
</script>
<style  lang="scss">
    .vs-popup--content {
        min-height: 400px !important;
    }
</style>