<template>
 <div>
    <!--<div class="row" style="display: flex;
    justify-content: space-between;"> -->
            <payment-tabel :id_dogovor="id_dogovor"></payment-tabel>
     <!--   <div  style="       min-width: 50%; max-width: 100%;">
            <payment-tabel-sudorder :id_dogovor="id_dogovor"></payment-tabel-sudorder>
        </div> -->



    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import PaymentTabel from './PaymentTabel.vue'
    import PaymentTabelSudorder from './PaymentTabelSudorder.vue'
    export default {
        props:['id_dogovor'],
        components: {
            PaymentTabelSudorder,
            PaymentTabel,
            VueCsvImport,
        },
        data () {
            return {

            }
        },

        computed: {


        },
        methods: {



        },
        mounted () {

        }
    }

</script>

<style lang="scss">
    #page-user-list {
    .user-list-filters {
    .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
    }
    }
    }
</style>
