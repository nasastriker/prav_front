<template>
    <vx-card no-shadow>
        <div style=" display: flex" >
            <div class="vx-breadcrumb md:block hidden" style="cursor: pointer;">
                <ul class="flex flex-wrap items-center" style="cursor: pointer;">
                    <li class="inline-flex items-center" style="cursor: pointer;" @click="close">
                        <span class="text-primary cursor-default"><arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" ></arrow-left-icon></span>
                        <span class="breadcrumb-separator mx-2 flex items-start"><span class="feather-icon select-none relative"></span></span>
                    </li>
                </ul>
            </div>
        </div>

        <h3 class="mt-4 mb-4">{{label}}</h3>

        <template v-if="$route.name=='recoverer_shab_id'">
            <h6 class="mb-1">Взыскатель или договор цессии:</h6>
            <v-select class="w-50 mb-4" :reduce="label => label.id" label="name" :options="RecoverersArrOpt" v-model="data.id_recover" ></v-select>
        </template>

        <div class="vx-row" style="padding-top: 5px">
            <div class="vx-col sm:w-1/2 w-full mb-3">
                <h6 class="mb-1 h6">Стадия:</h6>
                <v-select class="w-50 mb-4" style="padding-right: 10px;margin-bottom: 5px"
                          :reduce="label => label.id" label="name" :options="Stad" v-model="data.stad"
                ></v-select>
                <h6 class="mb-1 h6">Вид документа:</h6>
                <v-select  class="w-50 mb-4" style="padding-right: 10px;margin-bottom: 5px" :reduce="label => label.id" label="name" :options="DocumentsVidList" @input="SetVid" v-model="idVidDocument"  ></v-select>
                <h6 class="mb-1 h6">Группа документ:</h6>
                <v-select  class="w-50 mb-4" style="padding-right: 10px;margin-bottom: 5px" :reduce="label => label.id" label="name" :options="DocumentsGroupList" @input="SetGroup" v-model="idGroupDocument"  :disabled="idVidDocument===0"></v-select>
                <h6 class="mb-1 h6">Тип документа:</h6>
                <div class="vx-row" style="padding-right: 10px;margin-bottom: 5px">
                    <div class="vx-col sm:w-5/6 w-full">
                    <v-select  class="w-full "  :reduce="label => label.id" label="name" :options="DocumentsTypeList" @input="SetTypeDocument" v-model="idTypeDocument"  :disabled="idGroupDocument===0"></v-select>
                    </div>
                    <div class="vx-col sm:w-1/6 w-full">
                        <vs-button color="success" style="margin-left: 10px" class="pull-right" type="filled" @click="$router.push('/handbook/type_document/new')">+</vs-button>
                    </div>

                </div>

            </div>






            </div>
            <div class="vx-row" style="padding-top: 5px">

                <div class="vx-col sm:w-1/2 w-full mb-3">
                    <!--<h6 class="mb-1 h6">Фильтр по стадиям:</h6>
                    <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                              :reduce="label => label.id" label="name" :options="Stad" v-model="stad"
                            ></v-select>-->
                    <h6 class="mb-1 h6">Название шаблона:</h6>
                    <vs-input class="w-full mb-base" @input="inputPerem" v-model="data.shablon_name"></vs-input>
                    <vs-checkbox style="margin-bottom: 15px" v-model="data.lk" >Отображать в документах заемщика</vs-checkbox>
                    <h6 class="mb-1 h6" v-if="data.lk">Название кнопки:</h6>
                    <vs-input class="w-full mb-base" v-if="data.lk" v-model="data.lk_button"></vs-input>

                </div>
                <div class="vx-col sm:w-1/2 w-full mb-3">
                    <h6 class="mb-1 h6">Название переменной:</h6>
                    <vs-input class="w-full mb-base" v-model="data.perem" disabled></vs-input>
                </div>


            </div>


            <div class="vx-row" style="padding-top: 5px">

                <div class="vx-col sm:w-1/2 w-full mt-1 mb-4">
                    <h5 class="mb-4">Все документы       <span  style="color:red;float:right" @click="EraseFilterField">Cброс фильтра</span></h5>
                    <vs-input class="w-full mb-base mt-4" placeholder="поиск..." v-model="filterField" @input="FilterFieldInput"></vs-input>


                    <li class="li-border"
                        v-for="(item, index) in filtredShabAllArr"
                        :key="index"
                        v-if="filtredShabAllArr.includes(item)"
                        tag="li"

                    >
                        <template v-if="item.type==1">
                            <template v-if="item.rec==0">

                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ заемщика</span> <span style="color: red" v-if="item.shab==1">{{ item.id }} Шаблон </span>{{ item.name }} <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></span> </strong>
                            </template>
                            <template v-if="item.rec==1">

                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">{{ item.id }} Шаблон </span>{{ item.name }} <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></span> </strong>
                            </template>
                            <template v-if="item.rec==2">

                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span> <span style="color: red" v-if="item.shab==1">{{ item.id }} Шаблон </span>{{ item.name }} <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></span> </strong>
                            </template>

                        </template>
                        <template v-else>
                            <template v-if="item.typeVar==1">
                                <strong><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></strong>

                            </template>
                            <template v-if="item.group===true">
                                <strong><span style="cursor: pointer;color:blue"  > {{ item.name }}</span> <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></strong>
                            </template>
                            <template v-if="item.typeVar!=1&&item.group!==true">
                                <strong><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></strong>

                            </template>


                        </template>

                    </li>


                </div>
                <div class="vx-col sm:w-1/2 w-full mb-3">
                    <v-select  class="w-full mt-10"  :reduce="label => label.shabRecover" label="name" :options="UserShab" :value="selected" @input="setPole"  ></v-select>
                    <h5 class="mb-4 mt-4">Документы</h5>
                    <draggable
                            @change="setDataShab"
                            v-model="data.shabList"
                            tag="ul"
                            class="list-group list-group-flush cursor-move"
                    >
                        <li
                                :title=" item.ob==false?'Необязательнный':'Обязательный'"
                                class="li-border"
                                v-for="(item, index) in data.shabList"
                                :key="index"
                                tag="li"
                                :class=" item.ob==false?'class_true':'else_class'"
                                @dblclick="delItem(index)"
                        >
                            <template v-if="item.type==1">
                                <template v-if="item.rec==0">

                                    <strong><span style="cursor: pointer"  >
                                        <span v-if="checkCondition(item)!==true">
                                        <span style="color: #b57f1b"> Документ заемщика</span>
                                            <span style="color: red" v-if="item.shab==1"> Шаблон</span>  {{ item.name }}
                                            <span ><addConditionShablonButton :index="index" @add="addItemConditionToShablon"></addConditionShablonButton></span>
                                         </span>
                                            <span v-if="checkCondition(item)===true"><addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition></span>
                                             </span>
                                    </strong>
                                </template>
                                <template v-if="item.rec==1">

                                    <strong>
                                        <span style="cursor: pointer"  >

                                            <span v-if="checkCondition(item)!==true">
                                        <span style="color: #b57f1b"> Документ цессии</span>
                                            <span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}
                                            <span ><addConditionShablonButton :index="index" @add="addItemConditionToShablon"></addConditionShablonButton></span>
                                         </span>
                                            <span v-if="checkCondition(item)===true"><addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition></span>
                                        </span>
                                    </strong>
                                </template>
                                <template v-if="item.rec==2">

                                    <strong>
                                        <span style="cursor: pointer"  >
                                             <span v-if="checkCondition(item)!==true">
                                        <span style="color: #b57f1b"> Документ организации</span>
                                            <span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}
                                            <span ><addConditionShablonButton :index="index" @add="addItemConditionToShablon"></addConditionShablonButton></span>
                                         </span>
                                            <span v-if="checkCondition(item)===true"><addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition></span>
                                        </span>
                                    </strong>
                                </template>

                            </template>
                            <template v-if="item.group===true">
                                <strong>
                                    <div class="vx-row">
                                        <div class="vx-col sm:w-4/5 w-full mb-3">
                                            <GroupDocuments v-if="checkCondition(item)!==true" :items="item" :index="index"></GroupDocuments>
                                            <addCondition v-if="checkCondition(item)===true" :item="item" :index="index" @updateItem="updateConditionItem"></addCondition>
                                        </div>
                                        <div class="vx-col sm:w-1/5 w-full mb-3">
                                            {{item.name}}
                                            <addConditionShablonButton v-if="checkCondition(item)!==true" :index="index" @add="addItemConditionToShablon"></addConditionShablonButton>

                                        </div>
                                    </div>
                                </strong>
                            </template>
                            <template v-if="item.type!=1&&item.typeVar!=1&&item.group!==true">
                                <strong >
                                    <span style="cursor: pointer"  >
                                         <span v-if="checkCondition(item)!==true">
                                        <span style="color: #185d02"> Шаблон</span>
                                              {{ item.name }}
                                            <span ><addConditionShablonButton :index="index" @add="addItemConditionToShablon"></addConditionShablonButton></span>
                                         </span>
                                            <span v-if="checkCondition(item)===true"><addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition></span>
                                        <!--<span style="color: #185d02">Шаблон</span> {{ item.name }}<addConditionShablonButton :index="index" @add="addItemConditionToShablon"></addConditionShablonButton>-->
                                    </span>
                                </strong>

                            </template>
                            <template v-if="item.typeVar===1">
                                <strong >
                                    <span style="cursor: pointer"  >
                                 <span v-if="checkCondition(item)!==true">
                                        <span style="color: #185d02"> Текст</span>
                                              {{ item.name }}
                                            <span ><addConditionShablonButton :index="index" @add="addItemConditionToShablon"></addConditionShablonButton></span>
                                         </span>
                                            <span v-if="checkCondition(item)===true"><addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition></span>
                                        <!--<span style="color: #185d02">Текст</span> {{ item.name }}<addConditionShablonButton :index="index" @add="addItemConditionToShablon"></addConditionShablonButton>-->
                                    </span>
                                </strong>

                            </template>
                        </li>



                    </draggable>

                    <div style="margin-top: 10px">
                        <vs-row>
                                <vs-button color="warning" class="pull-right mr-4 mt-4" type="border"   @click="clear">Очистить</vs-button>
                                <vs-button color="warning" class="pull-right mr-4 mt-4" type="border"   @click="popupActive4=!popupActive4">Сохранить поля</vs-button>
                                <vs-button color="success"  class="pull-right mr-4 mt-4" type="filled" style="height: 41px;"   @click="save">Сохранить</vs-button>
                        </vs-row>
                    </div>


                </div>

            </div>

            <vs-popup style="min-height: 200px!important;" classContent="popup-example" title="Сохранение " :active.sync="popupActive4">
                <h6 class="h6">Название шаблона :</h6>
                <vs-input v-model="nameShab"  ></vs-input>

                <div class="flex flex-wrap">
                    <vs-button class="w-1/3 mt-4" color="primary" type="filled" @click="savePole">Сохранить</vs-button>
                </div>


                <template v-for="(item,index) in UserShab">
                    <div style="margin-left: 10px;margin-right: 10px;color: red"  class="hover:text-primary cursor-pointer">
                        {{ item.name }} <span @click="delData(item.id)">Удалить</span>
                    </div>

                    <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                </template>


            </vs-popup>




    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import draggable from 'vuedraggable'
    import addToShablonButtons from '../Handbook/Shablon/Render/addToShablonButtons.vue'
    import addConditionShablonButton from '../Handbook/Shablon/Render/addConditionShablonButton.vue'
    import addCondition from '../Handbook/Shablon/Render/addCondition.vue'
    import GroupDocuments from '../Handbook/Shablon/Render/GroupDocuments.vue'
    export default {
        components: {
              draggable,ArrowLeftIcon,addToShablonButtons,addCondition,GroupDocuments,addConditionShablonButton
        },
        data () {
            return {
                idVidDocument:0,
                idGroupDocument:0,
                idTypeDocument:0,
                filtredShabAllArr:[],
                filterField:'',
                delay: 700,
                clicks: 0,
                timer: null,
                counter:0,
                nameShab:'',
                selected:{},
                popupActive4:false,
                stad:null,
                email:'',
                popupActive:false,
                documentWord:'/word-logo.png',
                documentUrl:'',
                label:'Редактирование шаблона:',
                data:{
                    id_type_document:0,
                    constr:1,
                    shabList:[],
                },
            }
        },
        mounted(){
            this.getDocumentsVidList()
            if(this.$route.params.id=='new'){
                this.data={
                    id_recover:null,
                    shablon_name:'',
                    perem:'',
                    id:'new',
                    constr:1,
                    shabList:[],
                }
            }
            if(this.EditShabRecEdit!=0&&this.$route.params.id!='new'){
                this.getData(this.EditShabRecEdit);
                this.label='Редактирование шаблона:'
            }
            else{
                this.label='Новый шаблон'

            }
            this.getDataUserShab();
            this.getDataShablonDocumentsStad();
            this.getDataShabAlls().then((response)=>{
                this.filtredShabAllArr=this.ShabAllArrStadwithGroup.filter(arr => arr.name!='')
            });

        },

        computed: {

            ...mapGetters([
                'ShabAllArr','ShowShabRecEdit','EditShabRecEdit','Stad','User','UserShab','RecoverersArr','RecoverersArrOpt',
                'DocumentsVidList','DocumentsGroupList','DocumentsTypeList'
            ]),
            ShabAllArrStadwithGroup(){
                let arr=[]
                if(this.stad==null){
                    arr=_.clone(this.ShabAllArr)
                }
                else{
                    arr=this.ShabAllArr.filter(el=>el.stad===this.stad)

                }
                arr.unshift({name:'Создать группу документов',group:true})
                return arr;
            },
            ShabAllArrStad(){
                if(this.stad==null){
                    return this.ShabAllArr
                }
                else{
                    let $arr=[]
                    for (let i=0;i<this.ShabAllArr.length;i++){
                        if(this.ShabAllArr[i].stad==this.stad){
                            $arr.push(this.ShabAllArr[i])
                        }

                    }

                    return $arr;
                }
            },


        },
        methods: {

            deb(item){
              if(item)return 'trre'
              return 'false'
            },
            SetVid(){
                if(this.idVidDocument===null)this.idVidDocument=0
                if(this.idVidDocument!==0)this.getDocumentsGroupList(this.idVidDocument)
                else this.idGroupDocument=0
            },
            addItemConditionToShablon(index){
                    this.data.shabList[index].condition=[]
                    this.data.shabList[index].con=true
                    let name=this.data.shabList[index].name
                    this.data.shabList[index].name=this.data.shabList[index].name+' '
                    this.data.shabList[index].name=name
                    this.data.shabList[index].operation_condition='and'
                    console.log(this.data.shabList[index])
            },
            SetGroup(){
                if(this.idGroupDocument===null)this.idGroupDocument=0
                if(this.idGroupDocument!==0)this.getDocumentsTypeList({id_vid:this.idVidDocument,id_group:this.idGroupDocument})
                else this.idTypeDoucument=0

            },
            SetTypeDocument(){
                if(this.idTypeDocument===null)this.idTypeDocument=0
            },
            EraseFilterField(){
                this.filterField=''
                this.FilterFieldInput()
            },
            FilterFieldInput(){
                this.filtredShabAllArr=this.ShabAllArrStadwithGroup.filter(arr => arr.name.toLowerCase().includes(this.filterField.toLowerCase()))
            },

            inputPerem(){
                this.data.perem=this.translit(this.data.shablon_name).split(' ').join('_')


            },
            translit(word){
                var answer = '';
                var converter = {
                    'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
                    'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
                    'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
                    'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
                    'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
                    'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
                    'э': 'e',    'ю': 'yu',   'я': 'ya',

                    'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
                    'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
                    'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
                    'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
                    'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
                    'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
                    'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
                };

                for (var i = 0; i < word.length; ++i ) {
                    if (converter[word[i]] == undefined){
                        answer += word[i];
                    } else {
                        answer += converter[word[i]];
                    }
                }

                return answer.toLowerCase();
            },
            delData(id){
                this.delUserShab(id)
                this.popupActive4=false;
            },
            setPole(event){
                this.data.shabList=event
                // console.log(event)
            },
            savePole(){

                this.setUserShab({
                    name:this.nameShab,
                    poles:this.data.shabList,
                })
                this.popupActive4=false;
            },

            close(){
                this.setShowShabRecEdit(false)
                if(this.$route.name=='recoverer_shab_id'){
                    this.$router.back()
                }
            },
            deleLocal(index){
             this.data.shabList.splice(index, 1);
            },
            delItem(index){
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Внимание',
                    text: 'Вы действительно хотите удалить '+this.data.shabList[index].name,
                    accept: this.deleLocal,
                    cancel:this.cancel,
                    acceptText: 'Да',
                    cancelText: 'Нет',
                    parameters: index
                })

            },
            setDataShab(){

            },
            clear(){
                this.data.shabList=[];
            },
            oneClick: function(item){
                if(this.data.shabList==null){
                    this.data.shabList=[];
                }
                this.clicks++
                if(this.clicks === 1) {
                    var self = this
                    this.timer = setTimeout(function() {
                        item.ob=false
                        self.data.shabList.push(item)
                        self.clicks = 0
                    }, this.delay);
                } else{
                    clearTimeout(this.timer);
                    item.ob=true
                    this.data.shabList.push(item)
                    this.clicks = 0;
                }
            },
            addItemNotOb(item){
                if(this.data.shabList==null){
                    this.data.shabList=[];
                }
                item.ob=false
                this.data.shabList.push(item)
            },
            addItem(item){
                if(this.data.shabList==null){
                    this.data.shabList=[];
                }
                item.ob=true
                this.data.shabList.push(item)
            },

            testDoc(){

                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'testDocRec',
                        param:{
                            id:this.data.id,
                            id_recover:this.data.id_recover,

                        }


                    }
                }).then((response) => {

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();

                    this.$vs.loading.close()


                }).catch(error => {

                    this.$vs.loading.close()
                    let decodedString = String.fromCharCode.apply(null, new Uint8Array(error));
                    let obj = JSON.parse(decodedString);
                    let message = obj['message'];
                    const regex = /Exception:(.*?)ExceptionEnd/;
                    const str = message
                    let m;
                    let mess='Ошибка';
                    if ((m = regex.exec(str)) !== null) {
                        // The result can be accessed through the `m`-variable.
                        m.forEach((match, groupIndex) => {
                            if(groupIndex==1){
                                mess=match;
                            }
                        });
                    }

                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: mess,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            test(){

                    this.popupActive=true


            },
            checkCondition(item){
                if(typeof item.con=='undefined')return false
                return item.con
            },
            addItemToShablon(index,type){
                if(this.data.shabList==null){
                    this.data.shabList=[];
                }
                let shab
                if(index===0&&this.filtredShabAllArr[index]===this.ShabAllArrStadwithGroup[index]){
                    shab={name:'',group:true,documents:[]}
                }
                else shab=_.clone(this.filtredShabAllArr[index])
                shab.ob=type===1||type===3
                // if(type===3||type===4){
                //     shab.condition=[]
                //     shab.con=true
                //     shab.operation_condition='and'
                // }



                this.data.shabList.push(shab)

            },
            updateConditionItem(item,index){
            },

            ...mapMutations([
                'setShowShabRecEdit','setEditShabRecEdit'
            ]),
            ...mapActions([
                'setDataUser','getDataShablonDocumentsStad','setUserShab','getDataUserShab','delUserShab','getDocumentsVidList',
                'getDocumentsGroupList','getDocumentsTypeList'
            ]),



            ...mapActions([
                'saveShablonDocument','getDataShabAlls','getDataShablonDocuments'
            ]),
            getData(id){
                axios.get(r("shablonDocument.index"), {
                    params: {
                        method: 'getShablonDocument',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                        this.idVidDocument=this.data.id_vid_document||0
                        this.getDocumentsVidList().then((res)=>{
                            this.getDocumentsGroupList(this.idVidDocument).then((re)=>{
                                this.idGroupDocument=this.data.id_group_document||0
                                this.getDocumentsTypeList({id_vid:this.idVidDocument,id_group:this.idGroupDocument}).then((r)=>{
                                    this.idTypeDocument=this.data.id_type_document||0
                                })
                            })
                        })
                    }



                })
            },

            save(){
                this.data.constr=1;
                this.data.id_type_document=this.idTypeDocument
                if(typeof  this.data.shablon_name=='undefined'){
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Не заполнено название шаблона',
                        color: 'danger',
                        position: 'top-center'
                    })
                    return;
                }
                if(this.data.constr===1){
                    let err=this.data.shabList.some(shab=>{
                        return ((shab.con||false)===true&&shab.condition.length===0)
                    })
                    if(err){
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Заполните условия в полях шаблона с условиями',
                            color: 'danger',
                            position: 'top-center'
                        })
                        return
                    }
                    err=this.data.shabList.some(shab=>{
                        return ((shab.group||false)===true&&shab.documents.length===0)
                    })
                    if(err){
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Заполните документы в группах или удалите пустые группы документов' ,
                            color: 'danger',
                            position: 'top-center'
                        })
                        return
                    }
                }
                if(this.data.shablon_name==null||this.data.shablon_name==''){
                        this.data.perem='shab_'+this.translit(this.data.shablon_name)
                }
                if(this.$route.name!='recoverer_shab_id'){
                    this.data.id_recover=this.$route.params.id
                }else {
                    if(this.$route.params.id=='new'){
                        this.data.id=this.$route.params.id;
                    }
                }
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("shablonDocument.update"), {
                    params: {
                        method: 'save',
                        param: this.data

                    }
                }).then((response) => {
                    this.getDataShablonDocuments()
                    this.setShowShabRecEdit(false)
                    this.setEditShabRecEdit(0)
                    this.$vs.loading.close()
                    if (response.data.result){
                        if(this.$route.params.id=='new'){
                           this.$router.back();
                        }
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.getData();
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.data.mess,
                            color: 'danger',
                            position: 'top-center'
                        })
                    }



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

        },
    }
</script>
<style>
.class_true{
  background-color: palegreen;
}
.else_class{
  background-color: pink;
}
</style>