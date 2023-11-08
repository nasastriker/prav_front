<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <vs-tabs>
                <vs-tab label="Список банков">
                    <Bank></Bank>
                </vs-tab>
                <vs-tab label="Банки ЭДО">
                    <BankEdo></BankEdo>
                </vs-tab>
            </vs-tabs>
        </div>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import {mapActions, mapGetters} from 'vuex'
import Bank from './Bank.vue'
import BankEdo from './Bank/BankEdo.vue'

export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
        Bank,
        BankEdo
    },
    data() {
        return {
        }
    },

    computed: {
        ...mapGetters([
        ]),
    },
    methods: {
        ...mapActions([
            'getBanksAll'
        ]),
    },
    mounted() {
        this.getBanksAll();
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

.err_mess {
    color: red;
}

.succs_mess {
    color: green;
}
</style>
