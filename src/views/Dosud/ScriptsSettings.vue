<template>
    <vx-card no-shadow>

        <vs-tabs>
            <vs-tab label="Скрипты обращений">

                <vs-tabs color="warning" >
                    <vs-tab label="Email">
                      <Templ type="email"></Templ>
                    </vs-tab>
                    <vs-tab label="СМС">
                      <Templ type="sms"></Templ>
                    </vs-tab>
                    <vs-tab  label="Голосовое сообщение">
                      <Templ type="voice"></Templ>
                    </vs-tab>
                    <vs-tab  label="Почтовое сообщение">
                      <Templ type="pochta"></Templ>
                    </vs-tab>
                </vs-tabs>


            </vs-tab>
            <vs-tab label="Шаблоны автоответчик">
                <SoftAnswer></SoftAnswer>
            </vs-tab>
            <!-- <vs-tab label="Настройки реестров">
                <SettingDosud></SettingDosud>
            </vs-tab> -->


        </vs-tabs>

    </vx-card>
</template>

<script>
    import r from '../../route';
    import SoftAnswer from './Soft/SoftAnswer.vue'
    import SettingDosud from './Soft/SettingDosud.vue'
    import Templ from './Soft/Templ.vue'

    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../axios'
    export default {
        components: {
            SoftAnswer,
            SettingDosud,
            Templ,

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
