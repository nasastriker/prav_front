<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh">
        <vs-tabs >
            <vs-tab  label="Возврат Банки">
                <ReturnBank ></ReturnBank>
            </vs-tab>
            <vs-tab  label="Настройки Банки">
              <BankSetting></BankSetting>
            </vs-tab>

        </vs-tabs>

        </div>
    </div>
</template>

<script>
    import BankSetting from '../Admin/SettingTabs/BankSetting'
    import ReturnBank from '../Strategy/ReturnBank'
    export default {
        components: {
          BankSetting,
          ReturnBank
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
