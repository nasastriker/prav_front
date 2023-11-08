<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
    <vs-tabs>
        <vs-tab label="Реестр должников">
            <Reestr_debtor_table></Reestr_debtor_table>
        </vs-tab>
        <vs-tab label="Настройки раздела">
            

            <div class="vx-row">
                <div class="vx-col w-full">
                    <fieldset class="f" style="margin-top:5px;">
                        <vs-tabs>
                            <vs-tab label="Настройка стратегий взаимодействия">
             
                            </vs-tab>
                            <vs-tab label="Скрипты обращений">
             
                            </vs-tab>
                                
                        </vs-tabs>

                    </fieldset>
                </div>
            </div>
        </vs-tab>
        <vs-tab label="Журнал взаимодействия"> </vs-tab>
        <vs-tab label="Обращения должников (ЛК)"> </vs-tab>
        
      </vs-tabs>
    </div>
</div>
</template>

<script>
    import Vue from 'vue'
    import vueDebounce from 'vue-debounce'
    import Reestr_debtor_table from './Reestr_debtor_table.vue'
    Vue.use(vueDebounce)
    export default {
        components: {
            Reestr_debtor_table
        },

        mounted () {

        }
    }


</script>

 