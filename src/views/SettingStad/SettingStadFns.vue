<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh">
        <vs-tabs >
            <vs-tab  label="Шаблон ФНС">
              <SettingStadFnsShablon ></SettingStadFnsShablon>
            </vs-tab>
            <vs-tab  label="Контроль ФНС">
                <CheckFns ></CheckFns>
            </vs-tab>
            <vs-tab  label="Контроль Запрос Банки Эдо">
              <CheckEdo></CheckEdo>
            </vs-tab>

        </vs-tabs>

        </div>
    </div>
</template>

<script>
    import CheckFns from '../Strategy/CheckFns'
    import CheckEdo from '../Strategy/CheckEdo'
    import SettingStadFnsShablon from './SettingStadFnsShablon'
    export default {
        components: {
          CheckFns,
          CheckEdo,
          SettingStadFnsShablon
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
