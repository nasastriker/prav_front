<template>
    <div >


        <feather-icon v-if="params.data.status===true" icon="CornerUpLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmUndoRecord" />
        <feather-icon v-if="params.data.status===false" icon="InfoIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="showInfoRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from '../../../../axios'
    import r from '../../../../route'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {

            }
        },
        computed: {

            ...mapGetters([
                'User',

            ]),
        },
        methods: {
            ...mapActions([

                'getDebtorCreditHistoryArr'

            ]),
            showInfoRecord(){
                this.$vs.notify({
                                                title: 'Отмена изменений',
                                                text: 'Данные изменения отменить не возможно, есть более поздние изменения !!!',
                                                color: 'danger',
                                                position: 'top-center'
                                            })
            },
            confirmUndoRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Отмена изменений',
                    text: `Вы действительно хотите отменить изменения? `,
                    accept: this.deleteRecord,
                    acceptText: 'Отменить изменения',
                    cancelText: 'Закрыть'
                })
            },
            deleteRecord () {
                axios.get(r('logUser.index'), {
                    params: {
                        method: 'getCancelHistory',
                        param:this.params.data.id
                    }
                }).then((result)=> {
                    if(result.data.result){
                        this.showUndoSuccess()
                        this.getDebtorCreditHistoryArr(this.User.pag.historyDebtorCreditView);
                    }
                    else{
                        this.showUndoDanger()

                    }
                });

            },
            showUndoSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Изменения отменены!!!',
                    position: 'top-center'
                })
            },
            showUndoDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Ошибка!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
