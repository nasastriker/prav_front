<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
        <div style="margin-left: -15px;">
            <Back></Back>
        </div>
        <h3 class="mt-4 mb-4">{{label}}</h3>
        <vs-checkbox style="margin-bottom: 15px; margin-left: 0;" v-model="data.constr" >Конструктор</vs-checkbox>
        <template v-if="data.constr==0">
        <div  style="margin-top: 30px;     max-width: 450px;">

            <h6 class="h6 mb-1">Название шаблона:</h6>
            <vs-input class="w-full mb-4" @input="inputPerem" v-model="data.shablon_name"></vs-input>
            <h6 class="h6 mb-1">Название переменной:<span class="ml-2" style="color: red;cursor: pointer" @click="copy(data.perem)">Copy</span></h6>
            <vs-input class="w-full mb-4"   v-model="data.perem" disabled></vs-input>
        </div >

            <div class="mt-8 ">
                <h6 class="h6">Тип шаблона:</h6>
                <div class="mt-2">
                    <vs-radio v-model="data.type" vs-value="0" class="mr-4"  >Документ</vs-radio>
                    <vs-radio v-model="data.type" vs-value="1" class="mr-4"  >Текст</vs-radio>
                    <vs-radio v-model="data.type" vs-value="2" class="mr-4"  >Картинка</vs-radio>
                </div>
            </div>
            <template v-if='data.type==0'>

                <vs-checkbox class="mt-4" style="margin-left: 0;" v-model="data.lk" >Отображать в документах заемщика</vs-checkbox>
                <h6 class="h6 mb-1" v-if="data.lk">Название кнопки:</h6>
                <vs-input class="w-full mb-4" v-if="data.lk" v-model="data.lk_button"></vs-input>

            </template>
            <h6 class="h6 mb-1 mt-4">Стадия:</h6>

            <v-select class="w-50 mb-4" style="padding-right: 10px;margin-bottom: 5px"
                      :reduce="label => label.id" label="name" :options="Stad" v-model="data.stad"
            ></v-select>

            <h6 class="h6 mb-1">Тип документа для ГАС:</h6>

            <v-select class="w-50 mb-4" style="padding-right: 10px;margin-bottom: 5px"
                      :reduce="label => label.id" label="name" :options="StadGas" v-model="data.stadGas"
            ></v-select>



            <template v-if="data.stad==7">
                <vs-button color="primary"  class="pull-right" type="filled"  @click="addPeremen">Добавить</vs-button>
                <ag-grid-vue
                style="width: 100%;"
                ref="agGridTableL"
                :gridOptions="gridOptions"
                :components="components"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="data.sud_peremen"
                rowSelection="multiple"
                @rowClicked=""
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                @rowDoubleClicked=""
                :enableRtl="$vs.rtl">
                </ag-grid-vue>
                <vs-popup class="holamundo" title="Добавление переменной" :active.sync="showAddPeremen">
                    <label class="text-sm">Название:</label>
                    <vs-input class="w-full mb-base" v-model="namePeremen"></vs-input>
                    <label class="text-sm">Тип переменной :</label>
                    <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                              :options="['text','date']" v-model="typePeremen"
                    ></v-select>
                    <label class="text-sm">Переменная на англ без пробелов:</label>
                    <vs-input class="w-full mb-base" v-model="peremen"></vs-input>

                    <vs-checkbox style="margin-bottom: 15px" v-model="avto" >Заполняется автоматом</vs-checkbox>

                    <vs-button color="primary"  class="pull-right" type="filled"  @click="addPer">Сохранить</vs-button>
                </vs-popup>

            </template>

            <template v-if="User.admin==1">
            <label class="text-sm">Функция обработки(заполняется администратором):</label>
            <vs-input class="w-full mb-base" v-model="data.function"></vs-input>
            <vs-checkbox style="margin-bottom: 10px" v-model="data.system">Системный</vs-checkbox>
            </template>
            <template v-if='data.type==1'>
                <VueEditor style="margin-top: 10px" v-model="data.text" ></VueEditor>
                <div style="margin-top: 10px">
                    <vs-row>
                        <vs-col  vs-type="flex" vs-justify="start" vs-align="center" >
                            <vs-button color="primary"  class="pull-right" type="filled"  @click="test">Тест Email</vs-button>
                            <vs-button color="primary" style="    margin-left: 10px;" class="pull-right" type="filled"  @click="testDoc">Тест Документ</vs-button>
                            <vs-button color="success"  class="pull-right" type="filled" style="margin-left: 10px;"  @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>
                <vs-popup classContent="popup-example"  :active.sync="popupActive">
                    <h6>Укажите email:</h6>
                    <vs-input  class="w-100 mb-base"  v-model="email" />

                    <div style="margin-top: 10px">
                        <vs-row>
                            <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                                <vs-button style="margin-top: 10px" color="primary"  class="w-full mb-base" type="filled"  @click="sendServer">Отправить</vs-button>
                            </vs-col>
                        </vs-row>
                    </div>
                </vs-popup>
            </template>
            <template v-if='data.type==0'>
                <label class="text-sm">Документ:</label>

                <div class="flex flex-wrap items-center mb-base">
                    <div @click="downloadDocument()">
                        <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                    </div>
                    <div>
                        <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить документ</vs-button>
                        <vs-input id="fileUpload1" type="file"  ref="fileInput" class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,data)" style="display: none"/>
                        <template v-if="inputDoc==false">
                        <p class="text-sm mt-2"><span @click="EditTypeDoc">{{data.type_doc}}</span></p>
                        </template>
                        <template v-else>
                            <vs-input v-model="data.type_doc" @blur="inputDoc=false"></vs-input>
                        </template>
                    </div>
                </div>
                <div style="margin-top: 10px">
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="start" vs-align="center" >
                            <vs-button color="primary"  class="pull-right" type="filled"  @click="testDoc">Тест</vs-button>
                            <vs-button color="success"  class="pull-right" type="filled" style="margin-left: 10px;"   @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>
            </template>
            <template v-if='data.type==2'>
                <label class="text-sm">Картинка:</label>
                <div class="flex flex-wrap items-center mb-base">
                    <div @click="downloadDocument()">
                        <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                    </div>
                    <div>
                        <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить документ</vs-button>
                        <vs-input id="fileUpload1" type="file"  ref="fileInput" class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,data)" style="display: none"/>
                        <p class="text-sm mt-2">Документ должен быть jpg</p>
                    </div>
                </div>
                <div style="margin-top: 10px">
                    <vs-row>
                        <vs-col  vs-type="flex" vs-justify="start" vs-align="center" >
                            <vs-button color="primary"  class="pull-right" type="filled"  @click="testDoc">Тест</vs-button>
                            <vs-button color="success"  class="pull-right" type="filled" style="margin-left: 10px;"   @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>
            </template>


            <div style="margin-top: 20px">



            </div>
        </template>
        <template v-else>
            <div class="vx-row" style="padding-top: 20px">

                <div class="vx-col sm:w-1/2 w-full mb-3">
                    <h6 class="mb-1">Стадия:</h6>
                    <v-select class="w-50 mb-4" style="padding-right: 10px;" :reduce="label => label.id" label="name" :options="Stad" v-model="data.stad"></v-select>

                    <h6 class="mb-1">Название шаблона:</h6>
                    <vs-input class="w-full mb-4" v-model="data.shablon_name"></vs-input>

                </div>
          <!--      <div class="vx-col sm:w-1/2 w-full mb-3">
                    <label class="text-sm">Название переменной:</label>
                    <vs-input class="w-full mb-base" v-model="data.perem"></vs-input>
                </div>-->

            </div>
            <h5 class="mb-4"> Условия выполнения шаблона</h5>
            <addCondition :item="data.shab_condition_list"></addCondition>
            <div class="vx-row" style="padding-top: 20px">

                <div class="vx-col sm:w-1/2 w-full mb-3" style="max-height: 600px;overflow-y: scroll;">
                    <div>
                    <h5 class="mb-4">Все поля       <span  style="color:red;float:right" @click="EraseFilterField">Cброс фильтра</span></h5>
                    <vs-input class="w-full mb-base" placeholder="поиск..." v-model="filterField" @input="FilterFieldInput"></vs-input>
                    </div>
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
                    <h5 class="mb-4">Документы</h5>
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
                    <vs-button color="warning" class="pull-right" type="border" style="margin-top: 15px"  @click="clear">Очистить</vs-button>


                </div>

            </div>
            <div class="mt-4">
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="start" vs-align="center" >
                        <vs-button color="primary"  class="pull-right" type="filled"  @click="testDoc">Тест</vs-button>
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
            Back,  draggable,
          Open,
          VueEditor,
          addToShablonButtons,
          addCondition,
          GroupDocuments,
        },
        data () {
            return {
                inputDoc:false,
                filterField:'',
                namePeremen:'',
                typePeremen:'',
                filtredShabAllArr:[],
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
            this.getDataShabAlls().then(res=>{
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
            addDocumentToGroup(){

            },
            EraseFilterField(){
                this.filterField=''
                this.FilterFieldInput()
            },
            FilterFieldInput(){
                this.filtredShabAllArr=this.ShabAllArrStadwithGroup.filter(arr => arr.name.includes(this.filterField))
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
            this.data.shabList.splice(index, 1);
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
            addItem(item){
                if(this.data.shabList==null){
                    this.data.shabList=[];
                }
                this.data.shabList.push(item)
            },

            addItemToShablon(index,type){

                if(this.data.shabList==null){
                    this.data.shabList=[];
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



                this.data.shabList.push(shab)

                /*if(!this.data.shabList.some(shab=>{return shab.peremen===item.peremen&&shab.id===item.id})){
                    this.data.shabList.push(item)
                }
                else{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Данное поле уже добавлено в шаблон',
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                }
*/
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
              this.$refs.fileInput.value = '';
              const formData = new FormData()
              formData.append('document', evt.target.files[0])
              formData.append('id', this.$route.params.id)
              formData.append('data', JSON.stringify(data))
              axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
              axios.post('/shablon/post-document',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  }
              ).then((response) => {
                if (response.data.result) {
                  this.getDataShablonDocuments()

                  if(response.data.id!=this.$route.params.id){
                    this.data.id=response.data.id
                    this.$router.push('/shablon/'+response.data.id)
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
                'saveShablonDocument','getDataShabAlls','getDataShablonDocumentsStad','getDataShablonDocuments'
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
                        if(response.data.id!=this.$route.params.id){
                          this.data.id=response.data.id
                          this.$router.push('/shablon/'+response.data.id)
                        }
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
