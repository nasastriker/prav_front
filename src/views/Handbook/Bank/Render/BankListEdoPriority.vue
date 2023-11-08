<template>
    <div>
    <span class="my-radio-btn-span-yes-nothing" @click="clickUp">
        <chevron-up-icon size="1.5x" class="custom-class"></chevron-up-icon>
    </span>
    <span class="my-radio-btn-span-no-nothing" @click="clickDown">
        <chevron-down-icon size="1.5x" class="custom-class"></chevron-down-icon>
    </span>
    </div>

<!--    <vs-chip class="ag-grid-cell-chip">-->
<!--        <div class="my-radio-btn-body-nothing">-->
<!--            <span class="my-radio-btn-span-yes-nothing" @click="clickUp"><b>выше</b></span>-->
<!--            <span class="my-radio-btn-span-what-nothing"><b>|</b></span>-->
<!--            <span class="my-radio-btn-span-no-nothing" @click="clickDown"><b>ниже</b></span>-->
<!--        </div>-->
<!--    </vs-chip>-->
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { ChevronUpIcon, ChevronDownIcon } from 'vue-feather-icons'

export default {
    name: 'BankListEdoPriority',
    components: {
        ChevronUpIcon,
        ChevronDownIcon
    },
    data() {
        return {}
    },
    mounted() {

    },
    computed: {
        ...mapGetters([
        ]),
    },
    methods: {
        clickUp() {
            this.moveUpBankEdo(this.params.data.id);
        },
        clickDown() {
            this.moveDownBankEdo(this.params.data.id);
        },
        ...mapActions([
            'moveUpBankEdo', 'moveDownBankEdo'
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

.radio-box-acc {
    display: flex;
}

.rb-acc {
    margin-left: 5px;
    padding: 5px;
}

.my-radio-btn-body-yes {
    display: flex;
    height: 20px;
    width: 80px;
    background-color: blueviolet;
    border-radius: 10px;
    padding: 2px;
    cursor: pointer;
}

.my-radio-btn-body-no {
    display: flex;
    height: 20px;
    width: 80px;
    background-color: orangered;
    border-radius: 10px;
    padding: 2px;
    cursor: pointer;
}

.my-radio-btn-body-nothing {
    display: flex;
    height: 20px;
    width: 80px;
    background-color: white;
    border-radius: 10px;
    padding: 2px;
}

.my-radio-btn-cursor-yes {
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background-color: white;
    margin-left: auto;
    cursor: pointer;
}

.my-radio-btn-cursor-no {
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background-color: white;
    margin-right: auto;
    cursor: pointer;
}

.my-radio-btn-span-yes {
    color: white;
    padding-left: 10px;
    margin: auto;
    cursor: pointer;
}

.my-radio-btn-span-no {
    color: white;
    padding-right: 10px;
    margin: auto;
    cursor: pointer;
}

.my-radio-btn-span-yes-nothing {
    color: grey;
    padding-left: 10px;
    margin: auto;
    cursor: pointer;
}

.my-radio-btn-span-what-nothing {
    color: lightgray;
    margin: auto;
}

.my-radio-btn-span-no-nothing {
    color: grey;
    padding-right: 10px;
    margin: auto;
    cursor: pointer;
}
</style>
