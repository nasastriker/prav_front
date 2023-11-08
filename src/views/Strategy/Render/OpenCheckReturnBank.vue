<template>
    <div >


            <vs-checkbox style="margin-bottom: 15px" v-model="params.value.active"  >{{params.value.name}}: {{params.value.count}} дней </vs-checkbox>



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


            ...mapGetters([

            ]),
        },
        methods: {
            change(value){


            },

            ...mapActions([
            ]),

            ...mapActions([


            ]),




        }
    }
</script>
