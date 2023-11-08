<template>
    <vx-card no-shadow>

        <!-- Img Row -->

        <!-- Info -->
        <label style="margin-bottom: 10px">Задача: </label>

        {{task}}

        <div style="margin-top: 20px">

            <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>



        </div>


    </vx-card>
</template>

<script>
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    export default {
        components: {
        },
        data () {
            return {

                task:{

                },
            }
        },
        mounted(){
            if (this.$route.params.id){

                    this.getData(this.$route.params.id);


            }

        },

        computed: {


        },
        methods: {
            close(){
                this.$router.back()
            },
            ...mapActions([

            ]),
            getData(id){
                axios.get(r("task.index"), {
                    params: {
                        method: 'getTask',
                        param: id

                    }
                }).then((response) => {
                   if (response.data.result){
                       this.task=response.data.data
                   }



                })
            },


        },
    }
</script>
