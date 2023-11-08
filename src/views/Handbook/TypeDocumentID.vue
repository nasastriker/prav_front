<template>
    <vx-card no-shadow>
        <div class="flex mb-4">
            <Back></Back>
        </div>
        <label class="mb-4 block">{{ label_input }} </label>

        <h6 class="mb-1">Вид документа </h6>
        <div class="vx-row mb-4">
            <v-select  class="w-50 " style="margin-left: 14px;min-width: 400px" :reduce="label => label.id" label="name" :options="DocumentsVidList" @input="SetVid" v-model="type_document.id_vid"  ></v-select>
            <vs-button color="success" class="pull-right ml-4" type="filled" @click="addVid=true">+</vs-button>
        </div>

        <h6 class="mb-1">Группа документа </h6>
        <div class="vx-row mb-4">
            <v-select  class="w-50 " style="margin-left: 14px;min-width: 400px" :reduce="label => label.id" label="name" :options="DocumentsGroupList" @input="SetGroup" v-model="type_document.id_group"  ></v-select>
            <vs-button color="success" class="pull-right ml-4" type="filled" @click="addGroup=true">+</vs-button>
        </div>

        <vs-checkbox style="margin: 15px 0;" v-model="type_document.correspondence_visible" >Отображать в журнале корреспонденци</vs-checkbox>

        <h6 class="mb-1">Наименование типа</h6>
        <vs-input class="w-full"  v-model="type_document.name" @keypress="validateSymbol" @input="SetNameFile"></vs-input>


        <vs-checkbox style="margin: 15px 0;" v-model="type_document.many" >Может быть несколько документов</vs-checkbox>

        <h6 class="mb-1">Наименование переменной :<span class="ml-2" style="color: red;cursor: pointer" @click="copy(type_document.peremen_name)">copy</span></h6>
        <vs-input class="w-full mb-4"  v-model="type_document.peremen_name" disabled></vs-input>
        <h6 class="mb-1">Тип файла</h6>
        <v-select  class="w-50 mb-4" :reduce="label => label.id" label="name" :options="arrExtDoc"   v-model="type_document.type_document"  ></v-select>

        <h6 class="mb-1">Имя файла</h6>
        <vs-input class="w-full mb-4" v-model="type_document.name_file"></vs-input>

<!--        <v-select  class="w-50 " :reduce="label => label.name" label="name" :options="ExtsDcDocuments"  v-model="type_document.ext_file"></v-select> -->
        <h6 class="mb-1">Кому принадлежит документ </h6>
        <v-select  class="w-50 mb-4"  :reduce="label => label.id" label="name" :options="arrTypeDoc"  v-model="type_document.rec"  ></v-select>
        
        <h6 class="mb-1">Тип документа для ГАС:</h6>
        <v-select class="w-50 mb-4" style="padding-right: 10px;" :reduce="label => label.id" label="name" :options="StadGas" v-model="type_document.stadGas"></v-select>

        <vs-checkbox style="margin: 15px 0;" v-model="type_document.shab" >Шаблон</vs-checkbox>

        <h6 class="mb-1">Имя функции загрузки файлов данного типа (для администраторов)</h6>
        <vs-input class="w-full mb-4" style="margin-top: 15px"  v-model="type_document.upload_func"></vs-input>

        <h6 class="mb-1">Имя группы документов (для администраторов)</h6>
        <vs-input class="w-full mb-4" style="margin-top: 15px"  v-model="type_document.send_group"></vs-input>

        <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.back()">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>


        <vs-popup classContent="popup-example selectModal" class="selectModalWrapper" title="Добавить новый вид документа" :active.sync="addVid">
            <h6 class="mb-1">Вид документа</h6>
            <vs-input class="w-100 mb-4"  v-model="vidDocument"></vs-input>
            <vs-button @click="addVidInput">Добавить</vs-button>
        </vs-popup>

        <vs-popup classContent="popup-example selectModal" class="selectModalWrapper" title="Добавить новый вид документа" :active.sync="addGroup">
            <h6 class="mb-1">Вид документа</h6>
            <v-select  class="w-50 " style="margin-bottom:10px;min-width: 400px" :reduce="label => label.id" label="name" :options="DocumentsVidList" v-model="vidGroup"  ></v-select>
            <h6 class="mb-1">Группа документа</h6>
            <vs-input class="w-100 "  v-model="groupDocument"></vs-input>
            <div style="margin-top: 10px">
                <vs-button @click="addGroupInput">Добавить</vs-button>
            </div>
        </vs-popup>


    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import vSelect from 'vue-select'
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true // add this line
    Vue.use(VueClipboard)
    export default {
        components: {
            'v-select': vSelect,
        },
        data () {
            return {
                label_input:'Редактирование типа документа:',
                addVid:false,
                addGroup:false,
                vidGroup:0,
                groupDocument:'',
                vidDocument:'',
                type_document:{
                    rec:0,
                    peremen_name:'',
                    type_document:'pdf',
                    shab:0,
                    id_vid:0,
                    many:0,
                    id_group:0,
                    name_file:'',
                    correspondence_visible:1
                },
                arrExtDoc:[
                    {
                        id:'jpg',
                        name:'jpg',
                    },
                    {
                      id:'xlsx',
                      name:'xlsx',
                    },
                    {
                      id:'xlsm',
                      name:'xlsm',
                    },
                    {
                        id:'pdf',
                        name:'pdf',
                    },
                    {
                        id:'doc',
                        name:'doc Только для шаблонов',
                    },


                ],
                arrTypeDoc:[
                    {
                        id:0,
                        name:'Документ заемщика'
                    },
                    {
                        id:1,
                        name:'Документ цессии'
                    },
                    {
                        id:2,
                        name:'Документ организации'
                    },


                ],
            }
        },
        mounted(){
            this.getDocumentsVidList()
            if (this.$route.params.id){
                if (this.$route.params.id !== 'new') {
                    this.getData(this.$route.params.id);
                    this.getExtsDcDocuments();
                    this.label = 'Редактирование типа документа:'
                }
                else{
                    this.label = 'Новый тип документа'
                }
            }
        },
        computed: {
            ...mapGetters([
                'ExtsDcDocuments','DocumentsVidList','DocumentsGroupList','StadGas'
            ]),
        },
        methods: {
            copy(data){
                data="${"+data+"}"
                this.$copyText(data)

                alert("Скопировано в буфер обмена");
            },
            SetNameFile(){
                this.type_document.name_file=this.type_document.name.replace(/ /g,'_').toLowerCase()
            },

            validateSymbol(event){
                const charCode = String.fromCharCode(event.keyCode);
                if (/[/,\\]/.test(charCode)) {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Символ "'+event.key+'" нельзя использовать в названии',
                        color: 'danger',
                        position: 'top-center'
                    })
                    event.preventDefault();
                }
            },

            addGroupInput(){
                axios.post(r('correspondence.update'), {
                    params: {
                        method: 'addDocumentsGroupList',
                        param: {vid:this.vidGroup,group:this.groupDocument}
                    }
                }).then((response) => {
                    if (response.data.result) {
                        this.getDocumentsGroupList()
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Успешно!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                        this.setVid()
                    }
                    else this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                    this.addGroup=false
                })
            },

            addVidInput(){
                axios.post(r('correspondence.update'), {
                    params: {
                        method: 'addDocumentsVidList',
                        param: this.vidDocument
                    }
                }).then((response) => {
                    if (response.data.result) {
                        this.getDocumentsVidList()
                         this.$vs.notify({
                             title: 'Успешно',
                             text: 'Успешно!!!',
                             color: 'success',
                             position: 'top-center'
                         })
                        this.getDocumentsVidList()
                    }
                    else this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                    this.addVid=false
                })
            },

            SetGroup(){
                if(this.type_document.id_group==null)this.type_document.id_group=0
            },
            SetVid(){
                if(this.type_document.id_vid==null)this.type_document.id_vid=0
                this.vidGroup=this.type_document.id_vid;
                if(this.type_document.id_vid!=0)this.getDocumentsGroupList(this.type_document.id_vid)
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
            ...mapActions([
                'saveTypeDocument', 'getExtsDcDocuments','getDocumentsVidList','getDocumentsGroupList'
            ]),
            getData(id){
                axios.get(r("debtorCreditDocument.index"), {
                    params: {
                        method: 'getTypeDcDocument',
                        param: id
                    }
                }).then((response) => {
                    if (response.data.result){
                        this.type_document = response.data.data
                    }
                })
            },
            save(){
                this.type_document.id = this.$route.params.id;
                if(this.type_document.peremen_name==null||this.type_document.peremen_name==''){
                    if(this.type_document.rec==0){
                        this.type_document.peremen_name='credit_'+this.translit(this.type_document.name).split(' ').join('_')
                    }
                    if(this.type_document.rec==1){
                        this.type_document.peremen_name='rec_'+this.translit(this.type_document.name).split(' ').join('_')
                    }
                    if(this.type_document.rec==2){
                        this.type_document.peremen_name='orgn_'+this.translit(this.type_document.name).split(' ').join('_')
                    }
                }
                this.saveTypeDocument(this.type_document).then((response) => {
                    if(response.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.back()
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.mess, color: 'danger', position: 'top-center' })
                    }
                })
            },
        },
    }
</script>
