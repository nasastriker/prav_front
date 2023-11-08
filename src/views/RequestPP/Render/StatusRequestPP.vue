<template>
    <div >

        <vs-checkbox style="margin-bottom: 15px" v-model="stat"  >Получено </vs-checkbox>



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
                let dat={
                    id:this.params.data.id,
                    stat:value,
                }
                axios.get(r("requestPP.index"), {
                    params: {
                        method: 'changeCheckReq',
                        param:dat
                    }
                }).then((response) => {


                }).catch(error => {

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
                'getDataRequestPps'
            ]),
         



        }
    }
</script>

