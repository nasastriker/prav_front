<template>
    <vx-card no-shadow>
        <div class="vx-row">
          <vs-tabs color="success">
            <vs-tab label="Общая работа">
              <Fssp></Fssp>
            </vs-tab>
<!--            <vs-tab label="Чек-лист">-->
<!--              <FsspCheckList></FsspCheckList>-->
<!--            </vs-tab>-->
            <vs-tab label="Чек-лист исполнительных действий СПИ">
              <FsspCheckListTables></FsspCheckListTables>
            </vs-tab>
            <vs-tab label="Наложенные на должника ограничения">
              <FsspPostan></FsspPostan>
            </vs-tab>
            <vs-tab label="Журнал Обращений">
              <FsspOneJournal></FsspOneJournal>
            </vs-tab>
            <vs-tab label="Ошибки">
              <FsspOneJournalErrors></FsspOneJournalErrors>
            </vs-tab>
          </vs-tabs>
        </div>
    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import Fssp from "./Fssp.vue";
    import FsspCheckList from "./FsspCheckList.vue";
    import FsspOneJournal from "./FsspOneJournal.vue";
    import FsspPostan from "./FsspPostan.vue";
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import FsspCheckListTables from "./FsspCheckListTables.vue";
    import FsspOneJournalErrors from "./FsspOneJournalErrors.vue";
    Vue.use(AsyncComputed)
    export default {
        components: {
            VueSuggestions,'v-select': vSelect,Fssp,FsspOneJournal,FsspPostan,FsspCheckList,FsspCheckListTables,
          FsspOneJournalErrors
        },
        data () {
            return {

            }
        },
        mounted(){

        },
    }
</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
