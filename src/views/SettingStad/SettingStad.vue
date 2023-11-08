<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh">
        <vs-tabs >
            <vs-tab  label="Приказное производство">
                <SettingStadID :id="4"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Исковое производство">
              <SettingStadID :id="5"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Правопреемство">
              <SettingStadID :id="10"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Банкротство">
              <SettingStadID :id="11"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Дубликат ИД">
              <SettingStadID :id="14"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Описка">
              <SettingStadID :id="16"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Продление срока ИД">
              <SettingStadID :id="17"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Поворот ИД">
              <SettingStadID :id="18"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Взыскание суд расходов">
              <SettingStadID :id="19"></SettingStadID>
            </vs-tab>
            <vs-tab  label="Наследство">
              <SettingStadID :id="20"></SettingStadID>
            </vs-tab>
            <vs-tab  label="ФССП">
              <FsspSettingsAll></FsspSettingsAll>
            </vs-tab>
            <vs-tab  label="ФНС">
              <SettingStadFns></SettingStadFns>
            </vs-tab>
            <vs-tab  label="Банки">
              <SettingStadBank></SettingStadBank>
            </vs-tab>
            <vs-tab  label="Прочие настройки">
              <SudSetting></SudSetting>
            </vs-tab>
        </vs-tabs>

        </div>
    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import r from '@/route';
    import axios from '@/axios'
    import SettingStadID from './SettingStadID.vue'
    import SettingStadBank from './SettingStadBank'
    import SettingStadFns from './SettingStadFns'
    import SudSetting from '../Admin/SettingTabs/SudSetting'
    import FsspSettingsAll from "../Admin/Fssp/FsspSettingsAll.vue";
    export default {
        components: {
          SettingStadID,
          SettingStadBank,
          SettingStadFns,
          SudSetting,
          FsspSettingsAll
        },
        data () {
            return {
              GpTwo:[
                {
                  id:0,
                  name:'Нет'
                },
                {
                  id:1,
                  name:'Да'
                },

              ],
              GpPay:[
                {
                  id:0,
                  name:'Нет'
                },
                {
                  id:1,
                  name:'50 %'
                },
                {
                  id:2,
                  name:'100%'
                }
              ],
                data:[],

            }
        },
        mounted(){
            this.getData()
            this.getDataOrganizationArr()
            this.getDataReestrsAndCession()
            this.getDataShablonDocuments()
        },
        computed: {


        },
        methods: {
          ...mapActions([
                'getDataOrganizationArr','getDataReestrsAndCession','getDataShablonDocuments'
          ]),
            getData(){
                axios.get(r("settingStad.index"), {
                    params: {
                        method: 'getSettingsStads',
                        param: ''
                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data;
                    }
                })
            },
            save(){

            },


        },
    }
</script>
