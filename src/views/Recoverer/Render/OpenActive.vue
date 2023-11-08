<template>
    <div >

            <vs-checkbox style="margin-bottom: 15px" v-model="stat"  >Активна </vs-checkbox>



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
                set(value) { this.change(value); },
            },
            ...mapGetters([
                'User'

            ]),
        },
        methods: {
            change(value){
                this.data=this.params.data
                this.data.active=value

                this.saveRecoverTask(this.data).then((response) => {

                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        // this.$router.push('/handbook/jurisdiction/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })

            },

            ...mapActions([
                'getDataRecoverTasks','saveRecoverTask'
            ]),






        }
    }
</script>
