<template>
    <div >

            <vs-checkbox style="margin-bottom: 15px" v-model="stat"  >Распечатано </vs-checkbox>



    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import axios from '../../../../axios';
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
                this.params.data.print=value
                if(this.params.data.isk){
                    this.changeIsk(value)
                }
                else{
                    this.changeSud(value)
                }

            },
            changeSud(value){
                let dat={
                    id:this.params.data.id,
                    stat:value,
                }
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'changeCheck',
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
                'getDataArchSuds'
            ]),
            changeIsk(value){
                let dat={
                    id:this.params.data.id,
                    stat:value,
                }
                axios.get(r("archIsk.index"), {
                    params: {
                        method: 'changeCheck',
                        param:dat
                    }
                }).then((response) => {
                    this.getDataArchIsks();


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
                'getDataArchIsks'



            ]),




        }
    }
</script>
