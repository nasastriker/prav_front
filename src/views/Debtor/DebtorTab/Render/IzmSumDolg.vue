<template>
    <div class="vx-row" >
        <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">
            <fieldset class="f" >
                <legend class="l">Параметры долга в суд:<span style="color: red;cursor:pointer" @click="edit=!edit">Изменить</span></legend>
                <h6 class="h6 mb-1">Сумма долга Суд + ГП:<VarToClipboard name="dc_dolg_sum_sud_and_gp"/></h6>
                <vs-input disabled type="number" class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.dolg_sum_sud_and_gp"></vs-input>
                <h6 class="h6 mb-1">Сумма долга в Суд:<VarToClipboard name="dc_dolg_sum_sud"/></h6>
                <vs-input disabled type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.dolg_sum_sud"></vs-input>
                <h6 class="h6 mb-1" style="margin-top: 15px">Основной долг в Суд:<VarToClipboard name="dc_ocn_sum_sud"/></h6>
                <vs-input :disabled="edit" type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.ocn_sum_sud" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">% долг в Суд:<VarToClipboard name="dc_procent_sum_sud"/></h6>
                <vs-input :disabled="edit" type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.procent_sum_sud" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Пени долг в Суд:<VarToClipboard name="dc_peny_sum_sud"/></h6>
                <vs-input :disabled="edit" type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.peny_sum_sud" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Госпошлина в Суд:<VarToClipboard name="dc_gp_sum_sud"/></h6>
                <vs-input :disabled="edit" type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.gp_sum_sud" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Индексация в Суд:<VarToClipboard name="dc_sum_index_sud"/></h6>
                <vs-input :disabled="edit" type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.sum_index_sud" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Суд. расх. в Суд:<VarToClipboard name="dc_sum_sud_rach_sud"/></h6>
                <vs-input :disabled="edit" type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.sum_sud_rach_sud" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1" style="margin-top: 10px">Дата расчета в Суд:<VarToClipboard name="dc_date_sud_send"/></h6>
                <vs-input :disabled="edit"  type="date"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.date_sud_send" @blur="changeDebUpdate"></vs-input>
            </fieldset>

        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">
            <fieldset class="f">
                <legend class="l">Удовлетворено судом:<span style="color: red;cursor:pointer" @click="copyData">Скопировать</span></legend>
                <h6 class="h6 mb-1">Сумма долга удовлетворено + ГП:<VarToClipboard name="dc_dolg_sum_res_and_gp"/></h6>
                <vs-input disabled type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.dolg_sum_res_and_gp"></vs-input>
                <h6 class="h6 mb-1">Сумма долга удовлетворено:<VarToClipboard name="dc_dolg_sum_res"/></h6>
                <vs-input disabled type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.dolg_sum_res"></vs-input>
                <h6 class="h6 mb-1" style="margin-top: 15px">ОД удовлетворено:<VarToClipboard name="dc_ocn_sum_res"/></h6>
                <vs-input type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.ocn_sum_res" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">% удовлетворено:<VarToClipboard name="dc_procent_sum_res"/></h6>
                <vs-input type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.procent_sum_res" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Пени удовлетворено:<VarToClipboard name="dc_peny_sum_res"/></h6>
                <vs-input type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.peny_sum_res" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Госпошлина удовлетворено:<VarToClipboard name="dc_gp_sum_res"/></h6>
                <vs-input type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.gp_sum_res" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Индексация удовлетворено:<VarToClipboard name="dc_sum_index_res"/></h6>
                <vs-input type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.sum_index_res" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Судебные расходы удовлетворено:<VarToClipboard name="dc_sum_res_rach_sud"/></h6>
                <vs-input type="number"  class="mb-2 w-100 w130 " v-model="Deb.debtorCredit.sum_res_rach_sud" @change="changeDebUpdate"></vs-input>
                <vs-checkbox v-model="Deb.debtorCredit.lasting" @input="changeDebUpdate" style="margin-top: 10px; font-size: 12px;"> <h6 class="h6 mb-1">Активировать начисления (% длящиеся)<VarToClipboard name="dc_lasting"/></h6></vs-checkbox>
            </fieldset>

        </div>
      <!--  <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">
            <fieldset class="f" >
                <legend class="l">Изменения:</legend>
                <h6 class="h6 mb-1">Изм. Сумма долга Суд + ГП:</h6>
                <vs-input disabled type="number"  class="w-100 w130 " v-model="Deb.debtorCredit.dolg_sum_sud_and_gp-Deb.debtorCredit.dolg_sum_res_and_gp"></vs-input>

                <h6 class="h6 mb-1">Изм. Сумма долга в Суд:</h6>
                <vs-input disabled type="number"  class="w-100 w130 " v-model="Deb.debtorCredit.dolg_sum_sud-Deb.debtorCredit.dolg_sum_res"></vs-input>



                <h6 class="h6 mb-1" style="margin-top: 15px">Изм. Основной долг в Суд:</h6>
                <vs-input :disabled="edit" type="number"  class="w-100 w130 " v-model="Deb.debtorCredit.ocn_sum_sud-Deb.debtorCredit.ocn_sum_res" ></vs-input>

                <h6 class="h6">Изм. % долг в Суд:</h6>
                <vs-input :disabled="edit" type="number"  class="w-100 w130 " v-model="Deb.debtorCredit.procent_sum_sud-Deb.debtorCredit.procent_sum_res" ></vs-input>

                <h6 class="h6">Изм. Пени долг в Суд:</h6>
                <vs-input :disabled="edit" type="number"  class="w-100 w130 " v-model="Deb.debtorCredit.peny_sum_sud-Deb.debtorCredit.peny_sum_res"></vs-input>

                <h6 class="h6">Изм. Госпошлина в Суд:</h6>
                <vs-input :disabled="edit" type="number"  class="w-100 w130 " v-model="Deb.debtorCredit.gp_sum_sud-Deb.debtorCredit.gp_sum_res" ></vs-input>
                <h6 class="h6">Изм. Индексация в Суд:</h6>
                <vs-input :disabled="edit" type="number"  class="w-100 w130 " v-model="Deb.debtorCredit.sum_index_sud-Deb.debtorCredit.sum_index_res" ></vs-input>
                <h6 class="h6">Изм. Судебные расходы в Суд:</h6>
                <vs-input :disabled="edit" type="number"  class="w-100 w130 " v-model="Deb.debtorCredit.sum_sud_rach_sud-Deb.debtorCredit.sum_res_rach_sud"></vs-input>


            </fieldset>

        </div> -->




    </div>
</template>

<script>

    import { mapActions,mapGetters } from 'vuex'
    import VarToClipboard from './../../../VarToClipboard.vue'
    export default {
        components: {
            VarToClipboard
        },

        //props:['idDep','back'],
        data () {
            return {
                edit:true,
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
            copyData(){
                this.Deb.debtorCredit.sum_res_rach_sud=this.Deb.debtorCredit.sum_sud_rach_sud
                this.Deb.debtorCredit.ocn_sum_res=this.Deb.debtorCredit.ocn_sum_sud
                this.Deb.debtorCredit.procent_sum_res=this.Deb.debtorCredit.procent_sum_sud
                this.Deb.debtorCredit.peny_sum_res=this.Deb.debtorCredit.peny_sum_sud
                this.Deb.debtorCredit.gp_sum_res=this.Deb.debtorCredit.gp_sum_sud
                this.Deb.debtorCredit.res_sud=1
                this.changeDebUpdate()
            },
          ...mapActions([
              'changeDebUpdate'
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
