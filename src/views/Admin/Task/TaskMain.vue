<template>
    <vx-card no-shadow>

        <vs-tabs>
            <vs-tab label="По расписанию">
                <Shed></Shed>
            </vs-tab>
            <vs-tab label="Задачи">

            <Task></Task>

            </vs-tab>
            <vs-tab label="Задачи голос">

                <Task name="voice"></Task>

            </vs-tab>
            <vs-tab label="Задачи банкрот">

                <Task name="bankrot"></Task>

            </vs-tab>
            <vs-tab label="Задачи ФССП">

                <Task name="fssp"></Task>

            </vs-tab>




        </vs-tabs>

    </vx-card>
</template>

<script>
    import r from '../../../route';
    import Task from './Task.vue'
    import Shed from './Shed.vue'
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../../axios'
    export default {
        components: {
            Task,

            Shed,
        },
        data () {
            return {

            }
        },
        mounted(){

        },

        computed: {


        },
        methods: {



        },
    }
</script>
