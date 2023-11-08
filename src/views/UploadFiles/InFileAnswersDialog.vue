<template>
    <div class="vx-row">
        <div class="vx-col">
            <OneFileAnswer :dataItem="file_data" :correctState="correctState"
                           :show_quest_nd="show_quest_nd" :show_quest_sa="show_quest_sa"
                           @refreshAfterSet="onRefreshAfterSet"
                           @clousePop="clousePop"
                           @refreshAfterDelete="onRefreshAfterDelete"></OneFileAnswer>
        </div>
    </div>

</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import {mapActions, mapGetters} from 'vuex'
import OneFileAnswer from "./OneFileAnswer.vue";
import {SpinnerLoader} from 'vue-spinners-css';
import r from '../../route';
import axios from '../../axios'

export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
        OneFileAnswer
    },
    props: {
        file_data: {}
    },
    data() {
        return {
            correctState: 0,
            show_quest_nd: false,
            show_quest_sa: false
        }
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        clousePop(event){
            this.$emit('clousePop',event);
        },
        onRefreshAfterDelete() {
            this.$emit('refreshAfterDelete');
        },
        onRefreshAfterSet(par_vals) {
            this.$emit('refreshAfterSet', par_vals);
        },
        ...mapActions([]),
    },
    mounted() {

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

.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Style the tab content */
.tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
}

.tabcontent {
    animation: fadeEffect 1s; /* Fading effect takes 1 second */
}

/* Go from zero to full opacity */
@keyframes fadeEffect {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
