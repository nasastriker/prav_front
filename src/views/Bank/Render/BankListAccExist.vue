<template>
    <vs-chip class="ag-grid-cell-chip">
        <div class="radio-box-acc" v-if="params.data.bank_acc_exist === '1'">
            <div class="my-radio-btn-body-yes" @click="clickToNo">
                <span class="my-radio-btn-span-yes"><b>есть</b></span>
                <div class="my-radio-btn-cursor-yes"></div>
            </div>
        </div>
        <div class="radio-box-acc" v-else-if="params.data.bank_acc_exist === '2'">
            <div class="my-radio-btn-body-no" @click="clickToYes">
                <div class="my-radio-btn-cursor-no"></div>
                <span class="my-radio-btn-span-no"><b>нет</b></span>
            </div>
        </div>
        <div class="radio-box-acc" v-else-if="params.data.bank_acc_exist === '0'">
            <div class="my-radio-btn-body-nothing">
                <span class="my-radio-btn-span-yes-nothing" @click="clickToYes"><b>есть</b></span>
                <span class="my-radio-btn-span-what-nothing"><b>|</b></span>
                <span class="my-radio-btn-span-no-nothing" @click="clickToNo"><b>нет</b></span>
            </div>
        </div>
<!--        <vs-radio v-model="params.data.bank_acc_exist" vs-value="1" class="mr-4"-->
<!--                  @input="changeRadio">Есть-->
<!--        </vs-radio>-->
<!--        <vs-radio v-model="params.data.bank_acc_exist" vs-value="2" class="mr-4"-->
<!--                  @input="changeRadio">Нет-->
<!--        </vs-radio>-->
<!--        <h5>{{ params.data.bank_acc_exist }}</h5>-->
    </vs-chip>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'BankListAccExist',
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
        clickToNo(){
            this.params.data.bank_acc_exist = "2";
            this.saveDataSudOrder({
                id_order: this.Deb.sudOrder.id,
                val: this.params.data
            }).then((response) =>{
                if (response) {
                    this.params.data.bank_acc_exist = "2";
                    this.getBanksListSudOrder(this.Deb.sudOrder.id)
                }
            })
        },
        clickToYes(){
            this.params.data.bank_acc_exist = "1";
            this.saveDataSudOrder({
                id_order: this.Deb.sudOrder.id,
                val: this.params.data
            }).then((response) =>{
                if (response) {
                    this.params.data.bank_acc_exist = "1";
                    this.getBanksListSudOrder(this.Deb.sudOrder.id)
                }
            })
        },
        ...mapActions([
            'getBanksListSudOrder', 'saveDataSudOrder'
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
.my-radio-btn-body-yes{
    display: flex;
    height: 20px;
    width: 80px;
    background-color: blueviolet;
    border-radius: 10px;
    padding: 2px;
    cursor: pointer;
}
.my-radio-btn-body-no{
    display: flex;
    height: 20px;
    width: 80px;
    background-color: orangered;
    border-radius: 10px;
    padding: 2px;
    cursor: pointer;
}
.my-radio-btn-body-nothing{
    display: flex;
    height: 20px;
    width: 80px;
    background-color: white;
    border-radius: 10px;
    padding: 2px;
}
.my-radio-btn-cursor-yes{
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background-color: white;
    margin-left: auto;
    cursor: pointer;
}
.my-radio-btn-cursor-no{
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background-color: white;
    margin-right: auto;
    cursor: pointer;
}
.my-radio-btn-span-yes{
    color: white;
    padding-left: 10px;
    margin: auto;
    cursor: pointer;
}
.my-radio-btn-span-no{
    color: white;
    padding-right: 10px;
    margin: auto;
    cursor: pointer;
}
.my-radio-btn-span-yes-nothing{
    color: lightgray;
    padding-left: 10px;
    margin: auto;
    cursor: pointer;
}
.my-radio-btn-span-what-nothing{
    color: lightgray;
    margin: auto;
}
.my-radio-btn-span-no-nothing{
    color: lightgray;
    padding-right: 10px;
    margin: auto;
    cursor: pointer;
}
</style>
