<template>
    <div >
        <div class="mt-5">


            <vs-tabs >
              <vs-tab label="Платежи">
                <PaymentTabelMain :id_dogovor="id_dogovor"></PaymentTabelMain>
                </vs-tab>
              <vs-tab label="Соглашение">
                <Soglachenie></Soglachenie>
              </vs-tab>
            </vs-tabs>
        </div>



    </div>
</template>

<script>

    import PaymentTabelMain from "./PaymentTabelMain.vue";
    import Soglachenie from "./Soglachenie.vue";
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {
          PaymentTabelMain,Soglachenie
        },

        props:['id_dogovor'],
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
                'User',

            ]),


        },
        methods: {





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
