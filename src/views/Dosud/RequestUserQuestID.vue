<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>
            <vs-tab :label="label">
                <Status :status="req.request_status" :req="req"></Status>


                <HistoryBot :id_debtor="req.id_debtor"></HistoryBot>




            </vs-tab>
            <vs-tab label="Договор:">
                <DebtorID :idDep="req.id_credit"></DebtorID>
            </vs-tab>
        </vs-tabs>

    </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import DebtorID from '../Debtor/DebtorID.vue'
    import Status from './Status.vue'
    import Back from '../../components/Back.vue'
    import HistoryBot from '../Debtor/DebtorTab/ChildTab/HistoryBot.vue'
    export default {
        props:['req'],
        components: {
            DebtorID,
            Status,
            Back,
            HistoryBot,
            vSelect,
        },
        data () {
            return {
                label:'Вопрос от заёмщика:',

            }
        },
        mounted(){
            this.getDataRequestStatuss();

        },

        computed: {
            ...mapGetters([
                'User','RequestStatussArr'
            ]),

        },
        methods: {
            close(){

                this.$router.back()
            },
            openUrl(url){
                window.open(url, '_blank');
            },

            ...mapActions([
                'getDataRequestStatuss',
            ]),

            save(){



            },


        },
    }
</script>
