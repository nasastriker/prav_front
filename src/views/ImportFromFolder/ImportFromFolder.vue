<template>
    <div >
        <div id="page-user-list">
            <div class="vx-card p-6">
                <h1>Импорт документов из папки:</h1>

                <div class="vx-row" >
                    <div class="vx-col sm:w-full w-full mb-2" style="margin-top: 15px">
                        <h6 class="mb-1">Взыскатель или договор цессии:<span class="ml-2" style="cursor: pointer;color: red;" @click="showHystory=!showHystory">История</span></h6>
                        <v-select  class="w-50 mb-4" :reduce="label => label.id" label="name" :options="optArr" v-model="data.id_recover" ></v-select>

                        <h6 class="mb-1">Тип документа:</h6>
                        <v-select  class="w-50 mb-4" :reduce="label => label.id" label="name" :options="TypesDcDocumentsDebtor"  v-model="data.typeDoc"  ></v-select>

                        <template v-if="chekcType(data.typeDoc)">
                            <div class="relative mb-base">
                                <div class="trigger_vyn_el mt-4 mb-1">
                                    <vs-checkbox style="margin-left: 0px;" v-model="data.addFile">Добавить файл</vs-checkbox>
                                </div>
                                <div class="hidden_vyn_el absolute" style="padding-left: 10px;padding-right: 10px;padding-top: 5px;padding-bottom: 5px;background-color: #FCEEE0;border-radius: 0px 0px 5px 5px;">
                                    <p style="font-size: 8pt;color: red;line-height: 1em;">Если галочка Активна, и у заемщика есть такой тип файла, то загружаемый файл добавиться дополнительно.</p>
                                </div>
                                
                            </div>
                        </template>


                        <h6 class="h6 mb-1">Название файла(можно использовать out_id, number_dog,number_dog_change_/, date_dog,date_dog_yy(дата формата 01.01.20), del_date_yy и del_date(удаление дата вида 01.01.20 и 01.01.2022 ), all(загружает все файлы, без учета имени) ):</h6>
                        <vue-simple-suggest
                            class="mb-4"
                            v-model="data.fileName"
                            :list="ImpSug"
                            :filter-by-query="true">
                            <!-- Filter by input text to only show the matching results -->
                        </vue-simple-suggest>

                        <vs-checkbox style="margin-bottom: 15px; margin-left: 0px;" v-model="data.beginFrom">Название файла начинается....<h6 class="h6">(можно использовать только когда файлы разложенны по папкам)</h6> </vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px; margin-left: 0px;" v-model="data.deleteEmptyForder">Удалять пустые папки</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px; margin-left: 0px;" v-model="data.jpgtopdf">Конвертировать jpg в pdf</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px; margin-left: 0px;" v-model="data.deleteFile">Удалять файл из папки импорта</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px; margin-left: 0px;" v-model="data.addAllCredit">Добавлять файлы для всех кредитов</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px; margin-left: 0px;" v-model="data.unionFiles">Объединить все файлы досье в один документ</vs-checkbox>

                        <h6 class="h6 mb-1">Название папки по:</h6>
                        <v-select  class="w-50 mb-4"  :options="ArrMethod"  v-model="data.folderName"  ></v-select>

                        <h6 class="h6 mb-1">Название папки с документами(если пусто то из ИМПОРТ_ДОКУМЕНТОВ):</h6>
                        <v-select  class="w-50 mb-4"  :options="ArrFolder"  v-model="data.folderNameGet"  ></v-select>

                        <vs-checkbox style="margin-top: 15px; margin-left: 0px;" v-model="data.files_in_folder">Файлы разложены по папкам</vs-checkbox>
                        <div class="v-row" style="padding-top: 20px;padding-bottom: 20px">
                            <!--<vs-button color="primary" type="border" @click="importFromExcel">Импорт данных из Excel таблицы</vs-button>-->
                          <template v-if="User.email=='amitx@list.ru'">
                            <vs-button color="primary" type="border" @click="sendStart">Начать</vs-button>
                          </template>

                            <vs-button color="primary" type="border" @click="sendStartTask">Создать задачу</vs-button>

                        </div>



                    </div>

                </div>


                <vs-popup class="showHystory" title="История:" :active.sync="showHystory">
                    <template v-if="ImportTasksArrHistory">
                        <div v-if="ImportTasksArrHistory.length == 0" style="display: flex">

                        </div>
                        <div v-else>

                            <template v-for="item in ImportTasksArrHistory">
                                <div style="margin-left: 10px;margin-right: 10px;color: red" @click="setData(item)" class="hover:text-primary cursor-pointer">
                                    {{ item.recover }} Док. {{item.typeName}} задача {{ item.id }}
                                </div>
                                <p> {{ item.fileName }}</p>
                                <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                            </template>
                        </div>
                    </template>


                </vs-popup>
               <!-- <ImportFromExcelPopUp :popupVar="popupImport"
                                      :title="'Импорт из директории'"
                                      @saveImport="importFilesFormDirectoryByExcel"
                                      @getData="getDataImportTasks"></ImportFromExcelPopUp> -->
            </div>
        </div>
        <div >
            <ImportFromFolderTask></ImportFromFolderTask>
        </div>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import r from '../../route';
import axios from '../../axios'
import ImportFromFolderTask from './ImportFromFolderTask.vue'
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css' // Optional CSS
import ImportFromExcelPopUp from './../ImportFromExcel/ImportFromExcelPopUp.vue'
export default {
    components: {
          VueSimpleSuggest,ImportFromFolderTask,ImportFromExcelPopUp
    },

    data () {

        return {
            ImpSug:[

            ],
            ArrMethod:[],
            popupImport:false,
            showHystory:false,
            data:{
                recover:'',
                addAllCredit:0,
                fileName:'',
                deleteEmptyForder:true,
                addFile:0,
                folderName:'',
                id_recover:0,
                beginFrom:0,
                typeDoc:'',
                folderNameGet:'',
                jpgtopdf:false,
                deleteFile:true,
                files_in_folder:false,
                unionFiles:false,

            },
            ArrFolder:[],




        }
    },

    computed: {
        optArr(){
            let arr=[];

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

            return arr
        },
        ...mapGetters([
            'RecoverersArr','TypesDcDocumentsDebtor','User','ImportTasksArrHistory'
        ])

    },
    methods: {
        chekcType(type){

            for (let index = 0; index < this.TypesDcDocumentsDebtor.length; ++index) {
                if(this.TypesDcDocumentsDebtor[index].id==type){
                    if(this.TypesDcDocumentsDebtor[index].many==1){
                        return true
                    }
                }


            }
            if(type==0){
              return true
            }
            return false
        },
        importFromExcel(){
            this.popupImport=true
        },
        setData(item){
            // console.log(item);
            // console.log(this.data);
            this.data=item
            this.showHystory=false;
        },
        getImpSug(){
            axios.get(r("importFromFolder.index"), {
                params: {
                    method: 'getImpSug',
                    param: this.data
                }
            }).then((response) => {
                this.$vs.loading.close()
                if (response.data.result){
                    this.ImpSug=response.data.data


                }


            })
        },
        getArrFolder(){
            axios.get(r("importFromFolder.index"), {
                params: {
                    method: 'getArrFolder',
                    param: this.data
                }
            }).then((response) => {
                this.$vs.loading.close()
                if (response.data.result){
                    this.ArrFolder=response.data.data


                }else {
                }



            })
        },
        getArrMethod(){
            axios.get(r("importFromFolder.index"), {
                params: {
                    method: 'getArrMethod',
                    param:''
                }
            }).then((response) => {
                if (response.data.result){
                    this.ArrMethod=response.data.data


                }else {
                }



            })
        },


        sendStartTask(){

            let flag=true;
            if(this.data.fileName==''){
                flag=false;
            }
          console.log(this.data.typeDoc);
            if(this.data.typeDoc===''){
                flag=false;
            }
            if(this.data.folderName==''){
                flag=false;
            }
            if(flag){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("importFromFolder.index"), {
                    params: {
                        method: 'startImportTask',
                        param: this.data
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Выполнено!!!', color: 'success', position: 'top-center' })


                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Ошибка!!!', color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            }
            else{
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Внимание',
                    text: 'Заполните все поля',

                    acceptText: 'ОК',
                    cancelText: 'Закрыть',
                    parameters: ['hello']
                })
            }
        },
        sendStart(){

            let flag=true;
            if(this.data.fileName==''){
                flag=false;
            }

            if(this.data.typeDoc===''){
                flag=false;
            }
            if(this.data.folderName==''){
                flag=false;
            }
            this.data.id_user=this.User.id;
            if(flag){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("importFromFolder.index"), {
                    params: {
                        method: 'startImport',
                        param: this.data
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Выполнено!!!', color: 'success', position: 'top-center' })


                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Ошибка!!!', color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            }
            else{
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Внимание',
                    text: 'Заполните все поля',

                    acceptText: 'ОК',
                    cancelText: 'Закрыть',
                    parameters: ['hello']
                })
            }

        },
        ...mapActions([
            'getDataReestrsAndCession','getTypesDcDocuments','importFilesFormDirectoryByExcel','getDataImportTasks'
        ])
    },
    mounted () {
        this.getArrMethod();
        this.getImpSug();
        this.getArrFolder();
        this.getTypesDcDocuments();
        this.getDataReestrsAndCession();
    }
}

</script>
<style scope>
.vue-suggestion .vs__list {
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #023d7b;
    position: relative;
}
.vue-suggestion .vs__list .vs__list-item {
    background-color: #fff;
    padding: 10px;
    border-left: 1px solid #023d7b;
    border-right: 1px solid #023d7b;
}
.vue-suggestion .vs__list .vs__list-item:last-child {
    border-bottom: none;
}
.vue-suggestion .vs__list .vs__list-item:hover {
    background-color: #eee !important;
}
.vue-suggestion .vs__list,
.vue-suggestion .vs__loading {
    position: absolute;
}
.vue-suggestion .vs__list .vs__list-item {
    cursor: pointer;
}
.vue-suggestion .vs__list .vs__list-item.vs__item-active {
    background-color: #f3f6fa;
}
</style>
<style lang="scss">
.hidden_vyn_el { display: none; }
.trigger_vyn_el:hover + .hidden_vyn_el { display: block; }
#page-user-list {
    .user-list-filters {
        .vs__actions {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-58%);
        }
    }
}
</style>

