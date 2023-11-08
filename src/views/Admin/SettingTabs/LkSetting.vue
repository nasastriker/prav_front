<template>
    <vx-card no-shadow style="    min-height: 80vh;">

        <div>
            <div v-for="setting in settings">
                <div v-if="setting.type==='int'">
                    <h6 class="h7">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                    <vs-input  type="number" class="w-100" v-model="data[setting.name_column]" @keypress="validateNumberInt" @blur="save"></vs-input>
                </div>
                <div v-if="setting.type==='date'">
                    <h6 class="h7">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                    <vs-input  type="date" class="w-100" v-model="data[setting.name_column]" @blur="save"></vs-input>
                </div>
                <div v-if="setting.type==='tinyint'">
                    <h6 class="h7">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                    <vs-checkbox  v-model="data[setting.name_column]"  style="    color: brown;" @change="save">Активно</vs-checkbox>
                </div>
                <div v-if="setting.type==='varchar'">
                    <h6 class="h7">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                    <vs-input  class="w-100" v-model="data[setting.name_column]" @blur="save"></vs-input>
                </div>
                <div v-if="setting.type==='text'">
                    <h6 class="h7">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                    <vs-textarea  class="w-100" rows="5" v-model="data[setting.name_column]" @blur="save"></vs-textarea>
                </div>
                <div v-if="setting.type==='decimal'">
                    <h6 class="h7">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                    <vs-input  type="number" class="w-100" v-model="data[setting.name_column]" @keypress="validateNumberDecimal" @blur="save"></vs-input>
                </div>
            </div>
        </div>



    </vx-card>
</template>

<script>
    import VueSuggestions from 'vue-suggestions';
    import r from '../../../route';
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../../axios'
    import VarToClipboard from './../../VarToClipboard.vue'

    import vSelect from 'vue-select'
    export default {
        components: { VueSuggestions, ArrowLeftIcon, 'v-select': vSelect,VarToClipboard
        },

        data () {
            return {
                arr:[
                    {id:0,name:'Нет'},
                    {id:1,name:'Да'},
                ],
                arrIl:[
                    {id:0,name:'Нет'},
                    {id:1,name:'Да'},
                ],
                editPorts:false,
                data:{
                },
                settings:{

                },

            }
        },


        computed: {
            ...mapGetters([
                'User'
            ]),

        },
        methods: {

            ...mapMutations([


            ]),
            ...mapActions([
            ]),
            validateNumberDecimal: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,.]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateNumberInt: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            getData(){
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getLkSetting',

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.data=response.data.data
                        this.settings=response.data.settings
                    }

                })
            },
            save(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r("setting.update"), {
                    params: {
                        method: 'saveLkSetting',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result) {

                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сохранено!!!',
                            color: 'success',
                            position: 'top-center'
                        })

                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Сохранить не удалось !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                        // this.close();
                    }
                    this.$vs.loading.close()
                    this.getData()
                }).catch(e=>{
                    this.$vs.loading.close()
                })


            },


        },
        mounted(){

            this.getData()

        },
    }
</script>
<style lang="scss">
    .h7{
        font-size: 14px;
        color: cadetblue;
        margin-top: 5px;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }


</style>

