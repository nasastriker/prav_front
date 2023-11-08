<template>
    <vs-chip class="ag-grid-cell-chip">
        <vs-checkbox v-model="params.data.bank_recoverable"
                     @input="changeRecoverable">
            Нет возможности взыскать
        </vs-checkbox>
    </vs-chip>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'BankListRecoverable',
    components: {},
    data() {
        return {}
    },
    mounted() {

    },
    computed: {
        ...mapGetters([
            'Deb'
        ]),
    },
    methods: {
        changeRecoverable(){
            this.saveDataSudOrder({
                id_order: this.Deb.sudOrder.id,
                val: this.params.data
            }).then((response) =>{
                if (response) {
                    this.getBanksListSudOrder(this.Deb.sudOrder.id)
                }
            })
        },
        ...mapActions([
            'saveDataSudOrder', 'getBanksListSudOrder'
        ]),
    },
}
</script>

<style lang="scss" scoped>
.ag-grid-cell-chip {
    &.vs-chip-success {
        color: rgba(var(--vs-success), 1) !important;
        font-weight: 500;
    }

    &.vs-chip-warning {
        color: rgba(var(--vs-warning), 1) !important;
        font-weight: 500;
    }

    &.vs-chip-danger {
        color: rgba(var(--vs-danger), 1) !important;
        font-weight: 500;
    }
}
.radio-box-acc{
    display: flex;
}
.rb-acc{
    margin-left: 5px;
    padding: 5px;
}
</style>
