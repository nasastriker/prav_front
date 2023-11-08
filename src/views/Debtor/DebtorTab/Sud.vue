<template>
    <div >
        <div class="mt-5">
          <div class="vx-row">
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <DebtorInfo :type-des="2"></DebtorInfo>
            </div>
            <div class="vx-col sm:w-2/3 w-full mb-2">
            <vs-tabs v-model="$store.state.sud_work.activeTabSudWork">

              <vs-tab label="Приказное производство">
                <SudInfo></SudInfo>
              </vs-tab>
              <vs-tab label="Исковое производство">
                <ActionProceedings></ActionProceedings>
              </vs-tab>
              <vs-tab label="Описка в ИД">
                <Opiska></Opiska>
              </vs-tab>
              <vs-tab label="Дубликат ИД">
                <ChangesIDDublicat></ChangesIDDublicat>
              </vs-tab>
              <vs-tab label="Правопреемство">
                <Pravopreemstvo></Pravopreemstvo>
              </vs-tab>
              <vs-tab label="Апелляция">
                <Appealation></Appealation>
              </vs-tab>
              <vs-tab label="Кассация">
                <Cassation></Cassation>
              </vs-tab>
              <vs-tab label="Поворот ИД">
                <PovorotId></PovorotId>
              </vs-tab>
              <vs-tab label="Взыскание судебных расходов">
                <CollectRashod></CollectRashod>
              </vs-tab>
              <vs-tab label="Наследство">
                <Inheritance></Inheritance>
              </vs-tab>
              <vs-tab label="Изменения в ИД. Продление срока ИД">
                <ChangesIDProlongation></ChangesIDProlongation>
              </vs-tab>
              <vs-tab label="Госпошлина">
                <GospohlinaMain></GospohlinaMain>
              </vs-tab>
<!--              <vs-tab label="Конструктор ответов">-->
<!--                <SudDocument></SudDocument>-->
<!--              </vs-tab>-->
              <vs-tab label="Конструктор ответов">
                <SudDocumentNew></SudDocumentNew>
              </vs-tab>
              <vs-tab label="История отправок">
                <SudHistory></SudHistory>
              </vs-tab>
              <vs-tab label="Ошибки выгрузок">
                <SudError></SudError>
              </vs-tab>
              <vs-tab label="Работа в ГАС" >
                <SudGas></SudGas>
              </vs-tab>
            </vs-tabs>
        </div>
        </div>
        </div>


    </div>
</template>

<script>

    import SudDocument from './SudDocument.vue'
    import SudHistory from './SudHistory.vue'
    import SudError from './SudError.vue'
    import SudGas from './SudGas.vue'
    import Inheritance from "./Inheritance.vue";
    import ChangesIDProlongation from "./ChangesIDProlongation.vue";
    import DebtorInfo from "../../RegSudAct/DebtorInfo.vue";

    import Opiska from "./Opiska.vue";
    import ChangesIDDublicat from "./ChangesIDDublicat.vue";
    import Pravopreemstvo from "./Pravopreemstvo.vue";
    import SudInfo from "./SudInfo.vue";
    import ActionProceedings from "./ActionProceedings.vue";
    import Appealation from "./Appealation.vue";
    import Cassation from "./Cassation.vue";
    import PovorotId from "./PovorotId.vue";
    import CollectRashod from "./CollectRashod.vue";
    import GospohlinaMain from "./GospohlinaMain.vue";
    import SudDocumentNew from "./SudDocumentNew.vue";
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {
          SudDocument,SudHistory,SudError,SudGas,Opiska,ChangesIDDublicat,Pravopreemstvo,SudInfo,ActionProceedings,
          Inheritance,ChangesIDProlongation,DebtorInfo,Appealation,Cassation,PovorotId,CollectRashod,GospohlinaMain,
          SudDocumentNew
        },

        //props:['idDep','back'],
        data () {
            return {
            }
        },
        mounted(){

        },

        asyncComputed: {

        },
        computed: {


            ...mapGetters([
                'User','Deb'

            ]),


        },
        methods: {

          ...mapActions([

          ]),

        },
    }
</script>

<style lang="scss">
    .address-component {
        flex: 1 1 auto;
        width: 1%;

    input {
        height: auto;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

    &:focus {
         color: #495057;
         background-color: #fff;
         border-color: #80bdff;
         outline: 0;
         box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
     }
    }
    }
</style>
