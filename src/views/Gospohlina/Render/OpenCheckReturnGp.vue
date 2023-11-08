<template>
    <div >

            <vs-checkbox style="margin-bottom: 15px" v-model="stat"  >Возврат ГП </vs-checkbox>



    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {

                showDos:false,
            }
        },

        computed: {

            stat: {
                get() { return this.params.value; },
                set(value) { this.saveGosPoshlina(value); },
            },
            ...mapGetters([
                'User'

            ]),
        },
        methods: {

            saveGosPoshlina(value){
              let data=this.params.data
                data.return_gp=value
                axios.post(r("sudPp.update"), {
                    params: {
                        method: 'saveSudPpsGosPoshlina',
                        param: data

                    }
                }).then((response) => {
                    if(response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })



            },

            ...mapActions([
            ]),




        }
    }
</script>
