<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div style="margin: 0 -15px 15px;">
                <Back></Back>
            </div>
            <h3>{{label}}</h3>
            <!--<vs-checkbox style="margin-bottom: 15px" v-model="data.constr" >Конструктор</vs-checkbox>-->
            <template>
                <div class="vx-row" style="padding-top: 20px">

                    <div class="vx-col sm:w-1/2 w-full mb-3">
                        <h6 class="mb-1">Стадия:</h6>
                        <v-select class="w-50 mb-4" style="padding-right: 10px;margin-bottom: 5px"
                                  :reduce="label => label.id" label="name" :options="Stad" v-model="data.stad"
                        ></v-select>
                        <h6 class="mb-1">Название шаблона:</h6>
                        <vs-input class="w-full mb-4" v-model="data.shablon_name"></vs-input>

                    </div>
                    <!--      <div class="vx-col sm:w-1/2 w-full mb-3">
                              <h6 class="mb-1">Название переменной:</h6>
                              <vs-input class="w-full mb-base" v-model="data.perem"></vs-input>
                          </div>-->

                </div>
                <h5 class="mb-4"> Условия выполнения шаблона</h5>
                <addCondition :item="data.shab_condition_list"></addCondition>
                <div class="vx-row" style="padding-top: 20px">

                    <div class="vx-col sm:w-1/2 w-full mb-3" style="max-height: 600px;overflow-y: scroll;">
                        <h5>Все поля       <span  style="color:red;float:right; cursor: pointer;" @click="EraseFilterField">Cброс фильтра</span></h5>
                        <vs-input class="w-full mb-base" placeholder="поиск..." v-model="filterField" @input="FilterFieldInput"></vs-input>
                        <li class="li-border"
                            v-for="(item, index) in filtredShabAllArr"
                            :key="index"
                            tag="li"

                        >
                            <template v-if="item.type==1">
                                <template v-if="item.rec==0">

                                    <strong>
                                    <span style="cursor: pointer"  >
                                        <span style="color: #b57f1b">Документ заемщика</span>
                                        <span style="color: red" v-if="item.shab==1">Шаблон </span>
                                        {{ item.name }}
                                        <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span>
                                    </span>
                                    </strong>
                                </template>
                                <template v-if="item.rec==1">

                                    <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }}</span> <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></strong>
                                </template>
                                <template v-if="item.rec==2">

                                    <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span> <span style="color: red" v-if="item.shab==1">Шаблон </span>{{ item.name }}</span> <span><addToShablonButtons :index="index" @add="addItemToShablon"></addToShablonButtons></span></strong>
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
                        <h5>Поля шаблона</h5>
                        <vs-tabs v-model="activeTab">
                            <vs-tab label="Включаемые однократно">
                                <h5 style="color: red">Обязательные документы</h5>
                                <draggable
                                        @change="setDataShab"
                                        v-model="data.shabList"
                                        tag="ul"
                                        class="list-group list-group-flush cursor-move"
                                >
                                    <li
                                            class="li-border"
                                            v-for="(item, index) in data.shabList"
                                            :key="index"
                                            tag="li"
                                            v-if="(item.ob==true||item.ob==null)&&checkCondition(item)===false"
                                            @dblclick="delItem(index)"
                                    >
                                        <template v-if="item.type==1">
                                            <template v-if="item.rec==0">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ заемщика</span>
                                            <span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}
                                               </span>

                                                </strong>
                                            </template>
                                            <template v-if="item.rec==1">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span> </strong>
                                            </template>
                                            <template v-if="item.rec==2">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span> </strong>
                                            </template>

                                        </template>
                                        <template v-if="item.group===true">
                                            <strong><GroupDocuments :items="item" :index="index"></GroupDocuments> </strong>
                                        </template>
                                        <template v-if="item.type!=1&&item.typeVar!=1&&item.group!==true">
                                            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>

                                        </template>
                                        <template v-if="item.typeVar===1">
                                            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>

                                        </template>
                                    </li>


                                </draggable>
                                <h5  style="color: green;margin-top: 20px">Необязательные документы</h5>
                                <draggable
                                        @change="setDataShab"
                                        v-model="data.shabList"
                                        tag="ul"
                                        class="list-group list-group-flush cursor-move"
                                >
                                    <li
                                            class="li-border"
                                            v-for="(item, index) in data.shabList"
                                            v-if="item.ob==false&&checkCondition(item)===false"
                                            :key="index"
                                            tag="li"
                                            @dblclick="delItem(index)"
                                    >
                                        <template v-if="item.type==1">
                                            <template v-if="item.rec==0">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ заемщика</span>
                                            <span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}
                                               </span>

                                                </strong>
                                            </template>
                                            <template v-if="item.rec==1">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span> </strong>
                                            </template>
                                            <template v-if="item.rec==2">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span> </strong>
                                            </template>

                                        </template>
                                        <template v-if="item.group===true">
                                            <strong><GroupDocuments :items="item" :index="index"></GroupDocuments> </strong>
                                        </template>
                                        <template v-if="item.type!=1&&item.typeVar!=1&&item.group!==true">
                                            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>

                                        </template>
                                        <template v-if="item.typeVar===1">
                                            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>

                                        </template>
                                    </li>


                                </draggable>
                                <h5 style="color: orange;margin-top: 20px">Обязательные документы с условием</h5>
                                <draggable
                                        @change="setDataShab"
                                        v-model="data.shabList"
                                        tag="ul"
                                        class="list-group list-group-flush cursor-move"
                                >
                                    <li
                                            class="li-border"
                                            v-for="(item, index) in data.shabList"
                                            :key="index"
                                            tag="li"
                                            v-if="(item.ob==true||item.ob==null)&&checkCondition(item)===true"
                                            @dblclick="delItem(index)"
                                    >
                                        <addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition>
                                    </li>


                                </draggable>

                                <h5  style="color: cornflowerblue;margin-top: 20px">Необязательные документы с условием</h5>
                                <draggable
                                        @change="setDataShab"
                                        v-model="data.shabList"
                                        tag="ul"
                                        class="list-group list-group-flush cursor-move"
                                >
                                    <li
                                            class="li-border"
                                            v-for="(item, index) in data.shabList"
                                            v-if="item.ob==false&&checkCondition(item)===true"
                                            :key="index"
                                            tag="li"
                                            @dblclick="delItem(index)"
                                    >
                                        <addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition>
                                    </li>


                                </draggable>

                            </vs-tab>
                            <vs-tab label="Для каждого заемщика">
                                <!--group-->
                                <h5 style="color: red">Обязательные документы</h5>
                                <draggable
                                        @change="setDataShab"
                                        v-model="data.shabListGroup"
                                        tag="ul"
                                        class="list-group list-group-flush cursor-move"
                                >
                                    <li
                                            class="li-border"
                                            v-for="(item, index) in data.shabListGroup"
                                            :key="index"
                                            tag="li"
                                            v-if="(item.ob==true||item.ob==null)&&checkCondition(item)===false"
                                            @dblclick="delItem(index)"
                                    >
                                        <template v-if="item.type==1">
                                            <template v-if="item.rec==0">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ заемщика</span>
                                            <span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}
                                               </span>

                                                </strong>
                                            </template>
                                            <template v-if="item.rec==1">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span> </strong>
                                            </template>
                                            <template v-if="item.rec==2">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span> </strong>
                                            </template>

                                        </template>
                                        <template v-if="item.group===true">
                                            <strong><GroupDocuments :items="item" :index="index"></GroupDocuments> </strong>
                                        </template>
                                        <template v-if="item.type!=1&&item.typeVar!=1&&item.group!==true">
                                            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>

                                        </template>
                                        <template v-if="item.typeVar===1">
                                            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>

                                        </template>
                                    </li>


                                </draggable>
                                <h5  style="color: green;margin-top: 20px">Необязательные документы</h5>
                                <draggable
                                        @change="setDataShab"
                                        v-model="data.shabListGroup"
                                        tag="ul"
                                        class="list-group list-group-flush cursor-move"
                                >
                                    <li
                                            class="li-border"
                                            v-for="(item, index) in data.shabListGroup"
                                            v-if="item.ob==false&&checkCondition(item)===false"
                                            :key="index"
                                            tag="li"
                                            @dblclick="delItem(index)"
                                    >
                                        <template v-if="item.type==1">
                                            <template v-if="item.rec==0">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ заемщика</span>
                                            <span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}
                                               </span>

                                                </strong>
                                            </template>
                                            <template v-if="item.rec==1">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ цессии</span> <span style="color: red" v-if="item.shab==1">Шаблон</span> {{ item.name }}</span> </strong>
                                            </template>
                                            <template v-if="item.rec==2">

                                                <strong><span style="cursor: pointer"  ><span style="color: #b57f1b">Документ организации</span><span style="color: red" v-if="item.shab==1">Шаблон</span>  {{ item.name }}</span> </strong>
                                            </template>

                                        </template>
                                        <template v-if="item.group===true">
                                            <strong><GroupDocuments :items="item" :index="index"></GroupDocuments> </strong>
                                        </template>
                                        <template v-if="item.type!=1&&item.typeVar!=1&&item.group!==true">
                                            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Шаблон</span> {{ item.name }}</span> </strong>

                                        </template>
                                        <template v-if="item.typeVar===1">
                                            <strong ><span style="cursor: pointer"  ><span style="color: #185d02">Текст</span> {{ item.name }}</span> </strong>

                                        </template>
                                    </li>


                                </draggable>
                                <h5 style="color: orange;margin-top: 20px">Обязательные документы с условием</h5>
                                <draggable
                                        @change="setDataShab"
                                        v-model="data.shabListGroup"
                                        tag="ul"
                                        class="list-group list-group-flush cursor-move"
                                >
                                    <li
                                            class="li-border"
                                            v-for="(item, index) in data.shabListGroup"
                                            :key="index"
                                            tag="li"
                                            v-if="(item.ob==true||item.ob==null)&&checkCondition(item)===true"
                                            @dblclick="delItem(index)"
                                    >
                                        <addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition>
                                    </li>


                                </draggable>

                                <h5  style="color: cornflowerblue;margin-top: 20px">Необязательные документы с условием</h5>
                                <draggable
                                        @change="setDataShab"
                                        v-model="data.shabListGroup"
                                        tag="ul"
                                        class="list-group list-group-flush cursor-move"
                                >
                                    <li
                                            class="li-border"
                                            v-for="(item, index) in data.shabListGroup"
                                            v-if="item.ob==false&&checkCondition(item)===true"
                                            :key="index"
                                            tag="li"
                                            @dblclick="delItem(index)"
                                    >
                                        <addCondition :item="item" :index="index" @updateItem="updateConditionItem"></addCondition>
                                    </li>


                                </draggable>
                                <!--end group-->
                            </vs-tab>
                        </vs-tabs>




                        <vs-button color="warning" class="pull-right" type="border" style="margin-top: 15px"  @click="clear">Очистить</vs-button>


                    </div>

                </div>
                <div style="margin-top: 10px">
                    <vs-row>
                        <vs-col vs-offset="6"  vs-type="flex" vs-justify="center" vs-align="center" >
                            <!--<vs-button color="primary"  class="pull-right" type="filled"  @click="testDoc">Тест</vs-button>-->
                            <vs-button color="success"  class="pull-right" type="filled" style="margin-left: 10px;"   @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>
            </template>


        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    import Back from '../../../components/Back.vue'
    import Open from './Render/OpenPerem.vue'
    import draggable from 'vuedraggable'
    import { VueEditor } from "vue2-editor";
    import 'vueditor/dist/style/vueditor.min.css'
    import addToShablonButtons from './Render/addToShablonButtons.vue'
    import VueClipboard from 'vue-clipboard2'
    import addCondition from './Render/addCondition.vue'
    import GroupDocuments from './Render/GroupDocuments.vue'
    VueClipboard.config.autoSetContainer = true // add this line
    Vue.use(VueClipboard)
    export default {
        components: {
            Back,  draggable,Open,VueEditor,addToShablonButtons,addCondition,GroupDocuments,
        },
        data () {
            return {
                activeTab:0,
                inputDoc:false,
                namePeremen:'',
                typePeremen:'',
                filtredShabAllArr:[],
                filterField:'',
                avto:0,
                avto1:0,
                delay: 700,
                clicks: 0,
                timer: null,
                counter:0,
                peremen:'',
                popupGroup:false,
                gridApi: null,
                gridOptions: {
                    deleteRow:this.changeStad
                },
                showAddPeremen:false,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Название',
                        field: 'name',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'Переменная',
                        field: 'peremen',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'Тип',
                        field: 'type',
                        filter: true,
                        width: 250,
                    },

                    {
                        headerName: 'Операции',
                        field: 'name',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'Open',
                    },
                ],
                components: {
                    Open,

                },
                stad:null,
                email:'',
                popupActive:false,
                documentWord:'/word-logo.png',
                documentUrl:'',
                label:'Редактирование шаблона:',
                data:{
                    constr:0,
                    shabList:[],
                    shabListGroup:[],
                    group_shab:1,
                    shab_condition_list:{
                        operation_condition:'and',
                        condition:[],
                    },
                },
            }
        },
        mounted(){
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                }
                else{
                    this.label='Новый шаблон'
                }


            }
            this.getDataShabAlls().then((response)=>{
                this.filtredShabAllArr=this.ShabAllArrStadwithGroup.filter(arr => arr.name!='')
            });
            this.getDataShablonDocumentsStad();
            this.gridApi = this.gridOptions.api
            if(typeof this.gridApi!='undefined'){
                this.gridApi.deleteRow=this.changeStad
            }


        },

        computed: {
            ...mapGetters([
                'ShabAllArr','Stad','StadGas','User'
            ]),
            // ShabAllArrStadwithGroup(){
            //     let arr=_.clone(this.ShabAllArr)
            //     arr.unshift({name:'Создать группу документов',group:true})
            //     return arr
            // },

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
            }

        },
        methods: {
            Rdeb(){
                console.log(this.ShabAllArrStadwithGroup)
            },
            copy(data){
                data="${"+data+"}"
                this.$copyText(data)

                alert("Скопировано в буфер обмена");
            },
            EditTypeDoc(){
                if (this.User.admin==1) this.inputDoc=true
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
            EraseFilterField(){
                this.filterField=''
                this.FilterFieldInput()
            },
            FilterFieldInput(){
                this.filtredShabAllArr=this.ShabAllArrStadwithGroup.filter(arr => arr.name.includes(this.filterField))
            },
            addDocumentToGroup(){

            },
            addTextVar(){
                this.data.text_var.push({
                    name:'',
                    text:''
                })
            },
            delTextVar(item){
                for(let i=0;i<this.data.text_var.length;i++){
                    if(this.data.text_var[i].name==item.name){
                        this.data.text_var.splice(i, 1);
                    }
                }
            },
            addPer(){
                if(this.data.sud_peremen==null){
                    this.data.sud_peremen=[];
                }
                this.data.sud_peremen.push(
                    {
                        name:this.namePeremen,
                        peremen:this.peremen,
                        avto:this.avto,
                        type:this.typePeremen,
                    }
                )
                this.namePeremen='';
                this.avto=0;
                this.typePeremen='';
                this.peremen='';
                this.showAddPeremen=false;
            },
            addPeremen(){
                this.showAddPeremen=true;
            },
            changeStad(e){
                if(this.data.sud_peremen==null){
                    this.data.sud_peremen=[];
                }
                this.data.sud_peremen.splice(e, 1);
            },
            checkCondition(item){
                if(typeof item.con=='undefined')return false
                return item.con
            },

            delItem(index){
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Внимание',
                    text: 'Вы действительно хотите удалить '+(this.data.shabList[index].name||((this.data.shabList[index].group!==true)?'':'группу документов')),
                    accept: this.deleLocal,
                    cancel:this.cancel,
                    acceptText: 'Да',
                    cancelText: 'Нет',
                    parameters: index
                })

            },
            deleLocal(index){
                if(this.activeTab===0)this.data.shabList.splice(index, 1);
                if(this.activeTab===1)this.data.shabListGroup.splice(index, 1);
            },

            setDataShab(){

            },
            clear(){
                this.data.shabList=[];
                this.data.shabListGroup=[];
            },

            addItemToShablon(index,type){
                let shablonList=this.activeTab===0?this.data.shabList:this.data.shabListGroup
                if(shablonList==null){
                    shablonList=[];
                }
                let shab
                if(index===0&&this.filtredShabAllArr[index]===this.ShabAllArrStadwithGroup[index]){
                    shab={group:true,documents:[]}
                }
                else shab=_.clone(this.filtredShabAllArr[index])
                shab.ob=type===1||type===3
                if(type===3||type===4){
                    shab.condition=[]
                    shab.con=true
                    shab.operation_condition='and'
                }



               shablonList.push(shab)
            },
            updateConditionItem(item,index){
            },
            sendServer(){
                axios.post(r("email.index"), {
                    params: {
                        method: 'sendTest',
                        param: {
                            id:this.data.id,
                            email:this.email,
                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Отправлено' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Отправить не удалось' , color: 'danger', position: 'top-center' })
                    }
                    this.popupActive=false


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
            testDoc(){

                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'testDoc',
                        param:this.data.id


                    }
                }).then((response) => {

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();

                    this.$vs.loading.close()


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
            test(){

                this.popupActive=true


            },
            close(){
                this.$router.back()
            },
            ...mapActions([
            ]),
            downloadDocument(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getShablonFile',
                        param:this.data.id


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');

                    filename = filename.split('; filename*=utf')[0];
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download',filename);
                    document.body.appendChild(link);
                    link.click();
                    this.$vs.loading.close()

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


            chooseFiles1: function() {
                document.getElementById("fileUpload1").click()
            },
            saveDocument(evt,data){

                this.saveShablonDocument({file:evt.target.files,id:this.$route.params.id,data:data}).then((response) => {
                    this.getData(this.$route.params.id);
                    if(response.result){
                        if(response.id!=this.$route.params.id){
                            this.data.id=response.id
                            this.$router.push('/group_shablon/'+response.id)
                        }
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
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
            ...mapActions([
                'saveShablonDocument','getDataShabAlls','getDataShablonDocumentsStad'
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
                        if(this.data.type==2){
                            if(this.data.text_var.length==0){
                                this.data.text_var.push({
                                    name:'',
                                    text:''
                                })
                            }
                        }
                    }



                })
            },
            save(){
                if(this.data.constr===1){
                    let err=this.data.shabList.some(shab=>{
                        return ((shab.con||false)===true&&shab.condition.length===0)
                    })
                    err=err.concat(this.data.shabListGroup.some(shab=>{
                        return ((shab.con||false)===true&&shab.condition.length===0)
                    }))
                    if(err){
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Заполните условия в полях шаблона с условиями, разделы: Обязательные документы с условием; Необязательные документы с условием',
                            color: 'danger',
                            position: 'top-center'
                        })
                        return
                    }

                    err=this.data.shabList.some(shab=>{
                        return ((shab.group||false)===true&&shab.documents.length===0)
                    })
                    err=err.concat(this.data.shabListGroup.some(shab=>{
                        return ((shab.group||false)===true&&shab.documents.length===0)
                    }))
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
                this.data.shab_con=this.data.shab_condition_list.condition.length!==0
                this.data.group_shab=1
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("shablonDocument.update"), {
                    params: {
                        method: 'save',
                        param: this.data

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
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
