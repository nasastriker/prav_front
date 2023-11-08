<template>
    <div style="background-color: white">
        <vs-tabs>

            <vs-tab label="Результат">
                <fieldset class="f" style="margin-top: 5px">
                    <legend class="l">{{ Deb.debtor.name_family }} {{ Deb.debtor.name }}
                        {{ Deb.debtor.name_patronymic }}:
                    </legend>
                    <div style="padding: 20px">
                        <Bank :checkDateFns="true"></Bank>
                    </div>
                </fieldset>
            </vs-tab>
            <vs-tab label="Данные заёмщика">
                <DebtorID :back="back" :from_fns_answers="from_fns_answers"></DebtorID>
            </vs-tab>


        </vs-tabs>

    </div>
</template>

<script>
import {mapActions, mapGetters,} from 'vuex'
import Status from '../../components/Status.vue'
import DebtorID from '../Debtor/DebtorID.vue'
import Bank from '../Debtor/DebtorTab/Bank.vue'

export default {
    components: {
         Status,  DebtorID, Bank,
    },
    props: {
        from_fns_answers: null
    },
    data() {
        return {
            isk: 0,
            back: false,
            judi: {},
            sud: 0,
            years: ['2020', '2019', '2018'],
            fio: '',
            searchQuery: '',
            findFlagNotFound: false,
            fail_rachod: 0,
            sud_rashod: 0,
            id_rec: 0,
            number: '',

        }
    },
    mounted() {


    },

    computed: {

        ...mapGetters([
            'RecoverersArr', 'Deb', 'BanksArr', 'User'

        ]),


    },
    methods: {
        changeDebLocal() {
            this.changeDeb()
        },
        changeStatusSud() {
            if (this.sud) {
                this.$refs.status.setStatus(3);
            }
        },
        changeStatusIsk() {
            if (this.isk) {
                this.$refs.status.setStatus(4);
            }
        },

        changeAndCheckStatusDebLocal() {
            this.changeAndCheckStatusDeb().then((response) => {
                this.$refs.status.getData();
            })
        },
        ...mapActions([
            'getDataRecoverersAndPravez',  'getDataDebtorsById', 'getBanksNameAndId', 'changeDeb', 'changeAndCheckStatusDeb', 'setDataUser', 'getDataUser'
        ]),


    },
}
</script>
<style>
.f {

    border: 1px;
    border-style: double;
    border-color: #62626262;
    border-radius: 8px;
}

.l {
    color: #a00;
    padding: 0 10px;
}
</style>
