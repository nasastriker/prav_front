<template>

    <div >

        <vs-popup    classContent="popup-example"  title="Удаление переменной" :active.sync="deleteVarPopup">
        <div>
            <label>Выберите переменную для удаления</label>
            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.name" label="name" :options="DebtorCreditDopVarArr"   v-model="dopVarDeleted.name"  ></v-select>
            <div v-if="!deleteVarAccept" style="margin-top:50px;text-align: center">
                <vs-button @click="confirmDeleteVar">Удалить</vs-button>
                <vs-button @click="deleteVarPopup=false">Отмена</vs-button>
            </div>
            <div v-if="deleteVarAccept" style="margin-top:50px;text-align: center">
                <div style="color:red;text-align: center">Вы действительно хотите удалить переменную <span style="color:blue">{{this.dopVarDeleted.name}}</span> </div>
                <div style="color:red;text-align: center">(удаление произойдет во всех организациях)?</div>
                <div style="margin-top:20px;text-align: center">
                <vs-button color="red" @click="deleteVar">Удалить</vs-button>
                <vs-button @click="deleteVarAccept=false">Отмена</vs-button>
                </div>
            </div>

        </div>
        </vs-popup>

        <vs-popup    classContent="popup-example"  title="Добавление переменной" :active.sync="addVarPopup">
        <div>
            <label>Тип переменной</label>
            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="typeMesto"   v-model="dopVar.typeName"></v-select>

            <label>Название переменной (Допустимы только латинские буквы)</label>
            <div class="vx-row">
                <label style="margin-left: 30px;margin-top: 5px;font-style: oblique">dcd_{{dopVar.typeName}}_</label>
                <vs-input class="w-50" v-model="dopVar.name" @keypress="validateChar" ></vs-input>
            </div>
            <label>Тип переменной</label>
            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="typeFields"   v-model="dopVar.type"></v-select>
            <label>Описание переменной</label>
            <vs-textarea rows="5" v-model="dopVar.description"></vs-textarea>
        </div>
        <div style="text-align: center">
            <vs-button @click="addVar">Сохранить</vs-button>
            <vs-button @click="$emit('changeAddVarPopup',false)">Отмена</vs-button>
        </div>
        </vs-popup>

        <vs-popup    classContent="popup-example"  title="Редактирование переменной" :active.sync="editVarPopup">
            <label>Выберите переменную для редактирования</label>
            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.name" label="name" :options="DebtorCreditDopVarArr"   v-model="dopVarEdit.name" ></v-select>
            <template v-if="dopVarEdited">
            <div>
                <label>Название переменной (Допустимы только латинские буквы)</label>
                <div class="vx-row">
                    <label style="margin-left: 30px;margin-top: 5px;font-style: oblique">var_orgn_</label>
                    <vs-input class="w-50" v-model="dopVarEdit.new_name" @keypress="validateChar" ></vs-input>
                </div>
                <label>Описание переменной</label>
                <vs-textarea rows="5" v-model="dopVarEdit.description"></vs-textarea>
            </div>
            <div style="text-align: center">
                <vs-button @click="editVar">Сохранить</vs-button>
                <vs-button @click="editVarPopup=false">Отмена</vs-button>
            </div>
            </template>
            <div v-else style="height: 200px"></div>
        </vs-popup>



    </div>
</template>

<script>
    import Vue from 'vue'
    import vSelect from 'vue-select'
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    import r from '../../../route'
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true // add this line
    Vue.use(VueClipboard)
    export default {
        components: {
            vSelect,
        },
        props:['name','addVarPopup'

        ],
        data() {
            return {
                typeMesto:[{id:'calc',name:'Расчеты'},
                    {id:'rab',name:'Общая работа'},

                ],
                typeFields:[{id:1,name:'Текст'},
                            {id:2,name:'Целое число'},
                            {id:3,name:'Дробное число'},
                            {id:4, name:'Дата'},
                            {id:5,name:'Логическая переменная (boolean)'},
                    ],
                // Filter Options
                dopVar:{
                    name:'',
                    description:'',
                    type:1,
                    typeName:'rab'
                },
                dopVarDeleted:{
                    name:''
                },

                dopVarEdit:{
                    name:'',
                    description:'',
                    new_name:'',
                    type:1,
                },

                editVarPopup:false,
                deleteVarPopup:false,
                deleteVarAccept:false,
                dopVarEdited:false,
                editFieldPopup:false,


            }
        },

        computed: {

            ...mapGetters([
                'DebtorCreditDopVarArr'
            ]),


        },
        methods: {
            copy(data){
                data="${"+data+"}"
                this.$copyText(data)

                alert("Скопировано в буфер обмена");
            },
            ...mapActions([
                'getDataDebtorCreditDopVar'
            ]),




            validateChar: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[a-z,A-Z]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateInt: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,\-]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateFloat: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,'\-,\,,\.]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            addVar(){
                let clone = JSON.parse(JSON.stringify(this.dopVar));
                clone.name=this.dopVar.typeName+'_'+this.dopVar.name
               this.$vs.loading({ color: '#ff8000' })
                axios.post(r('debtorCredit.update'), {
                    params: {
                        method: 'addColumnDop',
                        param: clone
                    }
                }).then(res=>{
                    this.getDataDebtorCreditDopVar()
                    if(res.data.result){
                        this.$vs.loading.close()
                         this.$vs.notify({
                                         title: 'Успешно',
                                         text: 'Успешно!!!',
                                         color: 'success',
                                         position: 'top-center'
                                     })
                        this.$emit('changeAddVarPopup',false)
                        //this.addVarPopup=false
                    }
                    else{
                        this.$vs.notify({
                                        title: 'Ошибка',
                                        text: res.data.error,
                                        color: 'danger',
                                        position: 'top-center'
                                    })
                        this.$vs.loading.close()
                    }

                }).catch(e=>{
                    this.$vs.loading.close()
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: e.getMessage(),
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                })
                },
            confirmDeleteVar(){
                this.deleteVarAccept=true
                // this.dopVarDeleted.name=null

            },
            editVar(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r('debtorCredit.update'), {
                    params: {
                        method: 'editColumnDop',
                        param: this.dopVarEdit
                    }
                }).then(res=>{
                    if(res.data.result){
                        this.$vs.loading.close()
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Успешно!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                        this.editVarPopup=false
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                        this.$vs.loading.close()
                    }

                }).catch(e=>{
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка !!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },

            deleteVar(){
                this.deleteVarAccept=false
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r('debtorCredit.update'), {
                    params: {
                        method: 'deleteColumnDop',
                        param: this.dopVarDeleted
                    }
                }).then(res=>{
                    if(res.data.result){
                         this.$vs.notify({
                                         title: 'Успешно',
                                         text: 'Переменая удалена',
                                         color: 'success',
                                         position: 'top-center'
                                     })
                        this.deleteVarPopup=false

                    }
                    else {
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка !!!',
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })
                    }
                    this.$vs.loading.close()
                }).catch(e=>{
                    this.$vs.loading.close()
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Ошибка !!!',
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                })
            },






        },
        mounted() {
           this.getDataDebtorCreditDopVar()
        }
    }
</script>

<style scoped>

</style>
