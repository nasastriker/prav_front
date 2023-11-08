<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        methods: {
            ...mapActions([
                'getCalculateVarsArr',



            ]),
            editRecord () {
                this.$router.push('/adm/calculatevars/'+this.params.value)
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить пользователя? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                axios.post(r("calculateVars.update"), {
                    params: {
                        method: 'delete',
                        param: this.params.value
                    }
                }).then(res=>{
                    if(res.data.result){
                         this.$vs.notify({
                                                         title: 'Успешно',
                                                         text: 'Переменная удалена',
                                                         color: 'success',
                                                         position: 'top-center'
                                                     })
                    }
                    else{
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка !!!',
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })
                    }
                }).catch(e=>{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Ошибка !!! '+e.message,
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                })
                this.getCalculateVarsArr()

            },

        }
    }
</script>
